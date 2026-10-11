import Link from "next/link";
import Icone from "@/components/Icone";
import { CHAMADA, GARANTIAS, HERO } from "@/conteudo/home";

/**
 * As quatro regras comerciais que tiram o medo de contratar, logo depois do
 * cardápio, com a chamada para o diagnóstico ao lado. Tudo vem de
 * `oferta.md`; nada aqui é promessa nova.
 */
export default function Garantias() {
  const c = CHAMADA.depoisDasSolucoes;
  return (
    <section aria-labelledby="titulo-garantias" className="adiada py-6 md:py-10">
      <div className="conteiner">
        <div className="superficie grid gap-0 lg:grid-cols-[1fr_minmax(0,20rem)]">
          <ul className="grid gap-px sm:grid-cols-2">
            {GARANTIAS.map((g, i) => (
              <li
                key={g.titulo}
                className={`flex gap-3.5 p-6 md:p-7 ${i > 0 ? "border-t border-linha" : ""} ${i % 2 ? "sm:border-l" : ""} ${i < 2 ? "sm:border-t-0" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-verde/25 text-verde-claro"
                >
                  <Icone nome="check" className="size-3.5" />
                </span>
                <span>
                  <span className="block font-semibold tracking-[-0.01em]">{g.titulo}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-secundario">{g.texto}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center border-t border-linha bg-[rgb(12_13_16/0.35)] p-7 lg:border-l lg:border-t-0 md:p-8">
            <h2 id="titulo-garantias" className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
              {c.titulo}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-secundario">{c.texto}</p>
            <Link href="/diagnostico" className="botao botao-primario mt-6 self-start">
              {CHAMADA.botao}
              <Icone nome="seta" className="seta size-4" />
            </Link>
            <p className="mt-4 flex items-start gap-2 text-sm leading-snug text-secundario">
              <Icone nome="relogio" className="mt-px size-4 shrink-0 text-ambar" />
              {HERO.nota}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
