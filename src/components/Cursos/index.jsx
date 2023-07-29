import { useRef } from 'react';
import Boxcurso from './Boxcurso';
import './cursos.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';



export default function Cursos() {

  const [data, setData] = useState([])

  useEffect(()=> {
    async function buscarprojetos() {
  
      const projetosRef = collection(db, 'cursos');
  
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


  const carrossel = useRef(null)


    const irParaDireita = ()=> {
        
        carrossel.current.scrollLeft += 300;
    }

    const irParaEsquerda = ()=> {

        carrossel.current.scrollLeft -= 300;
    }

  
    return (
      <section className='cursos' id='cursos'>
        <h2 className='cursos__title'>Cursos Feitos</h2>

        <button className='container-cursos__left' onClick={()=> {irParaEsquerda()}}><i className="bi bi-caret-left-fill"></i></button>
        <button className='container-cursos__right' onClick={()=> {irParaDireita()}} ><i className="bi bi-caret-right-fill"></i></button> 

          <div className='cursos__container-cursos' ref={carrossel}>
          {data?.map(e => {
            return <Boxcurso key={e.id} link={e.certificado} img={e.img}  name={e.nomeDoCurso} curso={e.colegio}/>
          })}

          </div>
      </section>
    )
  }
  