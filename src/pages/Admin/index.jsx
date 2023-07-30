
import './admin.css'
import { HiDocumentText } from 'react-icons/hi2'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

export default function Admin() {
    const [textoUm, setTextoUm] = useState('')
    const [textoDois, setTextoDois] = useState('')
    const [textoTres, setTextoTres] = useState('')

    async function handleEditText(e) {
        e.preventDefault();

        if(textoUm !== '' && textoDois !== '' && textoTres !== '') {
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
                <Title name='Textos'>
                    <HiDocumentText color='#000' size={24}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={e => handleEditText(e)}>

                        <label htmlFor="nome">Texto 1</label>
                        <textarea type="text" 
                        id='nome'
                        placeholder='insira um texto'
                        value={textoUm}
                        onChange={e => setTextoUm(e.target.value)} 
                        />

                        <label htmlFor="cnpj">Texto 2</label>
                        <textarea type="text" 
                        id='nome'
                        placeholder='insira um texto'
                        value={textoDois}
                        onChange={e => setTextoDois(e.target.value)} 
                        />

                        <label htmlFor="endereco">Texto 3</label>
                        <textarea type="text" 
                        id='nome'
                        placeholder='insira um texto'
                        value={textoTres}
                        onChange={e => setTextoTres(e.target.value)} 
                        />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}