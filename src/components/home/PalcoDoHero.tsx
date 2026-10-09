import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import {
  ATOMOS,
  CENTRO_DA_MOLECULA as C,
  GUIAS,
  PALCO,
  TRANSFORMACAO_DA_MOLECULA,
  caminhoDaCurva,
  particulasParadas,
} from "@/lib/palco";
import { CORES } from "@/lib/tokens";

const PARADAS = particulasParadas();
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * O palco do hero em SVG, do servidor: aros, trilhos, a molécula C1d e um
 * quadro parado das partículas. É o que aparece primeiro e o que fica com
 * menos movimento. O canvas (`HeroMolecula`) entra por cima com as mesmas
 * coordenadas e, quando pinta, só as partículas paradas saem.
 */
export default function PalcoDoHero() {
  const v = SIMBOLO_C1D.grande;
  const ambar = ATOMOS.Ot4;
  const xMaisAEsquerda = Math.min(ATOMOS.Ot1.x, ATOMOS.Ot2.x);
  return (
    <svg
      viewBox={`0 0 ${PALCO.largura} ${PALCO.altura}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="palco-luz-ambar">
          <stop offset="0" stopColor={CORES.ambar} stopOpacity="0.5" />
          <stop offset="0.3" stopColor={CORES.ambar} stopOpacity="0.14" />
          <stop offset="1" stopColor={CORES.ambar} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="palco-luz-centro">
          <stop offset="0" stopColor={CORES.papel} stopOpacity="0.07" />
          <stop offset="1" stopColor={CORES.papel} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="palco-entrada" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={r2(xMaisAEsquerda)} y2="0">
          <stop offset="0" stopColor={CORES.secundarioEscuro} stopOpacity="0" />
          <stop offset="1" stopColor={CORES.secundarioEscuro} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="palco-saida"
          gradientUnits="userSpaceOnUse"
          x1={r2(ambar.x)}
          y1="0"
          x2={PALCO.largura}
          y2="0"
        >
          <stop offset="0" stopColor={CORES.ambar} stopOpacity="0.55" />
          <stop offset="1" stopColor={CORES.ambar} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="palco-molecula" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CORES.papel} />
          <stop offset="1" stopColor={CORES.papel} stopOpacity="0.78" />
        </linearGradient>
      </defs>

      <circle cx={C.x} cy={C.y} r={48} fill="url(#palco-luz-centro)" />
      <g fill="none" stroke={CORES.papel} strokeWidth={1} vectorEffect="non-scaling-stroke">
        <circle cx={C.x} cy={C.y} r={34} strokeOpacity={0.08} vectorEffect="non-scaling-stroke" />
        <circle
          cx={C.x}
          cy={C.y}
          r={50}
          strokeOpacity={0.07}
          strokeDasharray="0.6 2.4"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g fill="none" strokeWidth={1}>
        {GUIAS.entrada.map((c, i) => (
          <path key={`e${i}`} d={caminhoDaCurva(c)} stroke="url(#palco-entrada)" vectorEffect="non-scaling-stroke" />
        ))}
        {GUIAS.saida.map((c, i) => (
          <path key={`s${i}`} d={caminhoDaCurva(c)} stroke="url(#palco-saida)" vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g className="palco-particulas">
        <g fill={CORES.secundarioEscuro}>
          {PARADAS.filter((p) => p.tipo === "entrada").map((p, i) => (
            <circle key={i} cx={r1(p.x)} cy={r1(p.y)} r={r2(p.tamanho)} opacity={r1(p.alfa)} />
          ))}
        </g>
        <path
          d={PARADAS.filter((p) => p.tipo === "saida")
            .map((p) => `M${r1(p.de!.x)} ${r1(p.de!.y)}L${r1(p.x)} ${r1(p.y)}`)
            .join("")}
          fill="none"
          stroke={CORES.ambar}
          strokeWidth={0.5}
          strokeLinecap="round"
          opacity={0.8}
        />
        <g fill={CORES.ambarForte}>
          {PARADAS.filter((p) => p.tipo === "saida").map((p, i) => (
            <circle key={i} cx={r1(p.x)} cy={r1(p.y)} r={r2(p.tamanho)} opacity={r1(p.alfa)} />
          ))}
        </g>
      </g>

      <circle cx={r2(ambar.x)} cy={r2(ambar.y)} r={r2(ambar.r * 5.5)} fill="url(#palco-luz-ambar)" />
      <g transform={TRANSFORMACAO_DA_MOLECULA}>
        <path d={v.rede} fill="url(#palco-molecula)" />
        <circle cx={v.ambar.cx} cy={v.ambar.cy} r={v.ambar.r} fill={CORES.ambar} />
      </g>
    </svg>
  );
}
