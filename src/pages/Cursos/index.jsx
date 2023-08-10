/* eslint-disable no-unused-vars */

import './cursos.css'
import { GiArrowScope } from 'react-icons/gi'
import { AiOutlineDelete } from 'react-icons/ai'
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
        const [editData, setEditData] = useState({nomeDoCurso: "", colegio: "", horas: "", img: null, certificado: "", habilidades: [] })
        const [imageAvatar, setImageAvatar] = useState(null)
        const [load, setLoad] = useState(false)
        const [veIndex, setVeIndex] = useState()
        const [habilidades, setHabilidades] = useState([""])

    // Chamada dos botões existentes    

    useEffect(()=> {
        async function buscarCursos() {

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
                buscarCursos()
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
                setEditData({...editData, img: URL.createObjectURL(image)})
            } else {
                alert("envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
            }
        }
    }

// Editar botão

async function editCurso(URL) {
    await updateDoc(doc(db, "cursos", edit), {
        nomeDoCurso: editData.nomeDoCurso,
        colegio: editData.colegio,
        img: URL,
        horas: editData.horas,
        certificado: editData.certificado,
        habilidades: habilidades,
    })
    .then(() => {
        toast.success("Atualizado com sucesso")
        setEditData({nomeDoCurso: "", colegio: "", horas: "", img: null, certificado: "", habilidades: [] })
        setLoad(false)
        setHabilidades([""])
        setEdit("")
    })
}

// Enviando dados para o firebase

    async function handleEditCurso(e) {
        e.preventDefault();
        setLoad(true)
        // ({nomeDoCurso: "", colegio: "", horas: "", img: null, certificado: "", habilidades: [] })
        if(editData?.nomeDoCurso !== "" && editData?.colegio !== "" && editData?.horas !== "" && editData?.certificado !== "" && editData?.img && habilidades[0] !== "") {

            // Editar botão

            if(edit !== "") {
                if(editData.img == data[veIndex].img) {
                    editCurso(editData.img)
                } else {
                    const uploadRef =  ref(storage, `images/cursos/${imageAvatar.name}`)
                    const uploadTask = uploadBytes(uploadRef, imageAvatar)
                    .then((snapshot)=> {
                        getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                            editCurso(downloadURL)
                        })
                    })
                    .catch(error => {
                            console.log(error)
                            toast.error("ops erro ao registrar")
                    })
    
                }
                
            } else {
                // Criar Curso

                const uploadRef =  ref(storage, `images/cursos/${imageAvatar.name}`)
                const uploadTask = uploadBytes(uploadRef, imageAvatar)
                .then((snapshot)=> {
                    getDownloadURL(snapshot.ref).then(async (downloadURL)=> {
                        await addDoc(collection(db, "cursos"), {
                            nomeDoCurso: editData.nomeDoCurso,
                            colegio: editData.colegio,
                            img: downloadURL,
                            horas: editData.horas,
                            certificado: editData.certificado,
                            habilidades: habilidades,
                        })
                        .then(()=> {
                            toast.success("Criado com sucesso")
                            setEditData({nomeDoCurso: "", colegio: "", horas: "", img: null, certificado: "", habilidades: [] })
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


    // deletar Curso

    async function deleteCurso() {
        setLoad(true)
        await deleteDoc(doc(db, "cursos", data[veIndex].id))
        .then(()=> {
            toast.success("deletado com sucesso")
            setEditData({nomeDoCurso: "", colegio: "", horas: "", img: null, certificado: "", habilidades: [] })
            setHabilidades([""])
            setEdit("")
            setLoad(false)
        })
        .catch((e)=> {
            console.log(e)
        })
    }


    // Edição da habilidade

    function hendleHabilidadde(e, index) {
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
                                    setEditData({nomeDoCurso: e.nomeDoCurso, colegio: e.colegio, horas: e.horas, img: e.img, certificado: e.certificado, habilidades: [] })
                                    setHabilidades([...e.habilidades])
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
                    <form className="form-profile" onSubmit={e => handleEditCurso(e)}>

                    <label className="img--botoes">
                            <span htmlFor="">
                                <FiUpload color="#000" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br/>
                            {editData.img === null ? (
                                <img src={Avatar} alt="Foto de perfil"/>
                            ): (
                                <img src={editData.img} alt="Foto de perfil"/>
                            )}
                    </label>

                        <label htmlFor="curso">Nome do Curso</label>
                        <input type="text" 
                        id='curso'
                        placeholder='insira um nome para seu curso...'
                        value={editData.nomeDoCurso}
                        onChange={(e) => {
                            setEditData({...editData, nomeDoCurso: e.target.value})
                        }}
                        />

                        <label htmlFor="colegio">Nome do colegio</label>
                        <input type="text" 
                        id='colegio'
                        placeholder='insira o nome do colegio...'
                        value={editData.colegio}
                        onChange={(e) => {
                            setEditData({...editData, colegio: e.target.value})
                        }}
                        />

                        <label htmlFor="horas">Quantas horas de curso</label>
                        <input type="text" 
                        id='horas'
                        placeholder='insira a quantidade de horas'
                        value={editData.horas}
                        onChange={(e) => {
                            setEditData({...editData, horas: e.target.value})
                        }}
                        />

                        <label htmlFor="certificado">Link do certificado</label>
                        <input type="text" 
                        id='certificado'
                        placeholder='insira a quantidade de horas'
                        value={editData.certificado}
                        onChange={(e) => {
                            setEditData({...editData, certificado: e.target.value})
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
                                        hendleHabilidadde(e, index)
                                    }}
                                    />
                                    <button onClick={() => deleteHabilidade(index) }><AiOutlineDelete/></button>
                                </div>
                            )
                        })

                        }
                        

                        <div className='btn--edit'>
                        <button type='submit'>Salvar</button>
                        {edit !== "" && <button className='btn--dit_delete'  
                        onClick={()=>{
                            deleteCurso()
                        }}
                        >Delete</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}