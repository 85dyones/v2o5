import type { KeyboardEvent } from "react";
import { DESENHOS_DOS_ICONES, type NomeDoIcone } from "@/components/Icone";
import { NOME_DA_ETAPA, PECAS, type IdDaPeca } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";
import { HORIZONTAL, VERTICAL, ligacaoEntre, type Arranjo } from "./geometria";

/**
 * O diagrama sem estado: o servidor o desenha com a peça "Site" escolhida
 * (zero JavaScript); a versão interativa usa este mesmo componente e
 * acrescenta clique, teclado e o pulso que percorre o caminho.
 */

export const COR_CLARA: Record<Etapa, string> = {
  violeta: "var(--color-violeta-claro)",
  verde: "var(--color-verde-claro)",
  azul: "var(--color-azul-claro)",
  ambar: "var(--color-ambar)",
};

const COR_BASE: Record<Etapa, string> = {
  violeta: "var(--color-violeta)",
  verde: "var(--color-verde)",
  azul: "var(--color-azul)",
  ambar: "var(--color-ambar)",
};

const ICONE_DA_PECA: Record<IdDaPeca, NomeDoIcone> = {
  site: "janela",
  whatsapp: "conversa",
  agente: "brilho",
  n8n: "fluxo",
  crm: "colunas",
  rastreamento: "alvo",
  venda: "etiqueta",
};

const ETAPA_DA_PECA = Object.fromEntries(PECAS.map((p) => [p.id, p.etapa])) as Record<IdDaPeca, Etapa>;

/** Chaves das ligações que o caminho da peça percorre. */
function ligacoesDoCaminho(caminho: IdDaPeca[]): Map<string, IdDaPeca> {
  const mapa = new Map<string, IdDaPeca>();
  for (let i = 0; i < caminho.length - 1; i++) {
    const l = ligacaoEntre(caminho[i], caminho[i + 1]);
    if (l) mapa.set(l.chave, caminho[i + 1]);
  }
  return mapa;
}

export interface PropsDoDiagrama {
  selecionada: IdDaPeca;
  aoEscolher?: (id: IdDaPeca) => void;
}

