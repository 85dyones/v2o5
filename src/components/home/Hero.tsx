import Link from "next/link";
import Icone from "@/components/Icone";
import { HERO } from "@/conteudo/home";

/**
 * A abertura. O H1 é o LCP: texto do servidor, sem animação de entrada e sem
 * nada por cima. À direita, separada por fio, a coluna com o subtítulo, os
 * botões e a nota do método. Embaixo, a faixa do que a V2O5 conecta.
 */
export default function Hero({ titulo }: { titulo: string }) {
  return (
    <section aria-labelledby="titulo-hero" className="border-b-2 border-texto">
      <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
        <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
          <p className="text-[0.9375rem] font-medium">
            {HERO.eyebrow}
          </p>
          <h1 id="titulo-hero" className="titulo-hero mt-6 max-w-[13ch]">
            {titulo}
          </h1>
        </div>
        <div className="col-span-12 border-t border-linha bg-fundo pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
          <p className="text-[1.0625rem] leading-relaxed">
            {HERO.subtitulo}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
              {HERO.cta}
              <Icone nome="seta" className="seta size-4" />
            </Link>
            <a href="#metodo" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero-metodo">
              {HERO.ctaSecundario}
            </a>
          </div>
          <p className="mt-8 text-[0.9375rem] leading-relaxed text-texto-secundario">
            {HERO.principio}
          </p>
        </div>
      </div>

      <div className="conteiner conteiner-rota">
        <div className="flex flex-col py-4 md:flex-row md:items-stretch md:py-0">
          <p className="rotulo flex items-center text-texto-secundario md:min-h-12 md:border-r md:border-linha md:pr-5">{HERO.conectamos.rotulo}</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 md:mt-0 md:gap-0">
            {HERO.conectamos.itens.map((f) => (
              <li key={f} className="flex items-center font-mono text-[0.8125rem] font-medium md:min-h-12 md:border-r md:border-linha md:px-5">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
