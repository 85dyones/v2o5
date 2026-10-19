import type { CSSProperties, KeyboardEvent } from "react";
import { COR_DA_ROTA } from "@/components/rota/Rota";
import Icone, { type NomeDoIcone } from "@/components/Icone";
import { FRENTES, NOME_DA_ETAPA, type CartaoDoCrm, type Passo } from "@/conteudo/home";
import { ETAPAS, type Etapa } from "@/lib/tokens";

/**
 * A apresentação do orquestrador, sem estado nem efeito. O servidor a
 * renderiza no estado final (HTML completo, zero JavaScript); a versão
 * interativa, carregada perto da tela, usa este mesmo componente e só troca o
 * estado. Por isso a troca não mexe no layout: passo oculto é só opacidade e
 * o botão de repetir já está no HTML, desligado.
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
  violeta: "bg-etapa-atracao text-fundo",
  verde: "bg-etapa-atendimento text-fundo",
  azul: "bg-etapa-crm text-fundo",
  ambar: "bg-acao text-texto",
};

const ICONE_DA_ETAPA: Record<Etapa, { icone: NomeDoIcone; classe: string }> = {
  violeta: { icone: "alvo", classe: "bg-etapa-atracao/25 text-etapa-atracao" },
  verde: { icone: "brilho", classe: "bg-etapa-atendimento/30 text-etapa-atendimento" },
  azul: { icone: "fluxo", classe: "bg-etapa-crm/30 text-etapa-crm" },
  ambar: { icone: "sinal", classe: "bg-acao/20 text-acao-texto" },
};

const COR_DO_PONTO: Record<Etapa, string> = {
  violeta: "bg-etapa-atracao",
  verde: "bg-etapa-atendimento",
  azul: "bg-etapa-crm",
  ambar: "bg-acao",
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
          className="grid w-full grid-cols-3 sm:flex sm:w-fit"
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
              className="min-h-11 border-b-2 border-transparent px-3 text-[0.8125rem] font-medium leading-tight text-texto-secundario transition-colors hover:text-texto aria-selected:border-texto aria-selected:text-texto sm:px-4 sm:text-sm"
            >
              {f.aba}
            </button>
          ))}
        </div>
        {/* Sempre no HTML, desligado até a versão interativa chegar: no celular ele
            cai numa segunda linha, e aparecer só depois empurrava a página 52px
            (medido em 12/10, âncora #como-se-liga). */}
        <button
          type="button"
          onClick={aoRepetir}
          disabled={!aoRepetir}
          className="inline-flex min-h-10 items-center gap-2 px-3 text-sm text-texto-secundario transition-colors hover:bg-fundo-cartao hover:text-texto disabled:opacity-60 disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10a6 6 0 1 0 1.76-4.24L4 7.5M4 4v3.5h3.5" />
          </svg>
          Repetir a demonstração
        </button>
      </div>

      <div
        role="tabpanel"
        id="painel-orquestrador"
        aria-labelledby={`aba-${frente.id}`}
        className="grid lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="p-5 md:p-7">
          <p className="max-w-[34rem] text-[0.9375rem] text-texto-secundario">{frente.resumo}</p>
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
      <div className="flex gap-3 border-l-4 border-(--cor-do-passo) bg-fundo px-3.5 py-3 contorno" style={{ "--cor-do-passo": COR_DA_ROTA[passo.etapa] } as CSSProperties}>
        <span aria-hidden="true" className={`flex size-7 shrink-0 items-center justify-center ${classe}`}>
          <Icone nome={icone} className="size-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-medium leading-snug">{passo.titulo}</p>
          <ul className="mt-1 grid gap-0.5 text-sm text-texto-secundario">
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
      <p className="text-xs text-texto-secundario">
        <span className="font-medium text-texto">{passo.autor}</span>{" "}
        <span className="tabular-nums">{passo.hora}</span>
      </p>
      <p
        className={`mt-1.5 px-4 py-2.5 text-left text-[0.9375rem] leading-snug ${
          saida ? "bg-etapa-atendimento text-fundo" : "bg-fundo-alternado"
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
      className="cartao-crm border-t border-linha bg-fundo p-5 md:p-7 lg:border-l lg:border-t-0"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-texto-secundario">
          <Icone nome="colunas" className="size-4" />
          Card no CRM
        </p>
        <span
          className={`px-2.5 py-1 text-xs font-semibold ${pronto ? FUNDO_DA_ETAPA[cartao.etapa] : "bg-fundo-alternado text-texto-secundario"}`}
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
              <span className={`h-1 ${feita ? COR_DO_PONTO[e] : "bg-fundo-alternado"}`} />
              <span className={`text-[0.6875rem] ${feita ? "text-texto" : "text-texto-secundario"}`}>{NOME_DA_ETAPA[e]}</span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-6 grid gap-0">
        {cartao.campos.map((c) => (
          <div key={c.rotulo} className="flex justify-between gap-4 border-t border-linha py-3 text-sm">
            <dt className="text-texto-secundario">{c.rotulo}</dt>
            <dd className={`text-right font-medium ${pronto ? "" : "text-texto-secundario"}`}>{pronto ? c.valor : "…"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
