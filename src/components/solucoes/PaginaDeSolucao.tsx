import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
import CapturasDaMotors, { type Captura } from "@/components/case/CapturasDaMotors";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Garantias from "@/components/home/Garantias";
import Fechamento from "@/components/home/Fechamento";
import Perguntas from "@/components/home/Perguntas";
import { MarcaDeEtapa } from "@/components/home/Solucoes";
import VinhetaDaLinha, { temVinheta } from "@/components/home/Vinhetas";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import { COR_DA_ROTA, ComMarcas, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { CASE, LINHAS, type Linha } from "@/conteudo/home";
import { BRL, capacidade, ofertaDaCapacidade, type LinhaDePreco } from "@/conteudo/precos";
import { mensagemDaSolucao, solucaoDa, type Solucao } from "@/conteudo/solucoes";
import { grafoDaSolucao } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

/**
 * O molde das páginas de solução, na direção B (19/10). A rota da margem
 * toma a cor da etapa da solução (`etapa` em `conteudo/solucoes.ts`) da
 * abertura ao preço; garantias, perguntas e as linhas que combinam ligam as
 * paradas com o fio fino, e o fecho leva a rota em âmbar até o botão.
 * Os sobretítulos saíram da tela e viraram o nome acessível de cada seção.
 * Texto todo de `conteudo/solucoes.ts` e `conteudo/precos.ts`.
 */
export default function PaginaDeSolucao({ rota, demonstracao }: { rota: string; demonstracao?: ReactNode }) {
  const s = solucaoDa(rota);
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
        <Abertura s={s} />
        <Problema s={s} />
        <Entregas s={s} />
        <ComoFunciona s={s} />
        {demonstracao}
        {s.naMotors ? <NaMotors m={s.naMotors} etapa={s.etapa} captura={s.linha === "sites" ? "vitrine" : undefined} /> : null}
        <Preco s={s} />
        <Garantias />
        <Perguntas
          lista={s.perguntas}
          sobretitulo="Antes de contratar"
          titulo={`O que perguntam sobre ${nomeDaLinha.toLowerCase()}`}
          texto="Preço, o que entra, o que fica de fora e o que acontece se você sair. O resto cabe no diagnóstico."
        />
        <Relacionadas linhas={relacionadas} />
        <Fechamento />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="home" mensagem={mensagemDaSolucao(s)} />
      <Entradas />
      <JsonLd grafo={grafoDaSolucao(rota)} />
    </>
  );
}

/** Os valores em real de um texto de preço, para o marca-texto (o mesmo padrão do cardápio da home). */
const VALORES = /R\$ [\d.,]+(?: \+ R\$ [\d.,]+\/mês)?(?:\/mês)?(?: por \w+)?/g;

function Valores({ texto, etapa }: { texto: string; etapa: Etapa }) {
  return <ComMarcas texto={texto} marcas={texto.match(VALORES) ?? []} etapa={etapa} />;
}

/**
 * A abertura: o H1 é o LCP (texto do servidor, parado), com a parada da
 * rota à altura dele. À direita, separada por fio, o resumo e os dois
 * botões; embaixo, a ficha da linha em três células. Não é adiada nem
 * entra ao rolar: a rota já está desenhada quando a página abre.
 */
