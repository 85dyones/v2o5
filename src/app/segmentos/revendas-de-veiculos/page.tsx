import type { CSSProperties, ReactNode } from "react";
import CapturasDaMotors from "@/components/case/CapturasDaMotors";
import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Perguntas from "@/components/home/Perguntas";
import Construcao from "@/components/marca/Construcao";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import { COR_DA_ROTA, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoHubAutomotivo } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

const ROTA = HUB_AUTOMOTIVO.rota;

export const metadata = metadataDa(ROTA);

/** A etapa de cada peça do pacote, na ordem dele (rastreamento é atração, como na home). */
const ETAPA_DA_PECA: Etapa[] = ["violeta", "verde", "azul", "violeta"];

/**
 * A etapa de cada passo do caminho de um lead: o estoque é gestão, a busca é
 * atração, o WhatsApp é atendimento, o CRM é gestão e o último é a venda.
 */
const ETAPA_DO_PASSO: Etapa[] = ["azul", "violeta", "verde", "azul", "ambar"];

/**
 * O fio de cada célula da ficha do hero: uma por linha no celular, duas por
 * linha no meio e quatro no desktop.
 */
const BORDA_DO_FATO = [
  "",
  "border-t sm:border-t-0 sm:border-l sm:pl-5",
  "border-t lg:border-t-0 lg:border-l lg:pl-5",
  "border-t lg:border-t-0 sm:border-l sm:pl-5",
];

/** O título da seção com a parada da rota à altura dele e o texto-guia ao lado. */
function Cabeca({ id, titulo, texto }: { id: string; titulo: string; texto: string }) {
  return (
    <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
      <Parada />
      <h2 id={id} className="titulo-secao col-span-12 lg:col-span-7">
        {titulo}
      </h2>
      <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{texto}</p>
    </div>
  );
}

/** Uma linha da ficha que pinta o trecho da rota na cor da etapa e leva a parada dela. */
function Linha({ etapa, className = "", children }: { etapa: Etapa; className?: string; children: ReactNode }) {
  return (
    <li className="servico" style={{ "--cor-da-rota": COR_DA_ROTA[etapa] } as CSSProperties}>
      <div className={`relative grid grid-cols-12 gap-x-6 gap-y-3 border-b border-linha py-6 md:py-7 ${className}`}>
        <Parada />
        {children}
      </div>
    </li>
  );
}

/**
 * O hub do segmento automotivo na direção B (19/10): a rota começa no H1,
 * passa pelas quatro peças que um Sprint para revendas costuma juntar (cada
 * uma na cor da sua etapa), pelo caminho de um lead na revenda (do estoque à
 * venda) e pelos números do case em mosaico; as perguntas ligam com o fio
 * fino e a rota termina, em âmbar, no botão da chamada. Sem valor público
 * (25/10/2026). Conteúdo em `conteudo/automotivo.ts`.
 */
