import { AUTOMOTIVO, CASE, EMPRESA, HERO, PILARES, VISAO_360 } from "@/conteudo/home";
import { BRL, dataBR, DEGRAUS, linhaDePreco, linhasDoGrupo, OFERTA_DO_COMPLETO, PLANOS, precoDaLinha, REAJUSTE } from "@/conteudo/precos";
import { SITE_URL } from "@/lib/site";
import { whatsappParaLer } from "@/lib/whatsapp";

/**
 * `llms.txt`: os fatos citáveis da V2O5, para assistentes de IA (seção 4.4 do
 * plano, prioridade baixa). Sai do mesmo conteúdo da home, então preço e
 * número do case nunca divergem do site. Pré-renderizado no build: não lê
 * nada da requisição.
 */
export function textoDoLlms(): string {
  const pilares = PILARES.flatMap((p) => [
    `### ${p.titulo.replace(/\.$/, "")}`,
    ...p.servicos.map((s) => `- [${s.titulo}](${SITE_URL}${s.href}): ${s.frase} Preço: ${s.preco}.`),
    "",
  ]);
  const planos = PLANOS.map((p) => {
    const mensal =
      p.id === "completo"
        ? `${BRL(OFERTA_DO_COMPLETO.mensalidade)}/mês até ${dataBR(OFERTA_DO_COMPLETO.ate)} (depois, ${BRL(p.mensalidade)}/mês)`
        : `${BRL(p.mensalidade)}/mês`;
    return `- [Plano ${p.nome}](${SITE_URL}/precos): ${p.para} ${p.inclui.join("; ")}. A partir de ${BRL(p.implantacao)} de implantação e ${mensal}.${p.bonus ? ` ${p.bonus}` : ""}`;
  });
  const linhas = [
    ...linhasDoGrupo("trafego"),
    linhaDePreco("rastreamento"),
    ...linhasDoGrupo("modulo"),
    ...linhasDoGrupo("modulo", "revendas"),
    ...linhasDoGrupo("servico"),
  ].map((l) => `- ${l.nome}: ${precoDaLinha(l)}.${l.requisito ? ` ${l.requisito}.` : ""}`);
  const numeros = CASE.numeros.map(
    (n) => `- ${n.valor}${n.complemento ? ` ${n.complemento}` : ""} ${n.texto}.`,
  );
  return [
    `# ${EMPRESA.nome}`,
    "",
    `> Catalisador de vendas com IA. ${HERO.subtitulo}`,
    "",
    `${EMPRESA.razaoSocial}, CNPJ ${EMPRESA.cnpj}. Atende empresas em todo o Brasil.`,
    "",
    `Fundador: ${VISAO_360.fundador.nome}. ${VISAO_360.fundador.texto}`,
    "",
    "## Planos",
    "Todo preço é a partir de, com hospedagem e manutenção na mensalidade. Sem fidelidade.",
    ...planos,
    "",
    "## Tráfego, módulos e serviços",
    ...linhas,
    `Usuário extra ${BRL(DEGRAUS.usuarioExtra)}/mês; uso de IA, mensagens do WhatsApp e SMS pelo valor real, na mesma fatura; reajuste anual pelo ${REAJUSTE.indice}.`,
    "",
    "## O que cada parte resolve",
    ...pilares,
    "## Segmento automotivo",
    `- [${AUTOMOTIVO.titulo}](${SITE_URL}${AUTOMOTIVO.href}): ${AUTOMOTIVO.texto} ${AUTOMOTIVO.preco}`,
    "",
    "## Case Motors Store",
    `Revenda de seminovos em Curitiba. ${CASE.fonte} [Case completo](${SITE_URL}/cases/motors-store).`,
    ...numeros,
    "",
    "## Como começar",
    `- [Diagnóstico gratuito](${SITE_URL}/diagnostico): ${HERO.nota}`,
    `- WhatsApp: ${whatsappParaLer()}`,
    `- E-mail: ${EMPRESA.email}`,
    `- [Preços](${SITE_URL}/precos) e [privacidade](${SITE_URL}/privacidade).`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(textoDoLlms(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
