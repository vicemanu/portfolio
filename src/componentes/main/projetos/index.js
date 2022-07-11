
import React, {useState, useRef} from "react";
import Boxsection from './boxsection.js'




            

    
    
          

export default function Sobremim() {

    const carrossel = useRef(null)

    const b1 = [
        { link:"https://vicemanu.github.io/30-Dias-desafioCss/",new:false, img:"img/desafiocss.jpg",github:'https://github.com/vicemanu/30-Dias-desafioCss', t1:"#30diasCss", t2:"Desafios de Css", t3:"30 desafios de Css3"}, 

        {link:"https://vicemanu.github.io/Metanoia.blog",new:false, img:"img/metanoia.jpg",github:'https://github.com/vicemanu/Metanoia.blog', t1:"Metanoia", t2:"Blog Cristão", t3:"Website focado em conteudo cristão"},

        {link:"https://vicemanu.github.io/portifolio-fotografia/",new:false, img:"img/portfotografia.jpg",github:'https://github.com/vicemanu/portifolio-fotografia', t1:"Portfolio de", t2:"Fotografia", t3:"Portfolio feito por mim para treinamento"},

        {link:"",new:true, img:"img/embreve.jpg",github:'', t1:"Em Breve", t2:"Novo projeto", t3:"Estou trabalhando em um novo projeto"},
    ]



    const irParaDireita = ()=> {
        
        carrossel.current.scrollLeft += 380;
    }

    const irParaEsquerda = ()=> {

        carrossel.current.scrollLeft -= 380;
    }




    return (
        <section className="boxsection">
                <button onClick={()=> {irParaEsquerda()}} class="bi bi-caret-left-fill"></button>
                <button onClick={()=> {irParaDireita()}} class="bi bi-caret-right-fill"></button> 
                <div className="carrossel" ref={carrossel}>
                {b1.map ((e,i)=> {
                    return <Boxsection key={i} link={e.link} github={e.github} new={e.new} img={e.img} txt1={e.t1} txt2={e.t2} txt3={e.t3}/>
                })}
                </div>
                
        </section>
    )
}