
import './botoes.css'
import { GiButtonFinger } from 'react-icons/gi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useEffect, useState } from 'react'
import { useRef } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

export default function Botoes() {
        const [data, setData] = useState()
        const [editData, setEditData] = useState({title: "", nlv: "", text: "", srcImg: ""})
        const [imgBtn, setImgBtn] = useState()


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
        
        
        async function handleEditBottons(e) {
        e.preventDefault();

        if(data.text1 !== '' && data.text2 !== '' && data.text3 !== '') {
            await updateDoc(doc(db,"text","I5pKDEIRPsFdAV6uDyrE"), data)
            .then(()=> {
            })
            .catch(error => {
                console.log(error)
                toast.error("Erro ao fazer cadastro")
            })

        } else {
            toast.error("Preencha todos os campos!")
        }
    }

    const carrossel = useRef(null)

    const irParaDireita = ()=> {
        
        carrossel.current.scrollLeft += 300;
    }

    const irParaEsquerda = ()=> {

        carrossel.current.scrollLeft -= 300;
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

                        <label htmlFor="text1">Titulo</label>
                        <input type="text" 
                        id='text1'
                        placeholder='insira um titulo'
                        value={editData.title}
                        onChange={(e) => {
                            setEditData({...editData, title: e.target.value})
                        }}
                        />

                        <label htmlFor="text2">Texto 2</label>
                        <select 
                        value={editData.nlv}
                        onChange={(e) => {
                            setEditData({...editData, nlv: e.target.value})
                        }}
                        >
                            <option>iniciante</option>
                            <option>intermediario</option>
                            <option>avançado</option>
                        </select> 
                        
                        
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