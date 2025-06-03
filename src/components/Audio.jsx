import { useState, useRef, useEffect } from 'react';

// Componente de áudio que reproduz um som quando chamado
const Audio = ({ src, autoplay}) => {
  const audioRef = useRef(null);
  // Garante que o áudio seja reproduzido automaticamente
  useEffect(() => {
    const tocar = async () => {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay bloqueado');
      }
    };
    // Toca o áudio
    tocar();
  }, []);

    return(
        <>
        <audio ref={audioRef} autoplay = {autoplay}>
            <source src={src} type="audio/mp3" preload="auto"/>
        </audio>
        </>
    )
}
export default Audio

