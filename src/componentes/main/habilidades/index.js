import React,{useState} from "react";

const botoesHabilidade = [
    {nome:'React',texto:'É uma biblioteca JavaScript criado pelo facebook para a criação de interfaces de usuário. Eu usei react na construção desse projeto.',srcImg:"img/logos/logo192.png",nvl:1 },

    {nome:"Bootstrap", texto:"Framework que contém todos os tipos de templates baseados em HTML e CSS para várias funções e componentes. Usei alguns icons do bootstrap para facilitar a crontrução do portfolio", srcImg:"img/logos/bootstrap.png", nvl:1},

    {nome:"Css3", texto:"É a sigla para o termo em inglês Cascading Style Sheets que, traduzido para o português, significa Folha de Estilo em Cascatas. É usado para estilizar elementos escritos em uma linguagem de marcação como HTML.", srcImg:"img/logos/css3.png", nvl:3},

    {nome:"Git", texto:"É um sistema de controle de versão, ele é usado para salvar versões de atualização e recuperar backups caso seu projeto tenha uma falha.", srcImg:"img/logos/git.png", nvl:1},

    {nome:"Html5", texto:"Significa HiperText Markup Language, traduzindo ao português: Linguagem de Marcação de Hipertexto. Serve para inserir o conteúdo e estabelecer a estrutura básica de um website", srcImg:"img/logos/html5.png", nvl:3},

    {nome:"JavaScript", texto:"É uma linguagem de programação que você implementa itens complexos na pagina web", srcImg:"img/logos/javascript.png", nvl:2},

    {nome:"GitHub", texto:"É um  serviço de publicação e compartilhamento de códigos de programação, tambem podemos chamar de rede social para programadores por ter essa interatividade de troca de informações sobre programação.", srcImg:"img/logos/github.png", nvl:2},

]


export default function Habilidades () {


    const [nome,setNome] = useState('')
    const [nivel , setNivel] = useState('')
    const [texto, setTexto] = useState('')
    const [imgbtn,setImg] = useState('')

    

    


    const btns = botoesHabilidade.map(
        (e,i) => { return <button key={i} className="btn_habilidades" onClick={
            ()=>{
                setNome(e.nome)
                nivelHabilidade(e.nvl)
                setTexto(e.texto)
                setImg(e.srcImg)
                return
            } 

        }><img src={e.srcImg}/></button>}
    )



    const nivelHabilidade = (e) => {
        switch (e) {
            case 1:
                setNivel('iniciante')
                break
            case 2:
                setNivel('intermediario')
                break
            case 3:
                setNivel('avançado')
                break
            
        }
    

    }


    const mostrarHab = () => {

        if(nome != '') {
            return (
                <>
                 <h1>{nome}</h1>
                <div className="barra"> <div className={nivel}></div> </div>
                <p> {texto}</p>
                <img src={imgbtn}/>
                </>
            )
        } else {
            return <p>Click em uma habilidade</p>
        }

        
    }






    return (
        <div className="cx_habilidades">
            <div className="cx_conteudoHab">
            <h1>Minhas Habilidades</h1>
                <div className="cx_btn_habilidades">
                {btns}
                </div>
                <div className="boxinha">
                {mostrarHab()}
                </div>
            </div>
        </div>
    )
}