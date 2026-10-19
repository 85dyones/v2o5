import Link from "next/link";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Entradas from "@/components/layout/Entradas";
import JsonLd from "@/components/JsonLd";
import { Parada, Trecho } from "@/components/rota/Rota";
import { paginaDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

/**
 * Página do mapa que ainda não tem conteúdo: título, resumo e saída. Fica
 * com `noindex` (`pronta: false` em conteudo/paginas.ts) até ganhar texto.
 *
 * Na direção B é um trecho só da rota, fechado por fio de 2 px em tinta:
 * H1 à esquerda com a parada, e à direita, separada por fio, o resumo e a
 * saída. `etapa` pinta a rota (tráfego é atração, violeta); sem ela, o fio
 * é fino e neutro (guias). "Em construção" fica na tela acima do título:
 * diz o estado da página e também nomeia o trecho.
 */
export default function PaginaProvisoria({ rota, etapa }: { rota: string; etapa?: Etapa }) {
  const { titulo, descricao } = paginaDa(rota);
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* Na dobra: sem `adiada`, porque o H1 é o LCP. */}
        <Trecho
          aria-label="Em construção"
          etapa={etapa}
          adiada={false}
          className="!border-b-2 !border-texto"
          miolo="!py-0"
        >
          <div className="grid grid-cols-12">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <p className="rotulo mb-5 text-texto-secundario">Em construção</p>
              <div className="relative">
                <Parada />
                <h1 className="titulo-hero max-w-[16ch]">{titulo}</h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha bg-fundo pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              <p className="text-[1.0625rem] leading-relaxed">{descricao}</p>
              <Link href="/" className="botao botao-secundario mt-8">
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </Trecho>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDaInterna(rota)} />
      <Entradas />
    </>
  );
}
