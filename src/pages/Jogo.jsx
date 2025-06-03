import { useEffect, useState, useRef } from "react";
import Rodape from "../components/Rodape.jsx";
import Logo from "../components/Logo.jsx";
import Caixinha from "../components/Caixinha.jsx";
import Questao from "../components/Questao.jsx";

// Página do Jogo
function Jogo({ aoVoltar }) {
  // Estados para armazenar a pergunta, respostas, posição correta, status do jogo, mensagem e acertos
  const posicoes = ["up", "down", "left", "right"];
  const [pergunta, setPergunta] = useState("");
  const [respostas, setRespostas] = useState({});
  const [posicaoCorreta, setPosicaoCorreta] = useState("");
  const [status, setStatus] = useState("Clique no botão para começar");
  const [mensagem, setMensagem] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [microfoneAtivo, setMicrofoneAtivo] = useState(false);
  const reconhecedorRef = useRef(null);

  // Função para buscar uma nova pergunta do backend
  async function buscarPergunta() {
    try {
      const res = await fetch("http://localhost:8000/gerar_pergunta");
      const data = await res.json();
      setPergunta(data.pergunta);
      setRespostas(data.respostas);
      setPosicaoCorreta(data.posicaoCorreta);
      setAcertos(data.acertos);
      setMensagem("");
      setStatus("Clique no botão para começar");
    } catch (err) {
      console.error("Erro ao buscar pergunta:", err);
      setStatus("Erro ao carregar pergunta");
    }
  }

  // Função para validar a resposta falada no backend
  async function validarRespostaNoBack(comandoFalado) {
    try {
      const res = await fetch("http://localhost:8000/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comando: comandoFalado }),
      });
      const data = await res.json();
      return data.acertou;
    } catch (err) {
      console.error("Erro ao validar resposta no backend:", err);
      return false;
    }
  }
  // Função para iniciar o reconhecimento de voz
  const iniciarReconhecimento = async () => {
    if (!window.speechCommands) {
      alert("speechCommands não está disponível. Verifique os scripts no index.html.");
      return;
    }

    const recognizer = window.speechCommands.create("BROWSER_FFT");
    await recognizer.ensureModelLoaded();

    reconhecedorRef.current = recognizer;
  };

  // Função para ativar o microfone e iniciar o reconhecimento de voz
  const ativarMicrofone = async () => {
    setStatus("Escutando...");
    setMicrofoneAtivo(true);

    if (!reconhecedorRef.current) {
      await iniciarReconhecimento();
    }

    reconhecedorRef.current.listen(
      async (result) => {
        const scores = result.scores;
        const labels = reconhecedorRef.current.wordLabels();
        const topIndex = scores.indexOf(Math.max(...scores));
        const comando = labels[topIndex];

        // Verifica se o comando falado está entre as posições válidas
        if (posicoes.includes(comando)) {
          setStatus(`Você disse: ${comando}`);

          // Valida no back se a resposta está correta
          const acertou = await validarRespostaNoBack(comando);

          if (acertou) {
            setMensagem("✅ Acertou! Próxima pergunta...");
            setMicrofoneAtivo(false);
            reconhecedorRef.current.stopListening();
            setTimeout(() => {
              setMensagem("");
              setStatus("Clique no botão para continuar");
              buscarPergunta();
            }, 1500);
          } else {
            setMensagem("❌ Errou! Fim de jogo.");
            setStatus("Jogo encerrado.");
            setMicrofoneAtivo(false);
            reconhecedorRef.current.stopListening();
            setTimeout(() => {
              aoVoltar();
            }, 2000);
          }
        }
      },
      { includeSpectrogram: false, probabilityThreshold: 0.75 }
    );
  };

  // Efeito para buscar a pergunta inicial e configurar o reconhecedor de voz
  useEffect(() => {
    buscarPergunta();

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

      <p style={{
          position: "absolute",
          top: "240px",
          fontSize: "18px",
          left: "50%",
          transform: "translateX(-50%)",
        }}>{status}</p>

      <div style={{
            position: "absolute",
            top: "290px",
            left: "50%",
            transform: "translateX(-50%)",
            height: "180px",
            width: "250px",
        }}>{mensagem}
      </div>
      <p style={{
          position: "absolute",
          top: "430px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "16px",
          fontWeight: "bold",
        }}>Acertos: {acertos}</p>

      <button onClick={ativarMicrofone} disabled={microfoneAtivo}
        style={{
          position: "absolute",
          top: "450px",
          height: "30px",
          width: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "10px",
          borderRadius: "50px",
          backgroundColor: "#861581",
          borderColor: "#360b3a",
          color: "#FDD94F",
          fontWeight: "bold",
          cursor: microfoneAtivo ? "progress" : "pointer",
        }}>Ativar Microfone</button>

      <Rodape />
    </div>
  );
}

export default Jogo;