/* eslint-disable react/jsx-no-target-blank */
import './redes.css'


export default function Redes() {


    return(
        <div className="redes" style={{fontSize:'20px'}}>
                <a href="https://api.whatsapp.com/send?phone=5522992347126" target="_blank" className="botao_inferior_pagina"><i className="bi bi-whatsapp"></i></a>
                    
                    <a href="mailto:Victor_mielke@outlook.com"><i className="bi bi-envelope-fill"></i></a>
                    
                    <a href="https://www.linkedin.com/in/victor-mielke/" target="_blank"><i className="bi bi-linkedin"></i></a>

                    <a href="https://www.instagram.com/victor_mielke31/" target="_blank"><i className="bi bi-instagram"></i></a>

                    <a href="https://github.com/vicemanu" target="_blank"><i className="bi bi-github"></i></a>
        </div>
    )
}