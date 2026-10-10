import { describe, expect, it } from "vitest";
import { EMPRESA } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { CHAVES_DE_ORIGEM } from "@/lib/leads";
import { linkWhatsApp, whatsappInternacional, whatsappParaLer } from "@/lib/whatsapp";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Política e código não podem contar histórias diferentes (lição da Motors,
 * `tests/brechas-de-mensuracao.test.ts` de lá). Enquanto o site não carrega
 * tag nenhuma, a política diz isso; no dia em que gtag, fbq ou Turnstile
 * entrarem no código, este teste obriga a página a nomeá-los.
 */

const pagina = semComentarios(ler("src/app/privacidade/page.tsx"));
const fontes = arquivos("src", /\.(tsx?|css)$/).filter((a) => !a.startsWith("src/app/privacidade/"));
const codigo = fontes.map((a) => semComentarios(ler(a))).join("\n");

describe("página de privacidade", () => {
  it("está pronta, indexável e com a data da última revisão", () => {
    expect(paginaDa("/privacidade").pronta).toBe(true);
    expect(pagina).toMatch(/ULTIMA_ATUALIZACAO = "\d{1,2} de \w+ de \d{4}"/);
    expect(pagina).toContain("Lei nº 13.709/2018");
  });

  it("nomeia os parâmetros de origem que o código guarda", () => {
    for (const chave of ["utm", "gclid", "gbraid", "wbraid", "fbclid"]) expect(pagina).toContain(chave);
    expect(CHAVES_DE_ORIGEM.filter((c) => c.startsWith("utm_")).length).toBeGreaterThan(0);
    expect(pagina).toContain("sessão");
  });

  it("diz que não há ferramenta de medição enquanto não houver uma no código", () => {
    const temTag = /gtag\(|fbq\(|googletagmanager|connect\.facebook\.net|turnstile/i.test(codigo);
    if (temTag) {
      expect(pagina).toMatch(/Google Analytics|Meta Pixel|Turnstile/);
      expect(pagina).not.toContain("não carrega ferramentas de análise nem de publicidade");
    } else {
      expect(pagina).toContain("não carrega ferramentas de análise nem de publicidade");
    }
  });

  it("descreve as proteções que a rota de leads tem (armadilha e limite por IP)", () => {
    const rota = semComentarios(ler("src/app/api/leads/route.ts"));
    expect(rota).toContain("JANELA_MS = 10 * 60 * 1000");
    expect(pagina).toContain("dez minutos");
    expect(pagina).toContain("campo escondido");
  });

  it("sem travessão", () => {
    expect(pagina).not.toMatch(/[—–]/);
  });
});

describe("WhatsApp", () => {
  it("link e número escrito saem do mesmo campo", () => {
    expect(EMPRESA.whatsapp).toMatch(/^55\d{10,11}$/);
    expect(linkWhatsApp()).toBe(`https://wa.me/${EMPRESA.whatsapp}`);
    expect(linkWhatsApp("Olá! Teste")).toBe(`https://wa.me/${EMPRESA.whatsapp}?text=Ol%C3%A1!%20Teste`);
    expect(whatsappParaLer()).toBe("(41) 99808-9550");
    expect(whatsappInternacional()).toBe("+55 41 99808-9550");
  });

  it("nenhum número de WhatsApp escrito à mão fora de EMPRESA", () => {
    for (const arquivo of fontes) {
      if (arquivo === "src/conteudo/home.ts") continue;
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/wa\.me\/\d|5541998089550|99808-9550/);
    }
  });
});
