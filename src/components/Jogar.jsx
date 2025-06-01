import './Jogar.css'
import Audio from './Audio.jsx'
import cu from '../assets/boaSorte.mp3'


/*function Jogar({iniciarJogo}){
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
export default Jogar*/
function Jogar({ aoClicar }) {
  const handleClick = () => {
    //const audio = new Audio(cu);
    
    //<Audio src = {cu} autoplay={false} />
    //audio.play().catch(e => console.warn('Erro ao tocar áudio:', e));
    aoClicar(); // troca para tela do jogo
  };

  return <button onClick={handleClick}>Jogar</button>;
}

export default Jogar;


