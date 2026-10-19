import Link from "next/link";
import Icone from "@/components/Icone";
import TerminalDeEventos from "@/components/home/TerminalDeEventos";
import { Parada, Trecho } from "@/components/rota/Rota";
import { CASE } from "@/conteudo/home";

/**
 * O case da Motors no trecho azul da rota (gestão: números lidos do banco).
 * Os números ficam num mosaico de células (da CROX): o primeiro na célula
 * de tinta, os outros no papel e a sobra em hachura. Sem âmbar, que é só
 * ação. A fonte e o período vêm logo embaixo.
 */
export default function CaseMotors() {
  return (
    <Trecho id="case" aria-label="Case" etapa="azul">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-case" className="titulo-secao col-span-12 lg:col-span-7">
          Motors Store, <span className="apagado">revenda de seminovos em Curitiba.</span>
        </h2>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">
          A V2O5 montou o site, os guias, o rastreamento e as automações da loja. Os números abaixo medem o sistema
          funcionando, contados no banco de dados da Motors.
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-2 border-2 border-texto md:mt-14 md:grid-cols-[1.3fr_1fr_1fr_0.55fr]">
        {CASE.numeros.map((n, i) => (
          <div
            key={n.texto}
            className={`flex min-h-44 flex-col justify-between gap-6 p-6 md:min-h-60 md:p-7 ${
              i === 0 ? "col-span-2 bg-texto text-fundo md:col-span-1" : "border-t border-linha md:border-l md:border-t-0"
            } ${i === 2 ? "border-l" : ""}`}
          >
            <dt className={`order-2 max-w-[18rem] text-[0.9375rem] leading-relaxed ${i === 0 ? "text-faixa-escura-secundario" : "text-texto-secundario"}`}>
              {n.texto}
            </dt>
            <dd className="order-1 flex items-baseline gap-3">
              <span className="numero-grande">{n.valor}</span>
              {n.complemento ? <span className="text-xl font-medium tracking-[-0.02em] opacity-75">{n.complemento}</span> : null}
            </dd>
          </div>
        ))}
        <div aria-hidden="true" className="hachura col-span-2 hidden border-l border-linha md:col-span-1 md:block" />
      </dl>
      <p className="mt-4 text-sm text-texto-secundario">{CASE.fonte}</p>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:items-center">
        <div className="col-span-12 lg:col-span-8">
          <TerminalDeEventos linhas={CASE.terminal} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <p className="text-texto-secundario">
            Formato real dos eventos que o sistema da Motors registra; os valores são ilustrativos. Cada lead do site sai com
            um identificador que o navegador e o servidor compartilham, e com ele a Meta e o Google contam a conversão uma vez
            só.
          </p>
          <Link href="/cases/motors-store" className="botao botao-secundario mt-7" data-evento="cta_click" data-local="case">
            Ler o case completo
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </div>
      </div>
    </Trecho>
  );
}
