import './home.css'
import wallpaper from '../../assets/wallpaper-home1.jpg'

export default function Home() {
    return(
        <header className='home' style={{background: `url(${wallpaper})`}}>
            <div className='home--shadow'></div>
        </header>
    )
}