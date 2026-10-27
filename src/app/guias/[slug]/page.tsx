import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Fechamento from "@/components/home/Fechamento";
import Perguntas from "@/components/home/Perguntas";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Rodape from "@/components/layout/Rodape";
import Topo from "@/components/layout/Topo";
import { Parada, Trecho } from "@/components/rota/Rota";
import { CLUSTERS, GUIAS, guiaDo, guiasServidos } from "@/conteudo/guias";
import { grafoDoGuia } from "@/lib/schema";

export function generateStaticParams() {
  // Rascunho também gera a rota; sem prévia, `guiaDo` não o acha e a página responde 404 (`notFound`).
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guiaDo(slug);
  if (!g) notFound();
  return {
    title: g.titulo,
    description: g.descricao,
    alternates: { canonical: `/guias/${g.slug}` },
    robots: g.estado === "publicado" ? undefined : { index: false, follow: false },
    openGraph: { type: "article", title: g.titulo, description: g.descricao, publishedTime: g.publicadoEm, modifiedTime: g.atualizadaEm, authors: ["Dyones Oliveira"] },
  };
}

const data = (iso: string) => iso.split("-").reverse().join("/");

/**
 * Um guia (`docs/plano-de-conteudo.md`): H1 igual à busca, a resposta em duas
 * frases logo abaixo, uma pergunta por seção, tabela onde há comparação, o
 * FAQ do schema, as fontes e uma única saída comercial no fecho.
 */
export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guiaDo(slug);
  if (!g) notFound();
  const relacionados = g.relacionados.map((s) => guiasServidos().find((x) => x.slug === s)).filter((x) => x !== undefined);
  return (
    <>
      <Topo />
      <main id="conteudo">
        <article>
          <Trecho aria-label={g.titulo} adiada={false} className="!border-b-2 !border-texto" miolo="!py-0">
            <div className="grid grid-cols-12">
              <div className="col-span-12 pb-8 pt-12 md:pb-12 md:pt-20 lg:col-span-9 lg:pr-12">
                <p className="rotulo text-texto-secundario">
                  <Link href="/guias" className="link-sublinhado">
                    Guias
                  </Link>{" "}
                  · {CLUSTERS[g.cluster]}
                </p>
                <div className="relative mt-4">
                  <Parada />
                  <h1 id="titulo-guia" className="titulo-hero max-w-[20ch]">
                    {g.titulo}
                  </h1>
                </div>
              </div>
            </div>
          </Trecho>

          <Trecho aria-label="Resposta">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6">
              <div className="col-span-12 lg:col-span-8 lg:col-start-1">
                <p className="texto-guia">{g.resposta}</p>
                <p className="mt-6 text-sm text-texto-secundario">
                  Por{" "}
                  <a href="/sobre#autor" className="link-sublinhado">
                    Dyones Oliveira
                  </a>
                  , fundador da V2O5. Publicado em {data(g.publicadoEm)}, atualizado em {data(g.atualizadaEm)}.
                  {g.estado === "rascunho" ? " Rascunho em prévia: fora do Google." : ""}
                </p>
              </div>
            </div>
          </Trecho>

          {g.secoes.map((s, i) => (
            <Trecho key={s.pergunta} aria-labelledby={`pergunta-${i + 1}`}>
              <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                <div className="relative col-span-12 lg:col-span-4">
                  <Parada />
                  <h2 id={`pergunta-${i + 1}`} className="text-titulo-3">
                    {s.pergunta}
                  </h2>
                </div>
                <div className="col-span-12 lg:col-span-8">
                  {s.paragrafos.map((p) => (
                    <p key={p} className="mb-5 max-w-[42rem] text-[1.0625rem] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {s.tabela ? (
                    <div className="mt-6 overflow-x-auto border-y-2 border-texto">
                      <table className="w-full border-collapse text-left text-[0.9375rem]" style={{ minWidth: `${s.tabela.cabecalho.length * 9}rem` }}>
                        <caption className="sr-only">{s.tabela.legenda}</caption>
                        <thead>
                          <tr className="border-b border-linha">
                            {s.tabela.cabecalho.map((c) => (
                              <th key={c} scope="col" className="rotulo px-3 py-3 text-texto-secundario">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.tabela.linhas.map((l) => (
                            <tr key={l[0]} className="border-b border-linha last:border-b-0">
                              {l.map((c, j) => (
                                <td key={c} className={`px-3 py-3 align-top leading-snug ${j === 0 ? "font-semibold" : "text-texto-secundario"}`}>
                                  {c}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            </Trecho>
          ))}

          <Perguntas id="faq" lista={g.faq} sobretitulo="Perguntas frequentes" titulo="O que mais perguntam" texto="As respostas curtas das dúvidas que sobram depois do guia." />

          <Trecho aria-label="Fontes e guias relacionados">
            <div className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-6">
                <h2 className="rotulo text-texto-secundario">Fontes</h2>
                <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed">
                  {g.fontes.map((f) => (
                    <li key={f.rotulo}>
                      {f.url ? (
                        <a href={f.url} className="link-sublinhado" {...(f.url.startsWith("http") ? { rel: "noopener", target: "_blank" } : {})}>
                          {f.rotulo}
                        </a>
                      ) : (
                        f.rotulo
                      )}
                      {f.periodo ? `, ${f.periodo}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
              {relacionados.length ? (
                <div className="col-span-12 lg:col-span-6">
                  <h2 className="rotulo text-texto-secundario">Guias relacionados</h2>
                  <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed">
                    {relacionados.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/guias/${r.slug}`} className="link-sublinhado">
                          {r.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Trecho>
        </article>

        <Fechamento titulo={g.saida.titulo} texto={g.saida.texto} botao={g.saida.botao} href={g.saida.href} secundario={null} />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="guias" />
      <JsonLd grafo={grafoDoGuia(g)} />
      <Entradas />
    </>
  );
}
