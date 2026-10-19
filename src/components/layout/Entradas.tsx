"use client";

import { useEffect } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/**
 * As entradas ao rolar, uma vez só (tese de interação de 19/10): cada trecho
 * da rota (`[data-entra]`) desce quando a sua seção entra na tela, e cada
 * bloco marcado (`[data-entra-bloco]`) sobe 12 px. O CSS faz o movimento;
 * aqui só se troca o estado.
 *
 * O servidor desenha tudo no lugar. Só o que está fora da tela no primeiro
 * aviso do IntersectionObserver vai para "espera" (ninguém vê sumir); o que
 * já está na tela fica parado. Com menos movimento, nada muda.
 */
export default function Entradas() {
  useEffect(() => {
    if (prefereMenosMovimento()) return;
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-entra], [data-entra-bloco]"));
    if (!alvos.length) return;

    const atributo = (el: Element) => (el.hasAttribute("data-entra") ? "data-entra" : "data-entra-bloco");
    const vistos = new WeakSet<Element>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const el = entrada.target;
          if (!vistos.has(el)) {
            vistos.add(el);
            if (entrada.isIntersecting) {
              observador.unobserve(el);
            } else {
              el.setAttribute(atributo(el), "espera");
            }
            continue;
          }
          if (!entrada.isIntersecting) continue;
          observador.unobserve(el);
          el.setAttribute(atributo(el), "vai");
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);
  return null;
}
