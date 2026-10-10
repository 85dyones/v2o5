import type { KeyboardEvent } from "react";
import Icone, { type NomeDoIcone } from "@/components/Icone";
import { FRENTES, NOME_DA_ETAPA, type CartaoDoCrm, type Passo } from "@/conteudo/home";
import { ETAPAS, type Etapa } from "@/lib/tokens";

/**
 * A apresentação do orquestrador, sem estado nem efeito. O servidor a
 * renderiza no estado final (HTML completo, zero JavaScript); a versão
 * interativa, carregada perto da tela, usa este mesmo componente e só troca o
 * estado. Por isso a troca não mexe no layout: passo oculto é só opacidade.
 */

export interface EstadoDoOrquestrador {
  ativa: number;
  visiveis: number;
  crmPronto: boolean;
}

export function estadoFinal(ativa = 0): EstadoDoOrquestrador {
  return { ativa, visiveis: FRENTES[ativa].passos.length, crmPronto: true };
}

const FUNDO_DA_ETAPA: Record<Etapa, string> = {
  violeta: "bg-violeta text-papel",
  verde: "bg-verde text-papel",
  azul: "bg-azul text-papel",
  ambar: "bg-ambar text-tinta",
};

const ICONE_DA_ETAPA: Record<Etapa, { icone: NomeDoIcone; classe: string }> = {
  violeta: { icone: "alvo", classe: "bg-violeta/25 text-violeta-claro" },
  verde: { icone: "brilho", classe: "bg-verde/30 text-verde-claro" },
  azul: { icone: "fluxo", classe: "bg-azul/30 text-azul-claro" },
  ambar: { icone: "sinal", classe: "bg-ambar/20 text-ambar" },
};

const COR_DO_PONTO: Record<Etapa, string> = {
  violeta: "bg-violeta-claro",
  verde: "bg-verde-claro",
  azul: "bg-azul-claro",
  ambar: "bg-ambar",
};

export default function OrquestradorVisao({
  estado,
  aoEscolher,
  aoTeclarAba,
  aoRepetir,
}: {
  estado: EstadoDoOrquestrador;
  aoEscolher?: (indice: number) => void;
  aoTeclarAba?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  aoRepetir?: () => void;
}) {
  const frente = FRENTES[estado.ativa];
  return (
    <div className="janela">
      <div className="janela-barra flex-wrap justify-between py-2">
        <div
          role="tablist"
          aria-label="Frentes da demonstração"
          className="grid w-full grid-cols-3 gap-1 rounded-full bg-vidro p-1 contorno sm:flex sm:w-fit"
        >
          {FRENTES.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              id={`aba-${f.id}`}
              aria-selected={i === estado.ativa}
              aria-controls="painel-orquestrador"
              tabIndex={i === estado.ativa ? 0 : -1}
              onClick={aoEscolher ? () => aoEscolher(i) : undefined}
              onKeyDown={aoTeclarAba}
              className="min-h-10 rounded-full px-3 text-[0.8125rem] font-medium leading-tight text-secundario transition-colors duration-150 hover:text-papel aria-selected:bg-grafite aria-selected:text-papel aria-selected:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_1px_2px_rgb(0_0_0/0.4)] sm:px-4 sm:text-sm"
            >
              {f.aba}
            </button>
          ))}
        </div>
        {aoRepetir ? (
          <button
            type="button"
            onClick={aoRepetir}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-secundario transition-colors duration-150 hover:bg-vidro hover:text-papel"
          >
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10a6 6 0 1 0 1.76-4.24L4 7.5M4 4v3.5h3.5" />
            </svg>
            Repetir a demonstração
          </button>
        ) : null}
      </div>

      <div
        role="tabpanel"
        id="painel-orquestrador"
        aria-labelledby={`aba-${frente.id}`}
        className="grid lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="p-5 md:p-7">
          <p className="max-w-[34rem] text-[0.9375rem] text-secundario">{frente.resumo}</p>
          <ol className="mt-6 grid gap-3.5">
            {frente.passos.map((passo, i) => (
              <li key={`${frente.id}-${i}`} className="passo" data-oculto={i >= estado.visiveis ? "" : undefined}>
                <PassoVisao passo={passo} />
              </li>
            ))}
          </ol>
        </div>
        <CartaoCrmVisao cartao={frente.crm} pronto={estado.crmPronto} />
      </div>
    </div>
  );
}

function PassoVisao({ passo }: { passo: Passo }) {
  if (passo.tipo === "sistema") {
    const { icone, classe } = ICONE_DA_ETAPA[passo.etapa];
    return (
      <div className="flex gap-3 rounded-xl bg-vidro px-3.5 py-3 contorno">
        <span aria-hidden="true" className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${classe}`}>
          <Icone nome={icone} className="size-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-medium leading-snug">{passo.titulo}</p>
          <ul className="mt-1 grid gap-0.5 text-sm text-secundario">
            {passo.detalhes.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  const saida = passo.tipo === "saida";
  return (
    <div className={saida ? "ml-auto max-w-[86%] text-right" : "max-w-[86%]"}>
      <p className="text-xs text-secundario">
        <span className="font-medium text-papel">{passo.autor}</span>{" "}
        <span className="tabular-nums">{passo.hora}</span>
      </p>
      <p
        className={`mt-1.5 rounded-2xl px-4 py-2.5 text-left text-[0.9375rem] leading-snug ${
          saida ? "rounded-br-md bg-verde text-papel" : "rounded-bl-md bg-grafite"
        }`}
      >
        {passo.texto}
      </p>
    </div>
  );
}

function CartaoCrmVisao({ cartao, pronto }: { cartao: CartaoDoCrm; pronto: boolean }) {
  const ate = ETAPAS.indexOf(cartao.etapa);
  return (
    <div
      data-pronto={pronto ? "" : undefined}
      className="cartao-crm border-t border-linha bg-[rgb(242_241_236/0.015)] p-5 md:p-7 lg:border-l lg:border-t-0"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-secundario">
          <Icone nome="colunas" className="size-4" />
          Card no CRM
        </p>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pronto ? FUNDO_DA_ETAPA[cartao.etapa] : "bg-grafite text-secundario"}`}
        >
          {pronto ? cartao.etiqueta : "Aguardando"}
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{cartao.titulo}</p>

      <ol aria-label="Etapa do funil" className="mt-5 grid grid-cols-4 gap-1.5">
        {ETAPAS.map((e, i) => {
          const feita = pronto && i <= ate;
          return (
            <li key={e} className="grid gap-1.5">
              <span className={`h-1 rounded-full ${feita ? COR_DO_PONTO[e] : "bg-grafite"}`} />
              <span className={`text-[0.6875rem] ${feita ? "text-papel" : "text-secundario"}`}>{NOME_DA_ETAPA[e]}</span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-6 grid gap-0">
        {cartao.campos.map((c) => (
          <div key={c.rotulo} className="flex justify-between gap-4 border-t border-linha py-3 text-sm">
            <dt className="text-secundario">{c.rotulo}</dt>
            <dd className={`text-right font-medium ${pronto ? "" : "text-secundario"}`}>{pronto ? c.valor : "…"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
