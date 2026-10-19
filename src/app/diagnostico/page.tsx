import JsonLd from "@/components/JsonLd";
import Icone from "@/components/Icone";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Entradas from "@/components/layout/Entradas";
import Formulario from "@/components/diagnostico/Formulario";
import { ComMarcas, Parada, Trecho } from "@/components/rota/Rota";
import { DIAGNOSTICO } from "@/conteudo/diagnostico";
import { EMAIL, EMPRESA, GARANTIAS, WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp } from "@/lib/whatsapp";
import { linkEmail } from "@/lib/email";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";

const ROTA = "/diagnostico";

export const metadata = metadataDa(ROTA);

/** Célula da coluna ao lado do formulário: fio em cima, menos na primeira. */
const CELULA = "border-t border-linha p-6 first:border-t-0";

/**
 * A porta de entrada, na rota verde do atendimento: é aqui que o contato
 * chega. Em cima, o título (é o LCP: texto do servidor, sem animação) e o
 * resumo, separados por fio. Embaixo, uma ficha fechada por fio de 2 px:
 * o formulário na primeira coluna, para a rota pousar no título dele e
 * terminar na parada âmbar do botão de envio, e os passos e as garantias ao
 * lado. No celular a ordem é a do texto: passos, garantias, formulário.
 * O formulário é o único pedaço com JavaScript.
 */
export default function Pagina() {
  const d = DIAGNOSTICO;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <Trecho etapa="verde" aria-label={d.sobretitulo} adiada={false} miolo="grid grid-cols-12 !py-0">
          <div className="col-span-12 pb-8 pt-12 md:pb-12 md:pt-16 lg:col-span-8 lg:pr-12">
            <div className="relative">
              <Parada />
              <h1 className="titulo-secao max-w-[24ch]">
                {d.titulo} <span className="text-texto-secundario">{d.apagado}</span>
              </h1>
            </div>
          </div>
          <div className="col-span-12 border-t border-linha pb-10 pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pb-12 lg:pl-8 lg:pt-16">
            <p className="text-[1.0625rem] leading-relaxed">{d.texto}</p>
          </div>
        </Trecho>

        {/* A ficha começa perto do título: numa página de pedido, o formulário tem de aparecer cedo. */}
        <Trecho etapa="verde" aria-labelledby="titulo-pedido" adiada={false} miolo="!pt-10 md:!pt-12">
          <div className="grid grid-cols-12 border-y-2 border-texto bg-fundo">
            <div className="col-span-12 lg:order-2 lg:col-span-5 lg:border-l lg:border-linha">
              <ol>
                {d.passos.map((p, i) => (
                  <li key={p.titulo} className={`${CELULA} grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3`}>
                    <span className="numero pt-px text-[0.9375rem] text-texto-secundario">{i + 1}</span>
                    <span>
                      <span className="block font-semibold tracking-[-0.01em]">
                        <ComMarcas texto={p.titulo} marcas={["45 minutos", "24 horas"]} etapa="verde" />
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-texto-secundario">{p.texto}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className={`${CELULA} bg-fundo-cartao text-[0.9375rem] leading-relaxed`}>{d.paraQuem}</p>

              <ul className="border-t border-linha">
                {GARANTIAS.map((g) => (
                  <li key={g.titulo} className={`${CELULA} flex gap-3 !py-4 text-[0.9375rem] leading-relaxed text-texto-secundario`}>
                    <Icone nome="check" className="mt-1 size-4 shrink-0 text-etapa-atendimento" />
                    <span>
                      <span className="font-medium text-texto">{g.titulo}.</span> {g.texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 border-t border-linha lg:order-1 lg:col-span-7 lg:border-t-0">
              <Formulario />
              <p className="flex items-start gap-3 border-t border-linha p-6 text-[0.9375rem] leading-relaxed text-texto-secundario">
                <Icone nome="conversa" className="mt-1 size-4 shrink-0 text-etapa-atendimento" />
                <span>
                  Prefere conversar?{" "}
                  <a
                    href={linkWhatsApp(WHATSAPP.mensagens.diagnostico)}
                    target="_blank"
                    rel="noopener"
                    className="link-sublinhado font-medium text-texto"
                    data-evento="click_whatsapp"
                    data-local="diagnostico"
                  >
                    Chame no WhatsApp
                  </a>{" "}
                  ou escreva para{" "}
                  <a
                    href={linkEmail(EMAIL.assuntos.diagnostico)}
                    className="link-sublinhado font-medium text-texto"
                    data-evento="click_email"
                    data-local="diagnostico"
                  >
                    {EMPRESA.email}
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </Trecho>
      </main>
      <Rodape />
      <Entradas />
      <JsonLd grafo={grafoDaInterna(ROTA)} />
    </>
  );
}
