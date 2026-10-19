import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import { COR_DA_ROTA, Parada, TEXTO_DA_ETAPA, TINTA_DA_ETAPA } from "@/components/rota/Rota";
import type { Etapa } from "@/lib/tokens";
import {
  BRL,
  dataBR,
  DEGRAUS,
  economiaDoTrafegoJunto,
  FOTOGRAFIA_PARCEIRA,
  linhaDePreco,
  linhasDoGrupo,
  OFERTA_DO_COMPLETO,
  PLANOS,
  precoDaLinha,
  REAJUSTE,
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
  semQuebra(`${d.rotulo}: ${BRL(d.valor)}${d.unidade.startsWith("/") ? "" : " "}${d.unidade}`);

/** "R$" preso ao número: o espaço comum deixava o "R$" sozinho no fim da linha. */
export const semQuebra = (t: string) => t.replace(/R\$ (?=\d)/g, "R$\u00A0");

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
              {semQuebra(i)}
            </span>
          ))}
        </p>
      ) : null}
      {l.bonus ? (
        <p className="flex items-start gap-1.5 text-etapa-atendimento">
          <Icone nome="brilho" className="mt-0.5 size-3.5 shrink-0" />
          {semQuebra(l.bonus)}
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
          <span className="text-texto/80">Pelo valor real, na mesma fatura:</span> {semQuebra(l.repasses.map(minuscula).join("; "))}.
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Direção B (19/10): a página de preço como ficha técnica. Os três planos
// numa tabela de células (uma coluna por plano, uma linha por atributo); o
// resto do cardápio em linhas no padrão `.servico` da home, cada uma com a
// parada na cor da etapa de que fala. Âmbar só no botão.
// ---------------------------------------------------------------------------

/** A etapa de cada plano: o mapa é atração, a operação começa no atendimento, o Completo liga a gestão. */
const ETAPA_DO_PLANO: Record<Plano["id"], Etapa> = { presenca: "violeta", atendimento: "verde", completo: "azul" };

/** Célula da tabela dos planos: fio fino em cima, menos na primeira linha, que o fio de 2 px já fecha. */
const CELULA = "border-t border-linha px-5 py-5 first:border-t-0 md:px-6";

/** Valor da ficha do plano: grande, tabular, com o marca-texto na tinta da etapa do plano. */
function ValorDoPlano({ valor, sufixo, etapa }: { valor: string; sufixo?: string; etapa: Etapa }) {
  return (
    <span className="text-[1.5rem] font-semibold xl:text-[1.75rem] leading-none tracking-[-0.03em] tabular-nums">
      <span className="marca-texto whitespace-nowrap" style={{ "--tinta": TINTA_DA_ETAPA[etapa] } as CSSProperties}>
        {valor}
      </span>
      {sufixo ? <span className="text-base font-medium tracking-normal text-texto-secundario">{sufixo}</span> : null}
    </span>
  );
}

/** Implantação e mensalidade. O Completo mostra a oferta e, embaixo, a mensalidade de tabela riscada com a data. */
function PrecoDoPlano({ p, etapa }: { p: Plano; etapa: Etapa }) {
  const emOferta = p.id === "completo";
  return (
    <dl className="grid grid-cols-1 gap-y-5 min-[26rem]:grid-cols-2 min-[26rem]:gap-x-4 lg:grid-cols-1 xl:grid-cols-2">
      <div className="grid content-start gap-2">
        <dt className="rotulo text-texto-secundario">Implantação</dt>
        <dd>
          <ValorDoPlano valor={BRL(p.implantacao)} etapa={etapa} />
        </dd>
      </div>
      <div className="grid content-start gap-2">
        <dt className="rotulo text-texto-secundario">Mensalidade</dt>
        <dd>
          <ValorDoPlano valor={BRL(emOferta ? OFERTA_DO_COMPLETO.mensalidade : p.mensalidade)} sufixo="/mês" etapa={etapa} />
        </dd>
        {emOferta ? (
          <dd className="text-sm text-texto-secundario">
            <del className="tabular-nums">{semQuebra(BRL(p.mensalidade))}</del> até {dataBR(OFERTA_DO_COMPLETO.ate)}
          </dd>
        ) : null}
      </div>
    </dl>
  );
}

/**
 * Os três planos (Dyones, 15/10) lado a lado, como tabela-ficha: no
 * desktop cada plano é uma coluna e as linhas (etapa, nome, o que entra,
 * preço, bônus, rodapé, botão) se alinham pelas três colunas com
 * `subgrid`, para comparar o mesmo atributo na mesma altura. O DOM fica um
 * plano de cada vez, que é como o leitor de tela e o celular leem. A célula
 * sem bônus leva hachura (não se aplica). O Completo tem o fundo do cartão e
 * o botão primário; os outros, o secundário.
 */
export function Planos() {
  return (
    <ul className="grid grid-cols-12 border-y-2 border-texto">
      {PLANOS.map((p, i) => {
        const completo = p.id === "completo";
        const etapa = ETAPA_DO_PLANO[p.id];
        return (
          <li
            key={p.id}
            id={`plano-${p.id}`}
            className={`col-span-12 flex flex-col lg:col-span-4 lg:row-span-7 lg:grid lg:grid-rows-subgrid ${
              i > 0 ? "border-t-2 border-texto lg:border-l lg:border-t-0 lg:border-l-linha" : ""
            } ${completo ? "bg-fundo-cartao" : ""}`}
          >
            <div className={`${CELULA} grid content-start gap-3 !pt-0`}>
              {/* O trecho da linha na cor da etapa do plano: as três colunas formam a linha de ponta a ponta. */}
              <span aria-hidden="true" className="-mx-5 block h-2 md:-mx-6" style={{ backgroundColor: COR_DA_ROTA[etapa] }} />
              <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-2">
                <span className="rotulo" style={{ color: TEXTO_DA_ETAPA[etapa] }}>
                  {p.pilar}
                </span>
                {p.destaque ? <span className="rotulo text-texto">{p.destaque}</span> : null}
              </p>
            </div>
            <div className={CELULA}>
              <h3 className="text-titulo-3">{p.nome}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-secundario">{semQuebra(p.para)}</p>
            </div>
            <ul className={`${CELULA} grid content-start gap-2.5 text-[0.9375rem] leading-snug`}>
              {p.inclui.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icone nome="check" className="mt-0.5 size-4 shrink-0" />
                  {semQuebra(item)}
                </li>
              ))}
            </ul>
            <div className={CELULA}>
              <PrecoDoPlano p={p} etapa={etapa} />
            </div>
            {p.bonus ? (
              <p className={`${CELULA} text-[0.9375rem] font-medium leading-relaxed`}>{semQuebra(p.bonus)}</p>
            ) : (
              <div aria-hidden="true" className={`${CELULA} hachura hidden lg:block`} />
            )}
            <p className={`${CELULA} text-sm leading-relaxed ${completo ? "text-texto" : "text-texto-secundario"}`}>{semQuebra(p.rodape)}</p>
            <div className={`${CELULA} flex items-end`}>
              <Link
                href="/diagnostico"
                className={`botao ${completo ? "botao-primario" : "botao-secundario"} w-full`}
                data-evento="cta_click"
                data-local="planos"
              >
                Pedir diagnóstico
                <Icone nome="seta" className="seta size-4" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** O que vem dentro, o bônus, o que cresce e o que é repassado, embaixo da frase da linha. */
function DetalhesDaLinha({ l }: { l: LinhaDePreco }) {
  if (!l.inclui && !l.degraus && !l.repasses && !l.bonus) return null;
  return (
    <div className="mt-4 grid max-w-[38rem] gap-2.5 text-sm leading-snug">
      {l.inclui ? (
        <ul className="flex flex-wrap gap-2">
          {l.inclui.map((i) => (
            <li key={i} className="rotulo border border-linha px-2 py-1 text-texto-secundario">
              {semQuebra(i)}
            </li>
          ))}
        </ul>
      ) : null}
      {l.bonus ? <p className="font-medium text-texto">{semQuebra(l.bonus)}</p> : null}
      {l.degraus ? (
        <ul className="grid gap-1 tabular-nums text-texto-secundario">
          {l.degraus.map((d) => (
            <li key={d.rotulo}>{degrau(d)}</li>
          ))}
        </ul>
      ) : null}
      {l.repasses ? (
        <p className="text-texto-secundario">
          <span className="text-texto">Pelo valor real, na mesma fatura:</span> {semQuebra(l.repasses.map(minuscula).join("; "))}.
        </p>
      ) : null}
    </div>
  );
}

/** Os locais de medição das linhas do cardápio, escritos por extenso para a busca por `data-local` achar. */
const MEDICAO_DA_LINHA = {
  trafego: { "data-evento": "cta_click", "data-local": "trafego" },
  modulos: { "data-evento": "cta_click", "data-local": "modulos" },
  servicos: { "data-evento": "cta_click", "data-local": "servicos" },
} as const;
type LocalDaLinha = keyof typeof MEDICAO_DA_LINHA;

/**
 * Uma linha do cardápio, no padrão `.servico` da home: a célula inteira é o
 * link, a linha pinta o trecho da rota na cor da etapa e leva a parada; à
 * direita, o preço em tinta comum (o marca-texto fica só nos planos, que
 * decidem; decisão de 19/10) e a seta.
 */
function LinhaDoCardapio({
  etapa,
  href,
  titulo,
  marca,
  frase,
  preco,
  local,
  children,
}: {
  etapa: Etapa;
  href: string;
  /** Onde o clique é medido (19/10, Dyones: as linhas de /precos contam como CTA). */
  local?: LocalDaLinha;
  titulo: string;
  /** Nota curta que informa ao lado do título ("com bônus"). */
  marca?: string;
  frase: string;
  preco: string;
  children?: ReactNode;
}) {
  return (
    <li className="servico" style={{ "--cor-da-rota": COR_DA_ROTA[etapa] } as CSSProperties}>
      <Link
        href={href}
        className="servico-celula grid grid-cols-12 gap-x-6 gap-y-3 border-b border-linha py-6 md:py-7"
        {...(local ? MEDICAO_DA_LINHA[local] : {})}
      >
        <Parada />
        <div className="col-span-12 md:col-span-7">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="titulo-cartao">{titulo}</span>
            {marca ? (
              <span className="rotulo" style={{ color: TEXTO_DA_ETAPA[etapa] }}>
                {marca}
              </span>
            ) : null}
          </p>
          <p className="mt-2 max-w-[38rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{semQuebra(frase)}</p>
          {children}
        </div>
        <p className="col-span-10 text-[1.0625rem] font-semibold leading-relaxed tabular-nums md:col-span-4 md:pt-0.5">
          {semQuebra(preco)}
        </p>
        <span aria-hidden="true" className="servico-seta col-span-2 justify-self-end text-lg md:col-span-1">
          →
        </span>
      </Link>
    </li>
  );
}

/** Uma linha de preço da tabela no cardápio: nome, preço sem o "a partir de", o que cobre e os detalhes. */
function LinhaDePrecoNoCardapio({ l, etapa, local }: { l: LinhaDePreco; etapa: Etapa; local?: LocalDaLinha }) {
  return (
    <LinhaDoCardapio etapa={etapa} local={local} href={l.href} titulo={l.nome} frase={l.cobre} preco={precoDaLinha(l).replace(/^a partir de /, "")}>
      <DetalhesDaLinha l={l} />
    </LinhaDoCardapio>
  );
}

/** Tráfego: Google Ads, Meta Ads, os dois juntos e o preço no Completo, todos na atração; depois, o rastreamento para quem já tem site. */
export function Trafego() {
  const google = linhaDePreco("googleAds");
  const juntos = linhaDePreco("trafego");
  const noCompleto = linhaDePreco("trafegoNoCompleto");
  const rastreamento = linhaDePreco("rastreamento");
  const linhas = [
    {
      nome: "Google Ads ou Meta Ads",
      valor: google.mensalidade ?? 0,
      nota: "Cada plataforma. Google com Pesquisa, Performance Max e anúncios de veículos ou Shopping; Meta com catálogo, públicos do CRM e anúncios que abrem conversa no WhatsApp.",
    },
    {
      nome: juntos.nome,
      valor: juntos.mensalidade ?? 0,
      nota: `${BRL(economiaDoTrafegoJunto())} a menos por mês que as duas separadas, com o feed de catálogo incluso.`,
      marca: "com bônus",
    },
    {
      nome: "As duas, no Completo",
      valor: noCompleto.mensalidade ?? 0,
      nota: "A mesma gestão das duas plataformas, com o feed, para quem tem o plano Completo.",
    },
  ];
  const nota = `Ele vem na Presença e no Completo. Já tem site? O rastreamento entra sozinho por ${BRL(
    rastreamento.implantacao ?? 0,
  )} de implantação e ${BRL(rastreamento.mensalidade ?? 0)} por mês.`;
  return (
    <>
      <ul className="border-t-2 border-texto">
        {linhas.map((c) => (
          <LinhaDoCardapio
            key={c.nome}
            etapa="violeta"
            local="trafego"
            href={google.href}
            titulo={c.nome}
            marca={c.marca}
            frase={c.nota}
            preco={`${BRL(c.valor)}/mês + verba`}
          />
        ))}
      </ul>
      <p className="mt-6 max-w-[44rem] text-[0.9375rem] leading-relaxed text-texto-secundario">
        <span className="font-semibold text-texto">Sem implantação, com o rastreamento ligado.</span>{" "}
        {/* Sem marca-texto: a nota informa, não decide (19/10). */}
        <span className="tabular-nums">{semQuebra(nota)}</span>
      </p>
    </>
  );
}

/**
 * A etapa de cada módulo e serviço, na mesma cor que a home dá à peça:
 * painel e funil são gestão; reativação e a gestão de comentários são
 * atendimento; conteúdo e marca são atração; o fluxo de automação é gestão.
 */
const ETAPA_DA_LINHA: Record<string, Etapa> = {
  painel: "azul",
  reativacao: "verde",
  funil: "azul",
  consulta: "azul",
  repasse: "azul",
  redes: "violeta",
  comentarios: "verde",
  automacao: "azul",
  branding: "violeta",
};

/**
 * Os módulos: para quem já tem Atendimento ou Completo. Em `/precos`, os de
 * qualquer negócio; no hub, os de revenda (consulta veicular e repasse).
 */
export function Modulos({ onde = "precos" }: { onde?: "precos" | "revendas" }) {
  return (
    <ul className="border-t-2 border-texto">
      {linhasDoGrupo("modulo", onde).map((l) => (
        <LinhaDePrecoNoCardapio
          key={l.id}
          l={l}
          etapa={ETAPA_DA_LINHA[l.id] ?? "azul"}
          local={onde === "precos" ? "modulos" : undefined}
        />
      ))}
    </ul>
  );
}

/** Os serviços feitos pela V2O5: conteúdo, comentários, fluxos e branding sob consulta. */
export function Servicos() {
  return (
    <ul className="border-t-2 border-texto">
      {linhasDoGrupo("servico").map((l) => (
        <LinhaDePrecoNoCardapio key={l.id} l={l} etapa={ETAPA_DA_LINHA[l.id] ?? "violeta"} local="servicos" />
      ))}
    </ul>
  );
}

/**
 * O que cresce com o cliente tem preço publicado antes de crescer, e a regra
 * de reajuste também é preço. Regra de 12/10 (Dyones): mais usuários, mais
 * dados e mais conversas não podem reduzir a margem. Numa faixa de células
 * fechada por fio de 2 px: o nome, o valor grande e a regra.
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
    <dl className="grid grid-cols-12 border-y-2 border-texto">
      {itens.map((i, n) => (
        <div
          key={i.titulo}
          className={`col-span-12 flex flex-col gap-3 border-linha p-6 sm:col-span-6 lg:col-span-3 md:p-7 ${n > 0 ? "border-t" : ""} ${
            n % 2 ? "sm:border-l" : ""
          } ${n < 2 ? "sm:border-t-0" : ""} ${n === 2 ? "lg:border-l" : ""} lg:border-t-0`}
        >
          <dt className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{i.titulo}</dt>
          <dd className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] tabular-nums">{semQuebra(i.valor)}</dd>
          <dd className="text-[0.9375rem] leading-relaxed text-texto-secundario">{semQuebra(i.texto)}</dd>
        </div>
      ))}
    </dl>
  );
}


/**
 * O que fica fora da mensalidade, sem letra miúda: uma faixa de células
 * fechada por fio de 2 px, como o que cresce.
 */
export function ForaDaMensalidade() {
  const itens = [
    ["Verba de anúncios", "Paga direto ao Google e à Meta, no valor que você decidir."],
    ["Uso de IA e mensagens", "O modelo de IA e as mensagens da API oficial do WhatsApp, pelo valor real, na mesma fatura."],
    ["SMS", "Nas campanhas para a base, o SMS pelo valor do provedor, discriminado na mesma fatura."],
    [
      "Fotos, vídeos e peças",
      `A produção de imagem fica com a sua equipe ou com um fotógrafo parceiro que a V2O5 indica, a partir de ${BRL(FOTOGRAFIA_PARCEIRA.aPartirDe)} por mês.`,
    ],
  ];
  return (
    <ul className="grid grid-cols-12 border-y-2 border-texto">
      {itens.map(([titulo, texto], n) => (
        <li
          key={titulo}
          className={`col-span-12 grid content-start gap-2 border-linha p-6 sm:col-span-6 lg:col-span-3 md:p-7 ${n > 0 ? "border-t" : ""} ${
            n % 2 ? "sm:border-l" : ""
          } ${n < 2 ? "sm:border-t-0" : ""} ${n === 2 ? "lg:border-l" : ""} lg:border-t-0`}
        >
          <p className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{titulo}</p>
          <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">{semQuebra(texto)}</p>
        </li>
      ))}
    </ul>
  );
}
