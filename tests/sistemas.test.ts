import { describe, expect, it } from "vitest";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { SISTEMA_EM_PRODUCAO, SISTEMAS, SISTEMAS_INTEGRAVEIS, listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import { PERGUNTAS } from "@/conteudo/home";
import { solucaoDa } from "@/conteudo/solucoes";

/**
 * Sistemas de revenda (Dyones, 13/10): o Revenda Mais é a única integração
 * em produção; Autoconf, BNDV, Boom, Altimus e Syonet aparecem como
 * integráveis por fluxo, com os mesmos nomes no formulário, no hub, na home
 * e nas soluções. O texto nunca diz que um deles já roda.
 */

const texto = (o: unknown) => JSON.stringify(o);

describe("sistemas de revenda", () => {
  it("a lista integrável sai do formulário, sem o que já roda e sem as opções genéricas", () => {
    expect(SISTEMA_EM_PRODUCAO).toBe("Revenda Mais");
    expect(SISTEMAS_INTEGRAVEIS).toEqual(["Autoconf", "BNDV", "Boom", "Altimus", "Syonet"]);
    expect(listaDeSistemasIntegraveis()).toBe("Autoconf, BNDV, Boom, Altimus e Syonet");
    for (const nome of [SISTEMA_EM_PRODUCAO, ...SISTEMAS_INTEGRAVEIS]) expect(SISTEMAS.map((s) => s.rotulo)).toContain(nome);
  });

  it("hub, home e soluções citam os integráveis como fluxo, e só o Revenda Mais como em produção", () => {
    const hub = texto(HUB_AUTOMOTIVO);
    const home = texto(PERGUNTAS);
    const crm = texto(solucaoDa("/crm-com-whatsapp").perguntas);
    const automacao = texto(solucaoDa("/automacao-com-ia").perguntas);
    for (const lugar of [hub, home, crm, automacao]) {
      expect(lugar).toContain(listaDeSistemasIntegraveis());
      expect(lugar).toContain("Revenda Mais");
      for (const nome of SISTEMAS_INTEGRAVEIS) {
        expect(lugar).not.toMatch(new RegExp(`${nome}[^.]{0,40}em produção`));
        expect(lugar).not.toMatch(new RegExp(`em produção[^.]{0,60}${nome}`));
      }
    }
    expect(HUB_AUTOMOTIVO.fatos.map((f) => f.rotulo)).toContain("Integráveis por fluxo");
  });
});
