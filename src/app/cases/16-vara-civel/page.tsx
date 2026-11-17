import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Entradas from "@/components/layout/Entradas";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Construcao from "@/components/marca/Construcao";
import { COR_DA_ROTA, Parada, Trecho } from "@/components/rota/Rota";
import { CASE_16VC } from "@/conteudo/case";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoCase16 } from "@/lib/schema";
import marcaTjpr from "@/assets/tjpr/marca-tjpr.png";

const ROTA = CASE_16VC.rota;

export const metadata = metadataDa(ROTA);

/**
 * O case da 16ª Vara Cível (17/11/2026), contado como história: a abertura
 * com a marca do TJPR (uso autorizado pela vara), o ponto de partida com os
 * onze caminhos da serventia, o desenho e as regras, uma conversa de exemplo
 * (rotulada, com dados fictícios), o que muda para a equipe, a ficha técnica
 * e o fecho escuro. A rota desce em verde nas seções do atendimento e em azul
 * nos números (desde 17/11/2026, com fonte e período; `memory/projects/case-16-vara-civel.md`).
 */
export default function Pagina() {
  const c = CASE_16VC;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-label={c.sobretitulo} className="trecho border-b-2 border-texto" data-fino="">
          <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-case" className="titulo-hero max-w-[18ch]">
                  {c.titulo}
                </h1>
              </div>
              <p className="texto-guia mt-7 max-w-[38rem]">{c.resumo}</p>
            </div>
            <div className="col-span-12 flex flex-col gap-3 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              <Image src={marcaTjpr} alt={c.cliente.marca} sizes="224px" className="mb-3 h-auto w-56" />
              <p className="titulo-cartao">{c.cliente.nome}</p>
              <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">
                {c.cliente.completo}, {c.cliente.ramo}.
              </p>
            </div>
          </div>
          <div className="conteiner conteiner-rota">
            <dl className="grid grid-cols-12">
              {c.fatos.map((f, i) => (
                <div
                  key={f.rotulo}
                  className={`col-span-12 grid content-start gap-2 border-linha py-5 md:col-span-4 md:py-6 ${
                    i > 0 ? "border-t md:border-l md:border-t-0 md:pl-6" : ""
                  } ${i < c.fatos.length - 1 ? "md:pr-6" : ""}`}
                >
                  <dt className="rotulo text-texto-secundario">{f.rotulo}</dt>
                  <dd className="text-[0.9375rem] leading-snug">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Trecho aria-labelledby="titulo-antes">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <div className="col-span-12 lg:col-span-7">
              <p className="rotulo text-texto-secundario">{c.antes.sobretitulo}</p>
              <h2 id="titulo-antes" className="titulo-secao mt-3">
                {c.antes.titulo}
              </h2>
            </div>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-8">{c.antes.texto}</p>
          </div>
          {/* Os onze setores do menu da serventia, em células de fio: o tamanho do problema à vista. */}
          <div className="mt-12 border-t-2 border-texto md:mt-14">
            <p className="rotulo py-4 text-texto-secundario">{c.antes.setoresTitulo}</p>
            <ol className="grid grid-cols-1 gap-px border border-linha bg-linha sm:grid-cols-2 lg:grid-cols-4">
              {c.antes.setores.map((setor, i) => (
                <li key={setor} className="flex min-h-20 items-start gap-4 bg-fundo p-4 text-[0.9375rem] leading-snug">
                  <span className="font-mono text-[0.8125rem] tabular-nums text-texto-secundario">{String(i + 1).padStart(2, "0")}</span>
                  {setor}
                </li>
              ))}
              <li aria-hidden="true" className="hachura hidden bg-fundo lg:block" />
            </ol>
          </div>
        </Trecho>

        <Trecho aria-labelledby="titulo-desenho">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <div className="col-span-12 lg:col-span-7">
              <p className="rotulo text-texto-secundario">{c.desenho.sobretitulo}</p>
              <h2 id="titulo-desenho" className="titulo-secao mt-3">
                {c.desenho.titulo}
              </h2>
            </div>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-8">{c.desenho.texto}</p>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-px border-2 border-texto bg-linha md:mt-14 md:grid-cols-2">
            {c.desenho.regras.map((regra) => (
              <li key={regra.titulo} className="bg-fundo p-6 md:p-7">
                <h3 className="titulo-cartao">{regra.titulo}</h3>
                <p className="mt-3 max-w-[30rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{regra.texto}</p>
              </li>
            ))}
          </ul>
        </Trecho>

        <Trecho aria-labelledby="titulo-conversa" etapa="verde">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
            <Parada />
            <div className="col-span-12 lg:col-span-5">
              <p className="rotulo text-texto-secundario">{c.conversa.sobretitulo}</p>
              <h2 id="titulo-conversa" className="titulo-secao mt-3">
                {c.conversa.titulo}
              </h2>
              <p className="texto-guia mt-6">{c.conversa.texto}</p>
              <p className="mt-5 text-sm text-texto-secundario">{c.conversa.nota}</p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Conversa legenda={c.conversa.legenda} mensagens={c.conversa.mensagens} />
            </div>
          </div>
        </Trecho>

        <Trecho aria-labelledby="titulo-construido" etapa="verde">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <div className="col-span-12 lg:col-span-7">
              <p className="rotulo text-texto-secundario">{c.construido.sobretitulo}</p>
              <h2 id="titulo-construido" className="titulo-secao mt-3">
                {c.construido.titulo}
              </h2>
            </div>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{c.construido.texto}</p>
          </div>
          {/* Cada peça é uma linha de registro: o que é, a peça e o que ela faz. */}
          <ul className="mt-12 border-t-2 border-texto md:mt-14">
            {c.construido.pecas.map((peca) => (
              <li key={peca.titulo} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-linha py-6 md:py-7">
                <p className="rotulo col-span-12 text-texto-secundario md:col-span-3 md:pt-1.5">{peca.linha}</p>
                <h3 className="titulo-cartao col-span-12 md:col-span-4">{peca.titulo}</h3>
                <p className="col-span-12 max-w-[34rem] text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-5">
                  {peca.texto}
                </p>
              </li>
            ))}
          </ul>
        </Trecho>

        <Trecho aria-labelledby="titulo-numeros" etapa="azul">
          <div className="relative grid grid-cols-12">
            <Parada />
            <div className="col-span-12 lg:col-span-7">
              <p className="rotulo text-texto-secundario">{c.numeros.sobretitulo}</p>
              <h2 id="titulo-numeros" className="titulo-secao mt-3">
                {c.numeros.titulo}
              </h2>
            </div>
          </div>
          {/* O mosaico do case da Motors: o total na célula de tinta, os outros no papel. */}
          <dl className="mt-12 grid grid-cols-1 gap-px border-2 border-texto bg-linha sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {c.numeros.itens.map((n, i) => (
              <div
                key={n.texto}
                className={`flex min-h-44 flex-col justify-start gap-6 p-6 sm:justify-between md:min-h-56 md:p-7 ${
                  i === 0 ? "sm:col-span-2 bg-texto text-fundo" : "bg-fundo"
                }`}
              >
                <dt
                  className={`order-2 max-w-[20rem] text-[0.9375rem] leading-relaxed ${
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
          </dl>
          <p className="mt-4 text-sm text-texto-secundario">{c.numeros.fonte}</p>
        </Trecho>

        <Trecho aria-labelledby="titulo-stack">
          {/* A ficha técnica: as ferramentas em células de fio e, ao lado, quem conduz. */}
          <div className="relative grid grid-cols-12 border-y-2 border-texto">
            <Parada />
            <div className="col-span-12 py-6 md:py-7 lg:col-span-8 lg:pr-8">
              <h2 id="titulo-stack" className="rotulo text-texto">
                {c.stack.titulo}
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {c.stack.itens.map((item) => (
                  <li key={item} className="border-t border-linha py-3 font-mono text-[0.8125rem] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 flex items-center border-t border-linha bg-fundo-cartao p-6 md:p-7 lg:col-span-4 lg:border-l lg:border-t-0">
              <p className="text-[1.0625rem] leading-relaxed text-texto-secundario">
                {c.assinatura.split("Dyones Oliveira")[0]}
                <Link href="/sobre" className="link-sublinhado text-texto">
                  Dyones Oliveira
                </Link>
                {c.assinatura.split("Dyones Oliveira")[1]}
              </p>
            </div>
          </div>
        </Trecho>

        {/* O fecho: a única faixa escura. A rota chega em âmbar e termina no botão principal. */}
        <section
          aria-labelledby="titulo-chamada"
          className="trecho adiada overflow-hidden bg-faixa-escura text-faixa-escura-texto"
          style={{ "--cor-da-rota": COR_DA_ROTA.ambar } as CSSProperties}
          data-entra=""
        >
          <div className="conteiner conteiner-rota fecho-miolo grid grid-cols-12 gap-x-6 gap-y-12 py-24 md:py-32">
            <div className="relative col-span-12 lg:col-span-7">
              <h2 id="titulo-chamada" className="titulo-secao max-w-[40rem]">
                {c.chamada.titulo}
              </h2>
              <p className="mt-6 max-w-[36rem] text-guia text-faixa-escura-secundario">{c.chamada.texto}</p>
              <div className="fecho-acoes relative mt-10 flex flex-wrap gap-3">
                <Parada final />
                <Link href="/diagnostico" className="botao botao-primario botao-claro" data-evento="cta_click" data-local="chamada">
                  {c.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <Link href="/precos" className="botao botao-secundario botao-claro" data-evento="cta_click" data-local="chamada">
                  {c.chamada.secundario}
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="col-span-12 flex items-end lg:col-span-5 lg:justify-end lg:border-l lg:border-faixa-escura-linha">
              <Construcao className="h-40 w-auto max-w-full md:h-52" />
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <Entradas />
      <JsonLd grafo={grafoDoCase16()} />
    </>
  );
}

/**
 * A conversa de exemplo, como uma janela de registro: a vara à esquerda, no
 * papel do cartão, e a pessoa à direita, na tinta verde do atendimento. Rotulada
 * como exemplo, como o registro de eventos do case da Motors.
 */
function Conversa({ legenda, mensagens }: { legenda: string; mensagens: { de: string; texto: string }[] }) {
  return (
    <figure className="border-y-2 border-texto bg-fundo">
      <figcaption className="flex items-center justify-between gap-4 py-3">
        <span className="font-mono text-xs text-texto-secundario">{legenda}</span>
        <span className="rotulo bg-tinta-ambar px-2 py-1 text-texto">exemplo</span>
      </figcaption>
      <ol className="flex flex-col gap-3 border-t border-linha py-5">
        {mensagens.map((m, i) => (
          <li
            key={i}
            className={`max-w-[85%] whitespace-pre-line border px-4 py-3 text-[0.9375rem] leading-relaxed ${
              m.de === "pessoa" ? "self-end border-tinta-verde bg-tinta-verde" : "self-start border-linha bg-fundo-cartao"
            }`}
          >
            <span className="sr-only">{m.de === "pessoa" ? "Pessoa: " : "Vara: "}</span>
            {m.texto}
          </li>
        ))}
      </ol>
    </figure>
  );
}
