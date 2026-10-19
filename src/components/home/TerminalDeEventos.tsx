import type { CSSProperties } from "react";

/**
 * A janela de eventos do sistema da Motors, em três colunas da grade (hora,
 * evento, pares chave=valor). Cada célula leva `.linha-terminal` e o índice
 * da linha, para a linha inteira aparecer junto ao rolar. Rotulada como
 * exemplo: o formato é real, os valores não.
 */
function LinhaDoTerminal({ linha, i }: { linha: string; i: number }) {
  const [hora, evento, ...pares] = linha.split(/\s{2,}/);
  const estilo = { "--i": i } as CSSProperties;
  return (
    <>
      <span className="linha-terminal text-texto-secundario" style={estilo}>
        {hora}
      </span>
      <span className="linha-terminal text-texto" style={estilo}>
        {evento}
      </span>
      <span className="linha-terminal flex gap-x-4" style={estilo}>
        {pares
          .join(" ")
          .split(/\s+/)
          .map((par) => {
            const [chave, valor] = par.split("=");
            const ok = /^2\d\d$/.test(valor ?? "");
            return (
              <span key={par}>
                <span className="text-texto-secundario">{chave}=</span>
                <span className={ok ? "text-etapa-atendimento" : "text-acao-texto"}>{valor}</span>
              </span>
            );
          })}
      </span>
    </>
  );
}

export default function TerminalDeEventos({ linhas }: { linhas: string[] }) {
  return (
    <figure className="janela">
      <figcaption className="janela-barra justify-between">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-texto/15" />
            <span className="size-2.5 rounded-full bg-texto/15" />
            <span className="size-2.5 rounded-full bg-texto/15" />
          </span>
          <span className="font-mono text-xs text-texto-secundario">eventos do sistema</span>
        </span>
        <span className="rotulo rounded-full bg-fundo-alternado px-2.5 py-1 text-texto">exemplo</span>
      </figcaption>
      <pre className="terminal overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-[2]">
        <span className="grid w-max grid-cols-[auto_auto_auto] gap-x-6">
          {linhas.map((linha, i) => (
            <LinhaDoTerminal key={linha} linha={linha} i={i} />
          ))}
        </span>
      </pre>
    </figure>
  );
}
