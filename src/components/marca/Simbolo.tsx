import { DESENHOS, RAIO, SIMBOLO_ATUAL, VIEWBOX, type VarianteDoSimbolo } from "@/lib/marca";

const VIEWBOX_TEXTO = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.largura} ${VIEWBOX.altura}`;

/** Em 32 px ou menos fica só a nuvem, V1, V2 e Ot3 (regra de `marca.md`). */
const NOS_DO_REDUZIDO = new Set(["V1", "V2", "Ot3", "TR"]);

/**
 * O símbolo da V2O5. Server Component, SVG puro: é também o que aparece no
 * hero quando o canvas não carrega (sem JavaScript ou com menos movimento).
 *
 * As cores vêm de `currentColor` (traço) e `--cor-ambar`, para o mesmo
 * desenho servir sobre a tinta e sobre o papel.
 */
export default function Simbolo({
  variante = SIMBOLO_ATUAL,
  reduzido = false,
  className,
  titulo,
}: {
  variante?: VarianteDoSimbolo;
  reduzido?: boolean;
  className?: string;
  /** Sem título o SVG é decorativo (`aria-hidden`). */
  titulo?: string;
}) {
  const desenho = DESENHOS[variante];
  const solido = variante === "C1c";
  const porId = new Map(desenho.nos.map((n) => [n.id, n]));
  const nos = reduzido ? desenho.nos.filter((n) => NOS_DO_REDUZIDO.has(n.id)) : desenho.nos;
  // No C1c a rede é vazada: desenhada na cor do fundo por cima da nuvem cheia.
  const corDaRede = solido ? "var(--cor-fundo-simbolo, var(--color-tinta))" : "currentColor";

  return (
    <svg
      viewBox={VIEWBOX_TEXTO}
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path
        d={desenho.nuvem}
        fill={solido ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {desenho.extra && !reduzido ? (
        <path d={desenho.extra} stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
      ) : null}
      {!reduzido ? (
        <g stroke={corDaRede} strokeLinecap="round">
          {desenho.ligacoes.map(([a, b]) => {
            const na = porId.get(a)!;
            const nb = porId.get(b)!;
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                strokeWidth={variante === "C1a" ? 4.5 : 3.5}
              />
            );
          })}
          {desenho.ramos?.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2.5} />
          ))}
        </g>
      ) : null}
      {nos.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={RAIO[n.tipo]}
          fill={n.ambar ? "var(--color-ambar)" : corDaRede}
        />
      ))}
    </svg>
  );
}
