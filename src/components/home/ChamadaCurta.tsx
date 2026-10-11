import Link from "next/link";
import Icone from "@/components/Icone";
import { CHAMADA } from "@/conteudo/home";

/** Uma linha e um botão entre duas seções de prova, para quem já se convenceu. */
export default function ChamadaCurta({ qual }: { qual: "depoisDoCase" }) {
  const c = CHAMADA[qual];
  return (
    <section aria-label={c.titulo} className="adiada py-6 md:py-10">
      <div className="conteiner">
        <div className="superficie flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">{c.titulo}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-secundario">{c.texto}</p>
          </div>
          <Link href="/diagnostico" className="botao botao-primario shrink-0 self-start md:self-auto">
            {CHAMADA.botao}
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
