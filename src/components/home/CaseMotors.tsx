import type { CSSProperties } from "react";
import Link from "next/link";
import NumeroQueConta from "@/components/home/NumeroQueConta";
import { CASE } from "@/conteudo/home";

export default function CaseMotors() {
  return (
    <section id="case" aria-labelledby="titulo-case" className="adiada border-y border-linha bg-superficie/60 py-24 md:py-32">
      <div className="conteiner">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-[0.9375rem] font-medium text-secundario">Case</p>
            <h2 id="titulo-case" className="titulo-secao mt-3">
              Motors Store, revenda de seminovos em Curitiba
            </h2>
          </div>
          <p className="text-lg text-secundario lg:pb-1">
            A V2O5 montou o site, os guias, o rastreamento e as automações da loja. Os números abaixo medem o
            sistema funcionando, contados no banco de dados da Motors.
          </p>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-linha md:grid-cols-3">
          {CASE.numeros.map((n) => (
            <div key={n.texto} className="flex flex-col bg-tinta p-7 md:p-8">
              <dt className="order-2 mt-3 text-secundario">{n.texto}</dt>
              <dd className="numero order-1 text-[clamp(2.75rem,2rem+2.4vw,4rem)] leading-none tracking-[-0.03em]">
                <NumeroQueConta valor={n.valor} />
                {n.complemento ? (
                  <span className="ml-2 text-[0.45em] font-medium tracking-normal text-secundario">
                    {n.complemento}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-secundario">{CASE.fonte}</p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <figure className="overflow-hidden rounded-2xl bg-tinta shadow-[inset_0_0_0_1px_var(--color-linha)]">
            <figcaption className="flex items-center justify-between gap-4 border-b border-linha px-5 py-3">
              <span className="font-mono text-xs text-secundario">eventos do sistema</span>
              <span className="rotulo rounded-sm bg-grafite px-2 py-1 text-papel">exemplo</span>
            </figcaption>
            <pre className="terminal overflow-x-auto px-5 py-4 font-mono text-[0.8125rem] leading-[1.9] text-secundario">
              {CASE.terminal.map((linha, i) => (
                <span key={linha} className="linha-terminal block" style={{ "--i": i } as CSSProperties}>
                  {linha}
                </span>
              ))}
            </pre>
          </figure>
          <div>
            <p className="text-secundario">
              Formato real dos eventos que o sistema da Motors registra; os valores são ilustrativos. Cada lead
              do site sai com um identificador que o navegador e o servidor compartilham, e com ele a Meta e o
              Google contam a conversão uma vez só.
            </p>
            <Link href="/cases/motors-store" className="link-sublinhado mt-6 inline-flex min-h-11 items-center font-semibold">
              Ler o case completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
