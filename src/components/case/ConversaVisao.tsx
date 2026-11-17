import type { Ref } from "react";

export interface Mensagem {
  de: string;
  texto: string;
}

/**
 * A janela da triagem: tamanho fixo, rolagem por dentro, a vara à esquerda no
 * papel do cartão e a pessoa à direita na tinta verde do atendimento. Rotulada
 * como exemplo. O que se vê é `aria-hidden`; o leitor de tela recebe a conversa
 * inteira, de uma vez, numa lista oculta, para não ouvir mensagens chegando.
 * Sem `visiveis`, mostra tudo: é o HTML do servidor e o estado com menos movimento.
 */
export default function ConversaVisao({
  legenda,
  mensagens,
  visiveis = mensagens.length,
  digitando = false,
  janela,
}: {
  legenda: string;
  mensagens: Mensagem[];
  visiveis?: number;
  digitando?: boolean;
  janela?: Ref<HTMLOListElement>;
}) {
  return (
    <figure className="border-y-2 border-texto bg-fundo">
      <figcaption className="flex items-center justify-between gap-4 py-3">
        <span className="font-mono text-xs text-texto-secundario">{legenda}</span>
        <span className="rotulo bg-tinta-ambar px-2 py-1 text-texto">exemplo</span>
      </figcaption>
      <ol
        ref={janela}
        aria-hidden="true"
        className="flex h-[26rem] flex-col gap-3 overflow-y-auto overscroll-contain border-t border-linha py-5 pr-1 md:h-[30rem]"
      >
        {mensagens.slice(0, visiveis).map((m, i) => (
          <li
            key={i}
            className={`conversa-entra max-w-[85%] shrink-0 whitespace-pre-line border px-4 py-3 text-[0.9375rem] leading-relaxed ${
              m.de === "pessoa" ? "self-end border-tinta-verde bg-tinta-verde" : "self-start border-linha bg-fundo-cartao"
            }`}
          >
            {m.texto}
          </li>
        ))}
        {digitando ? (
          <li data-digitando="" className="conversa-entra flex shrink-0 gap-1.5 self-start border border-linha bg-fundo-cartao px-4 py-4">
            <span className="conversa-ponto size-1.5 bg-texto-secundario" />
            <span className="conversa-ponto size-1.5 bg-texto-secundario" />
            <span className="conversa-ponto size-1.5 bg-texto-secundario" />
          </li>
        ) : null}
      </ol>
      <ol className="sr-only">
        {mensagens.map((m, i) => (
          <li key={i}>
            {m.de === "pessoa" ? "Pessoa: " : "Vara: "}
            {m.texto}
          </li>
        ))}
      </ol>
    </figure>
  );
}
