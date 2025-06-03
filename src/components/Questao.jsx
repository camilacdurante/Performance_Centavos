import './Questao.css'

// Componente Questao
function Questao({children}){
    return(
        <>
        <div id="questao">{children}</div>
        </>
    )
}
export default Questao