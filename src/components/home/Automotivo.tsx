import Link from "next/link";
import { AUTOMOTIVO } from "@/conteudo/home";

export default function Automotivo() {
  return (
    <section aria-labelledby="titulo-automotivo" className="adiada py-24 md:py-32">
      <div className="conteiner">
        <div className="grid gap-8 rounded-3xl bg-superficie p-8 shadow-[inset_0_0_0_1px_var(--color-linha)] md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.9375rem] font-medium text-secundario">Segmento</p>
            <h2 id="titulo-automotivo" className="titulo-secao mt-3">
              {AUTOMOTIVO.titulo}
            </h2>
            <p className="mt-5 max-w-[34rem] text-lg text-secundario">{AUTOMOTIVO.texto}</p>
          </div>
          <div className="lg:pl-8">
            <p className="numero text-papel">{AUTOMOTIVO.preco}</p>
            <Link href={AUTOMOTIVO.href} className="botao botao-secundario mt-6">
              Ver a página de revendas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
