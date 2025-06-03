import './Jogar.css'

// Componente botão Jogar
function Jogar({ aoClicar }) {
  const handleClick = () => {
    // Troca para a tela do jogo
    aoClicar();
  };

  return <button onClick={handleClick}>Jogar</button>;
}

export default Jogar;


