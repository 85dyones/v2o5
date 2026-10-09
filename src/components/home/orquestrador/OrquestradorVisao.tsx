import type { KeyboardEvent } from "react";
import { FRENTES, type CartaoDoCrm, type Passo } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

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

const PONTO_DA_ETAPA: Record<Etapa, string> = {
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
    <div>
      <div
        role="tablist"
        aria-label="Frentes da demonstração"
        className="grid w-full grid-cols-3 gap-1 rounded-xl bg-superficie p-1 shadow-[inset_0_0_0_1px_var(--color-linha)] sm:w-fit"
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
            className="min-h-11 rounded-lg px-3 py-2 text-sm font-semibold leading-tight text-secundario transition-colors duration-150 hover:text-papel aria-selected:bg-grafite aria-selected:text-papel sm:px-4 sm:text-[0.9375rem]"
          >
            {f.aba}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="painel-orquestrador"
        aria-labelledby={`aba-${frente.id}`}
        className="mt-5 grid gap-4 lg:grid-cols-[1.45fr_1fr]"
      >
        <div className="rounded-2xl bg-superficie p-5 shadow-[inset_0_0_0_1px_var(--color-linha)] md:p-7">
          <p className="text-secundario">{frente.resumo}</p>
          <ol className="mt-6 grid gap-3">
            {frente.passos.map((passo, i) => (
              <li key={`${frente.id}-${i}`} className="passo" data-oculto={i >= estado.visiveis ? "" : undefined}>
                <PassoVisao passo={passo} />
              </li>
            ))}
          </ol>
        </div>
        <CartaoCrmVisao cartao={frente.crm} pronto={estado.crmPronto} />
      </div>

      {aoRepetir ? (
        <button
          type="button"
          onClick={aoRepetir}
          className="link-sublinhado mt-5 inline-flex min-h-11 items-center text-[0.9375rem] text-secundario"
        >
          Repetir a demonstração
        </button>
      ) : null}
    </div>
  );
}

function PassoVisao({ passo }: { passo: Passo }) {
  if (passo.tipo === "sistema") {
    return (
      <div className="flex gap-3 rounded-xl px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-linha)]">
        <span aria-hidden="true" className={`mt-2 size-2 shrink-0 rounded-full ${PONTO_DA_ETAPA[passo.etapa]}`} />
        <div>
          <p className="font-semibold">{passo.titulo}</p>
          <ul className="mt-1 text-sm text-secundario">
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
    <div className={saida ? "ml-auto max-w-[88%] text-right" : "max-w-[88%]"}>
      <p className="text-xs text-secundario">
        <span className="font-semibold text-papel">{passo.autor}</span>{" "}
        <span className="tabular-nums">{passo.hora}</span>
      </p>
      <p
        className={`mt-1 rounded-2xl px-4 py-2.5 text-left text-[0.9375rem] ${
          saida ? "rounded-br-md bg-verde text-papel" : "rounded-bl-md bg-grafite"
        }`}
      >
        {passo.texto}
      </p>
    </div>
  );
}

function CartaoCrmVisao({ cartao, pronto }: { cartao: CartaoDoCrm; pronto: boolean }) {
  return (
    <div
      data-pronto={pronto ? "" : undefined}
      className="cartao-crm self-start rounded-2xl bg-superficie p-5 shadow-[inset_0_0_0_1px_var(--color-linha)] md:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="rotulo text-secundario">Card no CRM</p>
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${pronto ? FUNDO_DA_ETAPA[cartao.etapa] : "bg-grafite text-secundario"}`}
        >
          {pronto ? cartao.etiqueta : "Aguardando"}
        </span>
      </div>
      <p className="mt-4 text-xl font-bold tracking-[-0.02em]">{cartao.titulo}</p>
      <dl className="mt-5 grid gap-3">
        {cartao.campos.map((c) => (
          <div key={c.rotulo} className="flex justify-between gap-4 border-t border-linha pt-3 text-sm">
            <dt className="text-secundario">{c.rotulo}</dt>
            <dd className={`text-right ${pronto ? "" : "text-secundario"}`}>{pronto ? c.valor : "…"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
