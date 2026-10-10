import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { amostrarCaminho } from "@/lib/contorno";
import { DESENHOS } from "@/lib/marca";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import { ler, RAIZ } from "./fonte";

/**
 * O logo vetorizado (`scripts/vetorizar-logo.mjs` → `lib/marca-vetor.ts`).
 * A rede da molécula é UMA forma: sem peças sobrepostas, o desenho fica
 * limpo com qualquer opacidade (a sobreposição aparecia no hero de 09/10).
 */

function dentro(contorno: { x: number; y: number }[], x: number, y: number) {
  let d = false;
  for (let i = 0, j = contorno.length - 1; i < contorno.length; j = i++) {
    const a = contorno[i];
    const b = contorno[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) d = !d;
  }
  return d;
}

describe("logo C1d vetorizado", () => {
  it("o arquivo do repositório é exatamente o que o script gera", () => {
    const pasta = mkdtempSync(join(tmpdir(), "vetor-"));
    const saida = join(pasta, "marca-vetor.ts");
    execFileSync("node", [join(RAIZ, "scripts/vetorizar-logo.mjs"), "--saida", saida], { cwd: RAIZ });
    expect(readFileSync(saida, "utf8")).toBe(ler("src/lib/marca-vetor.ts"));
  });

  it("o script usa a mesma geometria da C1d de marca.ts", () => {
    const script = ler("scripts/vetorizar-logo.mjs");
    for (const n of DESENHOS.C1d.nos) {
      expect(script, n.id).toMatch(new RegExp(`${n.id}: \\[${n.x}, ${n.y}, "${n.tipo}"\\]`));
    }
    expect(script).toMatch(/export const AMBAR = "Ot4";/);
  });

  it.each(["grande", "pequeno"] as const)("%s: a rede é um contorno só, sem peça solta", (tamanho) => {
    const comandosDeInicio = SIMBOLO_C1D[tamanho].rede.match(/M/gi) ?? [];
    expect(comandosDeInicio).toHaveLength(1);
  });

  it.each(["grande", "pequeno"] as const)("%s: cada átomo fica dentro da nuvem, sem encostar no traço", (tamanho) => {
    const v = SIMBOLO_C1D[tamanho];
    const contorno = amostrarCaminho(v.nuvem, 1440);
    for (const [id, n] of Object.entries(v.nos)) {
      expect(dentro(contorno, n.x, n.y), id).toBe(true);
      const distancia = Math.min(...contorno.map((p) => Math.hypot(p.x - n.x, p.y - n.y)));
      expect(distancia - n.r - v.tracoDaNuvem / 2, id).toBeGreaterThan(2);
    }
  });

  it("o tamanho pequeno mostra só a cadeia em V; o grande, a molécula inteira", () => {
    expect(Object.keys(SIMBOLO_C1D.grande.nos).sort()).toEqual(DESENHOS.C1d.nos.map((n) => n.id).sort());
    expect(Object.keys(SIMBOLO_C1D.pequeno.nos).sort()).toEqual(["Ob", "Ot2", "Ot4", "V1", "V2"]);
  });
});

describe("ícone da aba", () => {
  it("sai do vetor pequeno", () => {
    const icone = ler("src/app/icon.svg");
    expect(icone).toContain(SIMBOLO_C1D.pequeno.rede);
    expect(icone).toContain(`cx="${SIMBOLO_C1D.pequeno.ambar.cx}"`);
  });
});
