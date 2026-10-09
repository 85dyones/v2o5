import Link from "next/link";
import Simbolo from "@/components/marca/Simbolo";

export default function Fechamento() {
  return (
    <section aria-labelledby="titulo-fechamento" className="adiada relative overflow-hidden py-24 md:py-36">
      <Simbolo className="pointer-events-none absolute right-0 top-1/2 hidden h-auto w-[34rem] max-w-none -translate-y-1/2 text-papel opacity-[0.07] md:block" />
      <div className="conteiner relative">
        <h2 id="titulo-fechamento" className="titulo-secao max-w-[36rem]">
          Comece pelo diagnóstico
        </h2>
        <p className="mt-5 max-w-[34rem] text-lg text-secundario">
          Em 45 minutos a gente entende como a sua empresa vende hoje. Em até 24 horas você recebe um mapa do
          que fazer primeiro, com ou sem a V2O5.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/diagnostico" className="botao botao-primario">
            Pedir diagnóstico
          </Link>
          <Link href="/precos" className="botao botao-secundario">
            Ver preços
          </Link>
        </div>
      </div>
    </section>
  );
}
