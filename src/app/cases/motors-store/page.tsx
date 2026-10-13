import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import NumeroQueConta from "@/components/home/NumeroQueConta";
import TerminalDeEventos from "@/components/home/TerminalDeEventos";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import MarcaMotors from "@/components/marca/MarcaMotors";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoCase } from "@/lib/schema";

const ROTA = CASE_MOTORS.rota;

export const metadata = metadataDa(ROTA);

/**
 * O case completo da Motors Store (plano, seção 6.3): contexto, o que foi
 * construído, os números com fonte e período, a leitura honesta deles, como
 * a venda fica rastreável e o que entra com 90 dias de dado. Conteúdo em
 * `conteudo/case.ts`; números conferidos por `tests/case.test.ts`.
 */
export default function Pagina() {
  const c = CASE_MOTORS;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-labelledby="titulo-case" className="relative isolate">
          <div aria-hidden="true" className="hero-fundo" />
          <div className="conteiner pb-16 pt-14 md:pt-20 lg:pb-20">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
              <div className="max-w-[46rem]">
                <p className="sobretitulo">{c.sobretitulo}</p>
                <h1 id="titulo-case" className="titulo-hero mt-5">
                  {c.titulo}
                </h1>
                <p className="texto-guia mt-7 max-w-[38rem]">{c.resumo}</p>
              </div>
              <div className="superficie flex flex-col gap-5 p-7 md:p-8">
                <MarcaMotors className="h-9 w-auto max-w-full text-papel" />
                <p className="text-[0.9375rem] leading-relaxed text-secundario">
                  {c.cliente.ramo.charAt(0).toUpperCase() + c.cliente.ramo.slice(1)} em {c.cliente.cidade}/{c.cliente.estado}.
                </p>
                <a
                  href={c.cliente.url}
                  target="_blank"
                  rel="noopener"
                  className="link-sublinhado w-fit text-[0.9375rem] text-papel"
                >
                  {c.cliente.url.replace("https://", "")}
                </a>
              </div>
            </div>

            <dl className="mt-12 grid gap-4 border-t border-linha pt-8 md:grid-cols-3">
              {c.fatos.map((f) => (
                <div key={f.rotulo}>
                  <dt className="text-[0.8125rem] font-medium text-secundario">{f.rotulo}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-snug text-papel">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="titulo-construido" className="conteiner py-20 md:py-28">
          <div className="max-w-[44rem]">
            <h2 id="titulo-construido" className="titulo-secao">
              {c.construido.titulo}
            </h2>
            <p className="texto-guia mt-5">{c.construido.texto}</p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.construido.pecas.map((peca) => (
              <li key={peca.titulo} className="superficie flex flex-col p-6 md:p-7">
                <span className="chip w-fit text-secundario">{peca.linha}</span>
                <h3 className="titulo-cartao mt-5">{peca.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{peca.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-numeros"
          className="border-y border-linha bg-[linear-gradient(180deg,rgb(26_29_34/0.7),rgb(18_20_24/0.4))] py-20 md:py-28"
        >
          <div className="conteiner">
            <h2 id="titulo-numeros" className="titulo-secao max-w-[40rem]">
              {c.numeros.titulo}
            </h2>
            <dl className="superficie mt-12 grid md:grid-cols-2 lg:grid-cols-3">
              {c.numeros.itens.map((n, i) => (
                <div
                  key={n.texto}
                  className={`flex flex-col p-7 md:p-8 ${i > 0 ? "border-t border-linha" : ""} ${i % 2 === 1 ? "md:border-l" : ""} ${i < 2 ? "md:border-t-0" : ""} ${i % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"} ${i < 3 ? "lg:border-t-0" : "lg:border-t"}`}
                >
                  <dt className="order-2 mt-4 max-w-[20rem] text-[0.9375rem] leading-relaxed text-secundario">
                    {n.texto}
                  </dt>
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
              {c.numeros.fonte}
            </p>

          </div>
        </section>

        <section aria-labelledby="titulo-rastreio" className="conteiner py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-center">
            <div>
              <h2 id="titulo-rastreio" className="titulo-secao">
                {c.rastreio.titulo}
              </h2>
              <p className="texto-guia mt-5">{c.rastreio.texto}</p>
              <p className="mt-4 text-sm text-secundario">{c.rastreio.exemplo}</p>
            </div>
            <TerminalDeEventos linhas={CASE.terminal} />
          </div>
        </section>

        <section aria-labelledby="titulo-stack" className="border-t border-linha">
          <div className="conteiner grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="titulo-stack" className="text-[0.8125rem] font-medium text-secundario">
                {c.stack.titulo}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.stack.itens.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-secundario lg:pt-7">
              {c.assinatura.split("Dyones Oliveira")[0]}
              <Link href="/sobre" className="link-sublinhado text-papel">
                Dyones Oliveira
              </Link>
              {c.assinatura.split("Dyones Oliveira")[1]}
            </p>
          </div>
        </section>

        <section aria-labelledby="titulo-chamada" className="border-t border-linha">
          <div className="conteiner py-20 md:py-28">
            <div className="superficie grid gap-8 p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 id="titulo-chamada" className="titulo-secao">
                  {c.chamada.titulo}
                </h2>
                <p className="texto-guia mt-5">{c.chamada.texto}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="chamada">
                  {c.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <Link href="/precos" className="botao botao-secundario" data-evento="cta_click" data-local="chamada">
                  {c.chamada.secundario}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDoCase()} />
    </>
  );
}