function Abertura({ s }: { s: Solucao }) {
  return (
    <section
      aria-label={s.sobretitulo}
      className="trecho border-b-2 border-texto"
      style={{ "--cor-da-rota": COR_DA_ROTA[s.etapa] } as CSSProperties}
    >
      <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
        <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
          <div className="relative">
            <Parada />
            <h1 id="titulo-solucao" className="titulo-hero max-w-[16ch]">
              {s.titulo}
            </h1>
          </div>
        </div>
        <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
          <p className="text-[1.0625rem] leading-relaxed">{s.resumo}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
              Pedir diagnóstico gratuito
              <Icone nome="seta" className="seta size-4" />
            </Link>
            <a href="#titulo-preco" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
              Ver o preço
            </a>
          </div>
        </div>
      </div>

      <div className="conteiner conteiner-rota">
        <dl className="grid grid-cols-12">
          {s.fatos.map((f, i) => (
            <div
              key={f.rotulo}
              className={`col-span-12 grid content-start gap-2 border-linha py-5 md:col-span-4 md:py-6 ${
                i > 0 ? "border-t md:border-l md:border-t-0 md:pl-6" : "md:pr-6"
              } ${i === 1 ? "md:pr-6" : ""}`}
            >
              <dt className="rotulo text-texto-secundario">{f.rotulo}</dt>
              <dd className="text-[0.9375rem] leading-snug">{i === 0 ? <Valores texto={f.valor} etapa={s.etapa} /> : f.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * O problema que a linha resolve. A etapa fica numa linha de ficha embaixo
 * do texto; na linha que tem cena de interface (o funil do CRM), a etapa
 * vai na barra da cena, que mostra a origem em cada contato.
 */
function Problema({ s }: { s: Solucao }) {
  const p = s.problema;
  const comCena = temVinheta(s.vinheta);
  return (
    <Trecho aria-label="O problema" etapa={s.etapa}>
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-problema" className="titulo-secao col-span-12 lg:col-span-7">
          {p.titulo}
        </h2>
        <div className="col-span-12 lg:col-span-5 lg:pt-2">
          <p className="texto-guia">{p.texto}</p>
          {p.fonte ? (
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-texto-secundario">
              Fonte:{" "}
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener" className="link-sublinhado">
                  {p.fonte}
                </a>
              ) : (
                p.fonte
              )}
              .
            </p>
          ) : null}
          {comCena ? null : (
            <p className="mt-6 border-t border-linha pt-4">
              <MarcaDeEtapa etapa={s.etapa} />
            </p>
          )}
        </div>
      </div>
      {comCena ? (
        <div className="mt-12 grid grid-cols-12 md:mt-14">
          <figure className="col-span-12 border-2 border-texto bg-fundo lg:col-span-7 lg:col-start-6">
            <figcaption className="flex items-center justify-between gap-4 border-b border-linha px-4 py-3">
              <MarcaDeEtapa etapa={s.etapa} />
              <span className="rotulo text-texto-secundario">exemplo</span>
            </figcaption>
            <VinhetaDaLinha vinheta={s.vinheta} />
          </figure>
        </div>
      ) : null}
    </Trecho>
  );
}

/** O que entra, como linhas de registro: o nome à esquerda, o que é à direita. */
function Entregas({ s }: { s: Solucao }) {
  return (
    <Trecho aria-label="O que entra" etapa={s.etapa}>
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-entregas" className="titulo-secao col-span-12 lg:col-span-8">
          O que a V2O5 entrega <span className="apagado">nesta linha.</span>
        </h2>
      </div>
      <ul className="mt-12 border-t-2 border-texto md:mt-14">
        {s.entregas.map((e) => (
          <li key={e.titulo} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-linha py-6 md:py-7">
            <h3 className="titulo-cartao col-span-12 md:col-span-5">{e.titulo}</h3>
            <p className="col-span-12 max-w-[40rem] text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-7">{e.texto}</p>
          </li>
        ))}
      </ul>
    </Trecho>
  );
}

/** Os passos do diagnóstico ao ar, numerados na cor da etapa. */
function ComoFunciona({ s }: { s: Solucao }) {
  return (
    <Trecho aria-label="Como funciona" etapa={s.etapa}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="relative col-span-12 lg:col-span-5">
          <Parada />
          <h2 id="titulo-como" className="titulo-secao">
            Do diagnóstico <span className="apagado">ao ar.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[30rem]">
            Começa pelo diagnóstico gratuito, com o escopo fechado antes da implantação. Sem fidelidade.
          </p>
        </div>
        <ol className="col-span-12 border-t-2 border-texto lg:col-span-7">
          {s.comoFunciona.map((p, i) => (
            <li key={p.titulo} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-linha py-5 md:grid-cols-[4rem_1fr] md:py-6">
              <span className="numero pt-0.5" style={{ color: TEXTO_DA_ETAPA[s.etapa] }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-semibold tracking-[-0.01em]">{p.titulo}</span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-texto-secundario">{p.texto}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Trecho>
  );
}

/**
 * O que roda na Motors Store, com os números do case num mosaico parado
 * (da CROX, como na home): o primeiro na célula de tinta, o segundo no
 * papel, a sobra em hachura. Fonte e período logo embaixo; com um número
 * só, fonte e botão ocupam a célula ao lado.
 */
function NaMotors({ m, etapa, captura }: { m: NonNullable<Solucao["naMotors"]>; etapa: Etapa; captura?: Captura }) {
  const sozinho = m.numeros.length === 1;
  const colunas = sozinho ? "md:grid-cols-[1.3fr_1fr]" : "md:grid-cols-[1.3fr_1fr_0.55fr]";
  const celulas = <CelulasDoCase numeros={m.numeros} />;
  return (
    <Trecho aria-label="Case" etapa={etapa}>
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-motors" className="titulo-secao col-span-12 lg:col-span-7">
          {m.titulo}
        </h2>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{m.texto}</p>
      </div>

      {sozinho ? (
        // Um número só: a sobra vira a célula da fonte e do botão, em vez de
        // ~43% de hachura vazia. O wrapper existe porque a célula não é dt/dd.
        <div className={`mt-12 grid grid-cols-1 border-2 border-texto md:mt-14 ${colunas}`}>
          {/* grid para a célula de tinta esticar até a altura da linha */}
          <dl className="grid">{celulas}</dl>
          <div className="flex flex-col justify-between gap-6 border-t border-linha p-6 md:border-l md:border-t-0 md:p-7">
            <p className="text-sm text-texto-secundario">{CASE.fonte}</p>
            <Link href="/cases/motors-store" className="botao botao-secundario self-start" data-evento="cta_click" data-local="na-motors">
              Ler o case completo
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {captura ? (
            // Em /criacao-de-sites a sobra do mosaico mostra o site entregue em
            // vez da hachura (19/10). O wrapper existe porque a figura não é dt/dd.
            <div className="mt-12 grid grid-cols-1 border-2 border-texto md:mt-14 md:grid-cols-[2.3fr_0.75fr]">
              <dl className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">{celulas}</dl>
              <div className="border-t border-linha p-5 md:border-l md:border-t-0">
                <CapturasDaMotors quais={[captura]} sizes="(min-width: 48rem) 18vw, 80vw" className="mx-auto max-w-[16rem]" />
              </div>
            </div>
          ) : (
            <dl className={`mt-12 grid grid-cols-1 border-2 border-texto md:mt-14 ${colunas}`}>
              {celulas}
              <div aria-hidden="true" className="hachura hidden border-l border-linha md:block" />
            </dl>
          )}
          <p className="mt-4 text-sm text-texto-secundario">{CASE.fonte}</p>
          <Link href="/cases/motors-store" className="botao botao-secundario mt-8" data-evento="cta_click" data-local="na-motors">
            Ler o case completo
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </>
      )}
    </Trecho>
  );
}

function CelulasDoCase({ numeros }: { numeros: NonNullable<Solucao["naMotors"]>["numeros"] }) {
  return (
    <>
      {numeros.map((n, i) => (
        <div
          key={n.texto}
          className={`flex min-h-44 flex-col justify-between gap-6 p-6 md:min-h-56 md:p-7 ${
            i === 0 ? "bg-texto text-fundo" : "border-t border-linha md:border-l md:border-t-0"
          }`}
        >
          <dt className={`order-2 max-w-[20rem] text-[0.9375rem] leading-relaxed ${i === 0 ? "text-faixa-escura-secundario" : "text-texto-secundario"}`}>
            {n.texto}
          </dt>
          <dd className="order-1 flex items-baseline gap-3">
            <span className="numero-grande">{n.valor}</span>
            {n.complemento ? <span className="text-xl font-medium tracking-[-0.02em] opacity-75">{n.complemento}</span> : null}
          </dd>
        </div>
      ))}
    </>
  );
}

// O texto de cada valor, como na tabela de /precos ("R$ 1.900 por fluxo",
// "sem mensalidade"). Mora aqui para o molde não depender do miolo da tabela.
function valorDaImplantacao(l: LinhaDePreco) {
  if (l.sobConsulta) return "sob consulta";
  if (l.implantacao) return `${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`;
  return l.semImplantacao ?? "";
}

function valorDaMensalidade(l: LinhaDePreco) {
  if (l.sobConsulta) return "sob consulta";
  if (!l.mensalidade) return l.unidade ? "sem mensalidade" : "";
  return `${BRL(l.mensalidade)}/mês${l.maisVerba ? " + verba" : ""}`;
}

const minuscula = (t: string) => (/^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);

/** O que vem dentro, o que cresce e o que é repassado, embaixo de "o que cobre". */
function DetalhesDoPreco({ l }: { l: LinhaDePreco }) {
  if (!l.inclui && !l.degraus && !l.repasses && !l.bonus) return null;
  return (
    <div className="mt-4 grid gap-2.5 text-sm leading-snug">
      {l.inclui ? (
        <ul className="flex flex-wrap gap-2">
          {l.inclui.map((i) => (
            <li key={i} className="rotulo border border-linha px-2 py-1 text-texto-secundario">
              {i}
            </li>
          ))}
        </ul>
      ) : null}
      {l.bonus ? <p className="font-medium">{l.bonus}</p> : null}
      {l.degraus ? (
        <ul className="grid gap-1 tabular-nums text-texto-secundario">
          {l.degraus.map((d) => (
            <li key={d.rotulo}>
              {d.rotulo}: {BRL(d.valor)}
              {d.unidade.startsWith("/") ? "" : " "}
              {d.unidade}
            </li>
          ))}
        </ul>
      ) : null}
      {l.repasses ? (
        <p className="text-texto-secundario">
          <span className="text-texto">Pelo valor real, na mesma fatura:</span> {l.repasses.map(minuscula).join("; ")}.
        </p>
      ) : null}
    </div>
  );
}

/**
 * O preço da tabela, numa ficha fechada por fio de 2 px: os dois valores
 * "a partir de" no marca-texto da etapa, o que cobre, e ao lado como sai o
 * preço final. O `id="titulo-preco"` é a âncora do botão "Ver o preço".
 */
function Preco({ s }: { s: Solucao }) {
  const l = ofertaDaCapacidade(s.linha);
  // Com unidade ("por fluxo"), a unidade sai do marca-texto e fica em corpo
  // menor ao lado, como o "/mês" dos planos em /precos: o valor não quebra no meio.
  const porUnidade = !l.sobConsulta && l.implantacao && l.unidade;
  const valores = [
    {
      rotulo: "Implantação a partir de",
      valor: porUnidade ? BRL(l.implantacao!) : valorDaImplantacao(l) || "sem",
      unidade: porUnidade ? l.unidade : undefined,
    },
    { rotulo: "Mensalidade a partir de", valor: valorDaMensalidade(l) || "sem", unidade: undefined },
  ];
  return (
    <Trecho aria-label="Preço" etapa={s.etapa}>
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-preco" className="titulo-secao col-span-12 lg:col-span-8">
          {l.nome}: a partir de.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-12 border-2 border-texto md:mt-14">
        <div className="col-span-12 lg:col-span-7">
          <dl className="grid border-b border-linha sm:grid-cols-2">
            {valores.map((v, i) => (
              <div key={v.rotulo} className={`grid content-start gap-3 border-linha p-6 md:p-7 ${i > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}>
                <dt className="rotulo text-texto-secundario">{v.rotulo}</dt>
                <dd className="text-titulo-3 tabular-nums">
                  <span className="whitespace-nowrap">
                    <Valores texto={v.valor} etapa={s.etapa} />
                  </span>
                  {v.unidade ? (
                    <>
                      {" "}
                      <span className="text-base font-normal text-texto-secundario">{v.unidade}</span>
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
          <div className="p-6 md:p-7">
            <p className="max-w-[40rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{l.cobre}</p>
            <DetalhesDoPreco l={l} />
            <Link href="/precos" className="botao botao-secundario mt-7" data-evento="cta_click" data-local="preco">
              Ver a tabela completa
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>
        </div>
        <div className="col-span-12 flex flex-col justify-center border-t border-linha bg-fundo-cartao p-6 md:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
          <p className="rotulo text-texto-secundario">O preço final</p>
          <p className="mt-3 text-[1.125rem] leading-snug">
            Sai do diagnóstico, com o escopo fechado antes de começar. Todo valor publicado é a partir de.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-texto-secundario">
            Implantação em até 6 vezes, ou metade na assinatura e metade na entrega. Mensalidade mês a mês.
          </p>
        </div>
      </div>
    </Trecho>
  );
}

/**
 * As linhas que combinam, no padrão do cardápio da home: a célula inteira é
 * o link, a linha pinta a rota na cor da etapa dela e leva a parada, que se
 * acende no hover.
 */
function Relacionadas({ linhas }: { linhas: Linha[] }) {
  return (
    <Trecho aria-labelledby="titulo-relacionadas">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-relacionadas" className="col-span-12 text-titulo-3 lg:col-span-8">
          Linhas que combinam com esta.
        </h2>
      </div>
      <ul className="mt-10 border-t-2 border-texto">
        {linhas.map((l) => (
          <li key={l.titulo} className="servico" style={{ "--cor-da-rota": COR_DA_ROTA[l.etapa] } as CSSProperties}>
            <LinkOuAncora href={l.href} className="servico-celula grid grid-cols-12 gap-x-6 gap-y-3 border-b border-linha py-6 md:py-7">
              <Parada />
              <span className="col-span-12 md:col-span-7">
                <MarcaDeEtapa etapa={l.etapa} />
                <span className="titulo-cartao mt-2 block">{l.titulo}</span>
                <span className="mt-2 block max-w-[38rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{l.frase}</span>
              </span>
              <span className="col-span-10 self-center text-[0.9375rem] leading-relaxed tabular-nums md:col-span-4">
                <Valores texto={l.preco} etapa={l.etapa} />
              </span>
              <span aria-hidden="true" className="servico-seta col-span-2 self-center justify-self-end md:col-span-1">
                <Icone nome="seta" className="size-4" />
              </span>
            </LinkOuAncora>
          </li>
        ))}
      </ul>
    </Trecho>
  );
}
