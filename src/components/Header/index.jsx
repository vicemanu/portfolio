import './header.css'

import { Link } from 'react-router-dom'
import { HiDocumentText } from 'react-icons/hi2'
import { GiButtonFinger, GiArrowScope } from 'react-icons/gi'
import { GoProjectSymlink } from 'react-icons/go'

export default function Header() {

    return(
        <div className='sidebar'>
            <div>
                <img src={'img/logo.png'} />
            </div>

            <Link to={"/admin"}>
            <HiDocumentText color='#FFF' size={24}/>
            Text
            </Link>

            <Link to={"/admin/botoes"}>
            <GiButtonFinger color='#FFF' size={24}/>
            Botões
            </Link>

            <Link to={"/admin/projeto"}>
            <GoProjectSymlink color='#FFF' size={24}/>
            Projeto
            </Link>

            <Link to={"/admin/cursos"}>
            <GiArrowScope color='#FFF' size={24}/>
            Cursos
            </Link>

        </div>
    )
}