import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Simbolo from "@/components/marca/Simbolo";
import { VISAO_360 } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { SOBRE } from "@/conteudo/sobre";
import { linkEmail } from "@/lib/email";
import { EMPRESA, EMAIL } from "@/conteudo/home";
import { grafoDoSobre } from "@/lib/schema";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";

const ROTA = SOBRE.rota;

export const metadata = metadataDa(ROTA);

const COR_DA_ETAPA = ["bg-violeta-claro", "bg-verde-claro", "bg-azul-claro", "bg-ambar"];

/**
 * Sobre: o fundador (com o `id="autor"` que o schema aponta), o nome, como a
 * V2O5 trabalha, a relação com a Motors, as ferramentas e a empresa.
 * Conteúdo em `conteudo/sobre.ts`.
 */
export default function Pagina() {
  const s = SOBRE;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <section aria-labelledby="titulo-sobre" className="relative isolate">
          <div aria-hidden="true" className="hero-fundo" />
          <div className="conteiner pb-14 pt-14 md:pt-20 lg:pb-16 lg:pt-24">
            <div className="max-w-[46rem]">
              <p className="sobretitulo">{s.sobretitulo}</p>
              <h1 id="titulo-sobre" className="titulo-hero mt-5">
                {s.titulo}
              </h1>
              <p className="texto-guia mt-7 max-w-[38rem]">{s.resumo}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  {s.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#autor" className="botao botao-secundario" data-evento="cta_click" data-local="hero">
                  Conhecer o fundador
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="autor" aria-labelledby="titulo-fundador" className="conteiner py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div className="superficie flex flex-col p-7 md:p-8">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violeta/60 to-azul/60 text-xl font-semibold"
                >
                  {s.fundador.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-[1.25rem] font-semibold tracking-[-0.02em]">{s.fundador.nome}</p>
                  <p className="text-sm text-secundario">{s.fundador.papel}</p>
                </div>
              </div>
              <dl className="mt-7 grid gap-0">
                {s.fundador.fatos.map((f) => (
                  <div key={f.rotulo} className="border-t border-linha py-3">
                    <dt className="text-[0.8125rem] font-medium text-secundario">{f.rotulo}</dt>
                    <dd className="mt-0.5 text-[0.9375rem] leading-snug">{f.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="sobretitulo">O fundador</p>
              <h2 id="titulo-fundador" className="titulo-secao mt-5">
                {s.fundador.nome.split(" ")[0]} conduz o diagnóstico <span className="apagado">e a implantação.</span>
              </h2>
              <p className="texto-guia mt-6">{s.fundador.texto}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-secundario">{s.fundador.origem}</p>
              <div className="mt-8 rounded-2xl bg-vidro p-5 contorno">
                <h3 className="font-semibold tracking-[-0.01em]">{s.equipe.titulo}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">{s.equipe.texto}</p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {VISAO_360.areas.map((a) => (
                  <li key={a.nome} className="rounded-2xl bg-vidro p-4 contorno">
                    <p className="text-sm font-semibold">{a.nome}</p>
                    <p className="mt-1 text-sm leading-snug text-secundario">
                      <span className="text-papel/80">{a.base.tipo}:</span> {a.base.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="titulo-nome"
          className="border-y border-linha bg-[linear-gradient(180deg,rgb(26_29_34/0.7),rgb(18_20_24/0.4))] py-20 md:py-28"
        >
          <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <p className="sobretitulo">O nome</p>
              <h2 id="titulo-nome" className="titulo-secao mt-5">
                {s.nome.titulo}
              </h2>
              <p className="texto-guia mt-6">{s.nome.texto}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-secundario">{s.nome.cores}</p>
              <p className="mt-6 flex flex-wrap gap-2" aria-label="As quatro etapas">
                {["Atração", "Atendimento", "Gestão", "Venda"].map((nome, i) => (
                  <span key={nome} className="chip">
                    <span aria-hidden="true" className={`mr-1.5 inline-block size-1.5 rounded-full ${COR_DA_ETAPA[i]}`} />
                    {nome}
                  </span>
                ))}
              </p>
            </div>
            <div className="superficie flex flex-col items-center justify-center gap-6 p-10 text-center">
              <Simbolo className="h-24 w-auto text-papel md:h-28" />
              <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">
                {s.nome.assinatura.replace(/ IA$/, " ")}
                <span className="text-ambar">IA</span>
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-jeito" className="conteiner py-20 md:py-28">
          <div className="max-w-[44rem]">
            <p className="sobretitulo">O jeito</p>
            <h2 id="titulo-jeito" className="titulo-secao mt-5">
              {s.jeito.titulo}
            </h2>
            <p className="texto-guia mt-5">{s.jeito.texto}</p>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {s.jeito.regras.map((r, i) => (
              <li key={r.titulo} className="superficie flex gap-4 p-6 md:p-7">
                <span className="numero text-ambar">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <h3 className="font-semibold tracking-[-0.01em]">{r.titulo}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">{r.texto}</p>
                </span>
              </li>
            ))}
          </ol>
          <Link href="/precos" className="botao botao-secundario mt-8">
            Ver a tabela de preços
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </section>

        <section aria-labelledby="titulo-motors" className="border-t border-linha py-20 md:py-28">
          <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <p className="sobretitulo">Case</p>
              <h2 id="titulo-motors" className="titulo-secao mt-5">
                {s.motors.titulo}
              </h2>
            </div>
            <div>
              <p className="texto-guia">{s.motors.texto}</p>
              <Link href={s.motors.href} className="botao botao-secundario mt-7">
                {s.motors.botao}
                <Icone nome="seta" className="seta size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-ferramentas" className="border-t border-linha">
          <div className="conteiner grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="titulo-ferramentas" className="text-[0.8125rem] font-medium text-secundario">
                {s.ferramentas.titulo}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.ferramentas.itens.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-secundario lg:pt-7">{s.ferramentas.texto}</p>
          </div>
        </section>

        <section aria-labelledby="titulo-empresa" className="border-t border-linha py-20 md:py-28">
          <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <p className="sobretitulo">Dados</p>
              <h2 id="titulo-empresa" className="titulo-secao mt-5">
                {s.empresa.titulo}
              </h2>
              <p className="texto-guia mt-5">{s.empresa.atendimento}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secundario">{s.empresa.antes}</p>
            </div>
            <dl className="superficie grid gap-0 px-6 md:px-8">
              {[
                ["Nome", s.empresa.nome],
                ["Razão social", s.empresa.razaoSocial],
                ["Fundação", s.empresa.fundacao],
                ["CNPJ", s.empresa.cnpj],
                ["Sede", s.empresa.cidade],
              ].map(([rotulo, valor]) => (
                <div key={rotulo} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-linha py-4 first:border-t-0">
                  <dt className="text-secundario">{rotulo}</dt>
                  <dd className="font-medium">{valor}</dd>
                </div>
              ))}
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-linha py-4">
                <dt className="text-secundario">WhatsApp</dt>
                <dd>
                  <a href={linkWhatsApp()} target="_blank" rel="noopener" className="link-sublinhado font-medium" data-evento="click_whatsapp" data-local="empresa">
                    {whatsappParaLer()}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-linha py-4">
                <dt className="text-secundario">E-mail</dt>
                <dd>
                  <a href={linkEmail(EMAIL.assuntos.diagnostico)} className="link-sublinhado font-medium" data-evento="click_email" data-local="empresa">
                    {EMPRESA.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="titulo-chamada" className="border-t border-linha">
          <div className="conteiner py-20 md:py-28">
            <div className="superficie grid gap-8 p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 id="titulo-chamada" className="titulo-secao">
                  {s.chamada.titulo}
                </h2>
                <p className="texto-guia mt-5">{s.chamada.texto}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="chamada">
                  {s.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <Link href="/precos" className="botao botao-secundario" data-evento="cta_click" data-local="chamada">
                  Ver preços
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="home" mensagem="Olá! Vi a página Sobre da V2O5 e quero conversar sobre a minha empresa." />
      <JsonLd grafo={grafoDoSobre()} />
    </>
  );
}
