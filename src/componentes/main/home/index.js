import React, { useState } from "react"; 
import Parte1 from './parte1.js'
import Parte2 from './parte2.js'
import Projetos from '../projetos/index.js'
import Habilidades from '../habilidades/index.js'
import Boxsection from '../projetos/boxsection.js'


const b1 = [
    { link:"https://vicemanu.github.io/30-Dias-desafioCss/",new:false, img:"img/desafiocss.jpg",github:'https://github.com/vicemanu/30-Dias-desafioCss', t1:"#30diasCss", t2:"Desafios de Css", t3:"30 desafios de Css3"}, 

    {link:"https://vicemanu.github.io/Metanoia.blog",new:false, img:"img/metanoia.jpg",github:'https://github.com/vicemanu/Metanoia.blog', t1:"Metanoia", t2:"Blog Cristão", t3:"Website focado em conteudo cristão"},

    {link:"https://vicemanu.github.io/portifolio-fotografia/",new:false, img:"img/portfotografia.jpg",github:'https://github.com/vicemanu/portifolio-fotografia', t1:"Portfolio de", t2:"Fotografia", t3:"Portfolio feito por mim para treinamento"},
    
]





export default function Home() {

    const [dis,setDis] = useState(false)


    return (
        <div className="home_tela">
        <div className="home_principal">
            <Parte1>
                <button style={{display: dis ? 'none' : 'block'}} onClick={()=> {setDis(!dis)}} class="bi bi-caret-down-fill"></button>
            </Parte1>
            
            <div style={{display: dis ? 'block' : 'none'}}>
            
            <Parte2/>
            
                <div className="home_habi">
                    <Habilidades/>
                </div>
                
                <div className="h1"><h1> Projetos</h1></div>
                 <div className="home_projetos">
                        {b1.map ((e,i)=> {
                            return <Boxsection key={i} link={e.link} github={e.github} new={e.new} img={e.img} txt1={e.t1} txt2={e.t2} txt3={e.t3}/>
                        })}
                </div>
                <footer>
                    <p>E-mail para contato: Victor_Mielke@outlook.com </p>
                    <p>&copy; Victor Mielke</p>
                </footer>
            
            </div>
            
        </div>
        </div>
    )
}