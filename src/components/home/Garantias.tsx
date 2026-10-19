import Link from "next/link";
import Icone from "@/components/Icone";
import { ComMarcas, Parada, Trecho } from "@/components/rota/Rota";
import { CHAMADA, GARANTIAS, HERO } from "@/conteudo/home";

/**
 * As quatro regras comerciais que tiram o medo de contratar, numa ficha em
 * células, com a chamada para o diagnóstico ao lado. Tudo vem de
 * `oferta.md`; nada aqui é promessa nova.
 */
export default function Garantias() {
  const c = CHAMADA.depoisDasSolucoes;
  return (
    <Trecho aria-labelledby="titulo-garantias">
      <div className="relative grid grid-cols-12 border-y-2 border-texto">
        <Parada />
        <dl className="col-span-12 grid sm:grid-cols-2 lg:col-span-8">
          {GARANTIAS.map((g, i) => (
            <div
              key={g.titulo}
              className={`grid content-start gap-3 border-linha p-6 md:p-7 ${i > 0 ? "border-t" : ""} ${i % 2 ? "sm:border-l" : ""} ${i < 2 ? "sm:border-t-0" : ""}`}
            >
              <dt className="rotulo text-texto">{g.titulo}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-texto-secundario">{g.texto}</dd>
            </div>
          ))}
        </dl>
        <div className="col-span-12 flex flex-col justify-center border-t border-linha bg-fundo-cartao p-6 md:p-8 lg:col-span-4 lg:border-l lg:border-t-0">
          <h2 id="titulo-garantias" className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
            {c.titulo}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{c.texto}</p>
          <Link href="/diagnostico" className="botao botao-primario mt-6 self-start" data-evento="cta_click" data-local="garantias">
            {CHAMADA.botao}
            <Icone nome="seta" className="seta size-4" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-texto-secundario">
            <ComMarcas texto={HERO.nota} marcas={["45 minutos", "24 horas"]} etapa="verde" />
          </p>
        </div>
      </div>
    </Trecho>
  );
}
