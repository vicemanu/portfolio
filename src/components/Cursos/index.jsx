/* eslint-disable react/jsx-no-target-blank */
import { useRef } from 'react';
import Boxcurso from './Boxcurso';
import './cursos.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';



export default function Cursos() {

  const [data, setData] = useState([])
  const [cursoTela, setCursoTela] = useState(false)
  const [numCursoTela, setNumCursoTela] = useState()

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
            habilidades: doc.data().habilidades,
            horas: doc.data().horas,
            id: doc.id
  
          })
         })
        setData(lista.sort((a, b) => a.ordem - b.ordem))    
      })
    }
          buscarprojetos()
  
  
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
          {data?.map((e, index) => {
            return <Boxcurso key={e.id} data={e} index={index} setCursoTela={setCursoTela} setNumCursoTela={setNumCursoTela}  link={e.certificado} img={e.img}  name={e.nomeDoCurso} curso={e.colegio}/>
          })}
          </div>
          {cursoTela && <div className='cursotela'>
            <div className='cursotela--box'>
            <button className='close' onClick={() => setCursoTela(false)}><i className="bi bi-x"></i></button>
            <h3 className='cursotela__box--title'>{data[numCursoTela]?.nomeDoCurso} - {data[numCursoTela]?.horas}</h3>
            <h5 className='cursotela__box--escola'> {data[numCursoTela]?.colegio} </h5>
            <h4 className='cursotela__box--habilidade'>Habilidades aprendidas:</h4>

             <ul className='cursotela__box--habilidade__lista'>
              {data[numCursoTela].habilidades.map((e, index) => {
                return(
                  <li key={index}>{e}</li>
                )
              })}
             </ul>
            
              <a className='cursotela__box--link' target="_blank" href={data[numCursoTela]?.certificado}>Ver certificado <i className="bi bi-box-arrow-up-right"></i></a>
            </div>
          </div>}
      </section>
    )
  }
  