/**
 * Os eventos do sistema da Motors numa tabela de três colunas (hora, evento,
 * pares chave=valor), como um livro de registros: fio entre as linhas,
 * algarismos tabulares, mono só aqui, que é dado. Rotulada como exemplo: o
 * formato é real, os valores não. (O nome do componente ficou da versão em
 * janela de terminal, que saiu com a direção B.)
 */
function LinhaDoRegistro({ linha }: { linha: string }) {
  const [hora, evento, ...pares] = linha.split(/\s{2,}/);
  return (
    <div className="contents">
      <span className="border-t border-linha py-2.5 pr-6 tabular-nums text-texto-secundario">{hora}</span>
      <span className="border-t border-linha py-2.5 pr-6 text-texto">{evento}</span>
      <span className="flex flex-wrap gap-x-4 border-t border-linha py-2.5">
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
    </div>
  );
}

export default function TerminalDeEventos({ linhas }: { linhas: string[] }) {
  return (
    <figure className="border-y-2 border-texto bg-fundo">
      <figcaption className="flex items-center justify-between gap-4 py-3">
        <span className="font-mono text-xs text-texto-secundario">eventos do sistema</span>
        <span className="rotulo bg-tinta-ambar px-2 py-1 text-texto">exemplo</span>
      </figcaption>
      {/* Rola de lado no celular: com tabIndex o teclado também alcança a rolagem. */}
      <div className="overflow-x-auto pb-1" tabIndex={0} role="region" aria-label="Registro de eventos do sistema, exemplo">
        <div className="grid w-max min-w-full grid-cols-[auto_auto_1fr] font-mono text-[0.8125rem] leading-relaxed">
          {linhas.map((linha) => (
            <LinhaDoRegistro key={linha} linha={linha} />
          ))}
        </div>
      </div>
    </figure>
  );
}
