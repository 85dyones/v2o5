import Link from "next/link";
import Icone from "@/components/Icone";
import { Parada, Trecho } from "@/components/rota/Rota";
import { SPRINT } from "@/conteudo/home";

/**
 * O produto principal e as quatro etapas. A apresentação fica à esquerda e
 * acompanha a leitura no desktop; as etapas descem em lista ordenada.
 */
export default function Sprint() {
  return (
    <Trecho id="metodo" aria-labelledby="titulo-sprint" etapa="verde">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
        <Parada />
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="rotulo text-texto-secundario">{SPRINT.rotulo}</p>
            <h2 id="titulo-sprint" className="titulo-secao mt-3">
              {SPRINT.titulo}
            </h2>
            <p className="texto-guia mt-6 max-w-[30rem]">{SPRINT.texto}</p>
            <p className="mt-6 max-w-[30rem] border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">{SPRINT.principio}</p>
            <Link href="/diagnostico" className="botao botao-primario mt-8" data-evento="cta_click" data-local="sprint">
              {SPRINT.cta}
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>
        </div>
        <ol className="col-span-12 border-t-2 border-texto lg:col-span-7">
          {SPRINT.etapas.map((e, i) => (
            <li key={e.titulo} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-linha py-7">
              <span className="rotulo pt-1 text-texto-secundario" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="titulo-cartao">{e.titulo}</h3>
                <p className="mt-3 max-w-[36rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{e.texto}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.entregas.map((x) => (
                    <li key={x} className="contorno-forte px-2.5 py-1 font-mono text-[0.75rem]">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Trecho>
  );
}
