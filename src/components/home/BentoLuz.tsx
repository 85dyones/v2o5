"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Leva a luz da borda do cartão para onde está o cursor: escreve
 * `--luz-x`/`--luz-y` no cartão sob o ponteiro, no máximo uma vez por quadro.
 * Sem cursor (toque) ou sem JavaScript, a luz fica no canto de cima e só
 * aparece com foco. Não é movimento autônomo: segue a mão da pessoa.
 */
export default function BentoLuz({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grade = ref.current;
    if (!grade || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let quadro = 0;
    const aoMover = (e: PointerEvent) => {
      const cartao = (e.target as HTMLElement).closest<HTMLElement>(".cartao-luz");
      if (!cartao || quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        const caixa = cartao.getBoundingClientRect();
        cartao.style.setProperty("--luz-x", `${e.clientX - caixa.left}px`);
        cartao.style.setProperty("--luz-y", `${e.clientY - caixa.top}px`);
      });
    };
    grade.addEventListener("pointermove", aoMover, { passive: true });
    return () => {
      grade.removeEventListener("pointermove", aoMover);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
