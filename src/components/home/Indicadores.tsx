import { Parada, Trecho } from "@/components/rota/Rota";
import { INDICADORES } from "@/conteudo/home";

/** O que pode ser medido, sem número prometido: a regra de baixo diz por quê. */
export default function Indicadores() {
  return (
    <Trecho id="indicadores" aria-labelledby="titulo-indicadores" etapa="azul">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <div className="col-span-12 lg:col-span-7">
          <p className="rotulo text-texto-secundario">{INDICADORES.sobretitulo}</p>
          <h2 id="titulo-indicadores" className="titulo-secao mt-3">
            {INDICADORES.titulo}
          </h2>
        </div>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-8">{INDICADORES.texto}</p>
      </div>
      <dl className="mt-12 grid grid-cols-1 border-2 border-texto sm:grid-cols-2 lg:grid-cols-4">
        {INDICADORES.itens.map((i, n) => (
          <div key={i.titulo} className={`p-6 ${n > 0 ? "border-t border-linha sm:border-t-0 sm:border-l" : ""} ${n === 2 ? "sm:max-lg:border-t" : ""}`}>
            <dt className="titulo-cartao">{i.titulo}</dt>
            <dd className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{i.texto}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 max-w-[44rem] border-l-2 border-texto pl-4 leading-relaxed">{INDICADORES.regra}</p>
    </Trecho>
  );
}
