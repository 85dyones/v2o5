import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import NumeroQueConta from "@/components/home/NumeroQueConta";
import Perguntas from "@/components/home/Perguntas";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import ParceiroDeFotografia from "@/components/precos/ParceiroDeFotografia";
import { Pacote } from "@/components/precos/TabelaDePrecos";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoHubAutomotivo } from "@/lib/schema";

const ROTA = HUB_AUTOMOTIVO.rota;

export const metadata = metadataDa(ROTA);

/**
 * O hub do segmento automotivo (plano, seção 6.2): o pacote, o caminho de um
 * lead, as linhas avulsas que fazem sentido depois, os números do case, as
 * perguntas de dono de loja e a chamada. Conteúdo em `conteudo/automotivo.ts`.
 */
export default function Pagina() {
  const h = HUB_AUTOMOTIVO;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-labelledby="titulo-hub" className="relative isolate">
          <div aria-hidden="true" className="hero-fundo" />
          <div className="conteiner pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
            <div className="max-w-[46rem]">
              <p className="sobretitulo">{h.sobretitulo}</p>
              <h1 id="titulo-hub" className="titulo-hero mt-5">
                {h.titulo}
              </h1>
              <p className="texto-guia mt-7 max-w-[38rem]">{h.resumo}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  {h.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#titulo-pacote" className="botao botao-secundario" data-evento="cta_click" data-local="hero">
                  Ver o pacote
                </a>
              </div>
            </div>
            <div className="mt-9">
              <p className="text-[0.8125rem] font-medium text-secundario">{h.sistemas.rotulo}</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                <li className="chip chip-ok">{h.sistemas.emProducao} · em produção</li>
                {h.sistemas.integraveis.map((s) => (
                  <li key={s} className="chip text-secundario">
                    {s}
                  </li>
                ))}
                <li className="chip text-secundario">{h.sistemas.outros}</li>
              </ul>
            </div>
            <dl className="mt-12 grid gap-4 border-t border-linha pt-8 md:grid-cols-3">
              {h.fatos.map((f) => (
                <div key={f.rotulo}>
                  <dt className="text-[0.8125rem] font-medium text-secundario">{f.rotulo}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-snug text-papel">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="titulo-pecas" className="conteiner py-20 md:py-28">
          <div className="max-w-[44rem]">
            <h2 id="titulo-pecas" className="titulo-secao">
              {h.pacote.titulo}
            </h2>
            <p className="texto-guia mt-5">{h.pacote.texto}</p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {h.pacote.pecas.map((peca) => (
              <li key={peca.titulo} className="superficie flex flex-col p-6 md:p-7">
                <span className="chip w-fit text-secundario">{peca.linha}</span>
                <h3 className="titulo-cartao mt-5">{peca.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{peca.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="titulo-pacote" className="conteiner pb-20 md:pb-28">
          <h2 id="titulo-pacote" className="sr-only">
            Preço do pacote
          </h2>
          <Pacote destino="precos" />
        </section>

        <section
          aria-labelledby="titulo-caminho"
          className="border-y border-linha bg-[linear-gradient(180deg,rgb(26_29_34/0.7),rgb(18_20_24/0.4))] py-20 md:py-28"
        >
          <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <div>
              <h2 id="titulo-caminho" className="titulo-secao">
                {h.caminho.titulo}
              </h2>
              <p className="texto-guia mt-5 max-w-[30rem]">{h.caminho.texto}</p>
            </div>
            <ol className="superficie divide-y divide-linha">
              {h.caminho.passos.map((p, i) => (
                <li key={p.titulo} className="grid grid-cols-[2.5rem_1fr] gap-4 p-6 md:p-7">
                  <span className="numero text-ambar">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{p.titulo}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-secundario">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="titulo-extras" className="conteiner py-20 md:py-28">
          <div className="max-w-[44rem]">
            <h2 id="titulo-extras" className="titulo-secao">
              {h.extras.titulo}
            </h2>
            <p className="texto-guia mt-5">{h.extras.texto}</p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {h.extras.itens.map((item) => (
              <li key={item.nome} className="superficie flex flex-col p-6 md:p-7">
                <h3 className="titulo-cartao">{item.nome}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{item.texto}</p>
                <p className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
                  <span className="font-medium tabular-nums text-papel/90">{item.preco}</span>
                  <LinkOuAncora href={item.href} className="link-sublinhado text-secundario">
                    na tabela
                  </LinkOuAncora>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ParceiroDeFotografia />
          </div>
        </section>

        <section aria-labelledby="titulo-medido" className="border-t border-linha py-20 md:py-28">
          <div className="conteiner">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
              <h2 id="titulo-medido" className="titulo-secao">
                {h.case.titulo}
              </h2>
              <p className="texto-guia lg:pb-2">{h.case.texto}</p>
            </div>
            <dl className="superficie mt-12 grid md:grid-cols-3">
              {h.case.numeros.map((n, i) => (
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
              {h.case.fonte}
            </p>
            <Link href={h.case.href} className="botao botao-secundario mt-8" data-evento="cta_click" data-local="case">
              {h.case.botao}
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>
        </section>

        <Perguntas
          lista={h.perguntas}
          sobretitulo="Dono de loja pergunta"
          titulo="O que toda revenda pergunta"
          texto="Sistema de gestão, usuários, fotos, estoque no agente e de quem é o site. O resto cabe no diagnóstico."
        />

        <section aria-labelledby="titulo-chamada" className="border-t border-linha">
          <div className="conteiner py-20 md:py-28">
            <div className="superficie grid gap-8 p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 id="titulo-chamada" className="titulo-secao">
                  {h.chamada.titulo}
                </h2>
                <p className="texto-guia mt-5">{h.chamada.texto}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="chamada">
                  {h.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <Link href="/precos" className="botao botao-secundario" data-evento="cta_click" data-local="chamada">
                  {h.chamada.secundario}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="revendas" />
      <JsonLd grafo={grafoDoHubAutomotivo()} />
    </>
  );
}
