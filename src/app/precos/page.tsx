import type { ReactNode } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { Parada, Trecho } from "@/components/rota/Rota";
import SprintDeEficiencia from "@/components/precos/SprintDeEficiencia";
import { metadataDa } from "@/conteudo/paginas";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { grafoDosPrecos } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

const ROTA = "/precos";

export const metadata = metadataDa(ROTA);

/**
 * Uma seção da página como trecho da rota: a parada à altura do título, o
 * título e o texto-guia empilhados nas 12 colunas, e o conteúdo embaixo. O
 * id do título é a âncora que outras páginas usam (`#titulo-sprint`). Sem
 * etapa, o trecho é o fio fino.
 */
function Secao({
  id,
  etapa,
  titulo,
  texto,
  adiada = true,
  children,
}: {
  id: string;
  etapa?: Etapa;
  titulo: ReactNode;
  texto?: string;
  adiada?: boolean;
  children: ReactNode;
}) {
  return (
    <Trecho aria-labelledby={`titulo-${id}`} etapa={etapa} adiada={adiada}>
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
 * A página de preços desde 25/10/2026: só o Sprint de Eficiência tem valor
 * público (as faixas de referência de `conteudo/sprint.ts`, aprovadas pelo
 * Dyones). Os planos, o tráfego, os módulos e os serviços do cardápio de
 * 15/10 ficam como dado interno em `precos.ts` e não são publicados. A rota
 * e a âncora `#perguntas` seguem; `#titulo-sprint` é o destino da home, da
 * vitrine e das páginas de solução.
 */
export default function Pagina() {
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* Acima da dobra: sem `adiada`. */}
        <section aria-label="Preços" className="trecho border-b-2 border-texto" data-fino="">
          <div className="conteiner conteiner-rota grid grid-cols-12">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-precos" className="titulo-hero max-w-[16ch]">
                  Sprint de Eficiência: preço fechado em proposta.
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              {/* Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto. */}
              <p className="text-[1.0625rem] leading-relaxed">
                O diagnóstico inicial é gratuito. O Sprint tem preço fechado em proposta, e a maioria dos projetos tem também uma parte recorrente.
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
          </div>
        </section>

        <Secao id="sprint" etapa="ambar" titulo={SPRINT_DE_PRECOS.titulo} texto={SPRINT_DE_PRECOS.texto} adiada={false}>
          <SprintDeEficiencia />
        </Secao>

        <Perguntas />
        <Fechamento secundario={null} />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="precos" />
      <JsonLd grafo={grafoDosPrecos()} />
      <Entradas />
    </>
  );
}
