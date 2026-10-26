import type { CSSProperties } from "react";
import Image from "next/image";
import retrato from "@/assets/fundador/dyones-pb.webp";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Construcao from "@/components/marca/Construcao";
import { COR_DA_ROTA, ComMarcas, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { VISAO_360 } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { SOBRE } from "@/conteudo/sobre";
import { linkEmail } from "@/lib/email";
import { EMPRESA, EMAIL, WHATSAPP } from "@/conteudo/home";
import { grafoDoSobre } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";

const ROTA = SOBRE.rota;

export const metadata = metadataDa(ROTA);

/** As quatro etapas do caminho do cliente, na ordem e na cor da rota. */
const ETAPAS: { nome: string; etapa: Etapa }[] = [
  { nome: "Atração", etapa: "violeta" },
  { nome: "Atendimento", etapa: "verde" },
  { nome: "Gestão", etapa: "azul" },
  { nome: "Venda", etapa: "ambar" },
];

/** O que decide na regra: o prazo do diagnóstico e o da saída. */
const PRAZOS = ["45 minutos"];

/** Célula de ficha: fio em cima e à esquerda; o invólucro corta o fio da borda de fora. */
const CELULA = "border-l border-t border-linha";

/** As três peças do símbolo, com as medidas do desenho (`lib/construcao.ts`, `lib/marca-vetor.ts`). */
const ANATOMIA = [
  ["Nuvem", "4 arcos, raios 18, 24, 20 e 18"],
  ["Rede", "2 V e 5 O, a fórmula do V2O5"],
  ["Átomo âmbar", "a cor da ação"],
] as const;

/**
 * Sobre, na direção B: a página quase toda não é etapa, então a rota corre
 * em fio fino, com uma parada em cada título, e termina no botão âmbar do
 * fecho. O fundador e a empresa viram fichas em células; o fundador abre
 * com o retrato em preto e branco. O fundador mantém o `id="autor"`,
 * que o schema aponta. Texto em `conteudo/sobre.ts`.
 */
export default function Pagina() {
  const s = SOBRE;
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* Abertura: H1 à esquerda (é o LCP, sem animação), resumo e botões à direita, separados por fio. */}
        <Trecho
          aria-label={s.sobretitulo}
          adiada={false}
          className="!border-b-2 !border-texto"
          miolo="grid grid-cols-12 !py-0"
        >
          <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
            <div className="relative">
              <Parada />
              <h1 id="titulo-sobre" className="titulo-hero max-w-[16ch]">
                {s.titulo}
              </h1>
            </div>
          </div>
          <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
            <p className="text-[1.0625rem] leading-relaxed">{s.resumo}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                {s.chamada.botao}
                <Icone nome="seta" className="seta size-4" />
              </Link>
              <a href="#autor" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
                Conhecer o fundador
              </a>
            </div>
          </div>
        </Trecho>

        {/* O propósito: a tecnologia é o meio; as três saídas possíveis em lista, com o fio fino da rota. */}
        <Trecho aria-labelledby="titulo-proposito">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-8">
            <Parada />
            <h2 id="titulo-proposito" className="titulo-secao col-span-12 lg:col-span-7">
              {s.proposito.titulo}
            </h2>
            <div className="col-span-12 lg:col-span-5 lg:pt-2">
              <p className="texto-guia">{s.proposito.texto}</p>
              <ul className="mt-6 border-t-2 border-texto">
                {s.proposito.decisao.map((d) => (
                  <li key={d} className="border-b border-linha py-3 text-[0.9375rem] leading-relaxed">
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-texto-secundario">{s.proposito.fecho}</p>
            </div>
          </div>
        </Trecho>

        {/* O fundador. No celular o título vem antes da ficha, para a parada ficar nele. */}
        <Trecho id="autor" aria-label="O fundador">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
            <Parada />
            <div className="order-2 col-span-12 self-start border-y-2 border-texto lg:order-1 lg:col-span-5">
              {/* O retrato (19/10, Dyones): foto real, em preto e branco, chapada no topo da ficha. */}
              <Image
                src={retrato}
                alt="Dyones Oliveira, fundador da V2O5, em Londres"
                sizes="(min-width: 64rem) 32vw, 100vw"
                placeholder="blur"
                className="block h-auto w-full border-b border-linha"
              />
              <div className="border-b border-linha bg-fundo-cartao p-6 md:p-7">
                <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{s.fundador.nome}</p>
                <p className="rotulo mt-2 text-texto-secundario">{s.fundador.papel}</p>
              </div>
              <dl className="grid sm:grid-cols-2">
                {s.fundador.fatos.map((f, i, arr) => (
                  <div
                    key={f.rotulo}
                    className={`grid content-start gap-2 border-linha p-6 ${i > 0 ? "border-t" : ""} ${i % 2 ? "sm:border-l" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i === arr.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <dt className="rotulo text-texto-secundario">{f.rotulo}</dt>
                    <dd className="text-[0.9375rem] leading-snug">{f.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:pl-6">
              <h2 id="titulo-fundador" className="titulo-secao">
                {s.fundador.nome.split(" ")[0]} conduz o diagnóstico <span className="apagado">e a implantação.</span>
              </h2>
              <p className="texto-guia mt-6">{s.fundador.texto}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-texto-secundario">{s.fundador.origem}</p>

              <div className="mt-10 border-t-2 border-texto pt-6">
                <h3 className="titulo-cartao">{s.equipe.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{s.equipe.texto}</p>
              </div>
              <ul className="mt-6 grid border-y border-linha sm:grid-cols-2">
                {VISAO_360.areas.map((a, i) => (
                  <li
                    key={a.nome}
                    className={`grid content-start gap-2 border-linha py-5 sm:px-5 ${i > 0 ? "border-t" : ""} ${i % 2 ? "sm:border-l" : "sm:pl-0"} ${i === 1 ? "sm:border-t-0" : ""}`}
                  >
                    <p className="rotulo text-texto">{a.nome}</p>
                    <p className="text-sm leading-snug text-texto-secundario">
                      <span className="text-texto">{a.base.tipo}:</span> {a.base.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Trecho>

        {/* O método em cinco perguntas e as três coisas que todo projeto entrega. */}
        <Trecho aria-labelledby="titulo-metodo" etapa="verde">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-metodo" className="titulo-secao col-span-12 lg:col-span-7">
              {s.metodo.titulo}
            </h2>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{s.metodo.texto}</p>
          </div>
          <ol className="mt-12 border-y-2 border-texto md:mt-14">
            {s.metodo.etapas.map((e, i) => (
              <li key={e.etapa} className={`grid grid-cols-12 gap-x-6 gap-y-2 py-5 md:py-6 ${i > 0 ? "border-t border-linha" : ""}`}>
                <span className="numero col-span-2 text-texto-secundario md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titulo-cartao col-span-10 md:col-span-4">{e.etapa}</h3>
                <p className="col-span-10 col-start-3 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-7 md:col-start-auto">{e.pergunta}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-4">
            <h3 className="titulo-cartao col-span-12 lg:col-span-5">{s.metodo.saida.titulo}</h3>
            <ul className="col-span-12 grid border-y border-linha sm:grid-cols-3 lg:col-span-7">
              {s.metodo.saida.itens.map((item, i) => (
                <li key={item} className={`border-linha px-4 py-4 text-[0.9375rem] font-medium leading-snug ${i > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Trecho>

        {/* O nome: as quatro cores do vanádio são as quatro etapas da rota. */}
        <Trecho aria-label="O nome">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
            <Parada />
            <div className="col-span-12 lg:col-span-7">
              <h2 id="titulo-nome" className="titulo-secao">
                {s.nome.titulo}
              </h2>
              <p className="texto-guia mt-6">{s.nome.texto}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-texto-secundario">{s.nome.cores}</p>
              <p className="mt-10 grid grid-cols-2 border-y-2 border-texto md:grid-cols-4" aria-label="As quatro etapas">
                {ETAPAS.map(({ nome, etapa }, i) => (
                  <span
                    key={nome}
                    className={`relative block border-linha px-4 pb-4 pt-6 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                    style={{ "--cor": TEXTO_DA_ETAPA[etapa], "--trilho": COR_DA_ROTA[etapa] } as CSSProperties}
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-(--trilho)" />
                    <span className="rotulo text-(--cor)">{nome}</span>
                  </span>
                ))}
              </p>
            </div>
            <div className="col-span-12 flex flex-col items-start justify-start gap-6 border-t border-linha pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2">
              {/* A anatomia do símbolo (19/10): o desenho mostra a molécula que o texto ao lado explica. */}
              <figure className="w-full">
                <Construcao tom="claro" className="h-auto w-full max-w-[26rem]" />
                <figcaption>
                  <dl className="mt-4 grid border-t-2 border-texto text-[0.9375rem]">
                    {ANATOMIA.map(([parte, valor]) => (
                      <div key={parte} className="flex justify-between gap-4 border-b border-linha py-2.5">
                        <dt className="rotulo text-texto-secundario">{parte}</dt>
                        <dd className="text-right tabular-nums">{valor}</dd>
                      </div>
                    ))}
                  </dl>
                </figcaption>
              </figure>
              <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
                {s.nome.assinatura}
              </p>
            </div>
          </div>
        </Trecho>

        {/* O jeito: as cinco regras numa ficha de linhas, número, regra e texto. */}
        <Trecho aria-label="O jeito">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-jeito" className="titulo-secao col-span-12 lg:col-span-7">
              {s.jeito.titulo}
            </h2>
            <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{s.jeito.texto}</p>
          </div>
          <ol className="mt-12 border-y-2 border-texto md:mt-14">
            {s.jeito.regras.map((r, i) => (
              <li key={r.titulo} className={`grid grid-cols-12 gap-x-6 gap-y-2 py-6 md:py-7 ${i > 0 ? "border-t border-linha" : ""}`}>
                <span className="numero col-span-2 text-texto-secundario md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titulo-cartao col-span-10 md:col-span-4">{r.titulo}</h3>
                <p className="col-span-10 col-start-3 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-7 md:col-start-auto">
                  <ComMarcas texto={r.texto} marcas={PRAZOS} etapa="verde" />
                </p>
              </li>
            ))}
          </ol>
          <Link href="/precos" className="botao botao-secundario mt-8">
            Ver a tabela de preços
            <Icone nome="seta" className="seta size-4" />
          </Link>
        </Trecho>

        {/* A relação com a Motors: cliente, case principal, autorização registrada. */}
        <Trecho aria-label="Case">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-motors" className="titulo-secao col-span-12 lg:col-span-5">
              {s.motors.titulo}
            </h2>
            <div className="col-span-12 lg:col-span-7 lg:border-l lg:border-linha lg:pl-8">
              <p className="texto-guia">{s.motors.texto}</p>
              <Link href={s.motors.href} className="botao botao-secundario mt-8">
                {s.motors.botao}
                <Icone nome="seta" className="seta size-4" />
              </Link>
            </div>
          </div>
        </Trecho>

        {/* As ferramentas em produção, numa faixa de células em mono, como na abertura da home. */}
        <Trecho aria-labelledby="titulo-ferramentas">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-ferramentas" className="titulo-cartao col-span-12 lg:col-span-5">
              {s.ferramentas.titulo}
            </h2>
            <p className="col-span-12 text-[1.0625rem] leading-relaxed text-texto-secundario lg:col-span-7">{s.ferramentas.texto}</p>
          </div>
          <div className="mt-10 overflow-hidden border-y-2 border-texto">
            <ul className="-ml-px -mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {s.ferramentas.itens.map((item) => (
                <li key={item} className={`${CELULA} flex min-h-14 items-center px-4 py-3 font-mono text-[0.8125rem] font-medium leading-snug`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Trecho>

        {/* A empresa: a ficha do fecho da home (razão social, CNPJ, sede) aberta em células. */}
        <Trecho aria-label="Dados">
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
            <Parada />
            <h2 id="titulo-empresa" className="titulo-secao col-span-12 lg:col-span-5">
              {s.empresa.titulo}
            </h2>
            <div className="col-span-12 lg:col-span-7 lg:pt-2">
              <p className="texto-guia">{s.empresa.atendimento}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{s.empresa.antes}</p>
            </div>
          </div>
          <div className="mt-12 overflow-hidden border-y-2 border-texto md:mt-14">
            <dl className="-ml-px -mt-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Nome", s.empresa.nome],
                ["Razão social", s.empresa.razaoSocial],
                ["Fundação", s.empresa.fundacao],
                ["CNPJ", s.empresa.cnpj],
              ].map(([rotulo, valor]) => (
                <div key={rotulo} className={`${CELULA} grid content-start gap-2 p-6`}>
                  <dt className="rotulo text-texto-secundario">{rotulo}</dt>
                  <dd className="font-medium tabular-nums">{valor}</dd>
                </div>
              ))}
              <div className={`${CELULA} grid content-start gap-2 p-6`}>
                <dt className="rotulo text-texto-secundario">WhatsApp</dt>
                <dd>
                  <a
                    href={linkWhatsApp(WHATSAPP.mensagens.sobre)}
                    target="_blank"
                    rel="noopener"
                    className="link-sublinhado font-medium tabular-nums"
                    data-evento="click_whatsapp"
                    data-local="empresa"
                  >
                    {whatsappParaLer()}
                  </a>
                </dd>
              </div>
              <div className={`${CELULA} grid content-start gap-2 p-6 sm:col-span-2`}>
                <dt className="rotulo text-texto-secundario">E-mail</dt>
                <dd>
                  <a
                    href={linkEmail(EMAIL.assuntos.diagnostico)}
                    className="link-sublinhado break-all font-medium"
                    data-evento="click_email"
                    data-local="empresa"
                  >
                    {EMPRESA.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Trecho>

        {/* O fecho, na única faixa escura: a rota chega em âmbar e termina no botão principal. */}
        <section
          aria-labelledby="titulo-chamada"
          className="trecho adiada overflow-hidden bg-faixa-escura text-faixa-escura-texto"
          style={{ "--cor-da-rota": COR_DA_ROTA.ambar } as CSSProperties}
          data-entra=""
        >
          <div className="conteiner conteiner-rota fecho-miolo grid grid-cols-12 gap-x-6 gap-y-12 py-24 md:py-32">
            <div className="relative col-span-12 lg:col-span-7">
              <h2 id="titulo-chamada" className="titulo-secao max-w-[40rem]">
                {s.chamada.titulo}
              </h2>
              <p className="mt-6 max-w-[36rem] text-guia text-faixa-escura-secundario">{s.chamada.texto}</p>
              <div className="fecho-acoes relative mt-10 flex flex-wrap gap-3">
                <Parada final />
                <Link href="/diagnostico" className="botao botao-primario botao-claro" data-evento="cta_click" data-local="chamada">
                  {s.chamada.botao}
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <Link href="/precos" className="botao botao-secundario botao-claro" data-evento="cta_click" data-local="chamada">
                  Ver preços
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="col-span-12 flex items-end lg:col-span-5 lg:justify-end lg:border-l lg:border-faixa-escura-linha">
              <Construcao className="h-40 w-auto max-w-full md:h-52" />
            </div>
          </div>
        </section>
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="sobre" />
      <Entradas />
      <JsonLd grafo={grafoDoSobre()} />
    </>
  );
}