export default function DiagramaVisao({ selecionada, aoEscolher }: PropsDoDiagrama) {
  const peca = PECAS.find((p) => p.id === selecionada)!;
  const noCaminho = new Set(peca.caminho);
  const ligacoesAcesas = ligacoesDoCaminho(peca.caminho);
  const passos = peca.caminho.map((id) => PECAS.find((p) => p.id === id)!);

  return (
    <div className="grid gap-4 lg:grid-cols-[2.15fr_1fr] lg:items-stretch">
      {/* Os ícones das peças, uma vez só: os dois arranjos usam por <use>. */}
      <svg aria-hidden="true" focusable="false" className="absolute size-0 overflow-hidden">
        <defs>
          {Object.entries(ICONE_DA_PECA).map(([peca, icone]) => (
            <symbol key={peca} id={`icone-da-peca-${peca}`} viewBox="0 0 20 20">
              {DESENHOS_DOS_ICONES[icone]}
            </symbol>
          ))}
        </defs>
      </svg>
      <figure className="superficie overflow-hidden p-4 md:p-6">
        <div className="rounded-2xl bg-[radial-gradient(rgb(242_241_236/0.06)_1px,transparent_1px)] bg-[length:20px_20px]">
          <Svg arranjo={HORIZONTAL} className="hidden md:block" {...{ selecionada, aoEscolher, noCaminho, ligacoesAcesas }} />
          <Svg arranjo={VERTICAL} className="mx-auto max-w-[22rem] md:hidden" {...{ selecionada, aoEscolher, noCaminho, ligacoesAcesas }} />
        </div>
        <figcaption className="mt-4 flex flex-wrap gap-2 border-t border-linha pt-4">
          {(Object.keys(NOME_DA_ETAPA) as Etapa[]).map((etapa) => (
            <span key={etapa} className="chip text-secundario">
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: COR_CLARA[etapa] }} />
              {NOME_DA_ETAPA[etapa]}
            </span>
          ))}
        </figcaption>
      </figure>

      <div aria-live="polite" className="superficie flex flex-col p-6 md:p-8">
        <p className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-secundario">
          <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: COR_CLARA[peca.etapa] }} />
          {NOME_DA_ETAPA[peca.etapa]}
        </p>
        <h3 className="mt-3 text-[1.75rem] font-semibold tracking-[-0.035em]">{peca.nome}</h3>
        <p className="mt-3 text-secundario">{peca.texto}</p>
        <div className="mt-auto pt-8">
          <p className="text-sm font-medium">Caminho que passa por aqui</p>
          <ol className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
            {passos.map((p, i) => (
              <li key={`${p.id}-${i}`} className="flex items-center gap-1">
                {i > 0 ? (
                  <svg viewBox="0 0 12 12" className="size-3 text-secundario" aria-hidden="true">
                    <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : null}
                <span className="chip">
                  <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: COR_CLARA[p.etapa] }} />
                  {p.nome}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Svg({
  arranjo,
  className,
  selecionada,
  aoEscolher,
  noCaminho,
  ligacoesAcesas,
}: PropsDoDiagrama & {
  arranjo: Arranjo;
  className: string;
  noCaminho: Set<IdDaPeca>;
  ligacoesAcesas: Map<string, IdDaPeca>;
}) {
  const r = arranjo.raio;
  const lado = r * 2;
  const icone = r * 0.95;
  const aoTeclar = (id: IdDaPeca) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    aoEscolher?.(id);
  };

  return (
    <svg
      viewBox={arranjo.viewBox}
      className={`diagrama h-auto w-full overflow-visible ${className}`}
      data-diagrama=""
      role="group"
      aria-label="Diagrama: como as peças do sistema se ligam"
    >
      <g fill="none" strokeLinecap="round">
        {Object.entries(arranjo.ligacoes).map(([chave, d]) => {
          const destino = ligacoesAcesas.get(chave);
          return destino ? (
            <g key={chave} className="ligacao">
              <path d={d} stroke={COR_CLARA[ETAPA_DA_PECA[destino]]} strokeWidth={10} opacity={0.12} />
              <path d={d} stroke={COR_CLARA[ETAPA_DA_PECA[destino]]} strokeWidth={2.5} opacity={0.95} />
            </g>
          ) : (
            <path
              key={chave}
              d={d}
              className="ligacao"
              stroke="var(--color-linha-forte)"
              strokeWidth={1.5}
              strokeDasharray="1 7"
            />
          );
        })}
        {/* Camada do pulso: um traço curto que a versão interativa faz correr.
            Fica fora do HTML estático, que não anima. */}
        {aoEscolher
          ? Object.entries(arranjo.ligacoes).map(([chave, d]) => (
              <path
                key={`pulso-${chave}`}
                d={d}
                data-pulso={chave}
                pathLength={100}
                strokeDasharray="14 100"
                strokeDashoffset={14}
                stroke="var(--color-ambar)"
                strokeWidth={4}
              />
            ))
          : null}
      </g>

      {PECAS.map((p) => {
        const { x, y, rotulo } = arranjo.nos[p.id];
        const escolhida = p.id === selecionada;
        const acesa = noCaminho.has(p.id);
        return (
          <g
            key={p.id}
            data-peca={p.id}
            transform={`translate(${x} ${y})`}
            className="peca"
            {...(aoEscolher
              ? {
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": escolhida,
                  "aria-label": p.nome,
                  onClick: () => aoEscolher(p.id),
                  onKeyDown: aoTeclar(p.id),
                }
              : {})}
          >
            {aoEscolher ? (
              <>
                <rect x={-r - 12} y={-r - 12} width={lado + 24} height={lado + 24} fill="transparent" />
                <rect
                  className="anel-foco"
                  x={-r - 6}
                  y={-r - 6}
                  width={lado + 12}
                  height={lado + 12}
                  rx={r * 0.55}
                  fill="none"
                  stroke="var(--color-ambar)"
                  strokeWidth={2}
                />
              </>
            ) : null}
            {escolhida ? <circle r={r * 1.9} fill={COR_BASE[p.etapa]} opacity={0.18} /> : null}
            <rect
              x={-r}
              y={-r}
              width={lado}
              height={lado}
              rx={r * 0.42}
              fill={escolhida ? COR_BASE[p.etapa] : "rgb(24 27 32)"}
              stroke={COR_CLARA[p.etapa]}
              strokeOpacity={escolhida ? 1 : acesa ? 0.6 : 0.25}
              strokeWidth={1.5}
            />
            <use
              href={`#icone-da-peca-${p.id}`}
              className="nucleo"
              x={-icone / 2}
              y={-icone / 2}
              width={icone}
              height={icone}
              fill="none"
              stroke={escolhida ? "var(--color-papel)" : COR_CLARA[p.etapa]}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={acesa ? 1 : 0.4}
            />
            <text
              x={rotulo === "direita" ? r + 14 : 0}
              y={rotulo === "direita" ? arranjo.fonte / 3 : r + arranjo.fonte + 10}
              textAnchor={rotulo === "direita" ? "start" : "middle"}
              fill={acesa ? "var(--color-papel)" : "var(--color-secundario)"}
              fontSize={arranjo.fonte}
              fontWeight={500}
              letterSpacing="-0.01em"
              // Halo da cor do cartão: a ligação que passa por baixo não corta o nome.
              stroke="rgb(25 28 33)"
              strokeWidth={7}
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              {p.nome}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
