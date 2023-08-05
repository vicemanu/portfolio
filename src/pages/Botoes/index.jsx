
import './botoes.css'
import { GiButtonFinger } from 'react-icons/gi'
import { FiUpload } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useEffect, useState } from 'react'
import { useRef } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

import Avatar from '../../assets/avatar.png'

export default function Botoes() {
        const [data, setData] = useState()
        const [edit, setEdit] = useState(false)
        const [editData, setEditData] = useState({title: "", nlv: "", text: "", srcImg: null})
        const [imageAvatar, setImageAvatar] = useState(null)


    useEffect(()=> {
        async function buscarbotoes() {

            const botoesRef = collection(db, 'botoes');
      
            await getDocs(botoesRef).then((snapshot) => {
              let lista  = [];
              snapshot.forEach((doc)=> {
                lista.push({
                  title: doc.data().title,
                  text: doc.data().text,
                  srcImg: doc.data().srcImg,
                  nvl: doc.data().nvl,
                  logImg: doc.data().logImg,
                  id: doc.id
      
                })
               })
              setData(lista)    
            })
          }
                buscarbotoes()
                console.log(data)
      
      
        }, [])

    const carrossel = useRef(null)

    const irParaDireita = ()=> {
        
        carrossel.current.scrollLeft += 300;
    }

    const irParaEsquerda = ()=> {

        carrossel.current.scrollLeft -= 300;
    }

    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];


            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setEditData({...setData, srcImg: URL.createObjectURL(image)})
            } else {
                alert("envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
            }
        }
    }


    async function handleEditBottons(e) {
        e.preventDefault();

        if(editData.title !== '' && editData.nlv !== '' && editData.text !== '' && editData.srcImg !== "") {

            if(edit) {
                



            } else {
                await updateDoc(doc(db,"text","I5pKDEIRPsFdAV6uDyrE"), data)
                .then(()=> {
                })
                .catch(error => {
                console.log(error)
                toast.error("Erro ao fazer cadastro")
                })
            }

            

        } else {
            toast.error("Preencha todos os campos!")
        }
    }


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Botões'>
                    <GiButtonFinger color='#000' size={24}/>
                </Title>
                
                <div className='container' ref={carrossel}>
                    <div className='container--bottons'>
                    <button className='container-bottons__left' onClick={()=> {irParaEsquerda()}}><i className="bi bi-caret-left-fill"></i></button>
                    <button className='container-bottons__right' onClick={()=> {irParaDireita()}} ><i className="bi bi-caret-right-fill"></i></button> 

                    {
                        data?.map(e => {
                            return <button key={e.id} className="container__bottons-btn"><img src={e.srcImg}/></button>
                        })
                    }
                    </div>
                </div>


                <div className="container">
                    <form className="form-profile" onSubmit={e => handleEditBottons(e)}>

                    <label className="label-avatar">
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

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}