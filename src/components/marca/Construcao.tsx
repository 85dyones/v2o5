import { DESENHOS } from "@/lib/marca";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import { CIRCULOS_DA_NUVEM, COTAS_DOS_ATOMOS } from "@/lib/construcao";

/**
 * O símbolo desenhado como construção (19/10, Dyones; método de
 * brand.dropbox.com/logo): a grade que passa pelos átomos e pelos centros, os
 * quatro círculos da nuvem, as ligações, as cotas em mono e, por cima, o
 * símbolo. Entra no lugar do logo solto do fecho e da marca apagada do
 * rodapé. SVG estático, decorativo (`aria-hidden`); as cores saem das
 * variáveis do tema, pelo `tom`.
 */
const TONS = {
  // Na faixa escura do fecho: o símbolo em papel, a construção em cinza.
  escuro: {
    grade: "var(--color-faixa-escura-linha)",
    construcao: "var(--color-faixa-escura-secundario)",
    no: "var(--color-faixa-escura-texto)",
    cota: "var(--color-faixa-escura-secundario)",
    simbolo: "var(--color-faixa-escura-texto)",
  },
  // No rodapé: tudo em fio claro, como planta; só o átomo âmbar tem cor.
  planta: {
    grade: "var(--color-fundo-alternado)",
    construcao: "var(--color-linha)",
    no: "var(--color-linha)",
    cota: "var(--color-linha-campo)",
    simbolo: "var(--color-linha)",
  },
  // Em papel (/sobre): construção clara, símbolo em tinta.
  claro: {
    grade: "var(--color-fundo-alternado)",
    construcao: "var(--color-linha-campo)",
    no: "var(--color-texto)",
    cota: "var(--color-texto-secundario)",
    simbolo: "var(--color-texto)",
  },
} as const;

export type TomDaConstrucao = keyof typeof TONS;

const v = SIMBOLO_C1D.grande;
const NOS = v.nos;
const LIGACOES = DESENHOS.C1d.ligacoes;
// A grade passa pelos átomos e pelos centros dos círculos, como as guias da referência.
const GUIAS_X = [...new Set([...Object.values(NOS).map((n) => n.x), ...CIRCULOS_DA_NUVEM.map((c) => c.x)])];
const GUIAS_Y = [...new Set([...Object.values(NOS).map((n) => n.y), ...CIRCULOS_DA_NUVEM.map((c) => c.y)])];

export default function Construcao({
  tom = "escuro",
  cotas = true,
  viewBox = "2 10 124 78",
  className,
  preserveAspectRatio,
}: {
  tom?: TomDaConstrucao;
  cotas?: boolean;
  viewBox?: string;
  className?: string;
  /** O rodapé corta a planta pela base, como a marca de antes. */
  preserveAspectRatio?: string;
}) {
  const t = TONS[tom];
  const ambar = Object.entries(NOS).find(([, n]) => n.x === v.ambar.cx && n.y === v.ambar.cy)?.[0];
  return (
    <svg viewBox={viewBox} className={className} preserveAspectRatio={preserveAspectRatio} aria-hidden="true" focusable="false">
      <g stroke={t.grade} strokeWidth={0.25}>
        {GUIAS_X.map((x) => (
          <line key={`x${x}`} x1={x} y1={0} x2={x} y2={100} />
        ))}
        {GUIAS_Y.map((y) => (
          <line key={`y${y}`} x1={-10} y1={y} x2={140} y2={y} />
        ))}
      </g>
      <g fill="none" stroke={t.construcao} strokeWidth={0.35}>
        {CIRCULOS_DA_NUVEM.map((c) => (
          <g key={`${c.x},${c.y}`}>
            <circle cx={c.x} cy={c.y} r={c.r} strokeDasharray="1.2 1.2" />
            <rect x={c.x - 0.9} y={c.y - 0.9} width={1.8} height={1.8} fill={t.no} stroke="none" />
          </g>
        ))}
        {LIGACOES.map(([a, b]) => (
          <line key={a + b} x1={NOS[a].x} y1={NOS[a].y} x2={NOS[b].x} y2={NOS[b].y} />
        ))}
        {Object.entries(NOS).map(([id, n]) => (
          <circle
            key={id}
            cx={n.x}
            cy={n.y}
            r={n.r + 1.6}
            stroke={id === ambar ? "var(--color-acao)" : t.no}
            strokeWidth={0.4}
          />
        ))}
      </g>
      {cotas ? (
        <g fontFamily="var(--font-mono)" fontSize={2.4} fill={t.cota}>
          {CIRCULOS_DA_NUVEM.map((c) => (
            <g key={`r${c.x}`}>
              <line
                x1={c.x}
                y1={c.y}
                x2={c.x + c.r * 0.707}
                y2={c.y - c.r * 0.707}
                stroke={t.cota}
                strokeWidth={0.25}
              />
              <text x={c.x + c.r * 0.36 + 1} y={c.y - c.r * 0.36 - 1}>
                r {c.r}
              </text>
            </g>
          ))}
          <text x={NOS.V1.x - 4} y={NOS.V1.y + 11.5}>
            V · {COTAS_DOS_ATOMOS.V}
          </text>
          <text x={NOS.Ob.x + 6.5} y={NOS.Ob.y + 1}>
            O · {COTAS_DOS_ATOMOS.O}
          </text>
        </g>
      ) : null}
      <path d={v.nuvem} fill="none" stroke={t.simbolo} strokeWidth={v.tracoDaNuvem} strokeLinejoin="round" />
      <path d={v.rede} fill={t.simbolo} />
      <circle cx={v.ambar.cx} cy={v.ambar.cy} r={v.ambar.r} fill="var(--color-acao)" />
    </svg>
  );
}
