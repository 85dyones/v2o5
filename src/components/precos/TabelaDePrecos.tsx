import Link from "next/link";
import Icone from "@/components/Icone";
import {
  AUTOMOTIVO_PRECO,
  BRL,
  CANAIS_DA_REATIVACAO,
  DEGRAUS,
  descontoDoPacote,
  economiaDoTrafegoJunto,
  linhaDePreco,
  linhasDoPilar,
  mensalidadeDoPacoteComTrafego,
  mesesQueUmaVendaPaga,
  REAJUSTE,
  REGRAS,
  somaDoPacote,
  type LinhaDePreco,
  type Pilar,
} from "@/conteudo/precos";

export function implantacao(l: LinhaDePreco) {
  if (l.implantacao) return `${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`;
  return l.semImplantacao ?? "";
}

export function mensalidade(l: LinhaDePreco) {
  if (!l.mensalidade) return l.unidade ? "sem mensalidade" : "";
  return `${BRL(l.mensalidade)}/mês${l.maisVerba ? " + verba" : ""}`;
}

const degrau = (d: { rotulo: string; valor: number; unidade: string }) =>
  `${d.rotulo}: ${BRL(d.valor)}${d.unidade.startsWith("/") ? "" : " "}${d.unidade}`;

/** "Uso do modelo de IA" vira "uso do modelo de IA" no meio da frase; sigla no início ("SMS") fica. */
const minuscula = (t: string) => (/^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);

