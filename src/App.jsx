import { useState } from 'react'
import './App.css'
import Inicial from './pages/Inicial.jsx'
import Jogo from './pages/Jogo.jsx'

function App() { 
  const [tela, setTela] = useState('home'); // controla qual tela exibir

  const iniciarJogo = () => setTela('jogo');
  const voltarParaHome = () => setTela('home');

  return (
    <>
      {tela === 'home' && <Inicial aoIniciar={iniciarJogo} />}
      {tela === 'jogo' && <Jogo aoVoltar={voltarParaHome} />}
    </>
  );
}

export default App