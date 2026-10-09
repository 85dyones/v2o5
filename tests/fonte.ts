import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const RAIZ = join(__dirname, "..");

export function ler(caminho: string): string {
  return readFileSync(join(RAIZ, caminho), "utf8");
}

/** Tira comentários de bloco e de linha (o bastante para varrer fonte). */
export function semComentarios(codigo: string): string {
  return codigo.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

export function arquivos(pasta: string, extensoes = /\.(tsx?|css)$/): string[] {
  return readdirSync(join(RAIZ, pasta)).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(join(RAIZ, caminho)).isDirectory()) return arquivos(caminho, extensoes);
    return extensoes.test(nome) ? [relative(RAIZ, join(RAIZ, caminho))] : [];
  });
}
