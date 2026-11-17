"use client";

import { useEffect, useRef, useState } from "react";
import ConversaVisao, { type Mensagem } from "./ConversaVisao";
import { prefereMenosMovimento } from "@/lib/movimento";

/** A vara "digita" antes de responder; a pessoa responde mais rápido. */
const DIGITANDO_MS = 900;
const RESPOSTA_DA_PESSOA_MS = 800;
const LEITURA_MS = 1100;
/** Pausa com a conversa inteira na tela antes de recomeçar. */
const PAUSA_NO_FIM_MS = 5000;

/**
 * A triagem rodando na janela fixa: as mensagens entram uma a uma, a vara com
 * o aviso de digitação antes, e a janela rola sozinha até a última. Toca quando
 * a seção aparece, para quando ela sai e recomeça do início ao voltar. Com
 * menos movimento, a conversa aparece inteira, sem timer nem observador.
 */
export default function ConversaInterativa({
  legenda,
  mensagens,
  comecarZerado = false,
}: {
  legenda: string;
  mensagens: Mensagem[];
  comecarZerado?: boolean;
}) {
  const [visiveis, setVisiveis] = useState(() =>
    comecarZerado && !prefereMenosMovimento() ? 0 : mensagens.length,
  );
  const [digitando, setDigitando] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const janela = useRef<HTMLOListElement>(null);
  const timers = useRef<number[]>([]);

  // A janela acompanha a última mensagem, sem rolagem suave.
  useEffect(() => {
    const el = janela.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visiveis, digitando]);

  useEffect(() => {
    const el = raiz.current;
    if (!el || prefereMenosMovimento()) return;
    const limpar = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    const agendar = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

    const tocar = () => {
      limpar();
      setVisiveis(0);
      setDigitando(false);
      let t = 300;
      mensagens.forEach((m, i) => {
        if (m.de === "pessoa") {
          t += RESPOSTA_DA_PESSOA_MS;
        } else {
          agendar(() => setDigitando(true), t);
          t += DIGITANDO_MS;
        }
        agendar(() => {
          setDigitando(false);
          setVisiveis(i + 1);
        }, t);
        t += LEITURA_MS;
      });
      agendar(tocar, t + PAUSA_NO_FIM_MS);
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) tocar();
        else {
          limpar();
          setDigitando(false);
          setVisiveis(mensagens.length);
        }
      },
      { threshold: 0.35 },
    );
    observador.observe(el);
    return () => {
      observador.disconnect();
      limpar();
    };
  }, [mensagens]);

  return (
    <div ref={raiz}>
      <ConversaVisao legenda={legenda} mensagens={mensagens} visiveis={visiveis} digitando={digitando} janela={janela} />
    </div>
  );
}
