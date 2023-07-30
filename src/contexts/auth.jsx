/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({});


function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(()=> {
        async function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPRO')

            if(storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }

            setLoading(false);
        }

        loadUser()
    },[])


    async function signIn(email, password) {
        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value)=> {
            let uid = value.user.uid;

            let data = {
                uid: uid,
                email: value.user.email,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false)
            toast.success("Bem-vindo de volta!")
            navigate("/admin")
        })
        .catch(error => {
            console.log(error)
            setLoadingAuth(false)
            toast.error("Ops, algo deu errado!")
        })
    }

    function storageUser(data) {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO')
        setUser(null)
    }
    
    return(
        <AuthContext.Provider
        value={{
            signed: !!user,
            user,
            signIn,
            logout,
            loadingAuth,
            loading,
            storageUser,
            setUser
        }}
        >
         {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;