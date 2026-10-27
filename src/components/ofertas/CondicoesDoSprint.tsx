import { Parada, Trecho } from "@/components/rota/Rota";
import { CONDICOES, SPRINT_DE_PRECOS as S } from "@/conteudo/sprint";

/** Do que o preço do Sprint é feito e como o projeto é combinado (escopo, pagamento, prazos, defeitos, resultado). */
export default function CondicoesDoSprint() {
  return (
    <Trecho aria-labelledby="titulo-condicoes">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-condicoes" className="titulo-secao col-span-12 lg:col-span-9">
          {CONDICOES.titulo}. <span className="apagado">Tudo por escrito, antes de começar.</span>
        </h2>
      </div>
      <div className="mt-titulo-conteudo grid gap-x-6 gap-y-10 md:grid-cols-12">
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
        <dl className="grid gap-x-8 gap-y-6 md:col-span-7 md:grid-cols-2">
          {CONDICOES.itens.map((c) => (
            <div key={c.titulo}>
              <dt className="font-semibold">{c.titulo}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{c.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Trecho>
  );
}
