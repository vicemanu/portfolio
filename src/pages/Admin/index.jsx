
import './admin.css'
import { FiUser } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

export default function Admin() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleRegister(e) {
        e.preventDefault();

        if(nome !== '' && cnpj !== '' && endereco !== '') {
            await addDoc(collection(db,"customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco,
            })
            .then(()=> {
                setNome('')
                setCnpj('')
                setEndereco('')
                toast.success("Empresa registrada!")
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
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={e => handleRegister(e)}>
                        <label htmlFor="nome">Nome Fantasia</label>
                        <input type="text" 
                        id='nome'
                        placeholder='Nome da empresa'
                        value={nome}
                        onChange={e => setNome(e.target.value)} 
                        />

                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" 
                        id='cnpj'
                        placeholder='Digite o CNPJ'
                        value={cnpj}
                        onChange={e => setCnpj(e.target.value)} 
                        />

                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" 
                        id='endereco'
                        placeholder='Endereço da empresa'
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)} 
                        />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}