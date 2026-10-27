import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { COR_DA_ROTA, ComMarcas, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { metadataDa } from "@/conteudo/paginas";
import {
  continuidadeAPartirDe,
  mensalEmTexto,
  OFERTAS,
  PLANOS_DE_CONTINUIDADE,
  precoDeEntrada,
  precoEmTexto,
  REGRAS_DE_PRECO,
} from "@/conteudo/ofertas";
import { grafoDosPrecos } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

const ROTA = "/precos";

export const metadata = metadataDa(ROTA);

/** Uma seção da página como trecho da rota, com a parada à altura do título. */
function Secao({ id, etapa, titulo, texto, children }: { id: string; etapa?: Etapa; titulo: ReactNode; texto?: string; children: ReactNode }) {
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

/** Uma linha de preço: nome (com a mensalidade opcional embaixo, quando há) e o valor no marca-texto, sem quebrar. */
function LinhaDePreco({ nome, preco, mensal }: { nome: string; preco: string; mensal?: string }) {
  return (
    <li className="flex items-baseline justify-between gap-x-6 border-b border-linha py-4">
      <span className="font-medium">
        {nome}
        {mensal ? <span className="mt-1 block text-[0.875rem] font-normal tabular-nums text-texto-secundario">Mensalidade opcional: {mensal}</span> : null}
      </span>
      <span className="whitespace-nowrap font-semibold tabular-nums">
        <ComMarcas texto={preco} marcas={[preco]} etapa="ambar" />
      </span>
    </li>
  );
}

/**
 * A página de preços desde 27/10/2026: o resumo das quatro soluções e da
 * continuidade (preço de entrada) e a lista curta de todos os pacotes, com o
 * preço exato de cada um. A lista inteira fica aqui de propósito: é a tabela
 * que a skill `diagnostico-presenca` lê para montar a proposta e conferir
 * cada valor (`docs/2026-10-27-portfolio-no-site.md`, seção 6). O detalhe
 * de cada pacote mora na página da solução. `#titulo-sprint` continua
 * pousando no Sprint, destino de links antigos, da vitrine e do schema.
 */
export default function Pagina() {
  const comPreco = (texto: string) => texto.replace(/^a/, "A");
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
                <h1 id="titulo-precos" className="titulo-hero max-w-[18ch]">
                  Quatro soluções, com preço de referência.
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              {/* Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto. */}
              <p className="text-[1.0625rem] leading-relaxed">
                O diagnóstico inicial é gratuito. Cada solução tem pacotes com escopo claro, e a continuidade é opcional.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  Pedir diagnóstico gratuito
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#titulo-pacotes" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
                  Ver todos os pacotes
                </a>
              </div>
            </div>
          </div>
        </section>

        <Secao id="resumo" etapa="violeta" titulo={<>Quatro soluções e a continuidade. <span className="apagado">Nenhuma obriga a seguinte.</span></>}>
          <ul className="border-t-2 border-texto">
            {OFERTAS.map((o) => (
              <li key={o.id} className="servico" style={{ "--cor-da-rota": COR_DA_ROTA[o.etapa] } as CSSProperties}>
                <Link href={o.rota} className="servico-celula grid grid-cols-12 gap-x-6 gap-y-2 border-b border-linha py-6 md:py-7">
                  <Parada />
                  <span className="col-span-12 md:col-span-4">
                    <span className="titulo-cartao block" style={{ color: TEXTO_DA_ETAPA[o.etapa] }}>
                      {o.nome}
                    </span>
                  </span>
                  <span className="col-span-12 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-5">{o.resolve}</span>
                  <span className="col-span-12 font-semibold tabular-nums md:col-span-3 md:text-right">
                    <ComMarcas texto={comPreco(precoEmTexto({ valor: precoDeEntrada(o), aPartirDe: true }))} marcas={[comPreco(precoEmTexto({ valor: precoDeEntrada(o), aPartirDe: true }))]} etapa="ambar" />
                  </span>
                </Link>
              </li>
            ))}
            <li className="servico" style={{ "--cor-da-rota": COR_DA_ROTA.azul } as CSSProperties}>
              <Link href="/continuidade" className="servico-celula grid grid-cols-12 gap-x-6 gap-y-2 border-b border-linha py-6 md:py-7">
                <Parada />
                <span className="titulo-cartao col-span-12 md:col-span-4">Continuidade</span>
                <span className="col-span-12 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-5">
                  Manter funcionando e evoluindo o que foi entregue, com limites escritos. Opcional.
                </span>
                <span className="col-span-12 font-semibold tabular-nums md:col-span-3 md:text-right">
                  <ComMarcas texto={`Planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}`} marcas={[`a partir de ${mensalEmTexto(continuidadeAPartirDe())}`]} etapa="ambar" />
                </span>
              </Link>
            </li>
          </ul>
        </Secao>

        <Secao
          id="pacotes"
          etapa="ambar"
          titulo={<>Todos os pacotes. <span className="apagado">O detalhe de cada um está na página da solução.</span></>}
          texto="São preços de referência. O valor fechado sai em proposta, para um escopo conhecido."
        >
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
            {OFERTAS.map((o) => (
              <div key={o.id}>
                <h3 id={o.id === "sprint" ? "titulo-sprint" : `titulo-${o.id}`} className="titulo-cartao border-b-2 border-texto pb-3">
                  {o.nome}
                </h3>
                <ul>
                  {o.pacotes.map((p) => (
                    <LinhaDePreco key={p.nome} nome={p.nome} preco={comPreco(precoEmTexto(p.preco))} mensal={p.mensal ? mensalEmTexto(p.mensal.valor) : undefined} />
                  ))}
                </ul>
                <Link href={o.rota} className="link-sublinhado mt-4 inline-flex min-h-11 items-center text-[0.9375rem] font-medium" data-evento="cta_click" data-local="precos">
                  Ver {o.nome}
                </Link>
              </div>
            ))}
            <div>
              <h3 id="titulo-continuidade" className="titulo-cartao border-b-2 border-texto pb-3">
                Continuidade
              </h3>
              <ul>
                {PLANOS_DE_CONTINUIDADE.map((p) => (
                  <LinhaDePreco key={p.nome} nome={p.nome} preco={mensalEmTexto(p.mensal)} />
                ))}
              </ul>
              <Link href="/continuidade" className="link-sublinhado mt-4 inline-flex min-h-11 items-center text-[0.9375rem] font-medium" data-evento="cta_click" data-local="precos">
                Ver a continuidade e os limites
              </Link>
            </div>
          </div>
        </Secao>

        <Secao id="regras" titulo={<>Como o preço funciona. <span className="apagado">O mesmo em todas as soluções.</span></>}>
          <ul className="grid gap-3 md:grid-cols-2">
            {REGRAS_DE_PRECO.map((r) => (
              <li key={r} className="border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
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
