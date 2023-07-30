/* eslint-disable react/prop-types */
export default function Boxcurso(props) {
    
      return (
              <button onClick={() => {
                props.setCursoTela(true)
                props.setNumCursoTela(props.index)
                }
              } className='container-cursos__box-cursos'>
                    <img src={props.img} alt="" />
                  <h4>{props.name}</h4>
                  <p>{props.curso}</p>
                  <div className='box-cursos__hover-curso'>
                    <i className="bi bi-link-45deg"></i>
                    Abrir descrição
                  </div>
              </button>
              
      )
    }
    