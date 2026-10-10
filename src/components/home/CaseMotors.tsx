import type { CSSProperties } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import NumeroQueConta from "@/components/home/NumeroQueConta";
import { CASE } from "@/conteudo/home";

/**
 * Uma linha do terminal em três colunas da grade (hora, evento, pares
 * chave=valor). Cada célula leva `.linha-terminal` e o índice da linha, para
 * a linha inteira aparecer junto.
 */
function LinhaDoTerminal({ linha, i }: { linha: string; i: number }) {
  const [hora, evento, ...pares] = linha.split(/\s{2,}/);
  const estilo = { "--i": i } as CSSProperties;
  return (
    <>
      <span className="linha-terminal text-secundario/70" style={estilo}>
        {hora}
      </span>
      <span className="linha-terminal text-papel" style={estilo}>
        {evento}
      </span>
      <span className="linha-terminal flex gap-x-4" style={estilo}>
        {pares
          .join(" ")
          .split(/\s+/)
          .map((par) => {
            const [chave, valor] = par.split("=");
            const ok = /^2\d\d$/.test(valor ?? "");
            return (
              <span key={par}>
                <span className="text-secundario">{chave}=</span>
                <span className={ok ? "text-verde-claro" : "text-ambar"}>{valor}</span>
              </span>
            );
          })}
      </span>
    </>
  );
}

export default function CaseMotors() {
  return (
    <section
      id="case"
      aria-labelledby="titulo-case"
      className="adiada relative border-y border-linha bg-[linear-gradient(180deg,rgb(26_29_34/0.7),rgb(18_20_24/0.4))] py-24 md:py-36"
    >
      <div className="conteiner">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="sobretitulo">Case</p>
            <h2 id="titulo-case" className="titulo-secao mt-5">
              Motors Store, <span className="apagado">revenda de seminovos em Curitiba.</span>
            </h2>
          </div>
          <p className="texto-guia lg:pb-2">
            A V2O5 montou o site, os guias, o rastreamento e as automações da loja. Os números abaixo medem o
            sistema funcionando, contados no banco de dados da Motors.
          </p>
        </div>

        <dl className="superficie mt-14 grid md:mt-16 md:grid-cols-3">
          {CASE.numeros.map((n, i) => (
            <div
              key={n.texto}
              className={`flex flex-col p-7 md:p-9 ${i > 0 ? "border-t border-linha md:border-l md:border-t-0" : ""}`}
            >
              <dt className="order-2 mt-4 max-w-[18rem] text-[0.9375rem] leading-relaxed text-secundario">{n.texto}</dt>
              <dd className="order-1 flex items-baseline gap-3">
                <span className="numero-grande">
                  <NumeroQueConta valor={n.valor} />
                </span>
                {n.complemento ? (
                  <span className="text-xl font-medium tracking-[-0.02em] text-secundario">{n.complemento}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex items-start gap-2 text-sm text-secundario">
          <Icone nome="check" className="mt-0.5 size-4 shrink-0 text-verde-claro" />
          {CASE.fonte}
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <figure className="janela">
            <figcaption className="janela-barra justify-between">
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-papel/15" />
                  <span className="size-2.5 rounded-full bg-papel/15" />
                  <span className="size-2.5 rounded-full bg-papel/15" />
                </span>
                <span className="font-mono text-xs text-secundario">eventos do sistema</span>
              </span>
              <span className="rotulo rounded-full bg-grafite px-2.5 py-1 text-papel">exemplo</span>
            </figcaption>
            <pre className="terminal overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-[2]">
              <span className="grid w-max grid-cols-[auto_auto_auto] gap-x-6">
                {CASE.terminal.map((linha, i) => (
                  <LinhaDoTerminal key={linha} linha={linha} i={i} />
                ))}
              </span>
            </pre>
          </figure>
          <div>
            <p className="text-secundario">
              Formato real dos eventos que o sistema da Motors registra; os valores são ilustrativos. Cada lead
              do site sai com um identificador que o navegador e o servidor compartilham, e com ele a Meta e o
              Google contam a conversão uma vez só.
            </p>
            <Link href="/cases/motors-store" className="botao botao-secundario mt-7">
              Ler o case completo
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
