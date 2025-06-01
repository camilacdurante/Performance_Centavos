import './Caixinha.css'

function Caixinha({position, children}){
    return(
        <>
        <div className={`resposta`} id={position}>{children}</div>
        </>
    )
}
export default Caixinha