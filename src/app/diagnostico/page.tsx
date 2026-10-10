import JsonLd from "@/components/JsonLd";
import Icone from "@/components/Icone";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Formulario from "@/components/diagnostico/Formulario";
import { DIAGNOSTICO } from "@/conteudo/diagnostico";
import { EMAIL, EMPRESA, GARANTIAS, WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp } from "@/lib/whatsapp";
import { linkEmail } from "@/lib/email";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";

const ROTA = "/diagnostico";

export const metadata = metadataDa(ROTA);

/**
 * A porta de entrada: o que acontece no diagnóstico e o formulário, lado a
 * lado. O formulário é o único pedaço com JavaScript; o resto vem do servidor.
 */
export default function Pagina() {
  const d = DIAGNOSTICO;
  return (
    <>
      <Topo />
      <main id="conteudo" className="relative isolate">
        <div aria-hidden="true" className="hero-fundo" />
        <div className="conteiner grid gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <p className="sobretitulo">{d.sobretitulo}</p>
            <h1 className="titulo-hero mt-5">
              {d.titulo} <span className="text-secundario">{d.apagado}</span>
            </h1>
            <p className="texto-guia mt-7 max-w-[34rem]">{d.texto}</p>

            <ol className="mt-10 grid gap-5">
              {d.passos.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span className="numero flex size-8 shrink-0 items-center justify-center rounded-full bg-vidro-forte text-sm text-ambar contorno">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{p.titulo}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-secundario">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-[34rem] border-l-2 border-ambar pl-4 text-[0.9375rem] leading-relaxed text-secundario">
              {d.paraQuem}
            </p>

            <ul className="mt-10 grid gap-2.5 text-[0.9375rem] text-secundario">
              {GARANTIAS.map((g) => (
                <li key={g.titulo} className="flex items-center gap-2.5">
                  <Icone nome="check" className="size-4 shrink-0 text-verde-claro" />
                  <span>
                    <span className="font-medium text-papel">{g.titulo}.</span> {g.texto}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="superficie relative p-6 md:p-8">
              <Formulario />
            </div>
            <p className="mt-4 flex items-start gap-2 text-[0.9375rem] leading-relaxed text-secundario">
              <Icone nome="conversa" className="mt-1 size-4 shrink-0 text-verde-claro" />
              <span>
                Prefere conversar?{" "}
                <a
                  href={linkWhatsApp(WHATSAPP.mensagens.diagnostico)}
                  target="_blank"
                  rel="noopener"
                  className="link-sublinhado text-papel"
                  data-evento="click_whatsapp"
                >
                  Chame no WhatsApp
                </a>{" "}
                ou escreva para{" "}
                <a href={linkEmail(EMAIL.assuntos.diagnostico)} className="link-sublinhado text-papel" data-evento="click_email">
                  {EMPRESA.email}
                </a>
                .
              </span>
            </p>
          </div>
        </div>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDaInterna(ROTA)} />
    </>
  );
}
