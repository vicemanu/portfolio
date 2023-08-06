/* eslint-disable no-unused-vars */

import './cursos.css'
import { GiArrowScope } from 'react-icons/gi'
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Header from '../../components/Header'
import Title from '../../components/Title'
import Avatar from '../../assets/avatar.png'

import { useEffect, useState, useRef } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


export default function Cursos() {
        const [data, setData] = useState()
        const [edit, setEdit] = useState("")
        const [editData, setEditData] = useState({title: "", nlv: "iniciante", text: "", srcImg: null})
        const [imageAvatar, setImageAvatar] = useState(null)
        const [load, setLoad] = useState(false)
        const [veIndex, setVeIndex] = useState()

    // Chamada dos botões existentes    

    useEffect(()=> {
        async function buscarbotoes() {

            const botoesRef = collection(db, 'cursos');
      
            await getDocs(botoesRef).then((snapshot) => {
              let lista  = [];
              snapshot.forEach((doc)=> {
                lista.push({
                  nomeDoCurso: doc.data().nomeDoCurso,
                  colegio: doc.data().colegio,
                  img: doc.data().img,
                  horas: doc.data().horas,
                  certificado: doc.data().certificado,
                  habilidades: doc.data().habilidades,
                  id: doc.id
      
                })
               })
              setData(lista)    
            })
          }
                buscarbotoes()
                console.log(data)
      
      
        }, [load])


// Sistema de carrossel


    const carrossel = useRef(null)

    const irParaDireita = ()=> {
        
        carrossel.current.scrollLeft += 300;
    }

    const irParaEsquerda = ()=> {

        carrossel.current.scrollLeft -= 300;
    }

// Carregando a Imagem do botão

    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];


            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setEditData({...editData, srcImg: URL.createObjectURL(image)})
            } else {
                alert("envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
            }
        }
    }

// Editar botão

async function editButton(URL) {
    await updateDoc(doc(db, "botoes", edit), {
        title: editData.title,
        text: editData.text,
        srcImg: URL,
        nlv: editData.nlv,
    })
    .then(() => {
        toast.success("Atualizado com sucesso")
        setEditData({title: "", nlv: "iniciante", text: "", srcImg: null})
        setEdit("")
        setLoad(false)
    })
}

// Enviando dados para o firebase

    async function handleEditBottons(e) {
        e.preventDefault();
        setLoad(true)
        if(editData?.title !== "" && editData?.text !== "" && editData?.srcImg) {

            // Editar botão

            if(edit !== "") {
                if(editData.srcImg == data[veIndex].srcImg) {
                    editButton(editData.srcImg)
                } else {
                    const uploadRef =  ref(storage, `images/botoes/${imageAvatar.name}`)
                    const uploadTask = uploadBytes(uploadRef, imageAvatar)
                    .then((snapshot)=> {
                        getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                            editButton(downloadURL)
                        })
                    })
                    .catch(error => {
                            console.log(error)
                            toast.error("ops erro ao registrar")
                    })
    
                }
                
            } else {
                // Criar botão

                const uploadRef =  ref(storage, `images/botoes/${imageAvatar.name}`)
                const uploadTask = uploadBytes(uploadRef, imageAvatar)
                .then((snapshot)=> {
                    getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                        await addDoc(collection(db, "botoes"), {
                            title: editData.title,
                            text: editData.text,
                            srcImg: downloadURL,
                            nlv: editData.nlv,
                        })
                        .then(()=> {
                            toast.success("Criado com sucesso")
                            setEditData({title: "", nlv: "iniciante", text: "", srcImg: null})
                            setLoad(false)
                        })
                        })
                })
                .catch(error => {
                        console.log(error)
                        toast.error("ops erro ao registrar")
                })


            }


        }
        
    }


    // deletar botão

    async function deleteBotao() {
        setLoad(true)
        await deleteDoc(doc(db, "botoes", data[veIndex].id))
        .then(()=> {
            setLoad(false)
            toast.success("deletado com sucesso")
            setEditData({title: "", nlv: "iniciante", text: "", srcImg: null})
            setEdit("")
        })
        .catch((e)=> {
            console.log(e)
        })
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Cursos'>
                    <GiArrowScope color='#000' size={24}/>
                </Title>
                
                <div className='container' ref={carrossel}>

                    <div className='container--cursos'>

                    <button className='container-bottons__left' onClick={()=> {irParaEsquerda()}}><i className="bi bi-caret-left-fill"></i></button>
                    <button className='container-bottons__right' onClick={()=> {irParaDireita()}} ><i className="bi bi-caret-right-fill"></i></button> 

                    {data?.map((e, index) => {
                            return (
                                <button key={e.id} className="container__bottons-cursos"
                                onClick={()=> {
                                    setEditData({title: e.title, nlv: e.nlv, text: e.text, srcImg: e.srcImg})
                                    setEdit(e.id)
                                    setVeIndex(index)
                                    console.log(editData)
                                }}
                                style={{backgroundImage: `url(${e.img})` }}
                                >
                                <div className='container__bottons-cursos--shadow'></div>
                                <h2>{e.nomeDoCurso}</h2>
                                <h3>{e.colegio}</h3>
                                </button>
                            )
                            
                        })
                    }
                    </div>
                </div>


                <div className="container">
                    <form className="form-profile" onSubmit={e => handleEditBottons(e)}>

                    <label className="img--botoes">
                            <span htmlFor="">
                                <FiUpload color="#000" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br/>
                            {editData.srcImg === null ? (
                                <img src={Avatar} alt="Foto de perfil"/>
                            ): (
                                <img src={editData.srcImg} alt="Foto de perfil"/>
                            )}
                    </label>

                        <label htmlFor="title">Titulo</label>
                        <input type="text" 
                        id='title'
                        placeholder='insira um titulo'
                        value={editData.title}
                        onChange={(e) => {
                            setEditData({...editData, title: e.target.value})
                        }}
                        />

                        <label htmlFor="nvl">Nivel de Habilidade</label>
                        <select 
                        id='nvl'
                        value={editData.nlv}
                        onChange={(e) => {
                            setEditData({...editData, nlv: e.target.value})
                        }}
                        >
                            <option>iniciante</option>
                            <option>intermediario</option>
                            <option>avançado</option>
                        </select> 
                        
                        
                        <label htmlFor="text">Texto</label>
                        <textarea type="text" 
                        id='text'
                        placeholder='Escreva um pouco da habilidade...'
                        value={editData.text}
                        onChange={(e) => {
                            setEditData({...editData, text: e.target.value})
                        }}
                        /> 
                        <div className='btn--edit'>
                        <button type='submit'>Salvar</button>
                        {edit !== "" && <button className='btn--dit_delete'  
                        onClick={()=>{
                            deleteBotao()
                        }}
                        >Delete</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}