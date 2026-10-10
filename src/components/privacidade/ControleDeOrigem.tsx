"use client";

import { useCallback, useSyncExternalStore } from "react";
import { CHAVE_DA_ORIGEM } from "@/lib/origem";

/**
 * O controle de oposição da página de privacidade, no modelo da Motors: a
 * pessoa vê se há origem de visita guardada neste navegador e apaga na
 * hora. Hoje é o único dado que o site guarda antes do formulário; quando
 * entrarem as ferramentas de medição, o liga-desliga delas mora aqui.
 *
 * Lê o sessionStorage por `useSyncExternalStore`: no servidor e na
 * hidratação responde "carregando", e só no navegador diz o que há.
 */

const EVENTO = "v2o5-origem-mudou";

function lerEstado(): "com-origem" | "sem-origem" {
  try {
    const guardada = sessionStorage.getItem(CHAVE_DA_ORIGEM);
    const origem = guardada ? (JSON.parse(guardada) as Record<string, string>) : {};
    return Object.keys(origem).some((k) => k !== "entrada") ? "com-origem" : "sem-origem";
  } catch {
    return "sem-origem";
  }
}

function assinar(aoMudar: () => void) {
  window.addEventListener(EVENTO, aoMudar);
  window.addEventListener("storage", aoMudar);
  return () => {
    window.removeEventListener(EVENTO, aoMudar);
    window.removeEventListener("storage", aoMudar);
  };
}

export default function ControleDeOrigem() {
  const estado = useSyncExternalStore(assinar, lerEstado, () => "carregando" as const);

  const apagar = useCallback(() => {
    try {
      sessionStorage.removeItem(CHAVE_DA_ORIGEM);
    } catch {
      // Sem armazenamento não há o que apagar.
    }
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  if (estado === "carregando") return null;

  return (
    <div className="rounded-2xl bg-vidro p-5 contorno">
      <p className="font-semibold tracking-[-0.01em]">
        {estado === "com-origem"
          ? "Este navegador guarda a origem desta visita"
          : "Este navegador não guarda origem de campanha"}
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">
        {estado === "com-origem"
          ? "São os parâmetros do anúncio ou da campanha que trouxe você (utm, gclid, fbclid, referrer). Eles só saem daqui se você enviar o formulário do diagnóstico, e somem quando a aba fecha."
          : "Se você chegou por um anúncio, os parâmetros dele ficariam guardados só até a aba fechar, e só sairiam daqui com o formulário do diagnóstico."}
      </p>
      {estado === "com-origem" ? (
        <button type="button" onClick={apagar} className="botao botao-secundario botao-compacto mt-4">
          Apagar a origem guardada
        </button>
      ) : null}
    </div>
  );
}
