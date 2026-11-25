import Link from "next/link";
import Icone from "@/components/Icone";
import { Parada, Trecho } from "@/components/rota/Rota";
import { PROJETO } from "@/conteudo/home";

/**
 * Os dois cases com o mesmo peso (25/11/2026): Motors Store e 16ª Vara Cível,
 * os dois como atendimento, cada um num cartão igual. Só afirmações que os
 * cases já publicam; os números, com fonte e período, ficam na página de cada
 * case.
 */
export default function ProjetoReal() {
  return (
    <Trecho id="case" aria-labelledby="titulo-case" etapa="azul">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <div className="col-span-12 lg:col-span-8">
          <p className="rotulo text-texto-secundario">{PROJETO.rotulo}</p>
          <h2 id="titulo-case" className="titulo-secao mt-3">
            {PROJETO.titulo} <span className="apagado">{PROJETO.apagado}</span>
          </h2>
        </div>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 md:mt-14">
        {PROJETO.cases.map((c) => (
          <li key={c.href} className="flex flex-col border-2 border-texto p-6 md:p-7">
            <h3 className="titulo-cartao">{c.nome}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-texto-secundario">{c.texto}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.pilulas.map((p) => (
                <li key={p} className="border border-linha px-2.5 py-1 font-mono text-[0.75rem]">
                  {p}
                </li>
              ))}
            </ul>
            <Link href={c.href} className="botao botao-secundario mt-7 self-start" data-evento="cta_click" data-local="case">
              {c.link}
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {PROJETO.provas.map((p) => (
          <li key={p} className="border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
            {p}
          </li>
        ))}
      </ul>
    </Trecho>
  );
}
