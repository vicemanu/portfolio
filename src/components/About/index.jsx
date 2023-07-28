/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react'
import Redes from '../Redes'
import myself from '../../assets/eu2.jpg'
import './about.css'

export default function About() {

  const [mostrarTela, setMostrarTela] = useState(1)


  const textoTela = () => {
    if(mostrarTela == 1) {
      ""
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
            <button className='box__content--btn__left' onClick={()=> {}}><i className="bi bi-caret-left-fill"></i></button>
            <button className='box__content--btn__right' onClick={()=> {}} ><i className="bi bi-caret-right-fill"></i></button> 

              {/* Texto */}
              <p className='box__content--title'>
                Olá meu nome é <strong>Victor Mielke</strong>
              </p>
              <p className='box__content--text' >
                {textoTela()}
                Eu não tenho experiência e nem sou o mestre da programação, mas tenho determinação e desejo me tornar melhor e crescer mais a cada dia, e garanto que vou ser util dentro da sua empresa.
              </p>
              <div className='box__content--botoes'>
                <button onClick={()=> {setMostrarTela(1)}} className='bl1' style={{background: mostrarTela == 1 ? 'white' : 'transparent'}}></button>
                <button onClick={()=> {setMostrarTela(2)}} className='bl2' style={{background: mostrarTela == 2 ? 'white' : 'transparent'}}></button>
                <button onClick={()=> {setMostrarTela(3)}} className='bl3' style={{background: mostrarTela == 3 ? 'white' : 'transparent'}}></button>
              </div>
            </div>
          </div>  




        </div>
    </section>
  )
  }