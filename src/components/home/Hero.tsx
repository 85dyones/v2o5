import Link from "next/link";
import Icone from "@/components/Icone";
import MapaDaAbertura from "@/components/home/mapa/MapaDaAbertura";
import { ComMarcas } from "@/components/rota/Rota";
import { FERRAMENTAS, HERO } from "@/conteudo/home";

/**
 * A abertura. O H1 é o LCP: texto do servidor, sem animação de entrada e sem
 * nada por cima. À direita, separada por fio, a coluna com o subtítulo, os
 * botões e a nota do diagnóstico. Embaixo, o mapa das sete peças, de onde
 * sai a rota que desce pela página, e as ferramentas em produção.
 */
export default function Hero({ titulo }: { titulo: string }) {
  return (
    <section aria-labelledby="titulo-hero" className="border-b-2 border-texto">
      <div className="conteiner conteiner-rota grid grid-cols-12 border-b border-linha">
        <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
          <p className="text-[0.9375rem] font-medium">
            Catalisador de vendas com <span className="text-acao-texto">IA</span>
          </p>
          <h1 id="titulo-hero" className="titulo-hero mt-6 max-w-[13ch]">
            {titulo}
          </h1>
        </div>
        <div className="col-span-12 border-t border-linha bg-fundo pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
          <p className="text-[1.0625rem] leading-relaxed">
            <ComMarcas texto={HERO.subtitulo} marcas={["de onde veio cada venda"]} />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
              Pedir diagnóstico
              <Icone nome="seta" className="seta size-4" />
            </Link>
            <a href="#como-se-liga" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
              Ver como tudo se liga
            </a>
          </div>
          <p className="mt-8 text-[0.9375rem] leading-relaxed text-texto-secundario">
            <ComMarcas texto={HERO.nota} marcas={["45 minutos", "24 horas"]} etapa="verde" />
          </p>
        </div>
      </div>

      <div className="conteiner border-b border-linha px-0 md:px-0">
        <MapaDaAbertura />
      </div>

      <div className="conteiner conteiner-rota">
        <div className="flex flex-col py-4 md:flex-row md:items-stretch md:py-0">
          <p className="rotulo flex items-center text-texto-secundario md:min-h-12 md:border-r md:border-linha md:pr-5">{FERRAMENTAS.rotulo}</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 md:mt-0 md:gap-0">
            {FERRAMENTAS.nomes.map((f) => (
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
