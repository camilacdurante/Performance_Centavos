import Rodape from '../components/Rodape.jsx'
import Audio2 from '../components/Audio.jsx'
import Logo from '../components/Logo.jsx'
import Instrucoes from '../components/Instrucoes.jsx'
import { useEffect } from 'react';
import cu from '../assets/boaSorte.mp3'

function Jogo({ aoVoltar }) {
    <Audio2 src = {'../assets/boaSorte.mp3'} />
  useEffect(() => {
    const timer = setTimeout(() => {
      aoVoltar(); // volta para a tela inicial
    }, 5000); // 5000 milissegundos = 5 segundos

    return () => clearTimeout(timer); // limpa o timer se o componente for desmontado
  }, [aoVoltar]);

  return (
    <div>
      <h2>Tela do jogo</h2>
      <p>Você será redirecionado para a tela inicial em 5 segundos...</p>
    </div>
  );
}

export default Jogo