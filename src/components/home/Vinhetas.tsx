import type { ReactNode } from "react";
import Icone, { type NomeDoIcone } from "@/components/Icone";
import { VINHETAS, type Vinheta } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

/**
 * Cenas de produto do bento: HTML e CSS parados, do servidor, decorativos
 * (o texto do cartão diz a mesma coisa). Mostram a tela que o cliente vai
 * usar, sem número de resultado.
 */

export const PONTO_DA_ETAPA: Record<Etapa, string> = {
  violeta: "bg-violeta-claro",
  verde: "bg-verde-claro",
  azul: "bg-azul-claro",
  ambar: "bg-ambar",
};

export default function VinhetaDaLinha({ vinheta }: { vinheta: Vinheta }) {
  const cenas: Record<Vinheta, ReactNode> = {
    agente: <Agente />,
    busca: <Busca />,
    crm: <Crm />,
    fluxo: <Fluxo />,
    jornada: <Jornada />,
    campanhas: <Campanhas />,
    perfil: <Perfil />,
    site: <Site />,
    integracoes: <Integracoes />,
  };
  return cenas[vinheta];
}

function Agente() {
  const v = VINHETAS.agente;
  const c = v.contato;
  return (
    <div aria-hidden="true" className="vinheta grid h-full min-h-[24rem] sm:grid-cols-[1.45fr_1fr]">
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-3 border-b border-linha px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-verde/25 text-verde-claro">
            <Icone nome="brilho" className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{v.nome}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-secundario">
              <span className="size-1.5 rounded-full bg-verde-claro" />
              {v.estado}
            </p>
          </div>
          <span className="ml-auto text-xs text-secundario">WhatsApp</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2.5 bg-[radial-gradient(rgb(242_241_236/0.05)_1px,transparent_1px)] bg-[length:16px_16px] p-4 text-[0.875rem] leading-snug">
          <p className="chip mx-auto mb-auto text-secundario">{v.dia}</p>
          {v.conversa.map((m, i) =>
            m.tipo === "ferramenta" ? (
              <p key={i} className="chip chip-ok mx-auto my-0.5 max-w-full truncate text-secundario">
                {m.texto}
              </p>
            ) : (
              <p
                key={i}
                className={
                  m.tipo === "saida"
                    ? "ml-auto max-w-[86%] rounded-2xl rounded-br-md bg-verde px-3.5 py-2 text-papel"
                    : "max-w-[86%] rounded-2xl rounded-bl-md bg-grafite px-3.5 py-2"
                }
              >
                {m.texto}
              </p>
            ),
          )}
          <p className="digitando ml-auto flex w-fit gap-1 rounded-2xl rounded-br-md bg-verde/40 px-3.5 py-3 text-papel">
            <span />
            <span />
            <span />
          </p>
        </div>
      </div>

      <div className="hidden flex-col border-l border-linha bg-[rgb(242_241_236/0.015)] p-4 text-[0.8125rem] sm:flex">
        <p className="flex items-center gap-1.5 text-xs font-medium text-secundario">
          <Icone nome="colunas" className="size-3.5" />
          Ficha no CRM
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violeta/70 to-azul/70 text-sm font-semibold">
            {c.iniciais}
          </span>
          <div className="leading-tight">
            <p className="font-semibold">{c.nome}</p>
            <p className="mt-0.5 text-xs text-secundario">{c.origem}</p>
          </div>
        </div>
        <p className="mt-4 w-fit rounded-full bg-verde px-2.5 py-1 text-xs font-semibold text-papel">{c.etiqueta}</p>
        <dl className="mt-4 grid">
          {c.campos.map((f) => (
            <div key={f.rotulo} className="border-t border-linha py-2.5">
              <dt className="text-xs text-secundario">{f.rotulo}</dt>
              <dd className="mt-0.5 font-medium">{f.valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-auto flex items-start gap-2 rounded-xl bg-ambar/10 p-3 text-xs leading-snug text-papel shadow-[inset_0_0_0_1px_rgb(242_165_22/0.3)]">
          <Icone nome="conversa" className="mt-px size-3.5 shrink-0 text-ambar" />
          {c.aviso}
        </p>
      </div>
    </div>
  );
}

function Busca() {
  const v = VINHETAS.busca;
  return (
    <div aria-hidden="true" className="vinheta h-full p-3.5 text-[0.8125rem]">
      <p className="flex items-center gap-2 rounded-full bg-vidro-forte px-3.5 py-2 contorno">
        <Icone nome="busca" className="size-3.5 text-secundario" />
        {v.consulta}
      </p>
      <div className="mt-3 px-1">
        <p className="flex items-center gap-2 text-xs text-secundario">
          <span className="flex size-4 items-center justify-center rounded-full bg-violeta/40">
            <span className="size-1.5 rounded-full bg-violeta-claro" />
          </span>
          {v.dominio} <span className="opacity-60">› {v.trilha}</span>
        </p>
        <p className="mt-1 font-semibold text-violeta-claro">{v.titulo}</p>
        <Barras larguras={["88%"]} />
      </div>
      <div className="mt-3 rounded-xl bg-vidro px-3 py-2.5 contorno">
        <p className="flex items-center gap-1.5 text-xs font-medium">
          <Icone nome="brilho" className="size-3.5 text-ambar" />
          {v.respostaDaIa}
          <span className="chip ml-auto font-normal text-secundario">{v.dominio}</span>
        </p>
        <Barras larguras={["94%", "62%"]} />
      </div>
    </div>
  );
}

function Barras({ larguras }: { larguras: string[] }) {
  return (
    <span className="mt-2 grid gap-1.5">
      {larguras.map((l) => (
        <span key={l} className="block h-1.5 rounded-full bg-papel/10" style={{ width: l }} />
      ))}
    </span>
  );
}

function Crm() {
  return (
    <div aria-hidden="true" className="vinheta grid h-full grid-cols-3 gap-2 p-3 text-[0.75rem]">
      {VINHETAS.crm.map((c) => (
        <div key={c.coluna} className="flex flex-col gap-2 rounded-lg bg-vidro p-2">
          <p className="flex items-center gap-1.5 px-0.5 font-medium text-secundario">
            <span className={`size-1.5 rounded-full ${PONTO_DA_ETAPA[c.etapa]}`} />
            {c.coluna}
          </p>
          {c.cartoes.map(([carro, origem]) => (
            <div
              key={carro}
              className={`rounded-md bg-superficie px-2 py-1.5 contorno ${
                c.etapa === "ambar" ? "shadow-[inset_0_0_0_1px_rgb(242_165_22/0.55)]" : ""
              }`}
            >
              <p className="font-semibold leading-tight">{carro}</p>
              <p className="mt-0.5 text-[0.6875rem] text-secundario">{origem}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Fluxo() {
  const passos = VINHETAS.fluxo;
  return (
    <div aria-hidden="true" className="vinheta relative h-full p-4 text-[0.8125rem]">
      <svg className="absolute left-[1.9rem] top-8 h-[calc(100%-4rem)] w-px overflow-visible" aria-hidden="true">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          className="fluxo-corre"
          stroke="var(--color-azul-claro)"
          strokeOpacity="0.6"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>
      <ol className="relative grid gap-2">
        {passos.map((p, i) => (
          <li key={p.texto} className="flex items-center gap-3">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-lg contorno-forte ${
                i === passos.length - 1 ? "bg-ambar/20 text-ambar" : "bg-azul/30 text-azul-claro"
              }`}
            >
              <Icone nome={p.icone as NomeDoIcone} className="size-3.5" />
            </span>
            <span className="flex-1 rounded-lg bg-vidro px-2.5 py-1.5 contorno">
              {p.texto}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Jornada() {
  const v = VINHETAS.jornada;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col justify-center gap-5 p-4 text-[0.75rem]">
      <ol className="relative flex justify-between">
        <span className="absolute inset-x-3 top-[0.4375rem] h-px bg-gradient-to-r from-violeta-claro/60 via-verde-claro/50 to-ambar/80" />
        {v.passos.map((p, i) => (
          <li key={p} className="relative flex flex-col items-center gap-2">
            <span
              className={`size-3.5 rounded-full ring-4 ring-[rgb(14_15_19)] ${
                i === v.passos.length - 1 ? "bg-ambar shadow-[0_0_12px_rgb(242_165_22/0.7)]" : "bg-violeta-claro"
              }`}
            />
            <span className="text-secundario">{p}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-vidro p-3 contorno">
        <p className="font-mono text-[0.6875rem] text-secundario">
          event_id <span className="text-papel">{v.identificador}</span>
        </p>
        <p className="mt-2 flex flex-wrap gap-1.5">
          {v.lados.map((l) => (
            <span key={l} className="chip chip-ok text-secundario">
              {l}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function Campanhas() {
  const v = VINHETAS.campanhas;
  return (
    <div aria-hidden="true" className="vinheta h-full p-3 text-[0.8125rem]">
      <p className="flex items-center gap-1.5 px-1 pb-2 pt-0.5 text-xs text-secundario">
        <Icone nome="alvo" className="size-3.5 text-ambar" />
        {v.criterio}
      </p>
      <ul className="grid gap-1.5">
        {v.linhas.map((l) => (
          <li
            key={l.nome}
            className={`flex items-center gap-2.5 rounded-lg bg-vidro px-2.5 py-1.5 contorno ${
              l.ativa ? "" : "opacity-55"
            }`}
          >
            <span
              className={`relative h-4 w-7 shrink-0 rounded-full ${l.ativa ? "bg-ambar/80" : "bg-grafite"}`}
            >
              <span
                className={`absolute top-0.5 size-3 rounded-full bg-papel ${l.ativa ? "right-0.5" : "left-0.5"}`}
              />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-semibold">{l.nome}</span>
              <span className="block text-[0.6875rem] text-secundario">{l.canal}</span>
            </span>
            <span className={`chip ${l.ativa ? "text-ambar" : "text-secundario"}`}>{l.estado}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Perfil da Empresa no Google: um pedaço de mapa com o pino e o cartão. */
function Perfil() {
  const v = VINHETAS.perfil;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col text-[0.8125rem]">
      <div className="relative h-[5.5rem] shrink-0 overflow-hidden border-b border-linha bg-[rgb(20_23_28)]">
        <svg viewBox="0 0 320 88" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <g fill="none" stroke="rgb(242 241 236 / 0.07)" strokeWidth="6" strokeLinecap="round">
            <path d="M-10 62 C60 50 110 70 170 46 S280 20 330 30" />
            <path d="M90 -10 C96 30 120 60 116 100" />
            <path d="M232 -10 C224 40 250 62 262 100" />
          </g>
          <g fill="none" stroke="rgb(242 241 236 / 0.04)" strokeWidth="2">
            <path d="M-10 22 H330 M-10 82 H330 M40 -10 V100 M180 -10 V100 M300 -10 V100" />
          </g>
          <circle cx="170" cy="40" r="14" fill="rgb(155 139 224 / 0.18)" />
          <path
            d="M170 22c-7 0-12 5.2-12 11.6 0 8.7 12 18.4 12 18.4s12-9.7 12-18.4C182 27.2 177 22 170 22z"
            fill="var(--color-violeta-claro)"
          />
          <circle cx="170" cy="34" r="4" fill="rgb(20 23 28)" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="font-semibold">{v.nome}</p>
        <p className="mt-0.5 text-xs text-secundario">{v.categoria}</p>
        <p className="mt-1 text-xs">
          <span className="text-verde-claro">{v.aberto}</span> <span className="text-secundario">· {v.horario}</span>
        </p>
        <p className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {v.acoes.map((a) => (
            <span key={a} className="chip text-secundario">
              {a}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** O site: uma janela de navegador com a primeira dobra e o botão do WhatsApp. */
function Site() {
  const v = VINHETAS.site;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col text-[0.75rem]">
      <div className="flex items-center gap-2 border-b border-linha px-3 py-2">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-papel/15" />
          <span className="size-2 rounded-full bg-papel/15" />
          <span className="size-2 rounded-full bg-papel/15" />
        </span>
        <span className="flex-1 truncate rounded-full bg-vidro-forte px-2.5 py-1 text-center text-secundario">{v.endereco}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5 px-4">
        <span className="block h-2.5 w-[72%] rounded-full bg-papel/25" />
        <span className="block h-2.5 w-[54%] rounded-full bg-papel/25" />
        <span className="mt-1 block h-1.5 w-[80%] rounded-full bg-papel/10" />
        <span className="block h-1.5 w-[64%] rounded-full bg-papel/10" />
        <span className="mt-2 flex gap-2">
          <span className="rounded-full bg-verde px-3 py-1.5 font-medium text-papel">{v.botao}</span>
          <span className="rounded-full px-3 py-1.5 text-secundario contorno">{v.secundario}</span>
        </span>
      </div>
    </div>
  );
}

/** Integrações: um sistema de origem, o fluxo no meio e os destinos. */
function Integracoes() {
  const v = VINHETAS.integracoes;
  return (
    <div aria-hidden="true" className="vinheta flex h-full items-center justify-between gap-3 p-4 text-[0.8125rem]">
      <div className="shrink-0 rounded-xl bg-vidro px-3 py-2.5 contorno">
        <p className="font-semibold">{v.origem}</p>
        <p className="chip chip-ok mt-1.5 text-secundario">{v.estado}</p>
      </div>
      <svg viewBox="0 0 60 8" className="hidden h-2 min-w-6 flex-1 sm:block" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="60" y2="4" className="fluxo-corre" stroke="var(--color-azul-claro)" strokeOpacity="0.7" strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      <div className="flex shrink-0 flex-col items-center gap-1">
        <span className="flex size-10 items-center justify-center rounded-xl bg-azul/30 text-azul-claro contorno-forte">
          <Icone nome="fluxo" className="size-4" />
        </span>
        <span className="text-xs text-secundario">{v.meio}</span>
      </div>
      <svg viewBox="0 0 60 8" className="hidden h-2 min-w-6 flex-1 sm:block" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="60" y2="4" className="fluxo-corre" stroke="var(--color-azul-claro)" strokeOpacity="0.7" strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      <ul className="grid shrink-0 gap-1.5">
        {v.destinos.map((d) => (
          <li key={d} className="rounded-lg bg-vidro px-2.5 py-1.5 contorno">
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