export default function Pagina() {
  const h = HUB_AUTOMOTIVO;
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* O rótulo "Revendas de veículos" saiu da tela e virou o nome da seção (decisão de 19/10). Acima da dobra: sem `adiada`. */}
        <section aria-label={h.sobretitulo} className="trecho border-b-2 border-texto" data-fino="">
          <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-hub" className="titulo-hero max-w-[15ch]">
                  {h.titulo}
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              {/* Curto de propósito: o LCP da página é o H1. */}
              <p className="text-[1.0625rem] leading-relaxed">{h.resumo}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  {h.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#titulo-pacote" className="link-sublinhado inline-flex min-h-11 items-center text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
                  Ver o pacote
                </a>
              </div>
            </div>
          </div>

          {/* Os sistemas de gestão numa faixa de células, como as ferramentas da home. */}
          <div className="conteiner conteiner-rota border-b border-linha">
            <div className="flex flex-col py-4 md:flex-row md:items-stretch md:py-0">
              <p className="rotulo flex items-center text-texto-secundario md:min-h-12 md:border-r md:border-linha md:pr-5 xl:max-w-[11rem] xl:shrink-0">
                {h.sistemas.rotulo}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 md:mt-0 md:min-w-0 md:flex-1 md:gap-0 xl:flex-nowrap">
                <li className="flex items-center font-mono text-[0.8125rem] font-medium md:min-h-12 md:border-r md:border-linha md:px-5 xl:px-4">
                  <span>
                    {h.sistemas.emProducao} <span className="text-etapa-atendimento">· em produção</span>
                  </span>
                </li>
                {h.sistemas.integraveis.map((s) => (
                  <li
                    key={s}
                    className="flex items-center font-mono text-[0.8125rem] font-medium text-texto-secundario md:min-h-12 md:border-r md:border-linha md:px-5 xl:px-4"
                  >
                    {s}
                  </li>
                ))}
                <li className="flex items-center font-mono text-[0.8125rem] font-medium text-texto-secundario md:min-h-12 md:basis-full md:border-t md:border-linha md:px-5 xl:basis-auto xl:border-t-0 xl:px-4">
                  {h.sistemas.outros}
                </li>
              </ul>
            </div>
          </div>

          {/* A ficha do hub: quatro células em fio; o preço do Completo no marca-texto. */}
          <div className="conteiner conteiner-rota">
            <dl className="grid grid-cols-12">
              {h.fatos.map((f, i) => (
                <div
                  key={f.rotulo}
                  className={`col-span-12 border-linha py-5 pr-5 sm:col-span-6 md:py-6 lg:col-span-3 ${BORDA_DO_FATO[i]}`}
                >
                  <dt className="rotulo text-texto-secundario">{f.rotulo}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-snug">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* As quatro peças, cada uma na cor da sua etapa: do violeta da presença ao azul da gestão. */}
        <Trecho aria-labelledby="titulo-pacote" etapa="violeta">
          <Cabeca id="titulo-pacote" titulo={h.pacote.titulo} texto={h.pacote.texto} />
          <ul className="mt-titulo-conteudo border-t-2 border-texto">
            {h.pacote.pecas.map((peca, i) => (
              <Linha key={peca.titulo} etapa={ETAPA_DA_PECA[i]}>
                <div className="col-span-12 md:col-span-5">
                  <p className="rotulo" style={{ color: TEXTO_DA_ETAPA[ETAPA_DA_PECA[i]] }}>
                    {peca.linha}
                  </p>
                  <h3 className="titulo-cartao mt-2">{peca.titulo}</h3>
                </div>
                <p className="col-span-12 max-w-[40rem] text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-7 md:pt-6">
                  {peca.texto}
                </p>
                {/* O site de estoque mostrado, não só descrito: as telas reais da Motors (19/10). */}
                {i === 0 ? (
                  <CapturasDaMotors className="col-span-12 mt-4 md:col-span-7 md:col-start-6" sizes="(min-width: 64rem) 18vw, (min-width: 40rem) 28vw, 90vw" />
                ) : null}
              </Linha>
            ))}
          </ul>
        </Trecho>

        {/* O caminho de um lead é a própria rota: cada passo pinta a margem na cor da sua etapa e o último é a venda. */}
        <Trecho aria-labelledby="titulo-caminho" etapa="azul" etapaFim="ambar">
          <Cabeca id="titulo-caminho" titulo={h.caminho.titulo} texto={h.caminho.texto} />
          <ol className="mt-titulo-conteudo border-t-2 border-texto">
            {h.caminho.passos.map((p, i) => (
              <Linha key={p.titulo} etapa={ETAPA_DO_PASSO[i]}>
                <span className="numero col-span-2 text-[0.9375rem] text-texto-secundario md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] md:col-span-4">
                  {p.titulo}
                </span>
                <span className="col-span-12 max-w-[38rem] text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-7">
                  {p.texto}
                </span>
              </Linha>
            ))}
          </ol>
        </Trecho>

        {/* Os números do case num mosaico de células (tinta, papel, hachura), estáticos, com a fonte logo embaixo. */}
        <Trecho aria-labelledby="titulo-medido" etapa="azul">
          <Cabeca id="titulo-medido" titulo={h.case.titulo} texto={h.case.texto} />
          <dl className="mt-titulo-conteudo grid grid-cols-2 border-2 border-texto md:grid-cols-[1.3fr_1fr_1fr_0.55fr]">
            {h.case.numeros.map((n, i) => (
              <div
                key={n.texto}
                className={`flex min-h-44 flex-col justify-between gap-6 p-6 md:min-h-60 md:p-7 ${
                  i === 0 ? "col-span-2 bg-texto text-fundo md:col-span-1" : "border-t border-linha md:border-l md:border-t-0"
                } ${i === 2 ? "border-l" : ""}`}
              >
                <dt
                  className={`order-2 max-w-[18rem] text-[0.9375rem] leading-relaxed ${
                    i === 0 ? "text-faixa-escura-secundario" : "text-texto-secundario"
                  }`}
                >
                  {n.texto}
                </dt>
                <dd className="order-1 flex items-baseline gap-3">
                  <span className="numero-grande">{n.valor}</span>
                  {n.complemento ? <span className="text-xl font-medium tracking-[-0.02em] opacity-75">{n.complemento}</span> : null}
                </dd>
              </div>
            ))}
            <div aria-hidden="true" className="hachura col-span-2 hidden border-l border-linha md:col-span-1 md:block" />
          </dl>
          <p className="mt-4 text-sm text-texto-secundario">{h.case.fonte}</p>
          <Link href={h.case.href} className="botao botao-secundario mt-8" data-evento="cta_click" data-local="case">
            {h.case.botao}
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </Trecho>

        <Perguntas
          lista={h.perguntas}
          sobretitulo="Dono de loja pergunta"
          titulo="O que toda revenda pergunta"
          texto="Sistema de gestão, fotos, estoque no agente e de quem é o site. O resto cabe no diagnóstico."
        />

        {/* O fecho, na única faixa escura da página: a rota chega em âmbar e termina no botão principal. */}
        <section
          aria-labelledby="titulo-chamada"
          className="trecho adiada overflow-hidden bg-faixa-escura text-faixa-escura-texto"
          style={{ "--cor-da-rota": COR_DA_ROTA.ambar } as CSSProperties}
          data-entra=""
        >
          <div className="conteiner conteiner-rota fecho-miolo grid grid-cols-12 gap-x-6 gap-y-12 py-24 md:py-32">
            <div className="relative col-span-12 lg:col-span-7">
              <h2 id="titulo-chamada" className="titulo-secao max-w-[40rem]">
                {h.chamada.titulo}
              </h2>
              <p className="mt-6 max-w-[36rem] text-guia text-faixa-escura-secundario">{h.chamada.texto}</p>
              <div className="fecho-acoes relative mt-10 flex flex-wrap gap-3">
                <Parada final />
                <Link href="/diagnostico" className="botao botao-primario botao-claro" data-evento="cta_click" data-local="chamada">
                  {h.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <LinkOuAncora href="/precos#titulo-sprint" className="botao botao-secundario botao-claro" data-evento="cta_click" data-local="chamada">
                  {h.chamada.secundario}
                </LinkOuAncora>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="col-span-12 flex items-end lg:col-span-5 lg:justify-end lg:border-l lg:border-faixa-escura-linha"
            >
              <Construcao className="h-40 w-auto max-w-full md:h-52" />
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="revendas" />
      <JsonLd grafo={grafoDoHubAutomotivo()} />
      <Entradas />
    </>
  );
}
