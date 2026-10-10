import Link from "next/link";
import Icone from "@/components/Icone";
import HeroMolecula from "@/components/home/HeroMolecula";
import PalcoDoHero from "@/components/home/PalcoDoHero";
import { FERRAMENTAS, HERO } from "@/conteudo/home";

/**
 * O H1 é o LCP: texto do servidor, sem animação de entrada e sem nada por
 * cima. O palco da molécula fica numa caixa própria (à direita no desktop,
 * abaixo dos botões no celular): primeiro o SVG do servidor, depois o
 * canvas por cima, só com as partículas.
 */
export default function Hero({ titulo }: { titulo: string }) {
  return (
    <section aria-labelledby="titulo-hero" className="relative isolate">
      <div aria-hidden="true" className="hero-fundo" />
      <div className="conteiner grid items-center gap-x-8 gap-y-6 pb-14 pt-14 md:pt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-20 lg:pt-24">
        <div className="max-w-[44rem]">
          <p className="selo mb-7">
            <span aria-hidden="true" className="relative flex size-5 items-center justify-center rounded-full bg-ambar/15">
              <span className="size-1.5 rounded-full bg-ambar shadow-[0_0_10px_2px_rgb(242_165_22/0.6)]" />
            </span>
            <span>
              Catalisador de vendas com <span className="text-ambar">IA</span>
            </span>
          </p>
          <h1 id="titulo-hero" className="titulo-hero">
            {titulo}
          </h1>
          <p className="texto-guia mt-7 max-w-[35rem]">{HERO.subtitulo}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/diagnostico" className="botao botao-primario" data-acende-molecula>
              Pedir diagnóstico
              <Icone nome="seta" className="seta size-4" />
            </Link>
            <a href="#como-se-liga" className="botao botao-secundario" data-acende-molecula>
              Ver como tudo se liga
            </a>
          </div>
          <p className="mt-6 flex max-w-[32rem] items-start gap-2.5 text-[0.9375rem] leading-snug text-secundario">
            <Icone nome="relogio" className="mt-px size-[1.125rem] shrink-0 text-ambar" />
            {HERO.nota}
          </p>
        </div>

        <div className="relative -mx-5 aspect-[4/3] md:mx-0 lg:-ml-4 lg:-mr-10">
          <HeroMolecula />
          <PalcoDoHero />
        </div>
      </div>

      <div className="conteiner">
        <div className="flex flex-col gap-4 border-t border-linha py-7 md:flex-row md:items-center md:gap-10">
          <p className="flex shrink-0 items-center gap-2 text-sm text-secundario">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-verde-claro shadow-[0_0_8px_rgb(92_196_138/0.8)]" />
            {FERRAMENTAS.rotulo}
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5 text-[0.9375rem] font-semibold tracking-[-0.01em] text-papel/70">
            {FERRAMENTAS.nomes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
