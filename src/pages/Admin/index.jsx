
import './admin.css'
import { HiDocumentText } from 'react-icons/hi2'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useEffect, useState } from 'react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

export default function Admin() {
        const [data, setData] = useState()


    useEffect(()=> {
        async function buscaTexto() {
      
          const projetosRef = collection(db, 'text');
      
          await getDocs(projetosRef).then((snapshot) => {
            let lista  = [];
            snapshot.forEach((doc)=> {
              lista.push({
                text1: doc.data().text1,
                text2: doc.data().text2,
                text3: doc.data().text3
      
              })
             })
            setData(lista[0])    
          })
        }
        buscaTexto()
      
      }, [])




    async function handleEditText(e) {
        e.preventDefault();

        if(data.text1 !== '' && data.text2 !== '' && data.text3 !== '') {
            await updateDoc(doc(db,"text","I5pKDEIRPsFdAV6uDyrE"), data)
            .then(()=> {
                toast.success("Editado com sucesso")
            })
            .catch(error => {
                console.log(error)
                toast.error("Erro ao fazer cadastro")
            })

        } else {
            toast.error("Preencha todos os campos!")
        }
    }


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Textos'>
                    <HiDocumentText color='#000' size={24}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={e => handleEditText(e)}>

                        <label htmlFor="text1">Texto 1</label>
                        <textarea type="text" 
                        id='text1'
                        placeholder='insira um texto'
                        value={data?.text1}
                        onChange={(e) => {
                            setData({...data, text1: e.target.value})
                        }}
                        />

                         <label htmlFor="text2">Texto 2</label>
                        <textarea type="text" 
                        id='text2'
                        placeholder='insira um texto'
                        value={data?.text2}
                        onChange={(e) => {
                            setData({...data, text2: e.target.value})
                        }}
                        /> 
                        
                        
                        <label htmlFor="text3">Texto 3</label>
                        <textarea type="text" 
                        id='text3'
                        placeholder='insira um texto'
                        value={data?.text3}
                        onChange={(e) => {
                            setData({...data, text3: e.target.value})

                        }}
                        /> 

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}