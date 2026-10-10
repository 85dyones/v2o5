import Link from "next/link";
import Icone from "@/components/Icone";
import Simbolo from "@/components/marca/Simbolo";

export default function Fechamento() {
  return (
    <section aria-labelledby="titulo-fechamento" className="adiada relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-[38rem] bg-[radial-gradient(60%_70%_at_50%_100%,rgb(242_165_22/0.16),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(242_241_236/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(242_241_236/0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_60%,#000,transparent_75%)]" />
      </div>
      <div className="conteiner flex flex-col items-center text-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -m-8 rounded-full bg-[radial-gradient(closest-side,rgb(242_165_22/0.22),transparent)]"
          />
          <Simbolo className="relative h-20 w-auto text-papel md:h-24" />
        </div>
        <h2 id="titulo-fechamento" className="titulo-secao mt-10 max-w-[40rem]">
          Comece pelo diagnóstico.
        </h2>
        <p className="texto-guia mt-6 max-w-[36rem]">
          Em 45 minutos de conversa com o fundador, a gente entende como a sua empresa vende hoje. Em até 24 horas você recebe um mapa do
          que fazer primeiro, com ou sem a V2O5.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/diagnostico" className="botao botao-primario">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-4" />
          </Link>
          <Link href="/precos" className="botao botao-secundario">
            Ver preços
          </Link>
        </div>
      </div>
    </section>
  );
}
