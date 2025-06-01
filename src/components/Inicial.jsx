import Rodape from './Rodape.jsx'
import Audio from './Audio.jsx'
import Logo from './Logo.jsx'
import Instrucoes from './Instrucoes.jsx'
import Jogar from './Jogar.jsx'

function Inicial({iniciarJogo}){
    return(
        <>
        <div>
            <Logo />
            <h3 class="fraseEfeito">Head, shoulders, coins e frações, na Performance de Centavos, testamos mil funções!</h3>
            <Audio src = {"/src/assets/musica.mp3"} autoplay={true} />
        </div>
        <Jogar iniciarJogo={iniciarJogo}/>
        <div>
            <Instrucoes />
            <Rodape />
        </div>
        </>
    )
}
export default Inicial