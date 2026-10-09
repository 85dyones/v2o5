"use client";

import { useEffect } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

const ALVOS = ".cartao-luz, .botao";
const IMA_X = 6; // px, quanto o botão anda na direção do cursor
const IMA_Y = 4;

/**
 * A interface percebe o cursor: em cartões e botões, a luz interna vai para
 * onde ele está (`--luz-x`/`--luz-y`); nos botões, o próprio botão é puxado
 * alguns pixels na direção dele (`--ima-x`/`--ima-y`) e volta numa mola de
 * CSS ao sair. Um ouvinte só, no documento, no máximo uma escrita por
 * quadro. Só com mouse; com menos movimento, a luz ainda segue, o ímã não.
 */
export default function LuzDoCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const comIma = !prefereMenosMovimento();
    let quadro = 0;
    let ultimo: PointerEvent | null = null;
    let atual: HTMLElement | null = null;

    const soltar = (el: HTMLElement | null) => {
      el?.style.removeProperty("--ima-x");
      el?.style.removeProperty("--ima-y");
    };

    const aplicar = () => {
      quadro = 0;
      const e = ultimo;
      if (!e) return;
      const alvo = (e.target as Element | null)?.closest?.<HTMLElement>(ALVOS) ?? null;
      if (alvo !== atual) {
        soltar(atual);
        atual = alvo;
      }
      if (!alvo) return;
      const caixa = alvo.getBoundingClientRect();
      const x = e.clientX - caixa.left;
      const y = e.clientY - caixa.top;
      alvo.style.setProperty("--luz-x", `${x}px`);
      alvo.style.setProperty("--luz-y", `${y}px`);
      if (comIma && alvo.classList.contains("botao")) {
        const dx = (x / caixa.width - 0.5) * 2;
        const dy = (y / caixa.height - 0.5) * 2;
        alvo.style.setProperty("--ima-x", `${(dx * IMA_X).toFixed(2)}px`);
        alvo.style.setProperty("--ima-y", `${(dy * IMA_Y).toFixed(2)}px`);
      }
    };

    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ultimo = e;
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    };
    const aoSair = () => {
      soltar(atual);
      atual = null;
    };

    document.addEventListener("pointermove", aoMover, { passive: true });
    document.documentElement.addEventListener("pointerleave", aoSair);
    return () => {
      document.removeEventListener("pointermove", aoMover);
      document.documentElement.removeEventListener("pointerleave", aoSair);
      cancelAnimationFrame(quadro);
      soltar(atual);
    };
  }, []);

  return null;
}
