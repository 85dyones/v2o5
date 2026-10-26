import { describe, expect, it } from "vitest";
import { EMPRESA, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { SOBRE } from "@/conteudo/sobre";
import { grafoDoSobre, ID_DO_FUNDADOR, organizacao } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * Sobre: só fato registrado sobre o fundador (o mesmo texto da Visão 360),
 * relação com a Motors declarada como cliente e case, o `id="autor"` que o
 * schema do fundador aponta, resumo curto e texto sem marcas de IA.
 */

const texto = JSON.stringify(SOBRE);
const pagina = semComentarios(ler("src/app/sobre/page.tsx"));

describe("página Sobre", () => {
  it("está pronta e indexável, e é o destino do @id do fundador", () => {
    expect(paginaDa(SOBRE.rota).pronta).toBe(true);
    expect(ID_DO_FUNDADOR).toBe(`${new URL(ID_DO_FUNDADOR).origin}${SOBRE.rota}#autor`);
    expect(pagina).toMatch(/id="autor"/);
    const grafo = grafoDoSobre() as { "@graph": ({ "@type"?: string; "@id"?: string })[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Person", "AboutPage"]);
    expect(grafo["@graph"][2]["@id"]).toBe(ID_DO_FUNDADOR);
  });

  it("o fundador aparece em primeira pessoa, com os mesmos fatos da Visão 360 (que segue em terceira no JSON-LD e na home)", () => {
    expect(SOBRE.fundador.nome).toBe(VISAO_360.fundador.nome);
    expect(SOBRE.fundador.texto).toMatch(/^Sou formado em Administração pela FAE Business School/);
    for (const fato of ["desde 1992", "Top Imóveis para Top Soluções Imobiliárias", "até agosto de 2024", "26 guias"]) {
      expect(SOBRE.fundador.texto, fato).toContain(fato);
      expect(VISAO_360.fundador.texto, fato).toContain(fato);
    }
    const fatos = SOBRE.fundador.fatos.map((f) => f.valor).join(" ");
    expect(fatos).toContain(VISAO_360.fundador.escola);
    expect(fatos).toMatch(/Top Imóveis para Top Soluções Imobiliárias/);
    expect(fatos).toMatch(/26 guias/);
    expect(SOBRE.fundador.origem).toMatch(/1992/);
    expect(ler("memory/projects/case-motors.md")).toMatch(/\| Guias publicados \| 26 \|/);
  });

  it("declara a relação com a Motors como fornecedora (Dyones, 13/10), com a autorização registrada", () => {
    expect(SOBRE.motors.texto).toMatch(/cliente da V2O5/);
    expect(SOBRE.motors.texto).toMatch(/fornecedora/);
    expect(SOBRE.motors.texto).toMatch(/case principal/);
    expect(SOBRE.motors.texto).toMatch(/autorizou a publicação/);
    expect(ler("memory/projects/case-motors.md")).toMatch(/Autorizado em 08\/10: nome, logo e números/);
    expect(SOBRE.motors.href).toBe("/cases/motors-store");
  });

  it("o fundador responde por cada projeto e usa agentes de IA como apoio, sem \"equipe completa de IA\" (25/10), e a fundação é dezembro de 2019 (Dyones, 13/10)", () => {
    expect(SOBRE.equipe.texto).toMatch(/Eu conduzo o diagnóstico e respondo por cada projeto/);
    expect(SOBRE.equipe.texto).not.toMatch(/equipe completa de IA|agentes de IA para pesquisar/);
    expect(SOBRE.equipe.texto).toMatch(/a IA e as automações entram como ferramenta/);
    expect(SOBRE.empresa.fundacao).toBe("dezembro de 2019");
    expect(EMPRESA.fundacao).toBe("2019-12");
    expect(organizacao().foundingDate).toBe("2019-12");
    expect(pagina).toContain('["Fundação", s.empresa.fundacao]');
    expect(ler("memory/context/marca.md")).toMatch(/dezembro de 2019/);
  });

  it("o nome vem do catalisador, e a assinatura é a da marca", () => {
    expect(SOBRE.nome.texto).toMatch(/pentóxido de vanádio/);
    expect(SOBRE.nome.assinatura).toBe("V2O5 | Eficiência comercial e operacional com tecnologia.");
    expect(ler("memory/context/marca.md")).toContain("V2O5 | Eficiência comercial e operacional com tecnologia.");
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP", () => {
    expect(SOBRE.resumo.length).toBeLessThanOrEqual(140);
  });

  it("abre com o propósito e o método em cinco perguntas, na voz da V2O5 (25/10, a partir do roast do Dyones)", () => {
    expect(SOBRE.titulo).toBe("Simplificar o que é complexo.");
    expect(SOBRE.proposito.decisao).toHaveLength(3);
    expect(SOBRE.metodo.etapas.map((e) => e.etapa)).toEqual(["Diagnóstico", "Linha de base", "Intervenção", "Medição", "Revisão"]);
    expect(SOBRE.metodo.saida.itens).toEqual(["Algo funcionando", "Evidência do que melhorou", "Uma decisão sobre o próximo passo"]);
    expect(pagina).toContain('id="titulo-proposito"');
    expect(pagina).toContain('id="titulo-metodo"');
  });

  it("as tecnologias vêm em nove categorias, separam o que uso do que é compatível e não citam cliente (26/10/2026)", () => {
    const cats = SOBRE.ferramentas.categorias;
    expect(SOBRE.ferramentas.titulo).toBe("Tecnologias e ecossistemas");
    expect(cats.map((c) => c.titulo)).toEqual([
      "Sites, aplicações e dados",
      "Infraestrutura, hospedagem e DevOps",
      "Branding, design e comunicação",
      "Inteligência artificial e agentes",
      "Automação, integrações e processos",
      "Atendimento, comunicação e relacionamento",
      "CRM, vendas e sistemas de gestão",
      "Marketing, aquisição e conversão",
      "Dados, inteligência e mensuração",
    ]);
    for (const c of cats) {
      const itens = c.grupos.flatMap((g) => g.itens);
      expect(new Set(itens).size, c.titulo).toBe(itens.length);
      expect(c.grupos.length, c.titulo).toBeGreaterThan(0);
    }
    const todos = cats.flatMap((c) => c.grupos.flatMap((g) => g.itens));
    expect(todos).toEqual(expect.arrayContaining(["Next.js", "n8n", "Chatwoot", "Evolution API", "Typebot", "OpenAI", "GA4", "Revenda Mais"]));
    expect(JSON.stringify(SOBRE.ferramentas)).not.toMatch(/Autoconf|BNDV|Boom|Altimus|Syonet|Motors|16VC|Vara/);
  });

  it("só as plataformas com experiência prática contam como implantadas; as outras são compatibilidade sob avaliação", () => {
    const crm = SOBRE.ferramentas.categorias.find((c) => c.titulo.startsWith("CRM"))!;
    expect(crm.grupos[0].rotulo).toBe("Plataformas com experiência prática");
    expect(crm.grupos[0].itens).toEqual(["Revenda Mais", "Kenlo"]);
    for (const g of crm.grupos.slice(1)) expect(g.rotulo, g.rotulo).toMatch(/compatíveis|conforme a operação/);
    const ia = SOBRE.ferramentas.categorias.find((c) => c.titulo.startsWith("Inteligência"))!;
    expect(ia.grupos[1].rotulo).toBe("Compatível, sob avaliação técnica");
    expect(ia.grupos[1].itens).toEqual(expect.arrayContaining(["Microsoft Copilot", "Meta Llama", "Mistral", "xAI Grok", "Perplexity"]));
    const branding = SOBRE.ferramentas.categorias.find((c) => c.titulo.startsWith("Branding"))!;
    expect(branding.nota).toMatch(/não é um pacote à parte/);
  });

  it("a página inteira fala em primeira pessoa, sem o fundador em terceira (26/10/2026)", () => {
    const visivel = JSON.stringify({ ...SOBRE, empresa: undefined });
    expect(visivel).not.toMatch(/o fundador|do fundador|Dyones conduz|ele conduz|É ele quem|o meu mundo dele|dele\b/i);
    expect(SOBRE.titulo).toBe("Simplificar o que é complexo.");
    expect(SOBRE.resumo).toMatch(/^Eu gosto de entender/);
    expect(SOBRE.fundador.titulo).toBe("Eu conduzo o diagnóstico");
    expect(SOBRE.chamada.titulo).toBe("Quer conversar comigo?");
    expect(SOBRE.jeito.titulo).toBe("Como eu trabalho.");
    for (const r of SOBRE.jeito.regras) expect(r.titulo).not.toMatch(/^Começa|^Só número/);
    expect(pagina).not.toMatch(/Conhecer o fundador/);
  });

  it("a visão é um rascunho em primeira pessoa, sem promessa de resultado e sem número", () => {
    expect(SOBRE.visao.titulo).toBe("O que eu quero construir.");
    expect(`${SOBRE.visao.texto} ${SOBRE.visao.sonho}`).toMatch(/Eu penso em sistemas/);
    expect(pagina).toContain('id="titulo-visao"');
  });

  it("não publica o que é estratégia interna ou pessoal do fundador", () => {
    expect(texto).not.toMatch(/Repasse|16ª Vara|16VC|NOMU|CPU|ChatGPT|roast|família|receita/i);
  });

  it("sem travessão, sem tríade de efeito, sem número sem fonte e sem citação inventada", () => {
    expect(texto).not.toMatch(/[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
    expect(texto).not.toMatch(/\d+%|\d+x /);
    expect(texto).not.toMatch(/[“”]/);
  });
});
