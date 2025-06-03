import { useState } from 'react'
import './App.css'
import Inicial from './pages/Inicial.jsx'
import Jogo from './pages/Jogo.jsx'

function App() { 
  // Estado para controlar a tela atual
  const [tela, setTela] = useState('home');

  // Funções para trocar entre telas
  const iniciarJogo = () => setTela('jogo');
  const voltarParaHome = () => setTela('home');

  return (
    <>
      {/* Renderiza a tela inicial ou a tela do jogo com base no estado */}
      {tela === 'home' && <Inicial aoIniciar={iniciarJogo} />}
      {tela === 'jogo' && <Jogo aoVoltar={voltarParaHome} />}
    </>
  );
}

export default App