import type { CSSProperties } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import TerminalDeEventos from "@/components/home/TerminalDeEventos";
import Entradas from "@/components/layout/Entradas";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import MarcaMotors from "@/components/marca/MarcaMotors";
import CapturasDaMotors from "@/components/case/CapturasDaMotors";
import Simbolo from "@/components/marca/Simbolo";
import { COR_DA_ROTA, ComMarcas, Parada, Trecho } from "@/components/rota/Rota";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoCase } from "@/lib/schema";

const ROTA = CASE_MOTORS.rota;

export const metadata = metadataDa(ROTA);

/**
 * O case completo da Motors Store (plano, seção 6.3), na direção B. A rota
 * desce em fio fino nas seções de texto (abertura, o que foi montado, a
 * ficha técnica) e em azul nas de gestão, onde o dado sai do banco da loja
 * (números e eventos). Termina no fecho escuro, no botão do diagnóstico.
 * Conteúdo em `conteudo/case.ts`; números conferidos por `tests/case.test.ts`.
 */
export default function Pagina() {
  const c = CASE_MOTORS;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <Abertura />

        <Trecho aria-labelledby="titulo-construido">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-construido" className="titulo-secao col-span-12 lg:col-span-7">
              {c.construido.titulo}
            </h2>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{c.construido.texto}</p>
          </div>
          {/* As telas reais do site, antes da lista do que foi entregue (Dyones, 19/10). */}
          <CapturasDaMotors className="mt-12 md:mt-14" />
          {/* Cada peça é uma linha de registro: a linha do cardápio, a peça e o que ela faz. */}
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
            <h2 id="titulo-numeros" className="titulo-secao col-span-12 lg:col-span-7">
              {c.numeros.titulo}
            </h2>
          </div>
          {/* Mosaico como o da home: o total na célula de tinta, os outros no
              papel, a sobra em hachura. O fio entre células é o fundo que
              aparece no `gap-px`, então vale em qualquer número de colunas. */}
          <dl className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 border-2 border-texto bg-linha md:mt-14 lg:grid-cols-4">
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
            <div aria-hidden="true" className="hachura hidden bg-fundo sm:block" />
          </dl>
          <p className="mt-4 text-sm text-texto-secundario">{c.numeros.fonte}</p>
        </Trecho>

        <Trecho aria-labelledby="titulo-rastreio" etapa="azul">
          <div className="relative grid grid-cols-12">
            <Parada />
            <h2 id="titulo-rastreio" className="titulo-secao col-span-12 lg:col-span-7">
              {c.rastreio.titulo}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-12">
            <div className="col-span-12 lg:col-span-4">
              <p className="texto-guia">
                <ComMarcas texto={c.rastreio.texto} marcas={["a origem, o anúncio e o carro"]} etapa="azul" />
              </p>
              <p className="mt-5 text-sm text-texto-secundario">{c.rastreio.exemplo}</p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <TerminalDeEventos linhas={CASE.terminal} />
            </div>
          </div>
        </Trecho>

        <Trecho aria-labelledby="titulo-stack">
          {/* A ficha técnica: as ferramentas em células de fio e, ao lado, quem assina. */}
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
              <Simbolo className="h-28 w-auto text-faixa-escura-texto md:h-36" />
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <Entradas />
      <JsonLd grafo={grafoDoCase()} />
    </>
  );
}

/**
 * A abertura. O H1 é o LCP: texto do servidor, sem animação. À direita,
 * separada por fio, a ficha do cliente com o logo; embaixo, a ficha do
 * case em células, fechada por fio de 2 px. A rota começa aqui, em fio fino.
 * O sobretítulo "Case" virou o nome acessível da seção (decisão de 19/10).
 */
function Abertura() {
  const c = CASE_MOTORS;
  const ramo = c.cliente.ramo.charAt(0).toUpperCase() + c.cliente.ramo.slice(1);
  return (
    <section aria-label={c.sobretitulo} className="trecho border-b-2 border-texto" data-fino="">
      <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
        <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
          <div className="relative">
            <Parada />
            <h1 id="titulo-case" className="titulo-hero max-w-[16ch]">
              {c.titulo}
            </h1>
          </div>
          <p className="texto-guia mt-7 max-w-[38rem]">{c.resumo}</p>
        </div>
        <div className="col-span-12 flex flex-col gap-5 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
          <MarcaMotors className="h-9 w-auto max-w-full self-start text-texto" />
          <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">
            {ramo} em {c.cliente.cidade}/{c.cliente.estado}.
          </p>
          <a href={c.cliente.url} target="_blank" rel="noopener" className="link-sublinhado w-fit font-mono text-[0.8125rem] font-medium">
            {c.cliente.url.replace("https://", "")}
          </a>
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
  );
}
