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
  violeta: "bg-etapa-atracao",
  verde: "bg-etapa-atendimento",
  azul: "bg-etapa-crm",
  ambar: "bg-acao",
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
    marca: <Marca />,
    painel: <Painel />,
    reativacao: <Reativacao />,
    redes: <Redes />,
    avaliacoes: <Avaliacoes />,
    catalogo: <Catalogo />,
    posvenda: <Fluxo passos={VINHETAS.posvenda} />,
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
          <span className="flex size-8 items-center justify-center rounded-full bg-etapa-atendimento/25 text-etapa-atendimento">
            <Icone nome="brilho" className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{v.nome}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-texto-secundario">
              <span className="size-1.5 rounded-full bg-etapa-atendimento" />
              {v.estado}
            </p>
          </div>
          <span className="ml-auto text-xs text-texto-secundario">WhatsApp</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2.5 bg-[radial-gradient(rgb(18_20_24/0.05)_1px,transparent_1px)] bg-[length:16px_16px] p-4 text-[0.875rem] leading-snug">
          <p className="chip mx-auto mb-auto text-texto-secundario">{v.dia}</p>
          {v.conversa.map((m, i) =>
            m.tipo === "ferramenta" ? (
              <p key={i} className="chip chip-ok mx-auto my-0.5 max-w-full truncate text-texto-secundario">
                {m.texto}
              </p>
            ) : (
              <p
                key={i}
                className={
                  m.tipo === "saida"
                    ? "ml-auto max-w-[86%] rounded-2xl rounded-br-md bg-etapa-atendimento px-3.5 py-2 text-fundo"
                    : "max-w-[86%] rounded-2xl rounded-bl-md bg-fundo-alternado px-3.5 py-2"
                }
              >
                {m.texto}
              </p>
            ),
          )}
          <p className="digitando ml-auto flex w-fit gap-1 rounded-2xl rounded-br-md bg-etapa-atendimento/40 px-3.5 py-3 text-texto">
            <span />
            <span />
            <span />
          </p>
        </div>
      </div>

      <div className="hidden flex-col border-l border-linha bg-fundo-alternado/50 p-4 text-[0.8125rem] sm:flex">
        <p className="flex items-center gap-1.5 text-xs font-medium text-texto-secundario">
          <Icone nome="colunas" className="size-3.5" />
          Ficha no CRM
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-etapa-atracao to-etapa-crm text-sm font-semibold text-fundo">
            {c.iniciais}
          </span>
          <div className="leading-tight">
            <p className="font-semibold">{c.nome}</p>
            <p className="mt-0.5 text-xs text-texto-secundario">{c.origem}</p>
          </div>
        </div>
        <p className="mt-4 w-fit rounded-full bg-etapa-atendimento px-2.5 py-1 text-xs font-semibold text-fundo">{c.etiqueta}</p>
        <dl className="mt-4 grid">
          {c.campos.map((f) => (
            <div key={f.rotulo} className="border-t border-linha py-2.5">
              <dt className="text-xs text-texto-secundario">{f.rotulo}</dt>
              <dd className="mt-0.5 font-medium">{f.valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-auto flex items-start gap-2 rounded-xl bg-acao/10 p-3 text-xs leading-snug text-texto shadow-[inset_0_0_0_1px_rgb(242_165_22/0.3)]">
          <Icone nome="conversa" className="mt-px size-3.5 shrink-0 text-acao-texto" />
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
      <p className="flex items-center gap-2 rounded-full bg-fundo-alternado px-3.5 py-2 contorno">
        <Icone nome="busca" className="size-3.5 text-texto-secundario" />
        {v.consulta}
      </p>
      <div className="mt-3 px-1">
        <p className="flex items-center gap-2 text-xs text-texto-secundario">
          <span className="flex size-4 items-center justify-center rounded-full bg-etapa-atracao/40">
            <span className="size-1.5 rounded-full bg-etapa-atracao" />
          </span>
          {v.dominio} <span className="opacity-60">› {v.trilha}</span>
        </p>
        <p className="mt-1 font-semibold text-etapa-atracao">{v.titulo}</p>
        <Barras larguras={["88%"]} />
      </div>
      <div className="mt-3 rounded-xl bg-fundo-cartao px-3 py-2.5 contorno">
        <p className="flex items-center gap-1.5 text-xs font-medium">
          <Icone nome="brilho" className="size-3.5 text-acao-texto" />
          {v.respostaDaIa}
          <span className="chip ml-auto font-normal text-texto-secundario">{v.dominio}</span>
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
        <span key={l} className="block h-1.5 rounded-full bg-texto/10" style={{ width: l }} />
      ))}
    </span>
  );
}

