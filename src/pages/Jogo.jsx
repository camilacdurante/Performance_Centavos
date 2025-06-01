import { useEffect, useState, useRef } from 'react';
import Rodape from '../components/Rodape.jsx';
import Audio2 from '../components/Audio.jsx';
import Logo from '../components/Logo.jsx';
import Instrucoes from '../components/Instrucoes.jsx';
import Caixinha from '../components/Caixinha.jsx';
import Questao from '../components/Questao.jsx';

function Jogo({ aoVoltar }) {
  const posicoes = ['up', 'down', 'left', 'right'];
  const [pergunta, setPergunta] = useState('');
  const [respostas, setRespostas] = useState({});
  const [posicaoCorreta, setPosicaoCorreta] = useState('');
  const [status, setStatus] = useState('Clique no botão para começar');
  const [mensagem, setMensagem] = useState('');
  const [microfoneAtivo, setMicrofoneAtivo] = useState(false);
  const reconhecedorRef = useRef(null);

  const gerarPergunta = () => {
    const operadores = ['+', '-', '×', '÷'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];
    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;
    let correta;

    switch (operador) {
      case '+': correta = n1 + n2; break;
      case '-': if (n2 > n1) [n1, n2] = [n2, n1]; correta = n1 - n2; break;
      case '×': correta = n1 * n2; break;
      case '÷': correta = n1; n1 = correta * n2; break;
    }

    const texto = `Quanto é ${n1} ${operador} ${n2}?`;
    setPergunta(texto);

    let incorretas = new Set();
    while (incorretas.size < 3) {
      let rand = Math.floor(Math.random() * 5) + 1;
      let alternativa = correta + (Math.random() > 0.5 ? rand : -rand);
      if (alternativa !== correta && alternativa >= 0) incorretas.add(alternativa);
    }

    const todas = [...incorretas];
    const idxCorreta = Math.floor(Math.random() * 4);
    todas.splice(idxCorreta, 0, correta);
    const novaPosicao = posicoes[idxCorreta];
    setPosicaoCorreta(novaPosicao);

    const novaResp = {};
    posicoes.forEach((pos, i) => novaResp[pos] = todas[i]);
    setRespostas(novaResp);
  };

  const iniciarReconhecimento = async () => {
    if (!window.speechCommands) {
      alert('speechCommands não está disponível. Verifique os scripts no index.html.');
      return;
    }

    const recognizer = window.speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();

    recognizer.listen(result => {
      const scores = result.scores;
      const labels = recognizer.wordLabels();
      const topIndex = scores.indexOf(Math.max(...scores));
      const comando = labels[topIndex];

      if (posicoes.includes(comando)) {
        setStatus(`Você disse: ${comando}`);

        if (comando === posicaoCorreta) {
          setMensagem('✅ Acertou! Próxima pergunta...');
          setMicrofoneAtivo(false);
          recognizer.stopListening();
          setTimeout(() => {
            setMensagem('');
            setStatus('Clique no botão para continuar');
            gerarPergunta();
          }, 1500);
        } else {
          setMensagem('❌ Errou! Fim de jogo.');
          setStatus('Jogo encerrado.');
          setMicrofoneAtivo(false);
          recognizer.stopListening();
          setTimeout(() => {
            aoVoltar(); // retorna à tela inicial
          }, 2000);
        }
      }
    }, {
      includeSpectrogram: false,
      probabilityThreshold: 0.75
    });

    reconhecedorRef.current = recognizer;
  };

  const ativarMicrofone = async () => {
    setStatus('Escutando...');
    setMicrofoneAtivo(true);

    if (!reconhecedorRef.current) {
      await iniciarReconhecimento();
    } else {
      reconhecedorRef.current.listen(result => {
        const scores = result.scores;
        const labels = reconhecedorRef.current.wordLabels();
        const topIndex = scores.indexOf(Math.max(...scores));
        const comando = labels[topIndex];

        if (posicoes.includes(comando)) {
          setStatus(`Você disse: ${comando}`);

          if (comando === posicaoCorreta) {
            setMensagem('✅ Acertou! Próxima pergunta...');
            setMicrofoneAtivo(false);
            reconhecedorRef.current.stopListening();
            setTimeout(() => {
              setMensagem('');
              setStatus('Clique no botão para continuar');
              gerarPergunta();
            }, 1500);
          } else {
            setMensagem('❌ Errou! Fim de jogo.');
            setStatus('Jogo encerrado.');
            setMicrofoneAtivo(false);
            reconhecedorRef.current.stopListening();
            setTimeout(() => {
              aoVoltar();
            }, 2000);
          }
        }
      }, {
        includeSpectrogram: false,
        probabilityThreshold: 0.75
      });
    }
  };

  useEffect(() => {
    gerarPergunta();
    return () => {
      if (reconhecedorRef.current) {
        reconhecedorRef.current.stopListening();
      }
    };
  }, []);

  return (
    <div>
      <Logo tipo="jogo" />
      <Questao>{pergunta}</Questao>
      <Caixinha position="up">{respostas.up}</Caixinha>
      <Caixinha position="down">{respostas.down}</Caixinha>
      <Caixinha position="left">{respostas.left}</Caixinha>
      <Caixinha position="right">{respostas.right}</Caixinha>

      <p style={{ position: 'absolute', top: '240px', fontSize: '18px', left: '50%', transform: 'translateX(-50%)' }}>
        {status}
      </p>

      <div style={{ position: 'absolute', top: '290px', left: '50%', transform: 'translateX(-50%)', height: '180px', width: '250px' }}>
        {mensagem}
      </div>
      <button onClick={ativarMicrofone} disabled={microfoneAtivo}
        style={{
          position: 'absolute',
          top: '450px',
          height: '30px',
          width: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          borderRadius: '50px',
          backgroundColor: '#861581',
          borderColor: '#360b3a',
          color: '#FDD94F',
          fontWeight:'bold',
          cursor: microfoneAtivo ? 'progress' : 'pointer'

        }}>Ativar Microfone</button>

      <Rodape />
    </div>
  );
}

export default Jogo;
