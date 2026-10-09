import type { CSSProperties } from "react";
import { VISAO_360 } from "@/conteudo/home";

/**
 * Visão 360: o caminho do cliente pelas quatro áreas (marca, marketing,
 * vendas, gestão), com o que costuma romper na passagem de uma para outra.
 * O fio âmbar é a tecnologia que costura as quatro; ele se desenha conforme a
 * seção rola, por CSS (`animation-timeline`), sem JavaScript. Sem suporte ou
 * com menos movimento, já aparece costurado. Cada área traz a base do
 * fundador que responde por ela.
 */
export default function VisaoAmpla() {
  const v = VISAO_360;
  return (
    <section aria-labelledby="titulo-visao" className="adiada relative py-24 md:py-36">
      <div className="conteiner">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="sobretitulo">{v.sobretitulo}</p>
            <h2 id="titulo-visao" className="titulo-secao mt-5">
              {v.titulo} <span className="apagado">{v.tituloApagado}</span>
            </h2>
          </div>
          <div className="max-w-[36rem]">
            <p className="texto-guia">{v.texto}</p>
            <figure className="mt-6 border-t border-linha pt-5">
              <p className="text-[0.9375rem] leading-relaxed text-papel/85">{v.evidencia.texto}</p>
              <figcaption className="mt-2 text-[0.8125rem] leading-relaxed text-secundario">
                Fonte:{" "}
                <a href={v.evidencia.href} className="link-sublinhado">
                  {v.evidencia.fonte}
                </a>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="superficie mt-14 md:mt-20">
          <ol className="costura" aria-label="O caminho do cliente, da marca à gestão">
            {v.areas.map((area, i) => (
              <li key={area.nome} className="costura-area">
                <div className="costura-cabeca">
                  <h3 className="text-sm font-medium text-secundario">{area.nome}</h3>
                  <p className="titulo-cartao mt-2">{area.pergunta}</p>
                </div>
                <p className="costura-acao text-[0.9375rem] leading-relaxed text-secundario">{area.acao}</p>
                <p className="costura-base text-[0.8125rem] leading-snug">
                  <span className="block text-secundario">{area.base.tipo}</span>
                  {area.base.texto}
                </p>
                {i < v.costuras.length && (
                  <p className="costura-ponto" style={{ "--i": i } as CSSProperties}>
                    {v.costuras[i]}
                  </p>
                )}
              </li>
            ))}
          </ol>
          <p className="flex items-center gap-4 border-t border-linha px-6 py-4 text-[0.9375rem] leading-snug">
            <span aria-hidden="true" className="fio-amostra" />
            <span>
              <span className="font-medium">{v.fio.titulo}</span>{" "}
              <span className="text-secundario">{v.fio.texto}</span>
            </span>
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12">
          <div>
            <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">{v.fundador.nome}</p>
            <p className="mt-1 text-sm text-secundario">{v.fundador.papel}</p>
          </div>
          <p className="texto-guia max-w-[44rem]">{v.fundador.texto}</p>
        </div>
      </div>
    </section>
  );
}