function Crm() {
  return (
    <div aria-hidden="true" className="vinheta grid h-full grid-cols-3 gap-2 p-3 text-[0.75rem]">
      {VINHETAS.crm.map((c) => (
        <div key={c.coluna} className="flex flex-col gap-2 rounded-lg bg-fundo-cartao p-2">
          <p className="flex items-center gap-1.5 px-0.5 font-medium text-texto-secundario">
            <span className={`size-1.5 rounded-full ${PONTO_DA_ETAPA[c.etapa]}`} />
            {c.coluna}
          </p>
          {c.cartoes.map(([carro, origem]) => (
            <div
              key={carro}
              className={`rounded-md bg-fundo-cartao px-2 py-1.5 contorno ${
                c.etapa === "ambar" ? "shadow-[inset_0_0_0_1px_rgb(242_165_22/0.55)]" : ""
              }`}
            >
              <p className="font-semibold leading-tight">{carro}</p>
              <p className="mt-0.5 text-[0.6875rem] text-texto-secundario">{origem}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Uma régua de passos; serve à automação e, com outros passos, ao pós-venda. */
function Fluxo({ passos = VINHETAS.fluxo }: { passos?: readonly { icone: string; texto: string }[] }) {
  return (
    <div aria-hidden="true" className="vinheta relative h-full p-4 text-[0.8125rem]">
      <svg className="absolute left-[1.9rem] top-8 h-[calc(100%-4rem)] w-px overflow-visible" aria-hidden="true">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          stroke="var(--color-etapa-crm)"
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
                i === passos.length - 1 ? "bg-acao/20 text-acao-texto" : "bg-etapa-crm/30 text-etapa-crm"
              }`}
            >
              <Icone nome={p.icone as NomeDoIcone} className="size-3.5" />
            </span>
            <span className="flex-1 rounded-lg bg-fundo-cartao px-2.5 py-1.5 contorno">
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
        <span className="absolute inset-x-3 top-[0.4375rem] h-px bg-gradient-to-r from-etapa-atracao/60 via-etapa-atendimento/50 to-acao/80" />
        {v.passos.map((p, i) => (
          <li key={p} className="relative flex flex-col items-center gap-2">
            <span
              className={`size-3.5 rounded-full ring-4 ring-fundo-alternado ${
                i === v.passos.length - 1 ? "bg-acao shadow-[0_0_12px_rgb(242_165_22/0.7)]" : "bg-etapa-atracao"
              }`}
            />
            <span className="text-texto-secundario">{p}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-fundo-cartao p-3 contorno">
        <p className="font-mono text-[0.6875rem] text-texto-secundario">
          event_id <span className="text-texto">{v.identificador}</span>
        </p>
        <p className="mt-2 flex flex-wrap gap-1.5">
          {v.lados.map((l) => (
            <span key={l} className="chip chip-ok text-texto-secundario">
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
      <p className="flex items-center gap-1.5 px-1 pb-2 pt-0.5 text-xs text-texto-secundario">
        <Icone nome="alvo" className="size-3.5 text-acao-texto" />
        {v.criterio}
      </p>
      <ul className="grid gap-1.5">
        {v.linhas.map((l) => (
          <li
            key={l.nome}
            className={`flex items-center gap-2.5 rounded-lg bg-fundo-cartao px-2.5 py-1.5 contorno ${
              l.ativa ? "" : "opacity-55"
            }`}
          >
            <span
              className={`relative h-4 w-7 shrink-0 rounded-full ${l.ativa ? "bg-acao/80" : "bg-fundo-alternado"}`}
            >
              <span
                className={`absolute top-0.5 size-3 rounded-full bg-texto ${l.ativa ? "right-0.5" : "left-0.5"}`}
              />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-semibold">{l.nome}</span>
              <span className="block text-[0.6875rem] text-texto-secundario">{l.canal}</span>
            </span>
            <span className={`chip ${l.ativa ? "text-acao-texto" : "text-texto-secundario"}`}>{l.estado}</span>
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
      <div className="relative h-[5.5rem] shrink-0 overflow-hidden border-b border-linha bg-fundo-alternado">
        <svg viewBox="0 0 320 88" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <g fill="none" stroke="rgb(18 20 24 / 0.07)" strokeWidth="6" strokeLinecap="round">
            <path d="M-10 62 C60 50 110 70 170 46 S280 20 330 30" />
            <path d="M90 -10 C96 30 120 60 116 100" />
            <path d="M232 -10 C224 40 250 62 262 100" />
          </g>
          <g fill="none" stroke="rgb(18 20 24 / 0.04)" strokeWidth="2">
            <path d="M-10 22 H330 M-10 82 H330 M40 -10 V100 M180 -10 V100 M300 -10 V100" />
          </g>
          <circle cx="170" cy="40" r="14" fill="rgb(107 70 200 / 0.18)" />
          <path
            d="M170 22c-7 0-12 5.2-12 11.6 0 8.7 12 18.4 12 18.4s12-9.7 12-18.4C182 27.2 177 22 170 22z"
            fill="var(--color-etapa-atracao)"
          />
          <circle cx="170" cy="34" r="4" fill="var(--color-fundo-alternado)" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="font-semibold">{v.nome}</p>
        <p className="mt-0.5 text-xs text-texto-secundario">{v.categoria}</p>
        <p className="mt-1 text-xs">
          <span className="text-etapa-atendimento">{v.aberto}</span> <span className="text-texto-secundario">· {v.horario}</span>
        </p>
        <p className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {v.acoes.map((a) => (
            <span key={a} className="chip text-texto-secundario">
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
          <span className="size-2 rounded-full bg-texto/15" />
          <span className="size-2 rounded-full bg-texto/15" />
          <span className="size-2 rounded-full bg-texto/15" />
        </span>
        <span className="flex-1 truncate rounded-full bg-fundo-alternado px-2.5 py-1 text-center text-texto-secundario">{v.endereco}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5 px-4">
        <span className="block h-2.5 w-[72%] rounded-full bg-texto/25" />
        <span className="block h-2.5 w-[54%] rounded-full bg-texto/25" />
        <span className="mt-1 block h-1.5 w-[80%] rounded-full bg-texto/10" />
        <span className="block h-1.5 w-[64%] rounded-full bg-texto/10" />
        <span className="mt-2 flex gap-2">
          <span className="rounded-full bg-etapa-atendimento px-3 py-1.5 font-medium text-fundo">{v.botao}</span>
          <span className="rounded-full px-3 py-1.5 text-texto-secundario contorno">{v.secundario}</span>
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
      <div className="shrink-0 rounded-xl bg-fundo-cartao px-3 py-2.5 contorno">
        <p className="font-semibold">{v.origem}</p>
        <p className="chip chip-ok mt-1.5 text-texto-secundario">{v.estado}</p>
      </div>
      <svg viewBox="0 0 60 8" className="hidden h-2 min-w-6 flex-1 sm:block" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="60" y2="4" stroke="var(--color-etapa-crm)" strokeOpacity="0.7" strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      <div className="flex shrink-0 flex-col items-center gap-1">
        <span className="flex size-10 items-center justify-center rounded-xl bg-etapa-crm/30 text-etapa-crm contorno-forte">
          <Icone nome="fluxo" className="size-4" />
        </span>
        <span className="text-xs text-texto-secundario">{v.meio}</span>
      </div>
      <svg viewBox="0 0 60 8" className="hidden h-2 min-w-6 flex-1 sm:block" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="60" y2="4" stroke="var(--color-etapa-crm)" strokeOpacity="0.7" strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      <ul className="grid shrink-0 gap-1.5">
        {v.destinos.map((d) => (
          <li key={d} className="rounded-lg bg-fundo-cartao px-2.5 py-1.5 contorno">
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** O guia da marca: tipografia, paleta e tom de voz (cores de exemplo). */
function Marca() {
  const v = VINHETAS.marca;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col p-3.5 text-[0.8125rem]">
      <p className="flex items-center justify-between gap-2">
        <span className="font-semibold">{v.titulo}</span>
        <span className="rotulo text-texto-secundario">exemplo</span>
      </p>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[5.25rem_1fr] gap-2">
        <div className="flex flex-col justify-between rounded-[0.625rem] p-2.5 contorno">
          <span className="text-[2.125rem] font-semibold leading-none tracking-[-0.04em]">Aa</span>
          <span className="text-xs text-texto-secundario">{v.tipografia}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {v.cores.map((cor) => (
            <span key={cor} className="rounded-md contorno" style={{ backgroundColor: cor }} />
          ))}
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 text-texto-secundario">{v.tom.rotulo}</span>
        {v.tom.palavras.map((p) => (
          <span key={p} className="chip">
            {p}
          </span>
        ))}
      </p>
    </div>
  );
}

/** O painel do dono: três indicadores e as vendas por origem, sem número (é cena, não resultado). */
function Painel() {
  const v = VINHETAS.painel;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col p-3.5 text-[0.75rem]">
      <p className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-semibold">
          <Icone nome="colunas" className="size-3.5 text-etapa-crm" />
          {v.titulo}
        </span>
        <span className="text-[0.6875rem] text-texto-secundario">{v.atualizacao}</span>
      </p>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {v.indicadores.map((nome, i) => (
          <span key={nome} className="rounded-lg bg-fundo-cartao px-2 py-1.5 contorno">
            <span className="block truncate text-[0.6875rem] text-texto-secundario">{nome}</span>
            <span className={`mt-1.5 block h-2 rounded-full ${i === 2 ? "bg-acao/80" : "bg-etapa-crm/60"}`} style={{ width: ["70%", "45%", "55%"][i] }} />
          </span>
        ))}
      </div>
      <ul className="mt-3 grid flex-1 content-center gap-1.5">
        {v.origens.map((o) => (
          <li key={o.nome} className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
            <span className="truncate text-texto-secundario">{o.nome}</span>
            <span className="h-1.5 rounded-full bg-gradient-to-r from-etapa-atracao/70 to-acao/80" style={{ width: o.largura }} />
          </li>
        ))}
      </ul>
      <p className="mt-2 flex flex-wrap gap-1.5">
        {v.fontes.map((f) => (
          <span key={f} className="chip chip-ok text-texto-secundario">
            {f}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Reativação de base: a campanha, o canal e o que cada contato fez (nomes de exemplo). */
function Reativacao() {
  const v = VINHETAS.reativacao;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col p-3.5 text-[0.75rem]">
      <p className="flex items-center justify-between gap-2">
        <span className="font-semibold">{v.campanha}</span>
        <span className="chip chip-ok text-texto-secundario">{v.canal}</span>
      </p>
      <ul className="mt-3 grid flex-1 content-start gap-1.5">
        {v.contatos.map((c) => (
          <li key={c.nome} className="flex items-center gap-2.5 rounded-lg bg-fundo-cartao px-2.5 py-1.5 contorno">
            <span className={`size-1.5 shrink-0 rounded-full ${PONTO_DA_ETAPA[c.etapa]}`} />
            <span className="font-medium">{c.nome}</span>
            <span className="ml-auto truncate text-texto-secundario">{c.estado}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Conteúdo e redes: a semana do calendário com os posts montados do que já existe. */
function Redes() {
  const v = VINHETAS.redes;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col p-3.5 text-[0.75rem]">
      <p className="flex items-center justify-between gap-2">
        <span className="font-semibold">{v.titulo}</span>
        <span className="chip chip-ok text-texto-secundario">{v.rastreado}</span>
      </p>
      <ol className="mt-3 grid flex-1 grid-cols-6 gap-1.5">
        {v.dias.map((dia, i) => {
          const post = v.posts.find((p) => p.dia === i);
          return (
            <li key={dia} className={`flex min-w-0 flex-col rounded-lg p-1.5 ${post ? "bg-fundo-cartao contorno" : "bg-texto/[0.03]"}`}>
              <span className="text-[0.625rem] uppercase tracking-wide text-texto-secundario">{dia}</span>
              {post ? (
                <span className="mt-auto">
                  <span className="block h-7 rounded-md bg-gradient-to-br from-etapa-atracao/60 to-etapa-crm/50" />
                  <span className="mt-1 block truncate text-[0.6875rem] font-medium leading-tight">{post.texto}</span>
                  <span className="block truncate text-[0.625rem] text-texto-secundario">{post.rede}</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Avaliações: a mensagem que o cliente recebe depois da venda e a avaliação que aparece no Google. */
function Avaliacoes() {
  const v = VINHETAS.avaliacoes;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col justify-center gap-2.5 p-3.5 text-[0.75rem]">
      <p className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-etapa-atendimento px-3 py-2 leading-snug text-fundo">
        {v.mensagem} <span className="underline decoration-texto/60">{v.link}</span>
      </p>
      <div className="rounded-xl bg-fundo-cartao p-3 contorno">
        <p className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-etapa-atracao to-etapa-crm text-[0.625rem] font-semibold text-fundo">
            {v.avaliacao.nome.split(" ").map((n) => n[0]).join("")}
          </span>
          <span className="font-medium">{v.avaliacao.nome}</span>
          <span className="ml-auto flex gap-0.5 text-acao-texto">
            {Array.from({ length: v.avaliacao.estrelas }, (_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-3 fill-current">
                <path d="M10 1.8l2.5 5.4 5.9.6-4.4 4 1.2 5.8L10 14.7l-5.2 2.9 1.2-5.8-4.4-4 5.9-.6z" />
              </svg>
            ))}
          </span>
        </p>
        <p className="mt-1.5 leading-snug text-texto-secundario">{v.avaliacao.texto}</p>
      </div>
    </div>
  );
}

/** Anúncios de catálogo: o feed do estoque e para onde cada item vai (carros de exemplo). */
function Catalogo() {
  const v = VINHETAS.catalogo;
  return (
    <div aria-hidden="true" className="vinheta flex h-full flex-col p-3.5 text-[0.75rem]">
      <p className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-semibold">
          <Icone nome="carro" className="size-3.5 text-texto-secundario" />
          {v.feed}
        </span>
        <span className="text-[0.6875rem] text-texto-secundario">{v.estado}</span>
      </p>
      <ul className="mt-3 grid flex-1 content-start gap-1.5">
        {v.itens.map((item) => (
          <li
            key={item.nome}
            className={`flex items-center gap-2 rounded-lg bg-fundo-cartao px-2.5 py-1.5 contorno ${item.ativo ? "" : "opacity-55"}`}
          >
            <span className="min-w-0 flex-1 truncate font-medium">{item.nome}</span>
            {item.destinos.map((d) => (
              <span key={d} className={`chip ${item.ativo ? "chip-ok text-texto-secundario" : "text-texto-secundario"}`}>
                {d}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
