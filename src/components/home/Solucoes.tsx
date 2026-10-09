import Link from "next/link";
import BentoLuz from "@/components/home/BentoLuz";
import { LINHAS, NOME_DA_ETAPA } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

export const COR_DA_ETAPA: Record<Etapa, string> = {
  violeta: "bg-violeta-claro",
  verde: "bg-verde-claro",
  azul: "bg-azul-claro",
  ambar: "bg-ambar",
};

export function MarcaDeEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <span className="rotulo inline-flex items-center gap-2 text-secundario">
      <span aria-hidden="true" className={`size-2 rounded-full ${COR_DA_ETAPA[etapa]}`} />
      {NOME_DA_ETAPA[etapa]}
    </span>
  );
}

/**
 * As seis linhas gerais (oferta.md). O agente de IA ocupa o bloco grande: é
 * a linha que mais muda a operação. A cor da etapa liga cada cartão ao
 * diagrama de "Como tudo se liga".
 */
export default function Solucoes() {
  const [destaque, ...demais] = LINHAS;
  return (
    <section id="solucoes" aria-labelledby="titulo-solucoes" className="adiada py-24 md:py-32">
      <div className="conteiner">
        <div className="max-w-[44rem]">
          <h2 id="titulo-solucoes" className="titulo-secao">
            O que a V2O5 monta para a sua empresa
          </h2>
          <p className="mt-5 text-lg text-secundario">
            Dá para começar por uma linha e somar as outras depois. Todas usam a mesma base de dados, então o
            que entra por uma aparece nas outras.
          </p>
        </div>

        <BentoLuz className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href={destaque.href}
            className="cartao-luz flex flex-col justify-between p-7 md:col-span-2 md:p-9 lg:col-span-2 lg:row-span-2"
          >
            <div>
              <MarcaDeEtapa etapa={destaque.etapa} />
              <h3 className="mt-6 max-w-[22rem] text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                {destaque.titulo}
              </h3>
              <p className="mt-4 max-w-[30rem] text-lg text-secundario">{destaque.frase}</p>
            </div>
            <ConversaMinima />
            <p className="numero mt-8 text-sm text-papel">{destaque.preco}</p>
          </Link>

          {demais.map((linha) => (
            <Link key={linha.href} href={linha.href} className="cartao-luz flex flex-col p-7">
              <MarcaDeEtapa etapa={linha.etapa} />
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{linha.titulo}</h3>
              <p className="mt-2 text-secundario">{linha.frase}</p>
              <p className="numero mt-auto pt-6 text-sm text-papel">{linha.preco}</p>
            </Link>
          ))}
        </BentoLuz>
      </div>
    </section>
  );
}

/** Duas mensagens paradas, para o cartão grande mostrar o que o agente faz. */
function ConversaMinima() {
  return (
    <div aria-hidden="true" className="mt-10 grid max-w-[28rem] gap-2 text-[0.9375rem]">
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-grafite px-4 py-2.5">
        Vocês abrem sábado?
      </p>
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-verde px-4 py-2.5 text-papel">
        Abrimos sim, das 9h às 13h. Quer que eu reserve um horário?
      </p>
    </div>
  );
}
