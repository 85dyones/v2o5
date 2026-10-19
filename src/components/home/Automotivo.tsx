import Link from "next/link";
import Icone from "@/components/Icone";
import { ComMarcas, Parada, Trecho } from "@/components/rota/Rota";
import { AUTOMOTIVO } from "@/conteudo/home";

/** Os valores em real do preço do pacote, para o marca-texto. */
const VALORES = /R\$ [\d.,]+/g;

/**
 * A porta para o hub de revendas: o pacote é o sistema da Motors. Ao lado,
 * o estoque de exemplo como um livro de registros (rotulado), que mostra o
 * mesmo carro no site e no agente.
 */
export default function Automotivo() {
  const e = AUTOMOTIVO.estoque;
  return (
    <Trecho aria-label="Segmento" etapa="violeta">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-y-2 border-texto py-10 md:py-12">
        <div className="relative col-span-12 lg:col-span-6">
          <Parada />
          <h2 id="titulo-automotivo" className="titulo-secao">
            {AUTOMOTIVO.titulo}
          </h2>
          <p className="texto-guia mt-6 max-w-[34rem]">{AUTOMOTIVO.texto}</p>
          <p className="mt-8 max-w-[32rem] font-medium leading-relaxed">
            <ComMarcas texto={AUTOMOTIVO.preco} marcas={AUTOMOTIVO.preco.match(VALORES) ?? []} etapa="ambar" />
          </p>
          <Link href={AUTOMOTIVO.href} className="botao botao-primario mt-8" data-evento="cta_click" data-local="automotivo">
            Ver a página de revendas
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </div>

        <div aria-hidden="true" className="col-span-12 lg:col-span-6 lg:border-l lg:border-linha lg:pl-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-texto pb-3">
            <p className="flex items-center gap-2 font-semibold">
              <Icone nome="carro" className="size-5 text-texto-secundario" />
              {e.titulo}
            </p>
            <span className="rotulo bg-tinta-ambar px-2 py-1 text-texto">exemplo</span>
          </div>
          <p className="flex items-center gap-1.5 py-3 text-sm text-texto-secundario">
            <Icone nome="check" className="size-4 text-etapa-atendimento" />
            {e.origem}
          </p>
          <ul>
            {e.carros.map(([carro, ano]) => (
              <li key={carro} className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-linha py-3">
                <span className="min-w-[10rem] flex-1 leading-tight">
                  <span className="block truncate text-[0.9375rem] font-medium">{carro}</span>
                  <span className="text-xs tabular-nums text-texto-secundario">{ano}</span>
                </span>
                <span className="flex gap-1.5">
                  {e.destinos.map((d) => (
                    <span key={d} className="chip chip-ok text-texto-secundario">
                      {d}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Trecho>
  );
}
