import Link from "next/link";
import Icone from "@/components/Icone";
import { Parada, Trecho } from "@/components/rota/Rota";
import { PROJETO } from "@/conteudo/home";

/**
 * O projeto da Motors Store em resumo. Só afirmações que o case já publica;
 * os números, com fonte e período, ficam na página do case.
 */
export default function ProjetoReal() {
  return (
    <Trecho id="case" aria-labelledby="titulo-case" etapa="azul">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-10 lg:items-start">
        <Parada />
        <div className="col-span-12 bg-texto p-7 text-fundo md:p-9 lg:col-span-6">
          <p className="rotulo text-faixa-escura-secundario">{PROJETO.rotulo}</p>
          <h2 id="titulo-case" className="titulo-secao mt-4">
            {PROJETO.titulo}
          </h2>
          <p className="mt-5 max-w-[30rem] leading-relaxed text-faixa-escura-secundario">{PROJETO.texto}</p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {PROJETO.pilulas.map((p) => (
              <li key={p} className="border border-faixa-escura-linha px-2.5 py-1 font-mono text-[0.75rem]">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:pl-6">
          <p className="rotulo text-texto-secundario">{PROJETO.sobretitulo}</p>
          <p className="titulo-cartao mt-3 max-w-[30rem]">{PROJETO.chamada}</p>
          <p className="mt-5 max-w-[34rem] leading-relaxed text-texto-secundario">{PROJETO.paragrafo}</p>
          <ul className="mt-6 grid gap-3">
            {PROJETO.provas.map((p) => (
              <li key={p} className="max-w-[34rem] border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
          <Link href="/cases/motors-store" className="botao botao-secundario mt-8" data-evento="cta_click" data-local="case">
            {PROJETO.link}
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </div>
      </div>
    </Trecho>
  );
}
