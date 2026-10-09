import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import {
  ATOMOS,
  CENTRO_DA_MOLECULA as C,
  GUIAS,
  PALCO,
  RESPIRO_DO_AMBAR,
  TRANSFORMACAO_DA_MOLECULA,
  V_DO_SINAL,
  caminhoDaCurva,
  particulasParadas,
} from "@/lib/palco";
import { CORES } from "@/lib/tokens";

const PARADAS = particulasParadas();

/** O filamento âmbar do V, parando no respiro do átomo âmbar. */
function filamento(): string {
  const pontos = V_DO_SINAL.map((id) => ATOMOS[id]);
  const fim = pontos[pontos.length - 1];
  const antes = pontos[pontos.length - 2];
  const d = Math.hypot(fim.x - antes.x, fim.y - antes.y);
  const recuo = (fim.r + RESPIRO_DO_AMBAR) / d;
  pontos[pontos.length - 1] = { ...fim, x: fim.x - (fim.x - antes.x) * recuo, y: fim.y - (fim.y - antes.y) * recuo };
  return pontos.map((p, i) => `${i ? "L" : "M"}${r2(p.x)} ${r2(p.y)}`).join("");
}
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * O palco do hero em SVG, do servidor: aros, trilhos, a molécula C1d e um
 * quadro parado das partículas. É o que aparece primeiro e o que fica com
 * menos movimento. Os canvas de `HeroMolecula` entram por cima com as mesmas
 * coordenadas: quando a 3D pinta, a molécula daqui sai; quando as partículas
 * pintam, saem as partículas paradas. Aros e trilhos ficam sempre.
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
        <linearGradient id="palco-borda" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CORES.violetaClaro} />
          <stop offset="0.5" stopColor={CORES.verdeClaro} />
          <stop offset="1" stopColor={CORES.azulClaro} />
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

      {/* A molécula parada: some quando a 3D (WebGL) pinta por cima. */}
      <circle
        className="palco-molecula"
        cx={r2(ambar.x)}
        cy={r2(ambar.y)}
        r={r2(ambar.r * 5.5)}
        fill="url(#palco-luz-ambar)"
      />
      {/* Vidro escuro com borda nas cores do vanádio e o filamento âmbar no V,
          como a molécula 3D desenha. */}
      <g className="palco-molecula">
        <path
          d={v.rede}
          transform={TRANSFORMACAO_DA_MOLECULA}
          fill="#15181D"
          stroke="url(#palco-borda)"
          strokeOpacity={0.75}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
        />
        <g fill="none" stroke={CORES.ambar} strokeLinecap="round" strokeLinejoin="round">
          <path d={filamento()} strokeWidth={3.2} strokeOpacity={0.18} />
          <path d={filamento()} strokeWidth={0.7} strokeOpacity={0.85} />
        </g>
        <circle cx={r2(ambar.x)} cy={r2(ambar.y)} r={r2(ambar.r)} fill={CORES.ambar} />
        {/* Reflexo de vidro em cada átomo, da luz que vem de cima à esquerda. */}
        <g fill={CORES.papel}>
          {Object.values(ATOMOS).map((a, i) => (
            <circle key={i} cx={r2(a.x - a.r * 0.38)} cy={r2(a.y - a.r * 0.38)} r={r2(a.r * 0.17)} opacity={0.75} />
          ))}
        </g>
      </g>
    </svg>
  );
}
