import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

export const RAIZ = join(__dirname, "..");

/** Lê um arquivo do repositório com fim de linha LF, como está no git: no
 *  Windows o checkout com `core.autocrlf` traz CRLF. */
export function ler(caminho: string): string {
  return readFileSync(join(RAIZ, caminho), "utf8").replace(/\r\n/g, "\n");
}

/** Tira comentários de bloco e de linha (o bastante para varrer fonte). */
export function semComentarios(codigo: string): string {
  return codigo.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

/** Caminhos relativos à raiz, sempre com `/` (no Windows o `path` usa `\`). */
export function arquivos(pasta: string, extensoes = /\.(tsx?|css)$/): string[] {
  return readdirSync(join(RAIZ, pasta)).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(join(RAIZ, caminho)).isDirectory()) return arquivos(caminho, extensoes);
    return extensoes.test(nome) ? [relative(RAIZ, join(RAIZ, caminho)).split(sep).join("/")] : [];
  });
}
