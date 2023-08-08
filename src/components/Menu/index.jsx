/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react'
import './menu.css'
//ajeitar menu

export default function Menu() {

    const [menu, setMenu] = useState(false)

    return(
        <header className='menu'>
            <div className="nav-mobile" style={{backgroundColor: menu ? 'black' :'transparent'}}>
            <nav className='nav-mobile__links' style={{display: menu ? 'block' :'none'}}>
                    <img src="./img/logo.png" alt="" />
                <div className='nav-mobile__socials'>
                    <a href="https://api.whatsapp.com/send?phone=5522992347126" target="_blank" className="botao_inferior_pagina"><i className="bi bi-whatsapp"></i></a>
                    
                    <a href="mailto:Victor_mielke@outlook.com"><i className="bi bi-envelope-fill"></i></a>
                    
                    <a href="https://www.linkedin.com/in/victor-mielke/" target="_blank"><i className="bi bi-linkedin"></i></a>

                    <a href="https://www.instagram.com/victor_mielke31/" target="_blank"><i className="bi bi-instagram"></i></a>

                    <a href="https://github.com/vicemanu" target="_blank"><i className="bi bi-github"></i></a>
                </div>
                <a href="#home" onClick={()=> {setMenu(false)}}>Home</a>
                <a href="#about" onClick={()=> {setMenu(false)}}>Sobre mim</a>
                <a href="#skills" onClick={()=> {setMenu(false)}}>Skills</a>
                <a href="#projetos" onClick={()=> {setMenu(false)}}>Projetos</a>
                <a href="#cursos" onClick={()=> {setMenu(false)}}>Cursos</a>
                <a href="#contact" onClick={()=> {setMenu(false)}}>Contate me</a>
                <a href="" onClick={()=> {setMenu(false)}}>Curriculo <i className="bi bi-box-arrow-up-right"></i></a>
            </nav>
            <button className='nav-mobile__button' style={{position: menu ?'absolute' :'relative', }} onClick={()=> {setMenu(!menu)}}>
                {menu ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>   }
            </button>
            
            
        </div>

        {/* Menu desktop */}

        <div className="nav-desktop">
            <nav className='nav-desktop__links'>
                    <img src="./img/logo.png" alt="" />
                <div className='nav-desktop__socials'>
                    <a href="https://api.whatsapp.com/send?phone=5522992347126" target="_blank" className="botao_inferior_pagina"><i className="bi bi-whatsapp"></i></a>
                    
                    <a href="mailto:Victor_mielke@outlook.com"><i className="bi bi-envelope-fill"></i></a>
                    
                    <a href="https://www.linkedin.com/in/victor-mielke/" target="_blank"><i className="bi bi-linkedin"></i></a>

                    <a href="https://www.instagram.com/victor_mielke31/" target="_blank"><i className="bi bi-instagram"></i></a>

                    <a href="https://github.com/vicemanu" target="_blank"><i className="bi bi-github"></i></a>
                </div>
                <a href="#home">Home</a>
                <a href="#about">Sobre mim</a>
                <a href="#skills">Skills</a>
                <a href="#projetos">Projetos</a>
                <a href="#cursos">Cursos</a>
                <a href="#contact">Contate me</a>
                <a href="https://drive.google.com/file/d/1mvc4_WRYbF_IDsrGLOHLFIP2y504vgW3/view?usp=sharing" target='_blank'>Curriculo <i className="bi bi-box-arrow-up-right"></i></a>
            </nav>
            
        </div>
        </header>
    )
}