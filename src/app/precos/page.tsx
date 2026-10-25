import type { ReactNode } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Garantias from "@/components/home/Garantias";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { Parada, Trecho } from "@/components/rota/Rota";
import ParceiroDeFotografia from "@/components/precos/ParceiroDeFotografia";
import SprintDeEficiencia from "@/components/precos/SprintDeEficiencia";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { ForaDaMensalidade, Modulos, OQueCresce, Planos, ResumoDosPlanos, Servicos, Trafego } from "@/components/precos/TabelaDePrecos";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDosPrecos } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

const ROTA = "/precos";

export const metadata = metadataDa(ROTA);

/**
 * Uma seção da página como trecho da rota: a parada à altura do título, o
 * título e o texto-guia empilhados nas 12 colunas, e o conteúdo embaixo. O
 * id do título é a âncora que outras páginas usam (`#titulo-trafego`,
 * `#titulo-modulos`). Sem etapa, o trecho é o fio fino.
 */
function Secao({
  id,
  etapa,
  titulo,
  texto,
  children,
}: {
  id: string;
  etapa?: Etapa;
  titulo: ReactNode;
  texto?: string;
  children: ReactNode;
}) {
  return (
    <Trecho aria-labelledby={`titulo-${id}`} etapa={etapa}>
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id={`titulo-${id}`} className="titulo-secao col-span-12 lg:col-span-9">
          {titulo}
        </h2>
        {texto ? <p className="texto-guia col-span-12 mt-6 max-w-[40rem] lg:col-span-7">{texto}</p> : null}
      </div>
      <div className="mt-titulo-conteudo">{children}</div>
    </Trecho>
  );
}

/**
 * A página de preço no cardápio de 15/10/2026, na direção B (19/10): a rota
 * começa no título, passa pelos três planos numa tabela-ficha, desce pelo
 * cardápio (tráfego na atração, módulos na gestão, serviços cada um na sua
 * etapa), liga garantias e perguntas com o fio fino e termina no botão do
 * fecho, em âmbar. Quem chega aqui já quer saber quanto custa; a página
 * responde antes de pedir qualquer coisa.
 */
export default function Pagina() {
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* O rótulo "Preços" saiu da tela e virou o nome da seção (decisão de 19/10). Acima da dobra: sem `adiada`. */}
        <section aria-label="Preços" className="trecho border-b-2 border-texto" data-fino="">
          <div className="conteiner conteiner-rota grid grid-cols-12">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-precos" className="titulo-hero max-w-[16ch]">
                  Três planos. Escolha pelo que falta na sua empresa.
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              {/* Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto. */}
              <p className="text-[1.0625rem] leading-relaxed">
                Todo valor é a partir de, e o preço final sai do diagnóstico gratuito. Hospedagem, manutenção e suporte
                estão dentro da mensalidade.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  Pedir diagnóstico gratuito
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#perguntas" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
                  Ver as perguntas
                </a>
              </div>
            </div>
            <div className="col-span-12">
              <ResumoDosPlanos />
            </div>
          </div>
        </section>

        {/* Os planos logo abaixo da dobra: a primeira coisa que quem chega quer ver. Sem `adiada`. */}
        <Trecho aria-labelledby="titulo-planos" etapa="violeta" adiada={false}>
          <h2 id="titulo-planos" className="sr-only">
            Planos
          </h2>
          <div className="relative">
            <Parada />
            <Planos />
          </div>
        </Trecho>

        <Secao id="sprint" etapa="ambar" titulo={SPRINT_DE_PRECOS.titulo} texto={SPRINT_DE_PRECOS.texto}>
          <SprintDeEficiencia />
        </Secao>

        <Secao
          id="trafego"
          etapa="violeta"
          titulo={
            <>
              Para trazer mais gente: <span className="apagado">tráfego pago.</span>
            </>
          }
          texto="A gestão é por plataforma. Quem contrata Google Ads e Meta Ads juntos paga menos e leva o feed de catálogo, que põe o estoque ou os produtos no anúncio."
        >
          <Trafego />
        </Secao>

        <Secao
          id="modulos"
          etapa="azul"
          titulo={
            <>
              Módulos, <span className="apagado">para quem já tem o sistema.</span>
            </>
          }
          texto="Entram em cima do Atendimento ou do Completo, na mesma base: o que um módulo registra aparece no CRM e no painel."
        >
          <Modulos />
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-texto-secundario">
            Para revendas, a consulta veicular completa e a área de repasse estão na{" "}
            <Link href="/segmentos/revendas-de-veiculos" className="link-sublinhado text-texto">
              página de revendas
            </Link>
            .
          </p>
        </Secao>

        <Secao id="servicos" etapa="violeta" titulo="Serviços feitos pela V2O5.">
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
      <Entradas />
    </>
  );
}
