/* eslint-disable no-unused-vars */

import './projetos.css'
import { GoProjectSymlink } from 'react-icons/go'
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Header from '../../components/Header'
import Title from '../../components/Title'
import Avatar from '../../assets/avatar.png'

import { useEffect, useState, useRef } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { AiOutlineDelete } from 'react-icons/ai'


export default function Projetos() {
        const [data, setData] = useState()
        const [edit, setEdit] = useState("")
        const [editData, setEditData] = useState({title1: "", title2: "", subtitle: "", linkSite: "", imgProject: null, linkGithub: "", descricao: "", habilidades: [""]})
        const [imageAvatar, setImageAvatar] = useState(null)
        const [load, setLoad] = useState(false)
        const [veIndex, setVeIndex] = useState()
        const [habilidades, setHabilidades] = useState([""])

    // Chamada dos botões existentes    

    useEffect(()=> {
        async function buscarbotoes() {

            const botoesRef = collection(db, 'projetos');
      
            await getDocs(botoesRef).then((snapshot) => {
              let lista  = [];
              snapshot.forEach((doc)=> {
                lista.push({
                  title1: doc.data().title1,
                  title2: doc.data().title2,
                  subtitle: doc.data().subtitle,
                  linkSite: doc.data().linkSite,
                  imgProject: doc.data().imgProject,
                  linkGithub: doc.data().linkGithub,
                  descricao: doc.data().descricao,
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
                setEditData({...editData, imgProject: URL.createObjectURL(image)})
            } else {
                alert("envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
            }
        }
    }

// Editar botão

async function editProjeto(URL) {
    await updateDoc(doc(db, "projetos", edit), {
        title1: editData.title1,
        title2: editData.title2,
        subtitle: editData.subtitle,
        linkSite: editData.linkSite,
        descricao: editData.descricao,
        imgProject: URL,
        linkGithub: editData.linkGithub,
        habilidades: habilidades,
    })
    .then(() => {
        toast.success("Atualizado com sucesso")
        setEditData({title1: "", title2: "", subtitle: "", linkSite: "", imgProject: null, linkGithub: "", descricao: "" , habilidades: [""]})
        setHabilidades([""])
        setEdit("")
        setLoad(false)
    })
}

// Enviando dados para o firebase

    async function handleEditProjeto(e) {
        e.preventDefault();
        setLoad(true)
        if(editData?.title1 !== "" && editData?.title2 !== "" && editData?.subtitle !== "" && editData?.linkSite !== "" && editData?.linkGithub !== "" && editData?.imgProject) {

            // Editar botão

            if(edit !== "") {
                if(editData.imgProject == data[veIndex].imgProject) {
                    editProjeto(editData.imgProject)
                } else {
                    const uploadRef =  ref(storage, `images/projeto/${imageAvatar.name}`)
                    const uploadTask = uploadBytes(uploadRef, imageAvatar)
                    .then((snapshot)=> {
                        getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                            editProjeto(downloadURL)
                        })
                    })
                    .catch(error => {
                            console.log(error)
                            toast.error("ops erro ao registrar")
                    })
    
                }
                
            } else {
                // Criar Projeto

                const uploadRef =  ref(storage, `images/projeto/${imageAvatar.name}`)
                const uploadTask = uploadBytes(uploadRef, imageAvatar)
                .then((snapshot)=> {
                    getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                        await addDoc(collection(db, "projetos"), {
                            title1: editData.title1,
                            title2: editData.title2,
                            subtitle: editData.subtitle,
                            linkSite: editData.linkSite,
                            imgProject: downloadURL,
                            linkGithub: editData.linkGithub,
                            descricao: editData.descricao,
                            habilidades: habilidades,
                        })
                        .then(()=> {
                            toast.success("Criado com sucesso")
                            setEditData({title1: "", title2: "", subtitle: "", linkSite: "", imgProject: null, linkGithub: "", descricao: "" , habilidades: [""]})
                            setLoad(false)
                            setHabilidades([""])
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
        await deleteDoc(doc(db, "projetos", data[veIndex].id))
        .then(()=> {
            setLoad(false)
            toast.success("deletado com sucesso")
            setEditData({title1: "", title2: "", subtitle: "", linkSite: "", imgProject: null, linkGithub: "", descricao: "", habilidades: [""]})
            setHabilidades([""])
            setEdit("")
        })
        .catch((e)=> {
            console.log(e)
        })
    }


        // Edição da habilidade

        function hendleHabilidade(e, index) {
            habilidades[index] = e.target.value
            setHabilidades([...habilidades])
        }

    // delete habilidade

    function deleteHabilidade(index) {
        const filterhabilidades = []
        habilidades.filter((e, n)=> {
            if(n != index) {
                filterhabilidades.push(e)
            }
        })
        setHabilidades([...filterhabilidades])
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Projetos'>
                <GoProjectSymlink color='#000' size={24}/>
                </Title>
                
                <div className='container' >
                        <button className='container-bottons__left-btn' onClick={()=> {irParaEsquerda()}}><i className="bi bi-caret-left-fill"></i></button>
                        <button className='container-bottons__right-btn' onClick={()=> {irParaDireita()}} ><i className="bi bi-caret-right-fill"></i></button> 
                    <div className='container--projeto' ref={carrossel}>
                        

                        {data?.map((e, index) => {
                            return (
                                <button key={e.id} className="container__bottons-projeto"
                                onClick={()=> {
                                    setEditData({title1: e.title1, title2: e.title2, subtitle: e.subtitle, linkSite: e.linkSite, imgProject: e.imgProject, linkGithub: e.linkGithub, descricao: e.descricao})
                                    setEdit(e.id)
                                    setVeIndex(index)
                                    setHabilidades([...e.habilidades])
                                    console.log(editData)
                                }}
                                style={{backgroundImage: `url(${e.imgProject})` }}
                                >
                                <h2>{e.title1}</h2>
                                <h3>{e.title2}</h3>
                                </button>
                            )
                            
                        })
                    }

                    </div>
                </div>


                <div className="container">
                    <form className="form-profile" onSubmit={e => handleEditProjeto(e)}>

                    <label className="img--botoes">
                            <span htmlFor="">
                                <FiUpload color="#000" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br/>
                            {editData.imgProject === null ? (
                                <img src={Avatar} alt="Foto de perfil"/>
                            ): (
                                <img src={editData.imgProject} alt="Foto de perfil"/>
                            )}
                    </label>

                        <label htmlFor="title1">Titulo 1</label>
                        <input type="text" 
                        id='title1'
                        placeholder='insira um titulo'
                        value={editData.title1}
                        onChange={(e) => {
                            setEditData({...editData, title1: e.target.value})
                        }}
                        />

                        <label htmlFor="title2">Titulo 2</label>
                        <input type="text" 
                        id='title2'
                        placeholder='insira um titulo'
                        value={editData.title2}
                        onChange={(e) => {
                            setEditData({...editData, title2: e.target.value})
                        }}
                        />

                        <label htmlFor="subtitle">SubTitulo</label>
                        <textarea type="text" 
                        id='subtitle'
                        placeholder='Escreva um pouco do projeto...'
                        value={editData.subtitle}
                        onChange={(e) => {
                            setEditData({...editData, subtitle: e.target.value})
                        }}
                        />

                        <label htmlFor="description">Descrição detalhada</label>
                        <textarea type="text" 
                        id='description'
                        placeholder='De mais detalhes do projeto...'
                        value={editData.descricao}
                        onChange={(e) => {
                            setEditData({...editData, descricao: e.target.value})
                        }}
                        />

                        <label>Habilidades Aprendidas <button type='button' className='add--habilidade' onClick={()=>{
                            setHabilidades([...habilidades, ""])
                        }}>+</button> </label> 
                        {habilidades.map((e, index)=> {
                            return(
                                <div className='habilidade--box' key={index}>
                                    <input type="text"
                                    placeholder='insira a habilidade aprendida'
                                    value={habilidades[index]}
                                    onChange={(e) => {
                                        hendleHabilidade(e, index)
                                    }}
                                    />
                                    <button onClick={() => deleteHabilidade(index) }><AiOutlineDelete/></button>
                                </div>
                            )
                        })

                        }

                        <label htmlFor="linksite">Link do site</label>
                        <input type="text" 
                        id='linksite'
                        placeholder='insira um titulo'
                        value={editData.linkSite}
                        onChange={(e) => {
                            setEditData({...editData, linkSite: e.target.value})
                        }}
                        />

                        <label htmlFor="linkgit">Link github</label>
                        <input type="text" 
                        id='linkgit'
                        placeholder='insira um titulo'
                        value={editData.linkGithub}
                        onChange={(e) => {
                            setEditData({...editData, linkGithub: e.target.value})
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