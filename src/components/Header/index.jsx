import './header.css'

import { Link } from 'react-router-dom'
import { HiDocumentText } from 'react-icons/hi2'
import { GiButtonFinger, GiArrowScope } from 'react-icons/gi'
import { GoProjectSymlink } from 'react-icons/go'
import img from '../../assets/logo.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export default function Header() {

    const { logout } = useContext(AuthContext)


    return(
        <div className='sidebar'>
            <div>
                <Link to={"/"}>
                    <img src={img} />
                </Link>
            </div>

            <Link to={"/admin"}>
            <HiDocumentText color='#FFF' size={24}/>
            Textos
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

            <button className='btn-logout' onClick={async() => {
                await logout()
            }}>
                Logout
            </button>
        </div>
    )
}