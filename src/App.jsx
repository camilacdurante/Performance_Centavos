import { useState } from 'react'
import './App.css'
import Inicial from './components/Inicial.jsx'
import Jogo from './components/Jogo.jsx'

function App() { 
    const [pagina, setPagina] = useState('home');

  return (
    <>
      {pagina === 'home' && <Inicial iniciarJogo={() => setPagina('jogo')} />}
      {pagina === 'jogo' && <Jogo />}
    </>
  )
}

export default App
