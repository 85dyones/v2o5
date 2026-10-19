"use client";

import { useEffect } from "react";

/**
 * Esconde o botão fixo de WhatsApp enquanto o botão principal da abertura
 * está na tela, para ele não tapar o preço nem a promessa da primeira tela
 * (Dyones, 19/10). Sem JavaScript, ou numa página sem botão principal, o
 * botão fixo fica sempre à mostra, como antes. A transição é do CSS, que as
 * durações zeradas desligam com menos movimento.
 */
export default function EsconderNaAbertura() {
  useEffect(() => {
    const fixo = document.querySelector<HTMLElement>('[data-local="botao-fixo"]');
    const principal = document.querySelector("main .botao-primario");
    if (!fixo || !principal || !("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver(([e]) => {
      // Saiu por cima (já rolou além dele) ou nunca esteve na tela: mostra.
      fixo.toggleAttribute("data-escondido", e.isIntersecting);
    });
    observador.observe(principal);
    return () => {
      observador.disconnect();
      fixo.removeAttribute("data-escondido");
    };
  }, []);
  return null;
}
