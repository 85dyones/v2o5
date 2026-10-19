"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CHAVE_DA_ORIGEM, origemDaVisita } from "@/lib/origem";
import type { Origem } from "@/lib/leads";

/**
 * O bloco da página de rastreamento que mostra ao visitante o que este site
 * registrou da visita dele (plano, seção 6.2): página de entrada, de onde
 * veio, campanha e clique de anúncio. É o mesmo dado que o formulário do
 * diagnóstico manda junto com o lead, e nada mais. Lê o sessionStorage por
 * `useSyncExternalStore`: no servidor desenha o mesmo cartão com a origem
 * vazia, para a altura não mudar na hidratação e empurrar as âncoras
 * abaixo (`tests/ancoras.test.ts`). A seção que o envolve mora em
 * `OQueRegistramosSecao.tsx`, do servidor.
 */

function assinar(aoMudar: () => void) {
  window.addEventListener("storage", aoMudar);
  return () => window.removeEventListener("storage", aoMudar);
}

function lerOrigem(): string {
  try {
    return sessionStorage.getItem(CHAVE_DA_ORIGEM) ?? JSON.stringify(origemDaVisita());
  } catch {
    return "{}";
  }
}

const CLIQUES = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

export default function OQueRegistramos() {
  const bruto = useSyncExternalStore(assinar, lerOrigem, () => "{}");
  const origem = JSON.parse(bruto) as Origem;
  const campanha = [origem.utm_source, origem.utm_medium, origem.utm_campaign].filter(Boolean).join(" / ");
  const clique = CLIQUES.find((c) => origem[c]);
  const linhas: [string, string][] = [
    ["Página de entrada", origem.entrada ?? "esta"],
    ["Veio de", origem.referrer ?? "acesso direto, ou sem referrer"],
    ["Campanha (utm)", campanha || "nenhuma"],
    ["Clique de anúncio", clique ? `sim (${clique})` : "não"],
  ];
  return (
    <div className="border-2 border-texto bg-fundo-cartao px-5">
      <dl className="grid gap-0">
        {linhas.map(([rotulo, valor]) => (
          <div key={rotulo} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-linha py-3 text-[0.9375rem] first:border-t-0">
            <dt className="rotulo self-center text-texto-secundario">{rotulo}</dt>
            <dd className="max-w-full break-all font-mono text-sm text-texto">{valor}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-linha py-3 text-sm leading-relaxed text-texto-secundario">
        Só isto, guardado neste navegador até a aba fechar. Sai daqui apenas com o formulário do diagnóstico. As
        ferramentas de medição, quando ligadas, estão descritas na{" "}
        <Link href="/privacidade" className="link-sublinhado text-texto">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
