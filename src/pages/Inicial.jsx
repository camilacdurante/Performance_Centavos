import Rodape from '../components/Rodape.jsx'
import Audio from '../components/Audio.jsx'
import Logo from '../components/Logo.jsx'
import Instrucoes from '../components/Instrucoes.jsx'
import Jogar from '../components/Jogar.jsx'

function Inicial({ aoIniciar }){
    return(
        <>
        <div>
            <Logo tipo = {'inicial'}/>
            <h3 class="fraseEfeito" style={{fontStyle: 'italic', fontSize: 'medium'}}>Head, shoulders, coins e frações, na Performance de Centavos, testamos mil funções!</h3>
            <Audio src = {"/src/assets/musica.mp3"} autoplay={true} />
        </div>
        <Jogar aoClicar={aoIniciar}/>
        <div>
            <Instrucoes />
            <Rodape />
        </div>
        </>
    )
}
export default Inicial