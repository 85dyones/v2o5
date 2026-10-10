"use client";

import { useEffect, useRef, useState } from "react";
import { aparelhoFraco, CONSULTA_MENOS_MOVIMENTO, prefereMenosMovimento, semCursor } from "@/lib/movimento";
import type { MotorDaMolecula3d } from "@/lib/molecula3d";
import type { MotorDasParticulas } from "@/lib/particulas";

/** Espera o `load` e um momento ocioso: o H1 já pintou e é o LCP. */
function depoisDaPrimeiraPintura(fn: () => void): () => void {
  let cancelado = false;
  let ocioso = 0;
  let espera = 0;
  // Safari não tem requestIdleCallback.
  const temOcioso = typeof window.requestIdleCallback === "function";
  const agendar = () => {
    if (cancelado) return;
    if (temOcioso) ocioso = window.requestIdleCallback(fn, { timeout: 1500 });
    else espera = window.setTimeout(fn, 200);
  };
  if (document.readyState === "complete") agendar();
  else window.addEventListener("load", agendar, { once: true });
  return () => {
    cancelado = true;
    window.removeEventListener("load", agendar);
    if (temOcioso) window.cancelIdleCallback(ocioso);
    window.clearTimeout(espera);
  };
}

/**
 * Os dois canvas do hero, por cima do palco em SVG de `PalcoDoHero`:
 * embaixo a molécula 3D (WebGL, `lib/molecula3d.ts`), em cima o fluxo de
 * partículas (`lib/particulas.ts`). O servidor entrega os canvas vazios; os
 * motores chegam por `import()` depois da primeira pintura e nunca chegam com
 * menos movimento. Quando a 3D pinta, a molécula do SVG some; sem WebGL 2,
 * ela fica e as partículas seguem com o sinal próprio.
 */
export default function HeroMolecula() {
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pronto, setPronto] = useState(false);
  const [pronto3d, setPronto3d] = useState(false);
  // `?diagnostico` na URL mostra por que a 3D roda ou não, nesta máquina.
  const [diagnostico, setDiagnostico] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas3d = canvas3dRef.current;
    const diagnosticar = new URLSearchParams(window.location.search).has("diagnostico");
    const anotar = (texto: string) => diagnosticar && setDiagnostico(texto);
    if (prefereMenosMovimento()) {
      anotar("3D desligado: o sistema pede menos movimento (no Windows, Configurações > Acessibilidade > Efeitos visuais > Efeitos de animação).");
      return;
    }
    if (!canvas || !canvas3d) return;
    let lerDiagnostico = 0;

    let motor: MotorDasParticulas | null = null;
    let motor3d: MotorDaMolecula3d | null = null;
    let encerrado = false;
    const hero = canvas.closest("section") ?? document.body;
    const gatilhos = Array.from(hero.querySelectorAll<HTMLElement>("[data-acende-molecula]"));
    const limpezas: (() => void)[] = [];

    const ouvir = <K extends keyof HTMLElementEventMap>(
      alvo: HTMLElement,
      evento: K,
      fn: (e: HTMLElementEventMap[K]) => void,
    ) => {
      alvo.addEventListener(evento, fn, { passive: true });
      limpezas.push(() => alvo.removeEventListener(evento, fn));
    };

    let cancelar3d = () => {};
    const cancelarEspera = depoisDaPrimeiraPintura(async () => {
      // Os dois pedaços descem juntos; o de partículas é esperado primeiro.
      const pedaco3d = import("@/lib/molecula3d");
      const { iniciarParticulas } = await import("@/lib/particulas");
      if (encerrado) return;
      const estatico = aparelhoFraco();
      const largura = canvas.getBoundingClientRect().width;

      // As partículas começam esperando o sinal da 3D; se ela não vier, elas
      // voltam ao sinal próprio.
      motor = iniciarParticulas(canvas, {
        quantidade: largura < 520 ? 90 : 170,
        estatico,
        sinalAutomatico: semCursor(),
        sinalExterno: true,
        aoPintar: () => setPronto(true),
      });

      // A 3D sobe em outra tarefa ociosa: criar o contexto WebGL custa, e
      // somado às partículas virava uma tarefa longa só.
      cancelar3d = depoisDaPrimeiraPintura(async () => {
        const { iniciarMolecula3d } = await pedaco3d;
        if (encerrado) return;
        motor3d = iniciarMolecula3d(canvas3d, {
          estatico,
          aoPintar: () => setPronto3d(true),
          aoSinal: () => motor?.disparar(),
          aoRecusar: (motivo) => anotar(`3D desligado: ${motivo}.`),
          aoFalhar: () => {
            setPronto3d(false);
            motor?.usarSinalProprio();
          },
        });
        if (!motor3d) motor?.usarSinalProprio();
        else if (diagnosticar) {
          const ler = () => {
            const d = motor3d?.diagnostico();
            if (!d) return;
            anotar(
              `3D: ${d.estado} · ${d.quadrosPorSegundo} quadros/s · ${d.pixels.toLocaleString("pt-BR")} px · escala ${d.escala.toFixed(2)}${estatico ? " · aparelho econômico (um quadro só)" : ""} · placa: ${d.placa}`,
            );
          };
          ler();
          lerDiagnostico = window.setInterval(ler, 1000);
        }
      });

      ouvir(hero, "pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const caixa = canvas.getBoundingClientRect();
        const x = e.clientX - caixa.left;
        const y = e.clientY - caixa.top;
        motor?.ponteiro(x, y);
        motor3d?.ponteiro(x, y);
      });
      ouvir(hero, "pointerleave", () => {
        motor?.ponteiro(null);
        motor3d?.ponteiro(null);
      });
      gatilhos.forEach((el, i) => {
        const id = `gatilho-${i}`;
        const acender = (fonte: string, ligado: boolean) => {
          motor?.acender(fonte, ligado);
          motor3d?.acender(fonte, ligado);
        };
        ouvir(el, "pointerenter", () => acender(id, true));
        ouvir(el, "pointerleave", () => acender(id, false));
        ouvir(el, "focus", () => acender(`${id}-foco`, true));
        ouvir(el, "blur", () => acender(`${id}-foco`, false));
      });
    });

    // Se a pessoa pedir menos movimento com a página aberta, volta ao SVG.
    const consulta = window.matchMedia(CONSULTA_MENOS_MOVIMENTO);
    const aoMudarPreferencia = () => {
      if (!consulta.matches) return;
      motor?.destruir();
      motor3d?.destruir();
      motor = null;
      motor3d = null;
      setPronto(false);
      setPronto3d(false);
    };
    consulta.addEventListener("change", aoMudarPreferencia);

    return () => {
      encerrado = true;
      window.clearInterval(lerDiagnostico);
      cancelarEspera();
      cancelar3d();
      consulta.removeEventListener("change", aoMudarPreferencia);
      limpezas.forEach((fn) => fn());
      motor?.destruir();
      motor3d?.destruir();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvas3dRef}
        aria-hidden="true"
        data-pronto={pronto3d ? "" : undefined}
        className="molecula-3d absolute inset-0 z-10 h-full w-full"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-pronto={pronto ? "" : undefined}
        className="molecula-canvas absolute inset-0 z-20 h-full w-full"
      />
      {diagnostico ? (
        <p
          role="status"
          className="fixed bottom-3 left-3 z-50 max-w-[24rem] rounded-xl bg-tinta/95 p-3 font-mono text-xs leading-relaxed text-papel contorno-forte"
        >
          {diagnostico}
        </p>
      ) : null}
    </>
  );
}
