import Link from "next/link";
import Icone from "@/components/Icone";
import { Parada, Trecho } from "@/components/rota/Rota";
import { CHAMADA } from "@/conteudo/home";

/** Uma linha e um botão entre duas seções de prova, para quem já se convenceu. */
export default function ChamadaCurta({ qual }: { qual: "depoisDoCase" }) {
  const c = CHAMADA[qual];
  return (
    <Trecho aria-label={c.titulo} miolo="!py-10 md:!py-12">
      <div className="relative grid grid-cols-12 items-center gap-x-6 gap-y-5">
        <Parada />
        <div className="col-span-12 md:col-span-8">
          <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{c.titulo}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{c.texto}</p>
        </div>
        <div className="col-span-12 md:col-span-4 md:justify-self-end">
          <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="chamada-curta">
            {CHAMADA.botao}
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </div>
      </div>
    </Trecho>
  );
}
