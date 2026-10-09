import Link from "next/link";
import Simbolo from "@/components/marca/Simbolo";
import HeroMolecula from "@/components/home/HeroMolecula";
import { MARGEM_DO_HERO } from "@/lib/marca";
import { HERO } from "@/conteudo/home";

/**
 * O H1 é o LCP: texto do servidor, sem animação de entrada e sem nada por
 * cima. A molécula fica numa caixa própria (à direita no desktop, abaixo dos
 * botões no celular) e começa como o SVG do símbolo; o canvas só assume
 * depois de pintar o primeiro quadro.
 */
export default function Hero({ titulo }: { titulo: string }) {
  const folga = `${MARGEM_DO_HERO * 100}%`;
  return (
    <section aria-labelledby="titulo-hero" className="relative">
      <div className="conteiner grid items-center gap-x-10 gap-y-12 pb-20 pt-12 md:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-28 lg:pt-24">
        <div className="max-w-[40rem]">
          <p className="mb-5 text-[0.9375rem] font-medium text-secundario">
            Catalisador de vendas com <span className="text-ambar">IA</span>
          </p>
          <h1 id="titulo-hero" className="titulo-hero">
            {titulo}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-secundario">{HERO.subtitulo}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/diagnostico" className="botao botao-primario" data-acende-molecula>
              Pedir diagnóstico
            </Link>
            <a href="#como-se-liga" className="botao botao-secundario" data-acende-molecula>
              Ver como tudo se liga
            </a>
          </div>
          <p className="mt-5 max-w-[30rem] text-[0.9375rem] text-secundario">{HERO.nota}</p>
        </div>

        <div className="relative mx-auto aspect-[1.6] w-full max-w-[34rem] lg:max-w-none">
          <HeroMolecula />
          <div className="molecula-estatica pointer-events-none absolute" style={{ inset: folga }}>
            <Simbolo className="h-full w-full text-papel/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
