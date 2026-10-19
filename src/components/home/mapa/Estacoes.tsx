import type { CSSProperties } from "react";
import { COR_DA_ROTA } from "@/components/rota/Rota";
import { NOME_DA_ETAPA, PECAS, type IdDaPeca } from "@/conteudo/home";

/**
 * O mapa das sete peças: uma faixa de células em que a linha das etapas
 * atravessa as estações. Sem estado: a abertura o usa com foco ao passar o
 * mouse, e o "Como tudo se liga" com a peça escolhida. Com `foco`, as
 * estações fora do caminho da peça apagam para 30% (CSS).
 */
export default function Estacoes({
  foco,
  escolhida,
  aoEscolher,
  aoFocar,
  className = "",
  rotulo,
}: {
  foco?: IdDaPeca | null;
  escolhida?: IdDaPeca;
  aoEscolher?: (id: IdDaPeca) => void;
  aoFocar?: (id: IdDaPeca | null) => void;
  className?: string;
  rotulo: string;
}) {
  const caminho = foco ? new Set(PECAS.find((p) => p.id === foco)!.caminho) : null;
  const botoes = Boolean(aoEscolher);
  return (
    <ol
      aria-label={rotulo}
      className={`estacoes ${className}`}
      data-foco={foco ? "" : undefined}
      onMouseLeave={aoFocar ? () => aoFocar(null) : undefined}
    >
      {PECAS.map((p, i) => {
        const estilo = { "--cor-da-rota": COR_DA_ROTA[p.etapa], "--i": i } as CSSProperties;
        const comum = {
          "data-etapa": p.etapa,
          "data-no-caminho": caminho?.has(p.id) ? "" : undefined,
          "data-escolhida": !botoes && p.id === escolhida ? "" : undefined,
          onMouseEnter: aoFocar ? () => aoFocar(p.id) : undefined,
        };
        const miolo = (
          <>
            <span aria-hidden="true" className="estacao-trilho">
              <span className="estacao-ponto" />
            </span>
            <span className="estacao-nome">{p.nome}</span>
            <span className="rotulo">{NOME_DA_ETAPA[p.etapa]}</span>
          </>
        );
        return (
          <li key={p.id} className="contents">
            {botoes ? (
              <button
                type="button"
                className="estacao w-full"
                style={estilo}
                aria-pressed={p.id === escolhida}
                onClick={() => aoEscolher!(p.id)}
                onFocus={aoFocar ? () => aoFocar(p.id) : undefined}
                {...comum}
              >
                {miolo}
              </button>
            ) : (
              <span className="estacao" style={estilo} {...comum}>
                {miolo}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
