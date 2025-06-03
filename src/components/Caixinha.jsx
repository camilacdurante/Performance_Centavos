import './Caixinha.css'

// Componente Caixinha que exibe as respostas
function Caixinha({position, children}){
    return(
        <>
        <div className={`resposta`} id={position}>{children}</div>
        </>
    )
}
export default Caixinha