import Link from "next/link";
import type { ReactNode } from "react";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Garantias from "@/components/home/Garantias";
import Fechamento from "@/components/home/Fechamento";
import NumeroQueConta from "@/components/home/NumeroQueConta";
import Perguntas from "@/components/home/Perguntas";
import { MarcaDeEtapa } from "@/components/home/Solucoes";
import VinhetaDaLinha from "@/components/home/Vinhetas";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import { Detalhes, implantacao, mensalidade } from "@/components/precos/TabelaDePrecos";
import { CASE, LINHAS } from "@/conteudo/home";
import { capacidade, ofertaDaCapacidade } from "@/conteudo/precos";
import { mensagemDaSolucao, solucaoDa } from "@/conteudo/solucoes";
import { grafoDaSolucao } from "@/lib/schema";

/**
 * O molde das páginas de solução: hero com a busca-alvo no H1, o problema
 * com a cena da linha, o que entra, como funciona, a demonstração (quando a
 * página tem uma), o que roda na Motors Store com número do case, o preço
 * da tabela, garantias, perguntas, as linhas que combinam e o fechamento.
 * Conteúdo em `conteudo/solucoes.ts`.
 */
export default function PaginaDeSolucao({ rota, demonstracao }: { rota: string; demonstracao?: ReactNode }) {
  const s = solucaoDa(rota);
  const linha = ofertaDaCapacidade(s.linha);
  const nomeDaLinha = capacidade(s.linha).nome;
  const relacionadas = s.relacionadas.map((id) => {
    const l = LINHAS.find((x) => x.linha === id);
    if (!l) throw new Error(`Linha relacionada sem cartão: ${id}`);
    return l;
  });
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-labelledby="titulo-solucao" className="relative isolate">
          <div aria-hidden="true" className="hero-fundo" />
          <div className="conteiner pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
            <div className="max-w-[46rem]">
              <p className="sobretitulo">{s.sobretitulo}</p>
              <h1 id="titulo-solucao" className="titulo-hero mt-5">
                {s.titulo}
              </h1>
              <p className="texto-guia mt-7 max-w-[38rem]">{s.resumo}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  Pedir diagnóstico gratuito
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#titulo-preco" className="botao botao-secundario" data-evento="cta_click" data-local="hero">
                  Ver o preço
                </a>
              </div>
            </div>
            <dl className="mt-12 grid gap-4 border-t border-linha pt-8 md:grid-cols-3">
              {s.fatos.map((f) => (
                <div key={f.rotulo}>
                  <dt className="text-[0.8125rem] font-medium text-texto-secundario">{f.rotulo}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-snug text-texto">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="titulo-problema" className="conteiner py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <p className="sobretitulo">O problema</p>
              <h2 id="titulo-problema" className="titulo-secao mt-5">
                {s.problema.titulo}
              </h2>
              <p className="texto-guia mt-6">{s.problema.texto}</p>
              {s.problema.fonte ? (
                <p className="mt-4 text-sm text-texto-secundario">
                  Fonte:{" "}
                  {s.problema.href ? (
                    <a href={s.problema.href} target="_blank" rel="noopener" className="link-sublinhado">
                      {s.problema.fonte}
                    </a>
                  ) : (
                    s.problema.fonte
                  )}
                  .
                </p>
              ) : null}
            </div>
            <div className="superficie p-3">
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <MarcaDeEtapa etapa={s.etapa} />
                <span className="rotulo text-texto-secundario">exemplo</span>
              </div>
              <div className="min-h-[16rem]">
                <VinhetaDaLinha vinheta={s.vinheta} />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="titulo-entregas"
          className="border-y border-linha bg-fundo-alternado py-20 md:py-28"
        >
          <div className="conteiner">
            <div className="max-w-[44rem]">
              <p className="sobretitulo">O que entra</p>
              <h2 id="titulo-entregas" className="titulo-secao mt-5">
                O que a V2O5 entrega <span className="apagado">nesta linha.</span>
              </h2>
            </div>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {s.entregas.map((e) => (
                <li key={e.titulo} className="superficie flex gap-4 p-6 md:p-7">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-etapa-atendimento/25 text-etapa-atendimento"
                  >
                    <Icone nome="check" className="size-3.5" />
                  </span>
                  <span>
                    <h3 className="font-semibold tracking-[-0.01em]">{e.titulo}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-texto-secundario">{e.texto}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="titulo-como" className="conteiner py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <div>
              <p className="sobretitulo">Como funciona</p>
              <h2 id="titulo-como" className="titulo-secao mt-5">
                Do diagnóstico <span className="apagado">ao ar.</span>
              </h2>
              <p className="texto-guia mt-6 max-w-[30rem]">
                Começa pelo diagnóstico gratuito, com o escopo fechado antes da implantação. Sem fidelidade.
              </p>
            </div>
            <ol className="superficie divide-y divide-linha">
              {s.comoFunciona.map((p, i) => (
                <li key={p.titulo} className="grid grid-cols-[2.5rem_1fr] gap-4 p-6 md:p-7">
                  <span className="numero text-acao-texto">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{p.titulo}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-texto-secundario">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {demonstracao}

        {s.naMotors ? (
          <section aria-labelledby="titulo-motors" className="border-t border-linha py-20 md:py-28">
            <div className="conteiner">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
                <div>
                  <p className="sobretitulo">Case</p>
                  <h2 id="titulo-motors" className="titulo-secao mt-5">
                    {s.naMotors.titulo}
                  </h2>
                </div>
                <p className="texto-guia lg:pb-2">{s.naMotors.texto}</p>
              </div>
              <dl className={`superficie mt-12 grid ${s.naMotors.numeros.length > 1 ? "md:grid-cols-2" : ""}`}>
                {s.naMotors.numeros.map((n, i) => (
                  <div
                    key={n.texto}
                    className={`flex flex-col p-7 md:p-9 ${i > 0 ? "border-t border-linha md:border-l md:border-t-0" : ""}`}
                  >
                    <dt className="order-2 mt-4 max-w-[22rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{n.texto}</dt>
                    <dd className="order-1 flex items-baseline gap-3">
                      <span className="numero-grande">
                        <NumeroQueConta valor={n.valor} />
                      </span>
                      {n.complemento ? (
                        <span className="text-xl font-medium tracking-[-0.02em] text-texto-secundario">{n.complemento}</span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-sm text-texto-secundario">
                <Icone nome="check" className="mt-0.5 size-4 shrink-0 text-etapa-atendimento" />
                {CASE.fonte}
              </p>
              <Link href="/cases/motors-store" className="botao botao-secundario mt-8" data-evento="cta_click" data-local="na-motors">
                Ler o case completo
                <Icone nome="seta" className="seta size-4" />
              </Link>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="titulo-preco" className="border-t border-linha py-20 md:py-28">
          <div className="conteiner">
            <div className="superficie grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
              <div className="p-7 md:p-9">
                <p className="sobretitulo">Preço</p>
                <h2 id="titulo-preco" className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
                  {linha.nome}: a partir de.
                </h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-fundo-cartao p-4 contorno">
                    <dt className="text-sm text-texto-secundario">Implantação a partir de</dt>
                    <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{implantacao(linha) || "sem"}</dd>
                  </div>
                  <div className="rounded-xl bg-fundo-cartao p-4 contorno">
                    <dt className="text-sm text-texto-secundario">Mensalidade a partir de</dt>
                    <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{mensalidade(linha) || "sem"}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-texto-secundario">{linha.cobre}</p>
                <Detalhes l={linha} />
                <Link href="/precos" className="botao botao-secundario mt-7" data-evento="cta_click" data-local="preco">
                  Ver a tabela completa
                  <Icone nome="seta" className="seta size-4" />
                </Link>
              </div>
              <div className="flex flex-col justify-center border-t border-linha bg-fundo-alternado p-7 md:p-9 lg:border-l lg:border-t-0">
                <p className="text-sm font-medium text-texto-secundario">O preço final</p>
                <p className="mt-3 text-[1.125rem] leading-snug">
                  Sai do diagnóstico, com o escopo fechado antes de começar. Todo valor publicado é a partir de.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-texto-secundario">
                  Implantação em até 6 vezes, ou metade na assinatura e metade na entrega. Mensalidade mês a mês.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Garantias />
        <Perguntas
          lista={s.perguntas}
          sobretitulo="Antes de contratar"
          titulo={`O que perguntam sobre ${nomeDaLinha.toLowerCase()}`}
          texto="Preço, o que entra, o que fica de fora e o que acontece se você sair. O resto cabe no diagnóstico."
        />

        <section aria-labelledby="titulo-relacionadas" className="conteiner pb-20 md:pb-28">
          <h2 id="titulo-relacionadas" className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
            Linhas que combinam com esta.
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {relacionadas.map((l) => (
              <li key={l.titulo}>
                <Link href={l.href} className="superficie cartao-luz flex h-full flex-col p-6">
                  <MarcaDeEtapa etapa={l.etapa} />
                  <span className="titulo-cartao mt-2.5 block">{l.titulo}</span>
                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-texto-secundario">{l.frase}</span>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm font-medium tabular-nums text-texto/90">
                    {l.preco}
                    <Icone nome="seta" className="size-3.5 shrink-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Fechamento />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="home" mensagem={mensagemDaSolucao(s)} />
      <JsonLd grafo={grafoDaSolucao(rota)} />
    </>
  );
}
