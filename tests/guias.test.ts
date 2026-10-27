import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { textoDoLlms } from "@/app/llms.txt/route";
import { CLUSTERS, GUIAS, guiaDo, guiasPublicados } from "@/conteudo/guias";
import { SAIDAS_PERMITIDAS, type Guia } from "@/conteudo/guias/tipos";
import { paginaDa } from "@/conteudo/paginas";
import { problemasDoGuia } from "@/lib/guias";
import { grafoDoGuia } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/** Um guia mínimo e correto, para exercitar a estrutura sem depender do conteúdo real. */
const bom: Guia = {
  slug: "exemplo-de-guia",
  cluster: "processo",
  titulo: "Como achar o gargalo da operação",
  descricao: "Um exemplo de guia para testar a estrutura, com descrição no tamanho certo.",
  resposta: "A resposta curta vem em duas frases. A segunda frase fecha a ideia.",
  secoes: [1, 2, 3].map((n) => ({ pergunta: `Pergunta ${n}?`, paragrafos: [`Parágrafo ${n}.`] })),
  faq: [1, 2, 3].map((n) => ({ pergunta: `Dúvida ${n}?`, resposta: `Resposta ${n}.` })),
  saida: { href: "/diagnostico", titulo: "Título", texto: "Texto.", botao: "Botão" },
  fontes: [{ rotulo: "Fonte interna", url: "/sobre" }],
  relacionados: [],
  publicadoEm: "2026-10-27",
  atualizadaEm: "2026-10-27",
  estado: "rascunho",
};

describe("estrutura de guias", () => {
  it("o guia mínimo passa nas travas e cada trava reprova o que deve", () => {
    expect(problemasDoGuia(bom)).toEqual([]);
    const reprova = (parcial: Partial<Guia>) => problemasDoGuia({ ...bom, ...parcial }).join(" | ");
    expect(reprova({ titulo: "x".repeat(61) })).toMatch(/H1 com 61/);
    expect(reprova({ descricao: "curta" })).toMatch(/descrição/);
    expect(reprova({ resposta: "Uma. Duas. Três frases." })).toMatch(/duas frases/);
    expect(reprova({ secoes: bom.secoes.slice(0, 2) })).toMatch(/2 perguntas H2/);
    expect(reprova({ faq: bom.faq.slice(0, 2) })).toMatch(/2 perguntas no FAQ/);
    expect(reprova({ saida: { ...bom.saida, href: "/precos" as never } })).toMatch(/saída fora/);
    expect(reprova({ resposta: "Resposta — com travessão. Segunda." })).toMatch(/travessão/);
    expect(reprova({ resposta: "A solução não é cara, é cara de verdade. Segunda frase." })).toMatch(/contraste/);
    expect(reprova({ resposta: "Custa R$ 100 por mês. Segunda frase.", fontes: [] })).toMatch(/sem fonte/);
    expect(reprova({ relacionados: ["exemplo-de-guia"] })).toMatch(/relaciona a si mesmo/);
    expect(reprova({ slug: "Slug Ruim" })).toMatch(/slug/);
    expect(reprova({ estado: "publicado" })).toMatch(/mínimo 900/);
  });

  it("todo guia do repositório passa nas travas e tem slug único", () => {
    for (const g of GUIAS) expect(problemasDoGuia(g), g.slug).toEqual([]);
    expect(new Set(GUIAS.map((g) => g.slug)).size).toBe(GUIAS.length);
    for (const g of GUIAS) {
      expect(CLUSTERS[g.cluster], g.slug).toBeDefined();
      expect(SAIDAS_PERMITIDAS).toContain(g.saida.href);
      for (const r of g.relacionados) expect(GUIAS.map((x) => x.slug), `${g.slug} -> ${r}`).toContain(r);
    }
  });

  it("rascunho não é servido, não entra no sitemap, no llms.txt nem tira o /guias do noindex", () => {
    const rascunhos = GUIAS.filter((g) => g.estado === "rascunho");
    expect(rascunhos.length).toBeGreaterThan(0);
    for (const g of rascunhos) {
      expect(guiaDo(g.slug), g.slug).toBeUndefined();
      expect(sitemap().some((u) => u.url.endsWith(`/guias/${g.slug}`)), g.slug).toBe(false);
      expect(textoDoLlms()).not.toContain(g.slug);
    }
    expect(paginaDa("/guias").pronta).toBe(guiasPublicados().length > 0);
  });

  it("o grafo do guia traz o artigo do fundador, a trilha e o FAQ igual ao texto", () => {
    const grafo = grafoDoGuia(bom) as { "@graph": { "@type"?: string; mainEntity?: { name: string }[]; author?: unknown }[] };
    const nos = grafo["@graph"];
    expect(nos.slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Article", "FAQPage"]);
    expect(nos[2].author).toEqual({ "@id": expect.stringContaining("/sobre#autor") });
    expect(nos[3].mainEntity?.map((p) => p.name)).toEqual(bom.faq.map((f) => f.pergunta));
  });

  it("as rotas servem só o que a prévia ou a publicação liberam, e rascunho leva noindex", () => {
    const pagina = semComentarios(ler("src/app/guias/[slug]/page.tsx"));
    expect(pagina).toContain("generateStaticParams");
    expect(pagina).toMatch(/notFound\(\)/);
    expect(pagina).toMatch(/g\.estado === "publicado" \? undefined : \{ index: false/);
    expect(ler(".env.example")).toMatch(/^PREVIA_DE_GUIAS=/m);
  });
});
