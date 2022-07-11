import React, { Children } from "react"; 


export default function Parte1(props) {


    
    return (
        <div className="cx_inicio_home">
            <div className="txt_cx_inicio">
                <h1>Eae, eu sou</h1>
                <h2 >Victor Emanuel M. de S. Pereira</h2>
                <h3>Desenvolvedor front-end Junior</h3>

                <div className="redes_sociais">
                    <a href="https://www.linkedin.com/in/victor-mielke/" target="_blank"><i class="bi bi-linkedin"></i>Linkedin</a>
                    <a href="https://github.com/vicemanu" target="_blank"><i class="bi bi-github"></i>Github</a>
                    <a href="https://drive.google.com/file/d/16oiK3jgvlMXjhKHOOyRtujytIsVAXIz2/view" target="_blank"><i class="bi bi-filetype-pdf"></i>Currículo</a>
                    
                </div>
                {props.children}
            </div>
            <img src="img/eu.jpg"/>
        </div>
    )
}