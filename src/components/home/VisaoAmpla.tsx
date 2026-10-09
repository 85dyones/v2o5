import Simbolo from "@/components/marca/Simbolo";
import { VISAO_360 } from "@/conteudo/home";
import { CORES, type Etapa } from "@/lib/tokens";

const COR: Record<Etapa, string> = {
  violeta: CORES.violetaClaro,
  verde: CORES.verdeClaro,
  azul: CORES.azulClaro,
  ambar: CORES.ambar,
};

// Anel: centro, raio e folga entre os arcos, no viewBox de 560 × 440.
const CX = 280;
const CY = 220;
const R = 132;
const FOLGA = 5; // graus

const r1 = (n: number) => Math.round(n * 10) / 10;
const ponto = (graus: number, raio: number) => {
  const a = (graus * Math.PI) / 180;
  return [r1(CX + raio * Math.cos(a)), r1(CY + raio * Math.sin(a))] as const;
};

/** O anel de 360°: as seis frentes que a V2O5 olha juntas, em volta do símbolo. */
function Anel() {
  const n = VISAO_360.anel.length;
  const passo = 360 / n;
  return (
    <div className="relative mx-auto w-full max-w-[36rem]">
      <svg viewBox="0 0 560 440" className="h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
        <circle cx={CX} cy={CY} r={R - 30} fill="none" stroke={CORES.papel} strokeOpacity={0.08} />
        <circle
          className="anel-gira"
          cx={CX}
          cy={CY}
          r={R + 22}
          fill="none"
          stroke={CORES.papel}
          strokeOpacity={0.12}
          strokeDasharray="2 10"
        />
        {VISAO_360.anel.map((parte, i) => {
          const inicio = -90 + i * passo + FOLGA / 2;
          const fim = -90 + (i + 1) * passo - FOLGA / 2;
          const [x1, y1] = ponto(inicio, R);
          const [x2, y2] = ponto(fim, R);
          const meio = (inicio + fim) / 2;
          const [tx, ty] = ponto(meio, R + 44);
          const cos = Math.cos((meio * Math.PI) / 180);
          const ancora = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
          return (
            <g key={parte.nome}>
              <path
                d={`M${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke={COR[parte.etapa]}
                strokeWidth={14}
                strokeLinecap="round"
                strokeOpacity={0.9}
              />
              <text x={tx} y={ty - 2} textAnchor={ancora} fill={CORES.papel} fontSize={17} fontWeight={600}>
                {parte.nome}
              </text>
              <text x={tx} y={ty + 17} textAnchor={ancora} fill={CORES.secundarioEscuro} fontSize={13.5}>
                {parte.detalhe}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(242_165_22/0.16),transparent)]" />
        <Simbolo className="relative h-auto w-full text-papel" />
        <p className="relative mt-2 text-sm font-semibold tracking-[-0.01em]">360°</p>
      </div>
    </div>
  );
}

/**
 * Visão 360: o caminho inteiro do cliente olhado por uma equipe só, do
 * mapa à venda. O anel repete as cores das etapas do diagrama.
 */
export default function VisaoAmpla() {
  const v = VISAO_360;
  return (
    <section aria-labelledby="titulo-visao" className="adiada relative py-24 md:py-36">
      <div className="conteiner grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="sobretitulo">{v.sobretitulo}</p>
          <h2 id="titulo-visao" className="titulo-secao mt-5">
            {v.titulo}
          </h2>
          <p className="texto-guia mt-6 max-w-[36rem]">{v.texto}</p>
          <div className="mt-8 flex max-w-[36rem] items-start gap-4 border-t border-linha pt-6">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violeta/60 to-azul/60 text-sm font-semibold contorno-forte"
            >
              DO
            </span>
            <p className="text-[0.9375rem] leading-relaxed text-secundario">{v.fundador}</p>
          </div>
        </div>
        <Anel />
      </div>
    </section>
  );
}
