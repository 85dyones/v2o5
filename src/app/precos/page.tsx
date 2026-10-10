import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Garantias from "@/components/home/Garantias";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { ForaDaMensalidade, Pacote, Tabela } from "@/components/precos/TabelaDePrecos";
import { metadataDa } from "@/conteudo/paginas";
import { BRL, PISO_DA_MENSALIDADE } from "@/conteudo/precos";
import { grafoDosPrecos } from "@/lib/schema";

const ROTA = "/precos";

export const metadata = metadataDa(ROTA);

/**
 * A página de preço: a tabela inteira, o pacote automotivo com o desconto
 * calculado, o que fica fora, as garantias e as perguntas. Quem chega aqui
 * já quer saber quanto custa; a página responde antes de pedir qualquer coisa.
 */
export default function Pagina() {
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-labelledby="titulo-precos" className="relative isolate">
          <div aria-hidden="true" className="hero-fundo" />
          <div className="conteiner pb-12 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
            <p className="sobretitulo">Preços</p>
            <h1 id="titulo-precos" className="titulo-hero mt-5 max-w-[46rem]">
              Quanto custa, linha por linha.
            </h1>
            <p className="texto-guia mt-7 max-w-[40rem]">
              Todo valor aqui é a partir de: o preço final sai do diagnóstico, com o escopo fechado antes de começar.
              Nenhuma mensalidade fica abaixo de {BRL(PISO_DA_MENSALIDADE)}, porque ela cobre hospedagem e manutenção
              de verdade.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/diagnostico" className="botao botao-primario">
                Pedir diagnóstico gratuito
                <Icone nome="seta" className="seta size-4" />
              </Link>
              <a href="#perguntas" className="botao botao-secundario">
                Ver as perguntas
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-tabela" className="py-10 md:py-14">
          <div className="conteiner">
            <h2 id="titulo-tabela" className="sr-only">
              Tabela de preços
            </h2>
            <Tabela />
          </div>
        </section>

        <section aria-labelledby="titulo-pacote" className="py-10 md:py-14">
          <div className="conteiner">
            <h2 id="titulo-pacote" className="sr-only">
              Pacote para revendas de veículos
            </h2>
            <Pacote />
          </div>
        </section>

        <section aria-labelledby="titulo-fora" className="py-10 md:py-14">
          <div className="conteiner">
            <h2 id="titulo-fora" className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
              O que fica fora da mensalidade
            </h2>
            <div className="mt-6">
              <ForaDaMensalidade />
            </div>
          </div>
        </section>

        <Garantias />
        <Perguntas />
        <Fechamento />
      </main>
      <Rodape />
      <JsonLd grafo={grafoDosPrecos()} />
    </>
  );
}
