import './projects.css'
import Boxproject from './Boxproject'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';






export default function Projects() {
  
  const [data, setData] = useState([])

  useEffect(()=> {
    async function buscarprojetos() {
  
      const projetosRef = collection(db, 'projetos');
  
      await getDocs(projetosRef).then((snapshot) => {
        let lista  = [];
        snapshot.forEach((doc)=> {
          lista.push({
            title1: doc.data().title1,
            title2: doc.data().title2,
            linkSite: doc.data().linkSite,
            imgProject: doc.data().imgProject,
            subtitle: doc.data().subtitle,
            linkGithub: doc.data().linkGithub,
            id: doc.id
  
          })
         })
        setData(lista)    
      })
    }
          buscarprojetos()
          console.log(data)
  
  
  }, [])
  
    return (
      <section className='projects' id='projetos'>
        <h2 className='projects__title'>Meus Projetos</h2>
        <div className='projects__carrossel-projects'>


     {data?.map(e => {

          return <Boxproject key={e.id} link={e.linkSite} img={e.imgProject} nome1={e.title1} nome2={e.title2} desc={e.subtitle} linkgithub={e.linkGithub}/>
        })} 

        </div>
      </section>
    )
  }


  