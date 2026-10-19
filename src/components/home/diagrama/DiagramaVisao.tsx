import type { CSSProperties } from "react";
import Estacoes from "@/components/home/mapa/Estacoes";
import { COR_DA_ROTA, TEXTO_DA_ETAPA } from "@/components/rota/Rota";
import { NOME_DA_ETAPA, PECAS, type IdDaPeca } from "@/conteudo/home";

/**
 * O diagrama sem estado: o servidor o desenha com a peça "Site" escolhida
 * (zero JavaScript); a versão interativa usa este mesmo componente e
 * acrescenta clique, teclado e o foco ao passar o mouse. É o mapa da
 * abertura em tamanho grande: as estações fora do caminho da peça apagam, e
 * o painel diz o que ela faz e por onde o contato passa.
 */

export interface PropsDoDiagrama {
  selecionada: IdDaPeca;
  foco?: IdDaPeca | null;
  aoEscolher?: (id: IdDaPeca) => void;
  aoFocar?: (id: IdDaPeca | null) => void;
}

export default function DiagramaVisao({ selecionada, foco, aoEscolher, aoFocar }: PropsDoDiagrama) {
  const peca = PECAS.find((p) => p.id === selecionada)!;
  const passos = peca.caminho.map((id) => PECAS.find((p) => p.id === id)!);

  return (
    <div className="border-y-2 border-texto">
      <div className="border-b border-linha">
        <Estacoes
          rotulo="Diagrama: como as peças do sistema se ligam"
          foco={foco ?? selecionada}
          escolhida={selecionada}
          aoEscolher={aoEscolher}
          aoFocar={aoFocar}
        />
      </div>

      <div aria-live="polite" className="grid grid-cols-12 gap-x-6 gap-y-8 py-8 md:py-10">
        <div className="col-span-12 md:col-span-5">
          <p className="rotulo" style={{ color: TEXTO_DA_ETAPA[peca.etapa] }}>
            {NOME_DA_ETAPA[peca.etapa]}
          </p>
          <h3 className="mt-3 text-titulo-3">{peca.nome}</h3>
          <p className="mt-3 max-w-[30rem] text-texto-secundario">{peca.texto}</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:border-l md:border-linha md:pl-8">
          <p className="text-sm font-medium">Caminho que passa por aqui</p>
          <ol className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
            {passos.map((p, i) => (
              <li key={`${p.id}-${i}`} className="flex items-center gap-1">
                {i > 0 ? (
                  <span aria-hidden="true" className="px-1 text-texto-secundario">
                    →
                  </span>
                ) : null}
                <span className="chip min-h-8 px-2.5 text-[0.8125rem]">
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-(--cor)"
                    style={{ "--cor": COR_DA_ROTA[p.etapa] } as CSSProperties}
                  />
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
