import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Garantias from "@/components/home/Garantias";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import ParceiroDeFotografia from "@/components/precos/ParceiroDeFotografia";
import { ForaDaMensalidade, Modulos, OQueCresce, Planos, Servicos, Trafego } from "@/components/precos/TabelaDePrecos";
import { metadataDa } from "@/conteudo/paginas";
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
 * A página de preço no cardápio de 15/10/2026: três planos com preço
 * fechado, o tráfego, os módulos para quem já tem o sistema, os serviços,
 * o que cresce com o uso e o que fica fora, as garantias e as perguntas.
 * Quem chega aqui já quer saber quanto custa; a página responde antes de
 * pedir qualquer coisa.
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
              Três planos. Escolha pelo que falta na sua empresa.
            </h1>
            {/* Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto. */}
            <p className="texto-guia mt-7 max-w-[36rem]">
              Todo valor é a partir de, e o preço final sai do diagnóstico gratuito. Hospedagem, manutenção e suporte
              estão dentro da mensalidade.
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

        <section aria-labelledby="titulo-planos" className="py-10 md:py-14">
          <div className="conteiner">
            <h2 id="titulo-planos" className="sr-only">
              Planos
            </h2>
            <Planos />
          </div>
        </section>

        <Secao
          id="trafego"
          titulo="Para trazer mais gente: tráfego pago."
          texto="A gestão é por plataforma. Quem contrata Google Ads e Meta Ads juntos paga menos e leva o feed de catálogo, que põe o estoque ou os produtos no anúncio."
        >
          <Trafego />
        </Secao>

        <Secao
          id="modulos"
          titulo="Módulos, para quem já tem o sistema."
          texto="Entram em cima do Atendimento ou do Completo, na mesma base: o que um módulo registra aparece no CRM e no painel."
        >
          <Modulos />
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-texto-secundario">
            Para revendas, a consulta veicular completa e a área de repasse estão na{" "}
            <Link href="/segmentos/revendas-de-veiculos" className="link-sublinhado text-texto">
              página de revendas
            </Link>
            .
          </p>
        </Secao>

        <Secao id="servicos" titulo="Serviços feitos pela V2O5.">
          <Servicos />
        </Secao>

        <Secao
          id="cresce"
          titulo="O que cresce com você."
          texto="Mais gente, mais conversa e mais dado custam mais infra e mais cuidado. O preço de cada degrau está aqui, não na renovação."
        >
          <OQueCresce />
        </Secao>

        <Secao id="fora" titulo="O que fica fora da mensalidade.">
          <ForaDaMensalidade />
          <div className="mt-6">
            <ParceiroDeFotografia />
          </div>
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
