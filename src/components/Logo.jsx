import './Logo.css'

function Logo({tipo}){
    const Tipo = tipo === 'inicial' ? 'inicial' : 'jogo';
    return(
        <>
        <img class = {Tipo} src="/src/assets/logo.png" ></img>
        </>
    )
}

export default Logo