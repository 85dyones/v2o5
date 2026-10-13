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
 * abaixo (`tests/ancoras.test.ts`).
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
    <div className="mt-6 rounded-2xl bg-vidro px-5 contorno">
      <dl className="grid gap-0">
        {linhas.map(([rotulo, valor]) => (
          <div key={rotulo} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-linha py-3 text-[0.9375rem] first:border-t-0">
            <dt className="text-secundario">{rotulo}</dt>
            <dd className="max-w-full break-all font-mono text-sm text-papel">{valor}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-linha py-3 text-sm leading-relaxed text-secundario">
        Só isto, guardado neste navegador até a aba fechar. Sai daqui apenas com o formulário do diagnóstico. As
        ferramentas de medição, quando ligadas, estão descritas na{" "}
        <Link href="/privacidade" className="link-sublinhado text-papel">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}

/** A seção inteira, para a página de rastreamento. */
export function OQueRegistramosSecao() {
  return (
    <section aria-labelledby="titulo-registro" className="border-t border-linha py-20 md:py-28">
      <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <p className="sobretitulo">Demonstração</p>
          <h2 id="titulo-registro" className="titulo-secao mt-5">
            O que este site registrou <span className="apagado">da sua visita.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[30rem]">
            É a origem que o formulário do diagnóstico manda junto com o lead. Chegue por um anúncio com utm ou gclid na
            URL e veja aparecer aqui.
          </p>
        </div>
        <div>
          <OQueRegistramos />
        </div>
      </div>
    </section>
  );
}
