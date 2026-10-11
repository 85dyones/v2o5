import Link from "next/link";
import Icone from "@/components/Icone";
import VinhetaDaLinha, { PONTO_DA_ETAPA } from "@/components/home/Vinhetas";
import { NOME_DA_ETAPA, PILARES, SOLUCOES, type Servico } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

export function MarcaDeEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-secundario">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${PONTO_DA_ETAPA[etapa]}`} />
      {NOME_DA_ETAPA[etapa]}
    </span>
  );
}

function Rodape({ servico }: { servico: Servico }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
      <p className="text-sm font-medium tabular-nums text-papel/90">{servico.preco}</p>
      <span
        aria-hidden="true"
        className="seta-do-cartao flex size-8 shrink-0 items-center justify-center rounded-full bg-vidro-forte text-papel contorno"
      >
        <Icone nome="seta" className="size-3.5" />
      </span>
    </div>
  );
}

type Formato = "normal" | "destaque" | "largo";

/**
 * Onde cada cartão cai na grade de 6 colunas (desktop) e 2 (tablet). No
 * mapa: duas fileiras de três (marca, perfil e busca; site, anúncios e
 * rastreamento). Na operação: o agente de IA no bloco grande, automação e
 * CRM ao lado, integrações numa faixa inteira.
 */
function arranjo(pilar: string, i: number): { formato: Formato; classe: string } {
  if (pilar === "operacao") {
    if (i === 0) return { formato: "destaque", classe: "md:col-span-2 lg:col-span-4 lg:row-span-2" };
    if (i === 3) return { formato: "largo", classe: "md:col-span-2 lg:col-span-6" };
    return { formato: "normal", classe: "lg:col-span-2" };
  }
  return { formato: "normal", classe: "lg:col-span-2" };
}

function Cartao({ servico, formato, classe }: { servico: Servico; formato: Formato; classe: string }) {
  if (formato === "destaque") {
    return (
      <Link href={servico.href} className={`superficie cartao-luz flex min-w-0 flex-col gap-7 p-3 ${classe}`}>
        <div className="grid gap-x-10 gap-y-4 px-3 pt-4 md:grid-cols-2 md:px-5 md:pt-6">
          <div>
            <MarcaDeEtapa etapa={servico.etapa} />
            <h4 className="mt-4 max-w-[20rem] text-[clamp(1.75rem,1.3rem+1.4vw,2.375rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              {servico.titulo}
            </h4>
          </div>
          <div className="flex flex-col md:pt-9">
            <p className="text-[1.0625rem] leading-relaxed text-secundario">{servico.frase}</p>
            <Rodape servico={servico} />
          </div>
        </div>
        <div className="flex-1">
          <VinhetaDaLinha vinheta={servico.vinheta} />
        </div>
      </Link>
    );
  }
  const largo = formato === "largo";
  return (
    <Link
      href={servico.href}
      className={`superficie cartao-luz flex min-w-0 flex-col p-3 ${largo ? "lg:grid lg:grid-cols-2 lg:gap-3" : ""} ${classe}`}
    >
      <div className="h-52">
        <VinhetaDaLinha vinheta={servico.vinheta} />
      </div>
      <div className={`flex flex-1 flex-col px-3 pb-3 pt-5 ${largo ? "lg:px-6 lg:pt-6" : ""}`}>
        <MarcaDeEtapa etapa={servico.etapa} />
        <h4 className="titulo-cartao mt-2.5">{servico.titulo}</h4>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{servico.frase}</p>
        <Rodape servico={servico} />
      </div>
    </Link>
  );
}

/**
 * O cardápio, nas duas metades do H1: o que coloca a empresa no mapa e o que
 * multiplica a operação com IA. Cada cartão traz a cena de produto dele e o
 * preço "a partir de" da tabela (ou a linha em que vem incluso).
 */
export default function Solucoes() {
  return (
    <section id="solucoes" aria-labelledby="titulo-solucoes" className="adiada py-24 md:py-36">
      <div className="conteiner">
        <div className="max-w-[52rem]">
          <p className="sobretitulo">Soluções</p>
          <h2 id="titulo-solucoes" className="titulo-secao mt-5">
            {SOLUCOES.titulo} <span className="apagado">{SOLUCOES.apagado}</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[38rem]">{SOLUCOES.texto}</p>
        </div>

        {PILARES.map((pilar, p) => (
          <div key={pilar.id} className={p ? "mt-20 md:mt-28" : "mt-14 md:mt-20"}>
            <div className="grid gap-x-10 gap-y-4 border-t border-linha pt-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="flex items-center gap-3 text-[0.8125rem] font-medium text-secundario">
                  <span className="numero text-ambar">{String(p + 1).padStart(2, "0")}</span>
                  {pilar.sobretitulo}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                  {pilar.titulo}
                </h3>
              </div>
              <p className="texto-guia max-w-[34rem] md:pb-1">{pilar.frase}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {pilar.servicos.map((servico, i) => (
                <Cartao key={servico.titulo} servico={servico} {...arranjo(pilar.id, i)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
