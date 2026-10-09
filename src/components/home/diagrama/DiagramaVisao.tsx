import type { KeyboardEvent } from "react";
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
    <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr] lg:items-start">
      <figure className="rounded-2xl bg-superficie p-4 shadow-[inset_0_0_0_1px_var(--color-linha)] md:p-6">
        <Svg arranjo={HORIZONTAL} className="hidden md:block" {...{ selecionada, aoEscolher, noCaminho, ligacoesAcesas }} />
        <Svg arranjo={VERTICAL} className="mx-auto max-w-[22rem] md:hidden" {...{ selecionada, aoEscolher, noCaminho, ligacoesAcesas }} />
        <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-linha pt-4">
          {(Object.keys(NOME_DA_ETAPA) as Etapa[]).map((etapa) => (
            <span key={etapa} className="rotulo inline-flex items-center gap-2 text-secundario">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: COR_CLARA[etapa] }} />
              {NOME_DA_ETAPA[etapa]}
            </span>
          ))}
        </figcaption>
      </figure>

      <div aria-live="polite" className="rounded-2xl bg-superficie p-6 shadow-[inset_0_0_0_1px_var(--color-linha)] md:p-7">
        <p className="rotulo inline-flex items-center gap-2 text-secundario">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ background: COR_CLARA[peca.etapa] }} />
          {NOME_DA_ETAPA[peca.etapa]}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em]">{peca.nome}</h3>
        <p className="mt-3 text-secundario">{peca.texto}</p>
        <p className="mt-6 text-sm font-semibold">Caminho que passa por aqui</p>
        <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm">
          {passos.map((p, i) => (
            <li key={`${p.id}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? (
                <svg viewBox="0 0 12 12" className="size-3 text-secundario" aria-hidden="true">
                  <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : null}
              <span className="rounded-md bg-grafite px-2 py-1">{p.nome}</span>
            </li>
          ))}
        </ol>
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
  const aoTeclar = (id: IdDaPeca) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    aoEscolher?.(id);
  };

  return (
    <svg
      viewBox={arranjo.viewBox}
      className={`diagrama h-auto w-full ${className}`}
      data-diagrama=""
      role="group"
      aria-label="Diagrama: como as peças do sistema se ligam"
    >
      <g fill="none" strokeLinecap="round">
        {Object.entries(arranjo.ligacoes).map(([chave, d]) => {
          const destino = ligacoesAcesas.get(chave);
          return (
            <path
              key={chave}
              d={d}
              className="ligacao"
              stroke={destino ? COR_CLARA[ETAPA_DA_PECA[destino]] : "var(--color-linha-forte)"}
              strokeWidth={destino ? 2.5 : 1.5}
              opacity={destino ? 0.9 : 0.6}
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
            opacity={acesa ? 1 : 0.6}
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
                <circle r={r + 12} fill="transparent" />
                <circle className="anel-foco" r={r + 7} fill="none" stroke="var(--color-ambar)" strokeWidth={2} />
              </>
            ) : null}
            <circle
              r={r}
              fill={COR_BASE[p.etapa]}
              fillOpacity={escolhida ? 0.95 : 0.2}
              stroke={COR_CLARA[p.etapa]}
              strokeWidth={1.5}
            />
            <circle className="nucleo" r={escolhida ? 7 : 5.5} fill={escolhida ? "var(--color-papel)" : COR_CLARA[p.etapa]} />
            <text
              x={rotulo === "direita" ? r + 12 : 0}
              y={rotulo === "direita" ? arranjo.fonte / 3 : r + arranjo.fonte + 6}
              textAnchor={rotulo === "direita" ? "start" : "middle"}
              fill="var(--color-papel)"
              fontSize={arranjo.fonte}
              fontWeight={600}
            >
              {p.nome}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
