import './Jogar.css'
import Audio from './Audio.jsx'


function Jogar({iniciarJogo}){
    const comecar = () => {
        <Audio src = {"/src/assets/boaSorte.mp3"} autoplay={false} />
        const audio = new Audio(musica);
        audio.play().catch((err) => console.warn('Erro ao tocar áudio:', err));
        iniciarJogo(); // Chama função passada por props para trocar a "página"
    };

    return(
        <>
        <button onClick={comecar}>Jogar</button>
        </>
    )
}
export default Jogar
