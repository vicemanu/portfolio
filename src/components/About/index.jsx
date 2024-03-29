/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react'
import Redes from '../Redes'
import myself from '../../assets/eu2.jpg'
import './about.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export default function About() {

  const [data, setData] = useState([])
  const [nTela, setNTela] = useState(0)



  useEffect(()=> {
    // chama do firebase o conteudo dos textos
    async function buscarprojetos() {
  
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
        setData(...lista)
      })
      // mostra na tela
    }
          buscarprojetos()
          

  
  }, [])

  const gerarTela = (n) => {
    // gerenciamento de codigo para fazer o codigo mostrar na tela
    if(n> 2) {
      setNTela(0)
    } else if(n < 0) {
      setNTela(2)
    } else {
      setNTela(n)
    }

  }

  function textoTela() {
    if(nTela === 0) {
      return <p>{data.text1}</p>
      } else if (nTela === 1) {
        return <p>{data.text2}</p>
      } else if (nTela === 2) {
        return <p>{data.text3}</p>
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
                {textoTela()}
                
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