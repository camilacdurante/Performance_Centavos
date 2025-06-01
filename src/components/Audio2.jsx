import { useState, useRef, useEffect } from 'react';

const Audio2 = ({ src, autoplay}) => { /** Componente que realiza a execução do audio */ 
  const audioRef = useRef(null);
  useEffect(() => { /** Efeito que garante que o audio seja reproduzido automaticamente */
    const tocar = async () => {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay bloqueado'); /** Caso o audio não seja reproduzido automaticamente, ele é mutado */
      }
    };
    tocar(); /** Chama a função que reproduz o audio */
  }, []);


    return(
        <>
        <audio ref={audioRef}>
            <source src={src} type="audio/mp3"/>
        </audio>
        </>
    )
}
export default Audio2
