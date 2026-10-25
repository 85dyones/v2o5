import { Parada, Trecho } from "@/components/rota/Rota";
import { NOME } from "@/conteudo/home";

/** De onde vem o nome, em duas frases: o catalisador como jeito de pensar tecnologia. */
export default function Nome() {
  return (
    <Trecho id="nome" aria-labelledby="titulo-nome">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <div className="col-span-12 lg:col-span-5">
          <p className="rotulo text-texto-secundario">{NOME.rotulo}</p>
          <h2 id="titulo-nome" className="titulo-secao mt-3">
            {NOME.titulo}
          </h2>
        </div>
        <div className="col-span-12 grid gap-5 lg:col-span-7">
          {NOME.paragrafos.map((p) => (
            <p key={p} className="max-w-[38rem] leading-relaxed text-texto-secundario">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Trecho>
  );
}
