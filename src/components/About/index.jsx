/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react'
import Redes from '../Redes'
import myself from '../../assets/eu2.jpg'
import './about.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export default function About() {

  const [mostrarTela, setMostrarTela] = useState('')
  const [nTela, setNTela] = useState(0)
  const [data, setData] = useState([])



  useEffect(()=> {
    async function buscarprojetos() {
  
      const projetosRef = collection(db, 'text');
  
      await getDocs(projetosRef).then((snapshot) => {
        let lista  = [];
        snapshot.forEach((doc)=> {
          lista.push({
            text: doc.data().text
  
          })
         })
        setData(lista)
            
      })

      setMostrarTela(data[0]?.text)
    }
          buscarprojetos()

  
  }, [])

  const gerarTela = (n) => {

    if(n > 2) {
      setNTela(0)
      setMostrarTela(data[0]?.text)
    } else if(n < 0) {
      setNTela(2)
      setMostrarTela(data[2]?.text)
    } else {
      setNTela(n)
      setMostrarTela(data[n]?.text)
    }

  }


  return(
    <section className='about' id='about'>
        <h2 className='about--title'>Sobre mim</h2>
        <div className='about--container'>

        {/* Minha imagem e redes sociais */}

        <div className='about__container--box__about' style={{backgroundImage: `url(${myself})`}}>
          <div className='box__about--shadow'>

              <div className='box__about__shadow--redes'>
                  <Redes size= '1'/>
              </div>

              <div className='box__about__shadow--funcao'>
                    <p>Desenvolvedor Front-end</p>
                </div>
            
                <a className='box__about__shadow--curriculo' target='_blank' href="https://drive.google.com/file/d/1mvc4_WRYbF_IDsrGLOHLFIP2y504vgW3/view?usp=sharing">
              <i className="bi bi-filetype-pdf"></i>
            </a>
            <a className='box__about__shadow--projetos' href="#projetos">
              <i className="bi bi-archive-fill"></i>
            </a>
            </div>
          </div>

          {/* Conteudo sobre mim */}

          <div className='about__container--box__content'>
            <div className='box__content--text'>

            {/* Botões para trocar o texto */}
            <button className='box__content--btn__left' onClick={()=> {gerarTela(nTela - 1)}}><i className="bi bi-caret-left-fill"></i></button>
            <button className='box__content--btn__right' onClick={()=> {gerarTela(nTela + 1)}} ><i className="bi bi-caret-right-fill"></i></button> 

              {/* Texto */}
              <p className='box__content--title'>
                Olá meu nome é <strong>Victor Mielke</strong>
              </p>
              <p className='box__content--text' >
                {mostrarTela}
                
              </p>
              <div className='box__content--botoes'>
                <button onClick={()=> {gerarTela(0)}} className='bl1' style={{background: nTela == 0 ? 'white' : 'transparent'}}></button>
                <button onClick={()=> {gerarTela(1)}} className='bl2' style={{background: nTela == 1 ? 'white' : 'transparent'}}></button>
                <button onClick={()=> {gerarTela(2)}} className='bl3' style={{background: nTela == 2 ? 'white' : 'transparent'}}></button>
              </div>
            </div>
          </div>  




        </div>
    </section>
  )
  }