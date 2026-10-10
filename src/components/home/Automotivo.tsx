import Link from "next/link";
import Icone from "@/components/Icone";
import { AUTOMOTIVO } from "@/conteudo/home";

export default function Automotivo() {
  const e = AUTOMOTIVO.estoque;
  return (
    <section aria-labelledby="titulo-automotivo" className="adiada py-24 md:py-36">
      <div className="conteiner">
        <div className="superficie grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
          <div className="relative p-7 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(242_165_22/0.12),transparent)]"
            />
            <p className="sobretitulo">Segmento</p>
            <h2 id="titulo-automotivo" className="titulo-secao mt-5">
              {AUTOMOTIVO.titulo}
            </h2>
            <p className="texto-guia mt-6 max-w-[34rem]">{AUTOMOTIVO.texto}</p>
            <p className="mt-8 max-w-[30rem] border-l-2 border-ambar pl-4 font-medium leading-snug">
              {AUTOMOTIVO.preco}
            </p>
            <Link href={AUTOMOTIVO.href} className="botao botao-primario mt-8">
              Ver a página de revendas
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="border-t border-linha bg-[rgb(12_13_16/0.45)] p-5 md:p-8 lg:border-l lg:border-t-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-semibold">
                <Icone nome="carro" className="size-5 text-secundario" />
                {e.titulo}
              </p>
              <span className="rotulo rounded-full bg-grafite px-2.5 py-1 text-papel">exemplo</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-secundario">
              <Icone nome="check" className="size-4 text-verde-claro" />
              {e.origem}
            </p>
            <ul className="mt-6 grid gap-2">
              {e.carros.map(([carro, ano]) => (
                <li
                  key={carro}
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-vidro px-4 py-3 contorno"
                >
                  <span className="min-w-[10rem] flex-1 leading-tight">
                    <span className="block truncate text-[0.9375rem] font-medium">{carro}</span>
                    <span className="text-xs tabular-nums text-secundario">{ano}</span>
                  </span>
                  <span className="flex gap-1.5">
                    {e.destinos.map((d) => (
                      <span key={d} className="chip chip-ok text-secundario">
                        {d}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
