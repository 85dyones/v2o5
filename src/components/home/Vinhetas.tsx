import type { CSSProperties, ReactNode } from "react";
import { COR_DA_ROTA } from "@/components/rota/Rota";
import { VINHETAS, type Vinheta } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

/**
 * A cena de interface das páginas de solução (direção B, 19/10): no máximo
 * uma por página, e só onde mostra o que o texto não mostra. Ficou o funil
 * do CRM, que põe a origem em cada contato de cada etapa; as outras cenas
 * repetiam o texto ou a demonstração da própria página e saíram. Células em
 * fio, sem raio e sem sombra; HTML parado, do servidor, decorativo.
 */

const CENAS: Partial<Record<Vinheta, () => ReactNode>> = {
  crm: Funil,
};

/** Se a linha tem uma cena desenhada. */
export const temVinheta = (vinheta: Vinheta) => vinheta in CENAS;

export default function VinhetaDaLinha({ vinheta }: { vinheta: Vinheta }) {
  const Cena = CENAS[vinheta];
  return Cena ? <Cena /> : null;
}

/** O funil em três colunas; cada contato leva a origem embaixo do nome. */
function Funil() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 text-[0.8125rem]">
      {VINHETAS.crm.map((c, i) => (
        <div
          key={c.coluna}
          className={`flex min-w-0 flex-col ${i > 0 ? "border-l border-linha" : ""}`}
          style={{ "--cor": COR_DA_ROTA[c.etapa as Etapa] } as CSSProperties}
        >
          {/* Em 390 a coluna fica estreita: o trilho do grid trava em minmax(0,1fr)
              e o cabeçalho desce a 11 px para "Atendimento" caber inteiro e o resto quebra dentro da célula; a partir de sm, truncate. */}
          <p className="flex min-w-0 items-center gap-1.5 border-b border-linha px-2 py-2.5 text-[0.6875rem] sm:gap-2 font-medium sm:px-3 sm:text-[0.8125rem]">
            <span className="size-2 shrink-0 bg-(--cor)" />
            <span className="min-w-0 break-words leading-tight sm:truncate">{c.coluna}</span>
          </p>
          <ul className="grid grid-cols-[minmax(0,1fr)] content-start gap-2 p-2 sm:p-3">
            {c.cartoes.map(([carro, origem]) => (
              <li key={carro} className="min-w-0 border border-linha bg-fundo-cartao px-2.5 py-2">
                <p className="break-words font-semibold leading-tight sm:truncate">{carro}</p>
                <p className="rotulo mt-1 break-words text-texto-secundario sm:truncate">{origem}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
