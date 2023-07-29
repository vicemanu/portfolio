import './portfolio.css'


import Menu from '../../components/Menu'
import Home from '../../components/Home'
import About from '../../components/About'
import Skill from '../../components/Skills'
import Projects from '../../components/Projects'
import Curso from '../../components/Cursos'
import Footer from '../../components/Footer'




export default function Portfolio() {
    return(
        <div className='portfolio'>
            <menu className='portfolio--menu'>
                <Menu/>
            </menu>
            <main className='portfolio--main'>
                <Home/>
                <About/>
                {/* <Skill/>
                <Projects/>
                <Curso/>
                <Footer/> */}
            </main>
        </div>
    )
}