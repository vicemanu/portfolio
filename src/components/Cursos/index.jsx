import { useRef } from 'react';
import Boxcurso from './Boxcurso';
import './cursos.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';



export default function Cursos() {

  const [data, setData] = useState([])
  const [cursoTela, setCursoTela] = useState(false)

  useEffect(()=> {
    async function buscarprojetos() {
  
      const projetosRef = collection(db, 'cursos');
  
      await getDocs(projetosRef).then((snapshot) => {
        let lista  = [];
        snapshot.forEach((doc)=> {
          lista.push({
            nomeDoCurso: doc.data().nomeDoCurso,
            colegio: doc.data().colegio,
            certificado: doc.data().certificado,
            img: doc.data().img,
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
            return <Boxcurso key={e.id} setCursoTela={setCursoTela} link={e.certificado} img={e.img}  name={e.nomeDoCurso} curso={e.colegio}/>
          })}
          </div>
          {cursoTela && <div className='cursotela'>
            <div className='cursotela--box'>
            <button className='close' onClick={() => setCursoTela(false)}><i className="bi bi-x"></i></button>
            <h2>{data.nomeDoCurso}</h2>
            </div>
          </div>}
      </section>
    )
  }
  