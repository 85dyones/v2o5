"use client";

import { useEffect } from "react";

export const URL_DA_GEIST_MONO = "/fonts/geist-mono-latin.woff2";

/**
 * Carrega a Geist Mono depois do `load` (ver `app/fontes.ts`). São 34 KB que
 * deixam de disputar banda com o H1; os rótulos e números que a usam ficam
 * abaixo da dobra e, até aqui, aparecem na monoespaçada do sistema.
 */
export default function FonteMonoTardia() {
  useEffect(() => {
    const carregar = () => {
      const fonte = new FontFace("Geist Mono", `url(${URL_DA_GEIST_MONO}) format("woff2")`, {
        weight: "100 900",
        display: "swap",
      });
      fonte
        .load()
        .then((f) => document.fonts.add(f))
        .catch(() => {});
    };
    if (document.readyState === "complete") carregar();
    else window.addEventListener("load", carregar, { once: true });
    return () => window.removeEventListener("load", carregar);
  }, []);
  return null;
}
