/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
import Githubsvg from './github.svg'

export default function Boxproject(props) {
  
    return (
        <div onClick={()=> {props.setProjetoTela(true); props.setNumProjetoTela(props.index)}} href={props.link} target='_blank' className='carrossel-projects_box-projects'>
        <img className='box-projects__img' src={props.img} alt="imagem projeto" />
        <h3>{props.nome1}<br/>{props.nome2}</h3>
        <p>{props.desc}</p>
        <a className="github" target='_blank' href={props.linkGithub}><img src={Githubsvg} alt="" /></a>
    </div>
      
    )
  }