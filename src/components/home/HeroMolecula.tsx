"use client";

import { useEffect, useRef, useState } from "react";
import { aparelhoFraco, CONSULTA_MENOS_MOVIMENTO, prefereMenosMovimento, semCursor } from "@/lib/movimento";
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
 * O canvas do fluxo do hero. O servidor entrega só o `<canvas>` vazio; o
 * palco que aparece até aqui é o SVG de `PalcoDoHero`, irmão deste
 * componente, que continua embaixo (a molécula é dele). O motor
 * (`lib/particulas.ts`) chega por `import()` depois da primeira pintura e
 * nunca chega com menos movimento.
 */
export default function HeroMolecula() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefereMenosMovimento()) return;

    let motor: MotorDasParticulas | null = null;
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

    const cancelarEspera = depoisDaPrimeiraPintura(async () => {
      const { iniciarParticulas } = await import("@/lib/particulas");
      if (encerrado) return;
      const largura = canvas.getBoundingClientRect().width;
      motor = iniciarParticulas(canvas, {
        quantidade: largura < 520 ? 90 : 170,
        estatico: aparelhoFraco(),
        sinalAutomatico: semCursor(),
        aoPintar: () => setPronto(true),
      });

      ouvir(hero, "pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const caixa = canvas.getBoundingClientRect();
        motor?.ponteiro(e.clientX - caixa.left, e.clientY - caixa.top);
      });
      ouvir(hero, "pointerleave", () => motor?.ponteiro(null));
      gatilhos.forEach((el, i) => {
        const id = `gatilho-${i}`;
        ouvir(el, "pointerenter", () => motor?.acender(id, true));
        ouvir(el, "pointerleave", () => motor?.acender(id, false));
        ouvir(el, "focus", () => motor?.acender(`${id}-foco`, true));
        ouvir(el, "blur", () => motor?.acender(`${id}-foco`, false));
      });
    });

    // Se a pessoa pedir menos movimento com a página aberta, volta ao SVG.
    const consulta = window.matchMedia(CONSULTA_MENOS_MOVIMENTO);
    const aoMudarPreferencia = () => {
      if (!consulta.matches) return;
      motor?.destruir();
      motor = null;
      setPronto(false);
    };
    consulta.addEventListener("change", aoMudarPreferencia);

    return () => {
      encerrado = true;
      cancelarEspera();
      consulta.removeEventListener("change", aoMudarPreferencia);
      limpezas.forEach((fn) => fn());
      motor?.destruir();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-pronto={pronto ? "" : undefined}
      className="molecula-canvas absolute inset-0 z-10 h-full w-full"
    />
  );
}
