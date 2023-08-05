/* eslint-disable react/jsx-no-target-blank */
import './footer.css'
import Redes from '../Redes'
import { Link } from 'react-router-dom'

export default function Footer() {
  
    return (
      <footer className='footer' id='contact'>
       
       <div className="footer__container-footer" >
            <div className="container-footer__text-footer">
              <dl>
                <dt>Direitos Autorais Das Imagens</dt>
                  <dd><a href="https://storyset.com/work" target="_blank">Work illustrations by Storyset</a></dd>
                  <dd><a href="https://storyset.com/business" target="_blank">Business illustrations by Storyset</a></dd>
                <dd><a href="https://storyset.com/online" target="_blank">Online illustrations by Storyset</a></dd>
                  <dd><a href="https://br.freepik.com/vetores-gratis/equipe-de-marketing-digital-construindo-landing-page-ou-home-page-pessoas-minusculas-pintando-unidades-na-pagina-da-web-ilustracao-para-designers-de-sites-gerenciadores-de-conteudo-pagina-de-destino-do-conceito-de-promocao-na-internet_16344683.htm#query=desenvolvimento%20web&position=5&from_view=keyword" target="_blank">Image by pch.vector on Freepik</a> </dd>
                  <dd><a href="https://br.freepik.com/autor/upklyak" target="_blank">Image by upklyak on Freepik</a></dd>
                  <dd><a href="https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-selecao-de-ativos_10838252.htm">Image by storyset on Freepik</a></dd>
              </dl>
            </div>

            <div className="container-footer__redes-footer">
            <h4>Redes Sociais</h4>
            <div className="redes-footer__icons-redes">
                <Redes/>
            </div>

            </div>

            <div className="container-footer__img-footer">
            <img src="img/caracriandosite.png" alt="Desenho de um homem criando um site" />
            </div>
          </div>
            <p className='footer__copy'>Copyright 2022  © <Link to={"/admin"}>Victor Mielke</Link></p>
      </footer>
    )
  }
  