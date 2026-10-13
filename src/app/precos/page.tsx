import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Garantias from "@/components/home/Garantias";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { ForaDaMensalidade, OQueCresce, Pacote, Reativacao, Tabela, Trafego } from "@/components/precos/TabelaDePrecos";
import { metadataDa } from "@/conteudo/paginas";
import { BRL, PISO_DA_MENSALIDADE } from "@/conteudo/precos";
import { grafoDosPrecos } from "@/lib/schema";

const ROTA = "/precos";

export const metadata = metadataDa(ROTA);

/** Uma seção da página, com título visível e o espaçamento padrão. */
function Secao({ id, titulo, texto, children }: { id: string; titulo: string; texto?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`titulo-${id}`} className="py-12 md:py-16">
      <div className="conteiner">
        <div className="max-w-[44rem]">
          <h2 id={`titulo-${id}`} className="text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
            {titulo}
          </h2>
          {texto ? <p className="texto-guia mt-4">{texto}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/**
 * A página de preço: a tabela inteira nos dois pilares, o que cresce com o
 * cliente, o tráfego por plataforma, a reativação com os canais, o pacote
 * automotivo com o desconto calculado, o que fica fora, as garantias e as
 * perguntas. Quem chega aqui já quer saber quanto custa; a página responde
 * antes de pedir qualquer coisa.
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
              Quanto custa, linha por linha, e o que cresce com você.
            </h1>
            {/* Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto. */}
            <p className="texto-guia mt-7 max-w-[36rem]">
              Todo valor é a partir de: o preço final sai do diagnóstico, com o escopo fechado. Nenhuma mensalidade
              fica abaixo de {BRL(PISO_DA_MENSALIDADE)}.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                Pedir diagnóstico gratuito
                <Icone nome="seta" className="seta size-4" />
              </Link>
              <a href="#perguntas" className="botao botao-secundario" data-evento="cta_click" data-local="hero">
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

        <Secao
          id="cresce"
          titulo="O que cresce com você."
          texto="Mais gente, mais conversa e mais dado custam mais infra e mais cuidado. O preço de cada degrau está aqui, não na renovação."
        >
          <OQueCresce />
        </Secao>

        <Secao
          id="trafego"
          titulo="Tráfego pago, por plataforma ou junto."
          texto="A gestão é por plataforma. Quem contrata Google Ads e Meta Ads juntos paga menos e leva o feed de catálogo, que põe o estoque ou os produtos no anúncio."
        >
          <Trafego />
        </Secao>

        <Secao
          id="reativacao"
          titulo="Reativação de base: o canal muda o custo e o risco."
          texto="A campanha é a mesma. O que muda é por onde a mensagem sai, quanto a operadora ou a Meta cobram e o que pode acontecer com o número."
        >
          <Reativacao />
        </Secao>

        <section aria-labelledby="titulo-pacote" className="py-12 md:py-16">
          <div className="conteiner">
            <h2 id="titulo-pacote" className="sr-only">
              Pacote para revendas de veículos
            </h2>
            <Pacote />
          </div>
        </section>

        <Secao id="fora" titulo="O que fica fora da mensalidade.">
          <ForaDaMensalidade />
        </Secao>

        <Garantias />
        <Perguntas />
        <Fechamento />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="precos" />
      <JsonLd grafo={grafoDosPrecos()} />
    </>
  );
}
