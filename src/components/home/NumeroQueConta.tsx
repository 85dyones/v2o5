"use client";

import { useEffect, useRef, useState } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/**
 * Número que conta de zero até o valor quando entra na tela (molde da
 * Motors). O servidor desenha o valor FINAL: quem não roda JavaScript, o
 * buscador e quem pediu menos movimento leem o número certo.
 *
 * Só conta se o primeiro aviso do IntersectionObserver disser que o número
 * está fora da tela: aí zerar não aparece para ninguém. Já visível, fica
 * parado no valor. (Sem `getBoundingClientRect` na hidratação: a seção pode
 * estar com `content-visibility: auto`, e medir forçaria o layout dela.)
 */
export default function NumeroQueConta({ valor, duracao = 1100 }: { valor: number; duracao?: number }) {
  const [mostrado, setMostrado] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;

    let quadro = 0;
    let primeiroAviso = true;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (primeiroAviso) {
          primeiroAviso = false;
          // Já na tela: não conta, para não piscar o valor.
          if (entrada.isIntersecting) return observador.disconnect();
          setMostrado(0);
          return;
        }
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        let inicio: number | null = null;
        const passo = (t: number) => {
          inicio ??= t;
          const p = Math.min(1, (t - inicio) / duracao);
          if (p < 1) {
            setMostrado(Math.round(valor * (1 - Math.pow(1 - p, 3))));
            quadro = requestAnimationFrame(passo);
          } else {
            setMostrado(null);
          }
        };
        quadro = requestAnimationFrame(passo);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observador.observe(el);
    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
    };
  }, [valor, duracao]);

  return (
    <span ref={ref} className="tabular-nums">
      {mostrado ?? valor}
    </span>
  );
}
