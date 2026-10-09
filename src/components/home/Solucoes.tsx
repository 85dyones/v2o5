import Link from "next/link";
import Icone from "@/components/Icone";
import BentoLuz from "@/components/home/BentoLuz";
import VinhetaDaLinha, { PONTO_DA_ETAPA } from "@/components/home/Vinhetas";
import { LINHAS, NOME_DA_ETAPA, type Linha } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

export function MarcaDeEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-secundario">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${PONTO_DA_ETAPA[etapa]}`} />
      {NOME_DA_ETAPA[etapa]}
    </span>
  );
}

function Rodape({ linha }: { linha: Linha }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
      <p className="text-sm font-medium tabular-nums text-papel/90">{linha.preco}</p>
      <span
        aria-hidden="true"
        className="seta-do-cartao flex size-8 shrink-0 items-center justify-center rounded-full bg-vidro-forte text-papel contorno"
      >
        <Icone nome="seta" className="size-3.5" />
      </span>
    </div>
  );
}

/**
 * As seis linhas gerais (oferta.md), cada uma com a cena de produto dela. O
 * agente de IA ocupa o bloco grande: é a linha que mais muda a operação. A
 * cor da etapa liga cada cartão ao diagrama de "Como tudo se liga".
 */
export default function Solucoes() {
  const [destaque, ...demais] = LINHAS;
  return (
    <section id="solucoes" aria-labelledby="titulo-solucoes" className="adiada py-24 md:py-36">
      <div className="conteiner">
        <div className="max-w-[52rem]">
          <p className="sobretitulo">Soluções</p>
          <h2 id="titulo-solucoes" className="titulo-secao mt-5">
            O que a V2O5 monta para a sua empresa.{" "}
            <span className="apagado">Comece por uma linha e some as outras depois.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[38rem]">
            Todas usam a mesma base de dados, então o que entra por uma aparece nas outras.
          </p>
        </div>

        <BentoLuz className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href={destaque.href}
            className="superficie cartao-luz flex flex-col gap-7 p-3 md:col-span-2 lg:row-span-2"
          >
            <div className="grid gap-x-10 gap-y-4 px-3 pt-4 md:grid-cols-2 md:px-5 md:pt-6">
              <div>
                <MarcaDeEtapa etapa={destaque.etapa} />
                <h3 className="mt-4 max-w-[20rem] text-[clamp(1.75rem,1.3rem+1.4vw,2.375rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                  {destaque.titulo}
                </h3>
              </div>
              <div className="flex flex-col md:pt-9">
                <p className="text-[1.0625rem] leading-relaxed text-secundario">{destaque.frase}</p>
                <Rodape linha={destaque} />
              </div>
            </div>
            <div className="flex-1">
              <VinhetaDaLinha vinheta={destaque.vinheta} />
            </div>
          </Link>

          {demais.map((linha) => (
            <Link key={linha.href} href={linha.href} className="superficie cartao-luz flex flex-col p-3">
              <div className="h-52">
                <VinhetaDaLinha vinheta={linha.vinheta} />
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                <MarcaDeEtapa etapa={linha.etapa} />
                <h3 className="titulo-cartao mt-2.5">{linha.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{linha.frase}</p>
                <Rodape linha={linha} />
              </div>
            </Link>
          ))}
        </BentoLuz>
      </div>
    </section>
  );
}
