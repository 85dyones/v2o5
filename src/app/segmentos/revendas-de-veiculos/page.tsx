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

/** A etapa de cada modelo: Mapa é atração, Operação com IA é atendimento, Completo é gestão. */
const ETAPA_DO_PLANO: Etapa[] = ["violeta", "verde", "azul"];

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
 * uma na cor da sua etapa) e pelos três pacotes com valor (25/10/2026); um
 * bloco aponta para o case; as perguntas ligam com o fio fino e a rota
 * termina, em âmbar, no botão da chamada. Conteúdo em `conteudo/automotivo.ts`.
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

          {/* A ficha do hub: quatro células em fio. */}
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

        {/* Os três modelos de Sprint para revendas, únicos valores de modelo do site (25/10/2026): cada um na cor da sua etapa. */}
        <Trecho aria-labelledby="titulo-planos" etapa="verde">
          <Cabeca id="titulo-planos" titulo={h.planos.titulo} texto={h.planos.texto} />
          <ul className="mt-titulo-conteudo border-t-2 border-texto">
            {h.planos.itens.map((p, i) => (
              <Linha key={p.id} etapa={ETAPA_DO_PLANO[i]}>
                <div className="col-span-12 md:col-span-4">
                  <p className="rotulo" style={{ color: TEXTO_DA_ETAPA[ETAPA_DO_PLANO[i]] }}>
                    {p.sprint}
                  </p>
                  <h3 className="titulo-cartao mt-2">{p.nome}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{p.para}</p>
                </div>
                <ul className="col-span-12 flex flex-col gap-1.5 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-5">
                  {p.inclui.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <dl className="col-span-12 md:col-span-3">
                  <dt className="rotulo text-texto-secundario">Implantação</dt>
                  <dd className="numero text-[1.125rem] font-semibold">{p.implantacao}</dd>
                  <dt className="rotulo mt-3 text-texto-secundario">Recorrência mensal</dt>
                  <dd className="numero text-[1.125rem] font-semibold">{p.mensalidade}</dd>
                  {p.condicao ? <dd className="mt-1 text-sm text-texto-secundario">{p.condicao}</dd> : null}
                  {p.bonus ? <dd className="mt-2 text-sm leading-snug">{p.bonus}</dd> : null}
                </dl>
              </Linha>
            ))}
          </ul>
          <p className="mt-4 max-w-[48rem] text-sm text-texto-secundario">{h.planos.rodape}</p>
        </Trecho>

        {/* Os números e o caminho do lead moram no case; o hub só aponta para ele. */}
        <Trecho aria-labelledby="titulo-case" etapa="azul">
          <Cabeca id="titulo-case" titulo="A prova está no case." texto={h.case.texto} />
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
