import React, { useState } from "react"; 


    const botoesminigame = [
        {srcFrame: 'https://vicemanu.github.io/Games/forca/', srcImg:'img/games/forca06.png'},
        {srcFrame: 'https://vicemanu.github.io/Games/jogodavelha1/', srcImg:'img/games/jogodavelha.png'},
        {srcFrame: 'https://vicemanu.github.io/Games/pingpong2/', srcImg:'img/games/pingpong2.png'},
        {srcFrame: 'https://vicemanu.github.io/Games/pingpong/', srcImg:'img/games/pingpong1.png'},
    ]

export default function Minigames() {


        const [srcFrame, setSrcFrame] = useState('')

    const btns = botoesminigame.map(
        (e,i) => { return <button key={i} className="btn_habilidades" onClick={
            ()=>{
                setSrcFrame(e.srcFrame)
                
            } 

        }><img src={e.srcImg}/></button>}
    )

    const jogos = ()=> {
        if(srcFrame != '') {
            return 
        }
    }



    return (


        <div className="cx_minigames">
            <div className="cx_conteudoMg">
                <div className="caxinha_minigames">
                    {btns}
                </div>
                <iframe src={srcFrame}></iframe>
            </div>
        </div>
    )
}