/** O que vem dentro, o que cresce e o que é repassado, embaixo de "o que cobre". */
export function Detalhes({ l }: { l: LinhaDePreco }) {
  if (!l.inclui && !l.degraus && !l.repasses && !l.bonus) return null;
  return (
    <div className="mt-3 grid gap-2 text-[0.875rem] leading-snug">
      {l.inclui ? (
        <p className="flex flex-wrap gap-1.5">
          {l.inclui.map((i) => (
            <span key={i} className="chip chip-ok text-secundario">
              {i}
            </span>
          ))}
        </p>
      ) : null}
      {l.bonus ? (
        <p className="flex items-start gap-1.5 text-verde-claro">
          <Icone nome="brilho" className="mt-0.5 size-3.5 shrink-0" />
          {l.bonus}
        </p>
      ) : null}
      {l.degraus ? (
        <ul className="grid gap-1 text-secundario">
          {l.degraus.map((d) => (
            <li key={d.rotulo} className="flex items-start gap-1.5">
              <Icone nome="seta" className="mt-1 size-3 shrink-0 opacity-60" />
              <span className="tabular-nums">{degrau(d)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {l.repasses ? (
        <p className="text-secundario">
          <span className="text-papel/80">Pelo valor real, na mesma fatura:</span> {l.repasses.map(minuscula).join("; ")}.
        </p>
      ) : null}
    </div>
  );
}

const PILARES_DA_TABELA: { id: Pilar; numero: string; titulo: string; frase: string }[] = [
  {
    id: "mapa",
    numero: "01",
    titulo: "Coloque sua empresa no mapa.",
    frase: "Site, Google, anúncios, redes e avaliações. O que faz quem procura achar você.",
  },
  {
    id: "operacao",
    numero: "02",
    titulo: "Multiplique a operação com IA.",
    frase: "Agente, CRM, painel e automações. O que atende, organiza e devolve o cliente ao funil.",
  },
];

/**
 * A tabela de `precos.ts`, nos dois pilares do H1: tabela de verdade no
 * desktop, cartões no celular. Todo valor é "a partir de"; o final sai do
 * diagnóstico, com escopo fechado. O que vem incluso, o que cresce e o que
 * é repassado aparecem na própria linha, sem letra miúda.
 */
export function Tabela() {
  return (
    <div className="grid gap-14 md:gap-20">
      {PILARES_DA_TABELA.map((p) => {
        const linhas = linhasDoPilar(p.id);
        return (
          <div key={p.id}>
            <div className="grid gap-x-10 gap-y-3 border-t border-linha pt-7 md:grid-cols-2 md:items-end">
              <h3 className="flex items-baseline gap-3 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
                <span className="numero text-base text-ambar">{p.numero}</span>
                {p.titulo}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-secundario md:pb-1">{p.frase}</p>
            </div>

            <table className="mt-6 hidden w-full border-collapse text-left md:table">
              <thead>
                <tr className="text-sm text-secundario">
                  <th scope="col" className="w-[17%] pb-4 pr-4 font-medium">
                    Linha
                  </th>
                  <th scope="col" className="w-[17%] pb-4 pr-4 font-medium">
                    Implantação a partir de
                  </th>
                  <th scope="col" className="w-[17%] pb-4 pr-4 font-medium">
                    Mensalidade a partir de
                  </th>
                  <th scope="col" className="pb-4 font-medium">
                    O que cobre
                  </th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((l) => (
                  <tr key={l.id} className="border-t border-linha align-top">
                    <th scope="row" className="py-5 pr-4 font-semibold tracking-[-0.01em]">
                      <Link href={l.href} className="link-sublinhado">
                        {l.nome}
                      </Link>
                    </th>
                    <td className="py-5 pr-4 tabular-nums">{implantacao(l)}</td>
                    <td className="py-5 pr-4 tabular-nums">{mensalidade(l)}</td>
                    <td className="max-w-[26rem] py-5 text-[0.9375rem] leading-relaxed text-secundario">
                      {l.cobre}
                      <Detalhes l={l} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="mt-6 grid gap-3 md:hidden">
              {linhas.map((l) => (
                <li key={l.id} className="superficie p-5">
                  <Link href={l.href} className="titulo-cartao link-sublinhado">
                    {l.nome}
                  </Link>
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.9375rem]">
                    <dt className="text-secundario">Implantação</dt>
                    <dd className="tabular-nums">{implantacao(l) || "sem"}</dd>
                    <dt className="text-secundario">Mensalidade</dt>
                    <dd className="tabular-nums">{mensalidade(l) || "sem"}</dd>
                  </dl>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-secundario">{l.cobre}</p>
                  <Detalhes l={l} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/**
 * O que cresce com o cliente tem preço publicado antes de crescer: usuário,
 * conversas, dados, fonte e infra. E a regra de reajuste, que também é
 * preço. Regra de 12/10 (Dyones): mais usuários, mais dados e mais infra
 * não podem reduzir a margem.
 */
export function OQueCresce() {
  const itens = [
    {
      titulo: "Usuário extra",
      valor: `${BRL(DEGRAUS.usuarioExtra)}/mês`,
      texto: `O CRM vem com 5 usuários e o Painel do dono com 3. Cada pessoa a mais custa isso, sem licença por assento de software.`,
    },
    {
      titulo: "Conversas do agente",
      valor: `${BRL(DEGRAUS.conversas.valor)}/mês a cada ${DEGRAUS.conversas.bloco}`,
      texto: `O agente de IA inclui ${DEGRAUS.conversas.bloco} conversas por mês. Acima disso, o bloco seguinte entra na fatura do mês.`,
    },
    {
      titulo: "Dados do CRM",
      valor: `${BRL(DEGRAUS.dados.valor)}/mês`,
      texto: `Acima de ${DEGRAUS.dados.limite} de dados, a base ganha mais espaço e backup, e a mensalidade sobe este degrau.`,
    },
    {
      titulo: "Fonte de dados extra no painel",
      valor: `${BRL(DEGRAUS.fonteExtra.implantacao)} + ${BRL(DEGRAUS.fonteExtra.mensalidade)}/mês`,
      texto: "O painel lê 3 fontes (CRM, rastreamento e uma planilha ou ERP). A quarta é um fluxo de integração novo, mantido todo mês.",
    },
    {
      titulo: "Infra acima do incluso",
      valor: `valor real + ${DEGRAUS.infraAcima.gestao}%`,
      texto: `Acima de ${DEGRAUS.infraAcima.limite}, o banco e o processamento são cobrados pelo que custam, com ${DEGRAUS.infraAcima.gestao}% de gestão, discriminados na fatura.`,
    },
    {
      titulo: "Reajuste",
      valor: `${REAJUSTE.indice} ao ano`,
      texto: `Hospedagem, banco e modelos de IA são cobrados em dólar. Se o câmbio variar mais de ${REAJUSTE.gatilhoCambial}% desde a assinatura, a diferença é repassada só nesses itens.`,
    },
  ];
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {itens.map((i) => (
        <li key={i.titulo} className="superficie flex flex-col p-6">
          <p className="text-sm text-secundario">{i.titulo}</p>
          <p className="mt-1.5 text-[1.375rem] font-semibold tabular-nums leading-tight tracking-[-0.03em]">{i.valor}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-secundario">{i.texto}</p>
        </li>
      ))}
    </ul>
  );
}

/** Google Ads, Meta Ads e os dois juntos, com o bônus do feed. */
export function Trafego() {
  const google = linhaDePreco("googleAds");
  const meta = linhaDePreco("metaAds");
  const juntos = linhaDePreco("trafego");
  const feed = linhaDePreco("catalogo");
  const economia = economiaDoTrafegoJunto();
  const cartoes = [
    { l: google, destaque: false, nota: "Pesquisa, Performance Max e anúncios de veículos ou Shopping." },
    { l: meta, destaque: false, nota: "Instagram e Facebook com o catálogo e os públicos da base do CRM." },
    {
      l: juntos,
      destaque: true,
      nota: `${BRL(economia)} a menos por mês que os dois avulsos, e o feed de catálogo (${BRL(feed.implantacao ?? 0)} ${feed.unidade}) incluso.`,
    },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cartoes.map(({ l, destaque, nota }) => (
        <div
          key={l.id}
          className={`superficie flex flex-col p-6 md:p-7 ${destaque ? "shadow-[inset_0_0_0_1px_rgb(242_165_22/0.45)]" : ""}`}
        >
          <p className="flex items-center justify-between gap-3">
            <span className="titulo-cartao">{l.nome}</span>
            {destaque ? <span className="chip text-ambar">com bônus</span> : null}
          </p>
          <p className="mt-4 text-[1.5rem] font-semibold tabular-nums leading-none tracking-[-0.03em]">
            {BRL(l.mensalidade ?? 0)}
            <span className="text-base font-medium text-secundario">/mês + verba</span>
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-secundario">{nota}</p>
          <p className="mt-auto pt-5 text-sm text-secundario">Sem implantação. Começa com o rastreamento até a venda ligado.</p>
        </div>
      ))}
    </div>
  );
}

/** Os canais da reativação de base, com o que cada um custa e arrisca. */
export function Reativacao() {
  const l = linhaDePreco("reativacao");
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="superficie p-6 md:p-7">
        <p className="titulo-cartao">{l.nome}</p>
        <p className="mt-4 text-[1.5rem] font-semibold tabular-nums leading-none tracking-[-0.03em]">
          {BRL(l.implantacao ?? 0)} <span className="text-base font-medium text-secundario">{l.unidade}</span>
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-secundario">{l.cobre}</p>
        <Detalhes l={l} />
        <p className="mt-5 text-sm leading-relaxed text-secundario">
          Só base própria, com registro de origem e saída fácil em toda mensagem. Lista comprada ou raspada não entra.
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
        {CANAIS_DA_REATIVACAO.map((c) => (
          <li
            key={c.nome}
            className={`rounded-2xl bg-vidro p-5 contorno ${c.recomendado ? "shadow-[inset_0_0_0_1px_rgb(94_198_154/0.4)]" : ""}`}
          >
            <p className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold tracking-[-0.01em]">{c.nome}</span>
              {c.recomendado ? <span className="chip chip-ok text-secundario">recomendado</span> : null}
            </p>
            <dl className="mt-3 grid gap-2 text-[0.9375rem] leading-relaxed text-secundario lg:grid-cols-[5rem_1fr] lg:gap-x-4 lg:gap-y-1.5">
              <dt className="text-sm text-papel/80 lg:pt-0.5">Custo</dt>
              <dd>{c.paga}</dd>
              <dt className="text-sm text-papel/80 lg:pt-0.5">Regras</dt>
              <dd>{c.regras}</dd>
              <dt className="text-sm text-papel/80 lg:pt-0.5">Risco</dt>
              <dd className={c.risco.startsWith("Alto") ? "text-ambar" : ""}>{c.risco}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * O pacote automotivo com o desconto calculado sobre as linhas avulsas. Em
 * `/precos` o botão leva à página de revendas; no hub, à tabela completa.
 */
export function Pacote({ destino = "revendas" }: { destino?: "revendas" | "precos" }) {
  const { pacote, siteDeEstoque } = AUTOMOTIVO_PRECO;
  const soma = somaDoPacote();
  const desconto = descontoDoPacote();
  const meses = mesesQueUmaVendaPaga();
  return (
    <div className="superficie grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
      <div className="p-7 md:p-9">
        <p className="sobretitulo">Revendas de veículos</p>
        <h3 className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
          Pacote completo: o sistema da Motors Store na sua loja.
        </h3>
        <p className="mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-secundario">
          Site de estoque integrado ao Revenda Mais, agente de IA no WhatsApp, CRM com {pacote.usuarios} usuários e
          rastreamento até a venda. As mesmas linhas avulsas somam {BRL(soma.implantacao)} de implantação e{" "}
          {BRL(soma.mensalidade)} por mês.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-vidro p-4 contorno">
            <dt className="text-sm text-secundario">Implantação a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(pacote.implantacao)}</dd>
            <dd className="mt-1 text-sm text-verde-claro">{desconto.implantacao}% menos que as linhas avulsas</dd>
          </div>
          <div className="rounded-xl bg-vidro p-4 contorno">
            <dt className="text-sm text-secundario">Mensalidade a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(pacote.mensalidade)}</dd>
            <dd className="mt-1 text-sm text-verde-claro">{desconto.mensalidade}% menos que as linhas avulsas</dd>
          </div>
        </dl>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-secundario">
          Com Google Ads e Meta Ads: {BRL(mensalidadeDoPacoteComTrafego())} por mês mais a verba, com o feed de
          catálogo incluso. Só o site de estoque: {BRL(siteDeEstoque.implantacao)} de implantação e{" "}
          {BRL(siteDeEstoque.mensalidade)} por mês. Usuário extra {BRL(DEGRAUS.usuarioExtra)} por mês.
        </p>
        <Link href={destino === "precos" ? "/precos" : "/segmentos/revendas-de-veiculos"} className="botao botao-secundario mt-7" data-evento="cta_click" data-local="pacote">
          {destino === "precos" ? "Ver a tabela completa" : "Ver a página de revendas"}
          <Icone nome="seta" className="seta size-4" />
        </Link>
      </div>
      <div className="flex flex-col justify-center border-t border-linha bg-[rgb(12_13_16/0.35)] p-7 md:p-9 lg:border-l lg:border-t-0">
        <p className="text-sm font-medium text-secundario">A conta que importa</p>
        <p className="mt-3 text-[1.125rem] leading-snug">
          Com uma margem de {BRL(REGRAS.margemPorCarro)} por carro, uma venda a mais a cada {meses} meses paga a
          mensalidade do pacote.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-secundario">
          A margem é a referência do plano de mídia da Motors Store. Na sua loja, a conta sai no diagnóstico, com o
          seu número.
        </p>
      </div>
    </div>
  );
}

/** O que fica fora da mensalidade, sem letra miúda. */
export function ForaDaMensalidade() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        ["Verba de anúncios", "Paga direto ao Google e à Meta, no valor que você decidir."],
        ["Uso de IA e mensagens", "O modelo de IA e as mensagens da API oficial do WhatsApp, pelo valor real, na mesma fatura."],
        ["SMS e número dedicado", "Na reativação de base, o SMS pelo valor da operadora e o chip do número dedicado, quando houver."],
        ["Fotos, vídeos e peças", "A produção de imagem fica com a sua equipe ou com um parceiro de produção, orçado na proposta."],
      ].map(([titulo, texto]) => (
        <li key={titulo} className="rounded-2xl bg-vidro p-5 contorno">
          <p className="font-semibold tracking-[-0.01em]">{titulo}</p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">{texto}</p>
        </li>
      ))}
    </ul>
  );
}
