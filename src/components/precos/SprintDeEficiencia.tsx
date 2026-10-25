import { ComMarcas } from "@/components/rota/Rota";
import { CONDICOES, CONTINUIDADE, faixaEmTexto, SPRINT_DE_PRECOS as S } from "@/conteudo/sprint";

/** As faixas de referência do Sprint e da continuidade, e como o projeto é combinado. */
export default function SprintDeEficiencia() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3">
        {S.niveis.map((n) => (
          <li key={n.nome} className={`flex flex-col p-6 ${"principal" in n && n.principal ? "border-2 border-texto" : "border border-linha"}`}>
            <p className="rotulo text-texto-secundario">{"principal" in n && n.principal ? "Oferta principal" : n.duracao}</p>
            <h3 className="titulo-cartao mt-3">{n.nome}</h3>
            <p className="mt-4 text-[1.0625rem] font-semibold tabular-nums">
              <ComMarcas texto={faixaEmTexto(n.faixa)} marcas={[faixaEmTexto(n.faixa)]} etapa="ambar" />
            </p>
            <p className="mt-1 text-[0.8125rem] text-texto-secundario">
              {"principal" in n && n.principal ? `Referência: ${n.duracao}` : "Faixa de referência"}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed">{n.para}</p>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-texto-secundario">{n.exemplos}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-[44rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{S.revisao}</p>

      <div className="mt-10 grid gap-x-6 gap-y-8 border-t-2 border-texto pt-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="titulo-cartao">{S.formacao.titulo}</h3>
          <ul className="mt-4 grid gap-3">
            {S.formacao.itens.map((i) => (
              <li key={i} className="border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <h3 className="titulo-cartao">{CONTINUIDADE.titulo}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{CONTINUIDADE.texto}</p>
          <ul className="mt-4 grid gap-3">
            {CONTINUIDADE.recorrencia.map((r) => (
              <li key={r.titulo} className="border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
                <span className="font-semibold">{r.titulo}.</span> {r.texto}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-texto-secundario">{CONTINUIDADE.porque}</p>
          <dl className="mt-5 grid gap-px border border-linha bg-linha sm:grid-cols-2">
            {CONTINUIDADE.modalidades.map((m) => (
              <div key={m.nome} className="bg-fundo p-5">
                <dt className="font-semibold">{m.nome}</dt>
                <dd className="mt-2 tabular-nums">
                  <ComMarcas texto={`${faixaEmTexto(m.faixa)} por mês`} marcas={[faixaEmTexto(m.faixa)]} etapa="ambar" />
                </dd>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{m.texto}</dd>
                <dd className="mt-2 text-[0.8125rem] text-texto-secundario">Faixa de referência. Valor e limites em contrato.</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-texto-secundario">{CONTINUIDADE.limites}</p>
        </div>
      </div>

      <div className="mt-10 border-t border-linha pt-8">
        <h3 className="titulo-cartao">{CONDICOES.titulo}</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {CONDICOES.itens.map((c) => (
            <div key={c.titulo}>
              <dt className="font-semibold">{c.titulo}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{c.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
