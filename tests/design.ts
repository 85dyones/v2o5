import { ler } from "./fonte";

/**
 * O front matter de `design/DESIGN.md`, lido com o mínimo de YAML que ele
 * usa: seções de topo, nomes no segundo nível e, na tipografia, as
 * propriedades no terceiro. Os testes comparam isto com `src/lib/tokens.ts`
 * e com o `globals.css`.
 */
export type FrenteDoDesign = Record<string, Record<string, string | Record<string, string>>>;

const valor = (bruto: string) => bruto.trim().replace(/^"(.*)"$/, "$1");
const chave = (bruta: string) => bruta.trim().replace(/^"(.*)"$/, "$1");

export function frenteDoDesign(): FrenteDoDesign {
  const texto = ler("design/DESIGN.md").replace(/\r\n/g, "\n");
  const frente = /^---\n([\s\S]*?)\n---/.exec(texto);
  if (!frente) throw new Error("DESIGN.md sem front matter");
  const saida: FrenteDoDesign = {};
  let secao: Record<string, string | Record<string, string>> | null = null;
  let item: Record<string, string> | null = null;
  for (const linha of frente[1].split("\n")) {
    const topo = /^([\w-]+):\s*(.*)$/.exec(linha);
    if (topo) {
      secao = topo[2] ? null : (saida[topo[1]] = {});
      item = null;
      continue;
    }
    const segundo = /^ {2}("?[\w-]+"?):\s*(.*)$/.exec(linha);
    if (segundo && secao) {
      if (segundo[2]) {
        secao[chave(segundo[1])] = valor(segundo[2]);
        item = null;
      } else {
        item = secao[chave(segundo[1])] = {};
      }
      continue;
    }
    const terceiro = /^ {4}([\w-]+):\s*(.*)$/.exec(linha);
    if (terceiro && item) item[terceiro[1]] = valor(terceiro[2]);
  }
  return saida;
}

/** `fundoCartao` → `fundo-cartao`, `titulo1` → `titulo-1`. */
export const kebab = (nome: string) =>
  nome.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`).replace(/([a-z])(\d)/g, "$1-$2");

/** O valor de uma variável CSS no texto (a primeira declaração). */
export function variavelNoCss(css: string, nome: string): string | null {
  const m = new RegExp(`(?<![\\w-])${nome.replace(/[-]/g, "\\-")}:\\s*([^;]+);`).exec(css);
  return m ? m[1].trim() : null;
}
