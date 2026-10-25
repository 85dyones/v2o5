import { Parada, Trecho } from "@/components/rota/Rota";
import { DORES } from "@/conteudo/home";

/** O problema antes da ferramenta: três dores que o visitante reconhece na própria operação. */
export default function Dores() {
  return (
    <Trecho id="problemas" aria-labelledby="titulo-dores">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-dores" className="titulo-secao col-span-12 lg:col-span-7">
          {DORES.titulo} <span className="apagado">{DORES.apagado}</span>
        </h2>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{DORES.texto}</p>
      </div>
      <ul className="mt-12 grid border-t-2 border-texto md:grid-cols-3">
        {DORES.itens.map((d, i) => (
          <li key={d.titulo} className={`py-7 md:px-6 md:first:pl-0 ${i > 0 ? "border-t border-linha md:border-l md:border-t-0" : ""}`}>
            <h3 className="titulo-cartao">{d.titulo}</h3>
            <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{d.texto}</p>
          </li>
        ))}
      </ul>
    </Trecho>
  );
}
