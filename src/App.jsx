import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Rodape from './components/Rodape.jsx'
import Audio from './components/Audio.jsx'
import Logo from './components/Logo.jsx'
import Instrucoes from './components/Instrucoes.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Logo />
        <Audio src = {"/src/assets/musica.mp3"} autoplay={true} />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <Instrucoes />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Rodape />
    </>
  )
}

export default App
