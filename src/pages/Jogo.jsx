import Rodape from '../components/Rodape.jsx'
import Audio2 from '../components/Audio.jsx'
import Logo from '../components/Logo.jsx'
import Instrucoes from '../components/Instrucoes.jsx'
import { useEffect } from 'react';
import cu from '../assets/boaSorte.mp3'
import Caixinha from '../components/Caixinha.jsx'
import Questao from '../components/Questao.jsx'

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
      <Logo tipo = "jogo"/>
      <Questao>Esperando gerar pergunta</Questao>
      <Caixinha position = {"up"}>Cu</Caixinha>
      <Caixinha position = {"down"}>Cu</Caixinha>
      <Caixinha position = {"left"}>Cu</Caixinha>
      <Caixinha position = {"right"}>Cu</Caixinha>
      <p id="status" style={{position: 'absolute', top: '240px', fontSize: '18px', left: '50%', transform: 'translateX(-50%)'}}>Fale: up, down, left ou right</p>
      <div id="deuCerto" style={{position: 'absolute', top: '290px', left: '50%', transform: 'translateX(-50%)', height: '180px', width: '250px'}}></div>
      <Rodape />
    </div>
  );
}

export default Jogo