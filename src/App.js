import React, {useState} from 'react';

import Sobremim from './componentes/main/sobremim'
import Projetos from './componentes/main/projetos'
import Habilidades from './componentes/main/habilidades'
import Minigames from './componentes/main/minigames';
import Home from './componentes/main/home';



//Css

import './componentes/css/index.css'
import './componentes/css/sobremim.css'
import './componentes/css/projetos.css'
import './componentes/css/habilidades.css'
import './componentes/css/minigames.css'
import './componentes/css/home.css'
import './componentes/css/responsividade.css'







export default function App() {

    const [nv,setPagina] = useState('home')


    const retornaPagina = ()=> {
      if(nv == 'sobremim') {
        return <Sobremim/>
      } else if (nv == 'projetos') {
        return <Projetos/>
      } else if (nv == 'habilidades') {
        return <Habilidades/>
      } else if (nv == 'minigames') {
        return <Minigames/>
      } else if(nv == 'home'){
        return <Home/>
      }
    }

  return (

    // Menu
      <div className='tela'>
          <section className="header">
              <div className="cx_header"><img className="logo" src="img/logo.png" onClick={()=>{setPagina('home')}}/></div>
              <button onClick={()=>{setPagina('sobremim')}}>Sobre mim</button>
              <button onClick={()=>{setPagina('habilidades')}}>Habilidades  </button>
              <button onClick={()=>{setPagina('projetos')}}>Projetos</button>
              <button onClick={()=>{setPagina('minigames')}}><i class="bi bi-controller"></i> Mini Games <i class="bi bi-controller"></i></button>
          </section>
          <div className="box_vazio"></div>
{/* --------------------------------------- */}
{/* Páginas do site */}
          {retornaPagina()}
      </div>
  );
}


