import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Icone from "@/components/Icone";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Entradas from "@/components/layout/Entradas";
import { Parada, Trecho } from "@/components/rota/Rota";
import { DIAGNOSTICO } from "@/conteudo/diagnostico";
import { WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp } from "@/lib/whatsapp";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";

const ROTA = "/diagnostico/recebido";

export const metadata = metadataDa(ROTA);

/** As saídas depois do pedido, cada uma numa célula com a seta. */
const SAIDAS = [
  { href: "/precos", texto: "Ver os preços" },
  { href: "/cases/motors-store", texto: "Ler o case Motors Store" },
  { href: "/", texto: "Voltar para a página inicial" },
];

/** "e-mail" não parte no hífen: a palavra vai inteira num span sem quebra. */
function SemQuebraNoHifen({ texto }: { texto: string }) {
  return texto.split("e-mail").map((pedaco, i) => (
    <Fragment key={i}>
      {i > 0 ? <span className="whitespace-nowrap">e-mail</span> : null}
      {pedaco}
    </Fragment>
  ));
}

/**
 * Depois do envio: o que acontece agora. Fora do índice (`pronta: false`).
 * O contato chegou, então a rota é verde (atendimento) e termina na parada
 * âmbar do botão de WhatsApp, a próxima ação. O "Pedido enviado" que ficava
 * acima do título vira o nome da seção (decisão de 19/10).
 */
export default function Pagina() {
  const r = DIAGNOSTICO.recebido;
  return (
    <>
      <Topo />
      <main id="conteudo" className="min-h-[60vh]">
        <Trecho
          etapa="verde"
          aria-label="Pedido enviado"
          adiada={false}
          className="!border-b-0"
          miolo="rota-ate-a-parada grid grid-cols-12"
        >
          {/* Abertura como nas outras rotas: título à esquerda, texto em fio ao lado. */}
          <div className="col-span-12 pb-8 lg:col-span-8 lg:pb-0 lg:pr-12">
            <div className="relative">
              <Parada />
              <h1 className="titulo-secao max-w-[20ch]">{r.titulo}</h1>
            </div>
          </div>
          <div className="col-span-12 border-t border-linha pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2">
            <p className="text-[1.0625rem] leading-relaxed">
              <SemQuebraNoHifen texto={r.texto} />
            </p>
          </div>

          <div className="col-span-12 mt-12 border-y-2 border-texto bg-fundo">
            <p className="rotulo border-b border-linha px-6 py-4 text-texto-secundario">{r.enquantoIsso}</p>
            <ul className="grid gap-px bg-linha sm:grid-cols-2 lg:grid-cols-4">
              {/* A parada final desce até o meio do botão: 1,5rem de respiro mais 0,6875rem. */}
              <li className="relative bg-fundo p-6 [&>.parada]:top-[2.1875rem]">
                <Parada final />
                <a
                  href={linkWhatsApp(WHATSAPP.mensagens.recebido)}
                  target="_blank"
                  rel="noopener"
                  className="botao botao-primario"
                  data-evento="click_whatsapp"
                  data-local="recebido"
                >
                  Adiantar pelo WhatsApp
                  <Icone nome="seta" className="seta size-4" />
                </a>
              </li>
              {SAIDAS.map((s) => (
                <li key={s.href} className="bg-fundo">
                  <Link
                    href={s.href}
                    className="servico-celula flex min-h-24 items-center justify-between gap-4 px-6 text-[0.9375rem] font-semibold tracking-[-0.01em]"
                  >
                    {s.texto}
                    <Icone nome="seta" className="servico-seta size-4 shrink-0 text-texto-secundario" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Trecho>
      </main>
      <Rodape />
      <Entradas />
      <JsonLd grafo={grafoDaInterna(ROTA)} />
    </>
  );
}
