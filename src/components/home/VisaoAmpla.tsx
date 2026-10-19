import type { CSSProperties } from "react";
import { Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { VISAO_360 } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

/** A etapa de cada área, na ordem do caminho do cliente. */
const ETAPA_DA_AREA: Etapa[] = ["violeta", "violeta", "verde", "azul"];

/**
 * Visão 360: o caminho do cliente pelas quatro áreas (marca, marketing,
 * vendas, gestão) em quatro células, com o que costuma romper na passagem de
 * uma para outra marcado sobre a divisa. O fio âmbar que corre sobre as
 * células é a tecnologia que costura as quatro; fica parado. Cada área traz
 * a base do fundador que responde por ela.
 */
export default function VisaoAmpla() {
  const v = VISAO_360;
  return (
    <Trecho aria-label={v.sobretitulo}>
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-8">
        <Parada />
        <h2 id="titulo-visao" className="titulo-secao col-span-12 lg:col-span-7">
          {v.titulo} <span className="apagado">{v.tituloApagado}</span>
        </h2>
        <div className="col-span-12 lg:col-span-5 lg:pt-2">
          <p className="texto-guia">{v.texto}</p>
          <figure className="mt-6 border-t border-linha pt-5">
            <p className="text-[0.9375rem] leading-relaxed">{v.evidencia.texto}</p>
            <figcaption className="mt-2 text-[0.8125rem] leading-relaxed text-texto-secundario">
              Fonte:{" "}
              <a href={v.evidencia.href} className="link-sublinhado">
                {v.evidencia.fonte}
              </a>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mt-14 border-y-2 border-texto md:mt-20">
        <ol className="relative grid md:grid-cols-2 lg:grid-cols-4" aria-label="O caminho do cliente, da marca à gestão">
          {v.areas.map((area, i) => (
            <li
              key={area.nome}
              className={`relative flex flex-col gap-4 border-linha p-6 md:p-7 ${i > 0 ? "border-t md:border-t-0" : ""} ${i % 2 ? "md:border-l" : ""} ${i === 2 ? "md:border-t lg:border-t-0 lg:border-l" : ""} ${i === 3 ? "md:border-t lg:border-t-0" : ""}`}
              style={{ "--cor": TEXTO_DA_ETAPA[ETAPA_DA_AREA[i]] } as CSSProperties}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-(--cor)" />
              <h3 className="rotulo text-(--cor)">{area.nome}</h3>
              <p className="titulo-cartao">{area.pergunta}</p>
              <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">{area.acao}</p>
              <p className="mt-auto border-t border-linha pt-4 text-[0.8125rem] leading-snug">
                <span className="block text-texto-secundario">{area.base.tipo}</span>
                {area.base.texto}
              </p>
              {i < v.costuras.length && (
                <p className="self-start bg-tinta-ambar px-2 py-1 text-[0.8125rem] font-medium leading-snug lg:absolute lg:right-0 lg:top-0 lg:z-10 lg:max-w-[10rem] lg:-translate-y-1/2 lg:translate-x-1/2 lg:text-center">
                  {v.costuras[i]}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="flex items-center gap-4 border-t border-linha px-6 py-4 text-[0.9375rem] leading-snug md:px-7">
          <span aria-hidden="true" className="h-0.5 w-10 shrink-0 bg-acao-texto" />
          <span>
            <span className="font-medium">{v.fio.titulo}</span> <span className="text-texto-secundario">{v.fio.texto}</span>
          </span>
        </p>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-4 md:mt-16">
        <div className="col-span-12 md:col-span-4">
          <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{v.fundador.nome}</p>
          <p className="rotulo mt-2 text-texto-secundario">{v.fundador.papel}</p>
        </div>
        <p className="texto-guia col-span-12 md:col-span-8">{v.fundador.texto}</p>
      </div>
    </Trecho>
  );
}
