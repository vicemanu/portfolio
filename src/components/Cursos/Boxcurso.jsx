export default function Boxcurso(props) {
    
      return (
              <a href={props.link} target="_blank" className='container-cursos__box-cursos'>
                    <img src={props.img} alt="" />
                  <h4>{props.name}</h4>
                  <p>{props.curso}</p>
                  <div className='box-cursos__hover-curso'>
                    <i class="bi bi-link-45deg"></i>
                    <p>Abrir link</p>
                  </div>
              </a>
              
      )
    }
    