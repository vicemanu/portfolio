import Menu from '../../components/Menu'
import Home from '../../components/Home'
import './portfolio.css'


export default function Portfolio() {
    return(
        <div className='portfolio'>
            <menu className='portfolio--menu'>
                <Menu/>
            </menu>
            <main className='portfolio--main'>
                <Home/>
            </main>
        </div>
    )
}