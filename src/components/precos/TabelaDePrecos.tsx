import Link from "next/link";
import Icone from "@/components/Icone";
import {
  BRL,
  dataBR,
  DEGRAUS,
  economiaDoTrafegoJunto,
  FOTOGRAFIA_PARCEIRA,
  linhaDePreco,
  linhasDoGrupo,
  mensalidadeDoCompletoComTrafego,
  mesesQueUmaVendaPaga,
  OFERTA_DO_COMPLETO,
  plano,
  PLANOS,
  precoDaLinha,
  REAJUSTE,
  REGRAS,
  somaDosPlanosSeparados,
  USUARIOS_NO_CRM,
  type LinhaDePreco,
  type Plano,
} from "@/conteudo/precos";

export function implantacao(l: LinhaDePreco) {
  if (l.sobConsulta) return "sob consulta";
  if (l.implantacao) return `${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`;
  return l.semImplantacao ?? "";
}

export function mensalidade(l: LinhaDePreco) {
  if (l.sobConsulta) return "sob consulta";
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
            <span key={i} className="chip chip-ok text-texto-secundario">
              {i}
            </span>
          ))}
        </p>
      ) : null}
      {l.bonus ? (
        <p className="flex items-start gap-1.5 text-etapa-atendimento">
          <Icone nome="brilho" className="mt-0.5 size-3.5 shrink-0" />
          {l.bonus}
        </p>
      ) : null}
      {l.degraus ? (
        <ul className="grid gap-1 text-texto-secundario">
          {l.degraus.map((d) => (
            <li key={d.rotulo} className="flex items-start gap-1.5">
              <Icone nome="seta" className="mt-1 size-3 shrink-0 opacity-60" />
              <span className="tabular-nums">{degrau(d)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {l.repasses ? (
        <p className="text-texto-secundario">
          <span className="text-texto/80">Pelo valor real, na mesma fatura:</span> {l.repasses.map(minuscula).join("; ")}.
        </p>
      ) : null}
    </div>
  );
}

/** Preço do cartão de plano: o Completo mostra a oferta e a mensalidade de tabela riscada. */
function PrecoDoPlano({ p }: { p: Plano }) {
  const emOferta = p.id === "completo";
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-linha pt-5">
      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-texto-secundario">Implantação</dt>
      <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-texto-secundario">Mensalidade</dt>
      <dd className="text-[1.375rem] font-semibold tabular-nums tracking-[-0.02em]">{BRL(p.implantacao)}</dd>
      <dd className="text-[1.375rem] font-semibold tabular-nums tracking-[-0.02em]">
        {BRL(emOferta ? OFERTA_DO_COMPLETO.mensalidade : p.mensalidade)}
        <span className="text-sm font-medium text-texto-secundario">/mês</span>
      </dd>
      {emOferta ? (
        <dd className="col-start-2 text-sm text-texto-secundario">
          <s className="tabular-nums">{BRL(p.mensalidade)}</s> até {dataBR(OFERTA_DO_COMPLETO.ate)}
        </dd>
      ) : null}
    </dl>
  );
}

/**
 * Os três planos (Dyones, 15/10): quem chega escolhe pelo problema que tem.
 * O Completo vem destacado, com o preço por tempo limitado e o bônus de
 * fechamento. Todo valor é "a partir de"; o final sai do diagnóstico.
 */
export function Planos() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {PLANOS.map((p) => {
        const completo = p.id === "completo";
        return (
          <li
            key={p.id}
            id={`plano-${p.id}`}
            className={`superficie flex flex-col gap-4 p-6 md:p-7 ${completo ? "shadow-[inset_0_0_0_1px_rgb(242_165_22/0.55)]" : ""}`}
          >
            <p className="flex flex-wrap items-center justify-between gap-2 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-texto-secundario">
              <span>{p.pilar}</span>
              {p.destaque ? <span className="text-acao-texto">{p.destaque}</span> : null}
            </p>
            <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{p.nome}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">{p.para}</p>
            <ul className="grid flex-1 content-start gap-2 text-[0.9375rem] leading-snug">
              {p.inclui.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icone nome="check" className="mt-0.5 size-4 shrink-0 text-etapa-atendimento" />
                  {i}
                </li>
              ))}
            </ul>
            <PrecoDoPlano p={p} />
            {p.bonus ? (
              <p className="flex items-start gap-1.5 text-sm text-etapa-atendimento">
                <Icone nome="brilho" className="mt-0.5 size-3.5 shrink-0" />
                {p.bonus}
              </p>
            ) : null}
            <p className={`text-sm leading-relaxed ${completo ? "text-texto" : "text-texto-secundario"}`}>{p.rodape}</p>
            <Link
              href="/diagnostico"
              className={`botao ${completo ? "botao-primario" : "botao-secundario"} justify-center`}
              data-evento="cta_click"
              data-local="planos"
            >
              Pedir diagnóstico
              <Icone nome="seta" className="seta size-4" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Uma linha de preço numa lista: nome, preço, o que cobre e os detalhes. */
function LinhaDaLista({ l }: { l: LinhaDePreco }) {
  return (
    <li className="grid gap-x-6 gap-y-1 border-t border-linha py-5 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_auto]">
      <p className="font-semibold tracking-[-0.01em]">{l.nome}</p>
      <p className="tabular-nums md:text-right">{precoDaLinha(l).replace(/^a partir de /, "")}</p>
      <div className="md:col-span-2">
        <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">{l.cobre}</p>
        <Detalhes l={l} />
      </div>
    </li>
  );
}

/** Google Ads, Meta Ads, os dois juntos e o preço no Completo, mais o rastreamento para quem já tem site. */
export function Trafego() {
  const google = linhaDePreco("googleAds");
  const juntos = linhaDePreco("trafego");
  const noCompleto = linhaDePreco("trafegoNoCompleto");
  const rastreamento = linhaDePreco("rastreamento");
  const cartoes = [
    { nome: "Google Ads ou Meta Ads", valor: google.mensalidade ?? 0, nota: "Cada plataforma. Google com Pesquisa, Performance Max e anúncios de veículos ou Shopping; Meta com catálogo, públicos do CRM e anúncios que abrem conversa no WhatsApp.", destaque: false },
    { nome: juntos.nome, valor: juntos.mensalidade ?? 0, nota: `${BRL(economiaDoTrafegoJunto())} a menos por mês que as duas separadas, com o feed de catálogo incluso.`, destaque: true },
    { nome: "As duas, no Completo", valor: noCompleto.mensalidade ?? 0, nota: "A mesma gestão das duas plataformas, com o feed, para quem tem o plano Completo.", destaque: false },
  ];
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {cartoes.map((c) => (
          <div key={c.nome} className={`superficie flex flex-col p-6 md:p-7 ${c.destaque ? "shadow-[inset_0_0_0_1px_rgb(242_165_22/0.45)]" : ""}`}>
            <p className="flex items-center justify-between gap-3">
              <span className="titulo-cartao">{c.nome}</span>
              {c.destaque ? <span className="chip text-acao-texto">com bônus</span> : null}
            </p>
            <p className="mt-4 text-[1.5rem] font-semibold tabular-nums leading-none tracking-[-0.03em]">
              {BRL(c.valor)}
              <span className="text-base font-medium text-texto-secundario">/mês + verba</span>
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-texto-secundario">{c.nota}</p>
          </div>
        ))}
      </div>
      <p className="rounded-2xl bg-fundo-cartao p-5 text-[0.9375rem] leading-relaxed text-texto-secundario contorno">
        <span className="font-semibold text-texto">Sem implantação, com o rastreamento ligado.</span> Ele vem na Presença e no
        Completo. Já tem site? O rastreamento entra sozinho por {BRL(rastreamento.implantacao ?? 0)} de implantação e{" "}
        {BRL(rastreamento.mensalidade ?? 0)} por mês.
      </p>
    </div>
  );
}

/**
 * Os módulos: para quem já tem Atendimento ou Completo. Em `/precos`, os de
 * qualquer negócio; no hub, os de revenda (consulta veicular e repasse).
 */
export function Modulos({ onde = "precos" }: { onde?: "precos" | "revendas" }) {
  return (
    <ul className="superficie p-6 md:p-8">
      {linhasDoGrupo("modulo", onde).map((l) => (
        <LinhaDaLista key={l.id} l={l} />
      ))}
    </ul>
  );
}

/** Os serviços feitos pela V2O5: conteúdo, fluxos e branding sob consulta. */
export function Servicos() {
  return (
    <ul className="superficie p-6 md:p-8">
      {linhasDoGrupo("servico").map((l) => (
        <LinhaDaLista key={l.id} l={l} />
      ))}
    </ul>
  );
}

/**
 * O que cresce com o cliente tem preço publicado antes de crescer, e a regra
 * de reajuste também é preço. Regra de 12/10 (Dyones): mais usuários, mais
 * dados e mais conversas não podem reduzir a margem.
 */
export function OQueCresce() {
  const itens = [
    {
      titulo: "Usuário extra",
      valor: `${BRL(DEGRAUS.usuarioExtra)}/mês`,
      texto: `O CRM vem com ${USUARIOS_NO_CRM} usuários e o Painel do dono com 3. Cada pessoa a mais custa isso, sem licença por assento de software.`,
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
      titulo: "Reajuste",
      valor: `${REAJUSTE.indice} ao ano`,
      texto: `Hospedagem, banco e modelos de IA são cobrados em dólar. Se o câmbio variar mais de ${REAJUSTE.gatilhoCambial}% desde a assinatura, a diferença é repassada só nesses itens.`,
    },
  ];
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {itens.map((i) => (
        <li key={i.titulo} className="superficie flex flex-col p-6">
          <p className="text-sm text-texto-secundario">{i.titulo}</p>
          <p className="mt-1.5 text-[1.375rem] font-semibold tabular-nums leading-tight tracking-[-0.03em]">{i.valor}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{i.texto}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * O Completo na revenda: o sistema da Motors Store, com o preço por tempo
 * limitado, o bônus e a conta da margem por carro.
 */
export function CompletoParaRevendas() {
  const p = plano("completo");
  const separados = somaDosPlanosSeparados();
  const meses = mesesQueUmaVendaPaga();
  return (
    <div className="superficie grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
      <div className="p-7 md:p-9">
        <p className="sobretitulo">Plano Completo</p>
        <h3 className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
          O sistema da Motors Store na sua loja.
        </h3>
        <p className="mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-texto-secundario">
          Site de estoque integrado ao sistema da loja, agente de IA no WhatsApp, CRM com {USUARIOS_NO_CRM} usuários,
          rastreamento até a venda e um fluxo de automação. Presença e Atendimento separados somam {BRL(separados.implantacao)}{" "}
          de implantação e {BRL(separados.mensalidade)} por mês.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-fundo-cartao p-4 contorno">
            <dt className="text-sm text-texto-secundario">Implantação a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(p.implantacao)}</dd>
          </div>
          <div className="rounded-xl bg-fundo-cartao p-4 contorno">
            <dt className="text-sm text-texto-secundario">Mensalidade a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(OFERTA_DO_COMPLETO.mensalidade)}</dd>
            <dd className="mt-1 text-sm text-texto-secundario">
              <s className="tabular-nums">{BRL(p.mensalidade)}</s> até {dataBR(OFERTA_DO_COMPLETO.ate)}
            </dd>
          </div>
        </dl>
        {p.bonus ? (
          <p className="mt-5 flex items-start gap-1.5 text-sm text-etapa-atendimento">
            <Icone nome="brilho" className="mt-0.5 size-3.5 shrink-0" />
            {p.bonus}
          </p>
        ) : null}
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-texto-secundario">
          Com Google Ads e Meta Ads: {BRL(mensalidadeDoCompletoComTrafego())} por mês mais a verba, com o feed de catálogo
          incluso. Usuário extra {BRL(DEGRAUS.usuarioExtra)} por mês.
        </p>
        <Link href="/precos" className="botao botao-secundario mt-7" data-evento="cta_click" data-local="pacote">
          Ver todos os planos
          <Icone nome="seta" className="seta size-4" />
        </Link>
      </div>
      <div className="flex flex-col justify-center border-t border-linha bg-fundo-alternado p-7 md:p-9 lg:border-l lg:border-t-0">
        <p className="text-sm font-medium text-texto-secundario">A conta que importa</p>
        <p className="mt-3 text-[1.125rem] leading-snug">
          Com uma margem de {BRL(REGRAS.margemPorCarro)} por carro, uma venda a mais a cada {meses} meses paga a
          mensalidade do Completo.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-texto-secundario">
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
        ["SMS", "Nas campanhas para a base, o SMS pelo valor do provedor, discriminado na mesma fatura."],
        [
          "Fotos, vídeos e peças",
          `A produção de imagem fica com a sua equipe ou com um fotógrafo parceiro que a V2O5 indica, a partir de ${BRL(FOTOGRAFIA_PARCEIRA.aPartirDe)} por mês.`,
        ],
      ].map(([titulo, texto]) => (
        <li key={titulo} className="rounded-2xl bg-fundo-cartao p-5 contorno">
          <p className="font-semibold tracking-[-0.01em]">{titulo}</p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-texto-secundario">{texto}</p>
        </li>
      ))}
    </ul>
  );
}
