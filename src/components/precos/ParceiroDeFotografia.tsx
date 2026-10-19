import Icone from "@/components/Icone";
import { FOTOGRAFIA_PARCEIRA } from "@/conteudo/precos";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A indicação de fotógrafo parceiro (Dyones, 13/10), no hub automotivo e na
 * página de preços: a pergunta, o preço do parceiro "a partir de" e um
 * "saiba mais" que abre o WhatsApp da V2O5 com a mensagem pronta.
 */
export default function ParceiroDeFotografia() {
  const f = FOTOGRAFIA_PARCEIRA;
  return (
    <aside
      aria-label={f.pergunta}
      className="superficie grid gap-5 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-7"
    >
      <div>
        <p className="titulo-cartao">{f.pergunta}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{f.texto}</p>
      </div>
      <a
        href={linkWhatsApp(f.mensagem)}
        target="_blank"
        rel="noopener"
        className="botao botao-secundario"
        data-evento="click_whatsapp"
        data-local="fotografia"
      >
        {f.botao}
        <Icone nome="seta" className="seta size-4" />
      </a>
    </aside>
  );
}
