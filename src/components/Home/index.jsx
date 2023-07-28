import './home.css'
import wallpaper from '../../assets/wallpaper-home1.jpg'
import myself from '../../assets/eu3.jpg'

export default function Home() {
    return(
        <header className='home' style={{background: `url(${wallpaper})`}}>
            <div className='home--shadow'>
                <div className='home--container'>
                    <div className='home__container--img'>
                        <img src={myself} alt="" />
                    </div>
                    <h1 className='home__container--h1'>Eu sou o Victor Emanuel Mielke</h1>
                    <h2 className='home__container--h2'><strong>Desenvolvedor Front-end</strong></h2>
                </div>
            </div>
        </header>
    )
}