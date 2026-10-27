import { CONDICOES, METODO } from "@/conteudo/sprint";
import { CONTINUIDADE, mensalEmTexto, OFERTAS, PLANOS_DE_CONTINUIDADE, precoEmTexto, REGRAS_DE_PRECO } from "@/conteudo/ofertas";
import { ASSINATURA, AUTOMOTIVO, CASE, EMPRESA, HERO, PILARES, VISAO_360 } from "@/conteudo/home";
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
    ...p.servicos.map((s) => `- [${s.titulo}](${SITE_URL}${s.href}): ${s.frase}`),
    "",
  ]);
  const numeros = CASE.numeros.map(
    (n) => `- ${n.valor}${n.complemento ? ` ${n.complemento}` : ""} ${n.texto}.`,
  );
  return [
    `# ${EMPRESA.nome}`,
    "",
    `> ${ASSINATURA} ${HERO.subtitulo}`,
    "",
    `${EMPRESA.razaoSocial}, CNPJ ${EMPRESA.cnpj}. Atende empresas em todo o Brasil.`,
    "",
    `Fundador: ${VISAO_360.fundador.nome}. ${VISAO_360.fundador.texto}`,
    "",
    "## Soluções e preços de referência",
    `A V2O5 vende quatro soluções, cada uma com pacotes de escopo claro, e a continuidade, opcional. ${REGRAS_DE_PRECO.join(" ")}`,
    "",
    ...OFERTAS.flatMap((o) => [
      `### [${o.nome}](${SITE_URL}${o.rota})`,
      `${o.resolve} ${o.recebe}`,
      ...o.pacotes.map(
        (p) =>
          `- ${p.nome}: ${precoEmTexto(p.preco)}${p.mensal ? `; mensalidade opcional de ${mensalEmTexto(p.mensal.valor)} (${p.mensal.cobre})` : ""}${p.duracao ? `; duração de referência ${p.duracao}` : ""}. ${p.para}`,
      ),
      `Fora dos pacotes: ${o.fora.join("; ")}.`,
      "",
    ]),
    `Método do Sprint: ${METODO.map((m, i) => `${i + 1}. ${m.titulo}`).join("; ")}. Pagamento do Sprint: ${CONDICOES.itens[1].texto}`,
    "",
    `### [Continuidade](${SITE_URL}/continuidade)`,
    CONTINUIDADE.texto,
    ...PLANOS_DE_CONTINUIDADE.map((p) => `- ${p.nome}: ${mensalEmTexto(p.mensal)}. ${p.para} ${p.inclui.join("; ")}.`),
    ...CONTINUIDADE.limites.map((l) => `- ${l.titulo}: ${l.texto}`),
    "",
    "## Recursos que um projeto pode usar",
    "Automação, IA, dados, painéis e integrações entram como recursos de uma solução, quase sempre de um Sprint, sem preço próprio.",
    "",
    ...pilares,
    "## Segmento automotivo",
    `- [${AUTOMOTIVO.titulo}](${SITE_URL}${AUTOMOTIVO.href}): ${AUTOMOTIVO.texto}`,
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
