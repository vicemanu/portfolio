/* eslint-disable react/jsx-no-target-blank */
import './projects.css'
import Boxproject from './Boxproject'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import Githubsvg from './github.svg'



export default function Projects() {
  
  const [data, setData] = useState([])
  const [projetoTela, setProjetoTela] = useState(false)
  const [numProjetoTela, setNumProjetoTela] = useState()

  useEffect(()=> {
    async function buscarprojetos() {
  
      const projetosRef = collection(db, 'projetos');
  
      await getDocs(projetosRef).then((snapshot) => {
        let lista  = [];
        snapshot.forEach((doc)=> {
          lista.push({
            title1: doc.data().title1,
            title2: doc.data().title2,
            subtitle: doc.data().subtitle,
            linkSite: doc.data().linkSite,
            imgProject: doc.data().imgProject,
            linkGithub: doc.data().linkGithub,
            descricao: doc.data().descricao,
            ordem: doc.data().ordem,
            habilidades: doc.data().habilidades,
            id: doc.id
  
          })
         })
        setData(lista.sort((a, b) => a.ordem - b.ordem))    
      })
    }
          buscarprojetos()
          console.log(data)
  
  
  }, [])
  
    return (
      <section className='projects' id='projetos'>
        <h2 className='projects__title'>Meus Projetos</h2> 
        <div className='projects__carrossel-projects'>


        {data?.map((e, index) => {
          return <Boxproject key={e.id} link={e.linkSite} img={e.imgProject} nome1={e.title1} nome2={e.title2} desc={e.subtitle} linkgithub={e.linkGithub} setProjetoTela={setProjetoTela} setNumProjetoTela={setNumProjetoTela} index={index}/>
        })} 
        </div>
        {projetoTela && <div className='projetotela'>
            <div className='projetotela--box'>
            <button className='close' onClick={() => setProjetoTela(false)}><i className="bi bi-x"></i></button>
            <h3 className='projetotela__box--title'>{data[numProjetoTela]?.title1} {data[numProjetoTela]?.title2}</h3>
            <ul className='projetotela__box--habilidade__lista'>
              {data[numProjetoTela].habilidades.map((e, index) => {
                return(
                  <li key={index}>{e}</li>
                )
              })}
             </ul>
            <p className='projetotela__box--text'>{data[numProjetoTela]?.descricao}</p>
              <a className='projetotela__box--link' target="_blank" href={data[numProjetoTela]?.linkSite}>Ver Projeto <i className="bi bi-box-arrow-up-right"></i></a>
              <a className="github--projeto" target='_blank' href={data[numProjetoTela]?.linkGithub}><img src={Githubsvg} alt="" /></a>
            </div>
          </div>}
      </section>
    )
  }


  