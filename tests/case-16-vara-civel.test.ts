import { describe, expect, it } from "vitest";
import { CASE_16VC } from "@/conteudo/case";
import { NAVEGACAO, PROJETO } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { artigoDoCase16, grafoDoCase16 } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * O case da 16ª Vara Cível (17/11/2026): nome e marca autorizados pela vara;
 * números só os que estão em `memory/projects/case-16-vara-civel.md`, com
 * fonte e período (publicados depois de resolvido o problema de atribuição ao
 * time); sem IA (a versão em uso é triagem por menu), sem dado pessoal e sem
 * orientação jurídica automática.
 */

const pagina = semComentarios(ler("src/app/cases/16-vara-civel/page.tsx"));
const memoria = ler("memory/projects/case-16-vara-civel.md");
const texto = JSON.stringify(CASE_16VC);

describe("case 16ª Vara Cível", () => {
  it("está pronto e indexável, com o artigo assinado pelo fundador no schema", () => {
    expect(paginaDa(CASE_16VC.rota).pronta).toBe(true);
    const artigo = artigoDoCase16() as { headline: string; author: { "@id": string }; about: { "@type": string; name: string; url?: string } };
    expect(artigo.headline).toBe(CASE_16VC.titulo);
    expect(artigo.author["@id"]).toContain("/sobre#autor");
    expect(artigo.about).toMatchObject({ "@type": "GovernmentOrganization", name: CASE_16VC.cliente.completo });
    expect(artigo.about.url).toBeUndefined();
    const grafo = grafoDoCase16() as { "@graph": ({ "@type"?: string } & { "@id"?: string })[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["Person", "BreadcrumbList", "Article"]);
    expect(pagina).toContain("grafoDoCase16()");
  });

  it("cada número da página existe na memória do case, com a fonte e o período ao lado", () => {
    expect(memoria).toMatch(/\| Conversas lidas no período \| 950 \|/);
    expect(memoria).toMatch(/\| Encaminhamentos completos \(com os atributos do fluxo\) \| 345: consulta 128, dúvida 110, intimação 59, magistrada 48 \|/);
    expect(memoria).toMatch(/\| Encaminhados direto a setores específicos \| 118, em oito setores/);
    expect(memoria).toMatch(/resolvido o problema de atribuição ao time/);
    expect(CASE_16VC.numeros.itens.map((n) => n.valor)).toEqual([950, 345, 118]);
    expect(CASE_16VC.numeros.itens[1].texto).toMatch(/128 consultas de processo, 110 dúvidas, 59 intimações e 48 assuntos do gabinete/);
    expect(CASE_16VC.numeros.fonte).toMatch(/lido em 14\/10\/2026/);
    expect(CASE_16VC.numeros.fonte).toMatch(/07\/01 a 13\/10\/2026/);
    expect(pagina).toContain("{c.numeros.fonte}");
  });

  it("fora dos números e da conversa de exemplo, não publica algarismo nem promete dado futuro", () => {
    // Só datas ("maio de 2025"), os nomes (16ª, V2O5, n8n) e os 45 minutos do diagnóstico levam algarismo.
    const { conversa, numeros, ...resto } = CASE_16VC;
    expect(numeros.itens).toHaveLength(3);
    const semNomeEData = JSON.stringify(resto)
      .replace(/16ª|16-vara|V2O5|n8n|45 minutos/g, "")
      .replace(/(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro) de \d{4}/g, "");
    expect(semNomeEData).not.toMatch(/\d/);
    // Na conversa, só o número das opções do menu, o nome da vara e o prazo que a própria vara informa.
    const naConversa = conversa.mensagens.map((m) => m.texto).join(" ").replace(/16ª|48 horas úteis/g, "");
    for (const n of naConversa.match(/\d+/g) ?? []) expect(Number(n), n).toBeLessThanOrEqual(11);
  });

  it("conta a história: o ponto de partida, o desenho com as regras, uma conversa rotulada como exemplo e o depois", () => {
    expect(CASE_16VC.antes.setores).toHaveLength(11);
    expect(CASE_16VC.antes.titulo).toMatch(/onze setores/);
    expect(CASE_16VC.desenho.regras.map((r) => r.titulo)).toContain("Toda conversa tem saída para uma pessoa");
    expect(CASE_16VC.conversa.nota).toMatch(/fictícios/);
    expect(CASE_16VC.conversa.mensagens.at(-1)?.texto).toMatch(/48 horas úteis/);
    for (const id of ["titulo-antes", "titulo-desenho", "titulo-conversa", "titulo-construido", "titulo-numeros", "titulo-stack"]) expect(pagina).toContain(`id="${id}"`);
    expect(CASE_16VC.construido.pecas[2].texto).toMatch(/já atribuída ao time do setor/);
    expect(pagina).toContain("<Conversa");
    expect(pagina).toMatch(/alt=\{c\.cliente\.marca\}/);
    expect(CASE_16VC.resumo.length).toBeLessThanOrEqual(140);
  });

  it("conta triagem e encaminhamento, sem IA e sem resposta jurídica automática", () => {
    expect(texto).not.toMatch(/\bIA\b|intelig[êe]ncia artificial|agente|chatbot/i);
    expect(CASE_16VC.construido.texto).toMatch(/sem resposta jurídica automática/);
    expect(CASE_16VC.stack.itens).toEqual(["WhatsApp", "Evolution API", "Typebot", "n8n", "Chatwoot"]);
  });

  it("não traz dado pessoal nem detalhe interno da serventia", () => {
    expect(texto).not.toMatch(/@|\(\d{2}\)|\d{7}-\d{2}\.\d{4}/);
    expect(texto).not.toMatch(/Dra\.|Dr\.|juíza|juiz /i);
    expect(texto).not.toMatch(/alerta|pend[êe]ncia|contrato|renova/i);
  });

  it("passa pelo humanizer: sem travessão no texto público", () => {
    expect(texto).not.toMatch(/[—–]/);
    expect(pagina).not.toMatch(/[—–]/);
  });

  it("está no menu, no rodapé, na home e no llms.txt", () => {
    const cases = NAVEGACAO.find((i) => i.rotulo === "Cases");
    expect(cases && "itens" in cases ? cases.itens?.map((i) => i.href) : []).toEqual(["/cases/motors-store", CASE_16VC.rota]);
    expect(ler("src/components/layout/Rodape.tsx")).toContain(`href: "${CASE_16VC.rota}"`);
    // Os dois cases com o mesmo peso na home (25/11/2026).
    expect(PROJETO.cases.map((c) => c.href)).toEqual(["/cases/motors-store", CASE_16VC.rota]);
    expect(ler("src/components/home/ProjetoReal.tsx")).toContain("PROJETO.cases.map");
    expect(ler("src/app/llms.txt/route.ts")).toContain("## Case 16ª Vara Cível");
  });
});
