/* eslint-disable no-unused-vars */
import './skills.css'
import { useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Skills() {



  const [nome,setNome] = useState('')
  const [nivel , setNivel] = useState('')
  const [texto, setTexto] = useState('')
  const [imglog,setImg] = useState('img/aboutme/img8.svg')
  const [data, setData] = useState([])

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
            nlv: doc.data().nlv,
            logImg: doc.data().logImg,
            ordem: doc.data().ordem,
            id: doc.id

          })
         })
        setData(lista.sort((a, b) => a.ordem - b.ordem))    
      })
    }
          buscarbotoes()
          console.log(data)


  }, [])



  const mostrarHab = () => {

    if(nome != '') {
        return (
            <>
             <h3>{nome}</h3>
            <div className="box-info-skills__barra"> <div className={nivel}></div> </div>
            <p> {texto}</p>
            </>
        )
    } else {
        return <p>Click em um dos botões a baixo</p>
    }
  
  }

  
    return (
      <section className='skills' id='skills' >
        <h2 className='skills__title' >Skills</h2>
        <div className='skills__container-skills'>
          <div className="container-skills__box-img">
        <img src={imglog} alt="Imagem não carregada" />
        </div>
          <div className='container-skills__container-full-hab'>
          <div className='container-skills__box-info-skills'>
            {mostrarHab()}
          </div>

          {data.map((e)=>{
            return <button key={e.id} className="container-skills__buttom-skills" onClick={
              ()=>{
                setNome(e.title)
                setNivel(e.nlv)
                setTexto(e.text)
                return;
            } 
            
            }><img src={e.srcImg}/></button>
          })}
          
          </div>
        </div>
      </section>
    )
  }
  