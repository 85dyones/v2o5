import type { CSSProperties } from "react";
import { DESENHOS, RAIO, SIMBOLO_ATUAL, VIEWBOX, type No, type VarianteDoSimbolo } from "@/lib/marca";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";

const VIEWBOX_TEXTO = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.largura} ${VIEWBOX.altura}`;

export type TamanhoDoSimbolo = "grande" | "pequeno";

/**
 * O símbolo da V2O5. Server Component, SVG puro.
 *
 * A C1d (o logo) sai do vetor de `lib/marca-vetor.ts`: a rede é UMA forma,
 * sem peças sobrepostas, então o desenho continua limpo com qualquer
 * opacidade. Dois tamanhos ópticos: `grande` (64 px ou mais) e `pequeno`
 * (topo e rodapé), com traço mais grosso e só a cadeia em V.
 *
 * `semNuvem` mostra só a molécula (o hero usa assim, como o catalisador em
 * ação). As outras variações (C1, C1a, C1b, C1c) ficam desenhadas por peças,
 * só para comparação; nunca com cor translúcida.
 */
export default function Simbolo({
  variante = SIMBOLO_ATUAL,
  tamanho = "grande",
  semNuvem = false,
  className,
  style,
  titulo,
}: {
  variante?: VarianteDoSimbolo;
  tamanho?: TamanhoDoSimbolo;
  semNuvem?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Sem título o SVG é decorativo (`aria-hidden`). */
  titulo?: string;
}) {
  const acessivel = {
    role: titulo ? "img" : undefined,
    "aria-label": titulo,
    "aria-hidden": titulo ? undefined : true,
    focusable: "false" as const,
  };

  if (variante === "C1d") {
    const v = SIMBOLO_C1D[tamanho];
    return (
      <svg viewBox={VIEWBOX_TEXTO} className={className} style={style} {...acessivel}>
        {semNuvem ? null : (
          <path
            d={v.nuvem}
            fill="none"
            stroke="currentColor"
            strokeWidth={v.tracoDaNuvem}
            strokeLinejoin="round"
          />
        )}
        <path d={v.rede} fill="currentColor" />
        <circle cx={v.ambar.cx} cy={v.ambar.cy} r={v.ambar.r} fill="var(--color-ambar)" />
      </svg>
    );
  }

  return <SimboloPorPecas variante={variante} pequeno={tamanho === "pequeno"} className={className} />;
}

/** Variações antigas, desenhadas por peças (só a página de comparação usa). */
function SimboloPorPecas({
  variante,
  pequeno,
  className,
}: {
  variante: VarianteDoSimbolo;
  pequeno: boolean;
  className?: string;
}) {
  const desenho = DESENHOS[variante];
  const solido = variante === "C1c";
  const porId = new Map(desenho.nos.map((n) => [n.id, n]));
  const noPequeno = (n: No) => n.tipo === "V" || Boolean(n.ambar);
  const nos = pequeno ? desenho.nos.filter(noPequeno) : desenho.nos;
  const corDaRede = solido ? "var(--cor-fundo-simbolo, var(--color-tinta))" : "currentColor";
  return (
    <svg viewBox={VIEWBOX_TEXTO} className={className} aria-hidden="true" focusable="false">
      <path d={desenho.nuvem} fill={solido ? "currentColor" : "none"} stroke="currentColor" strokeWidth={6} strokeLinejoin="round" />
      {desenho.extra && !pequeno ? <path d={desenho.extra} stroke="currentColor" strokeWidth={6} strokeLinecap="round" /> : null}
      {!pequeno ? (
        <g stroke={corDaRede} strokeLinecap="round">
          {desenho.ligacoes.map(([a, b]) => {
            const na = porId.get(a)!;
            const nb = porId.get(b)!;
            return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} strokeWidth={variante === "C1a" ? 4.5 : 3.5} />;
          })}
          {desenho.ramos?.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2.5} />
          ))}
        </g>
      ) : null}
      {nos.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={RAIO[n.tipo]} fill={n.ambar ? "var(--color-ambar)" : corDaRede} />
      ))}
    </svg>
  );
}
