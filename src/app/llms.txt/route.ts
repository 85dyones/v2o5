import { AUTOMOTIVO, CASE, EMPRESA, HERO, PILARES, VISAO_360 } from "@/conteudo/home";
import { SITE_URL } from "@/lib/site";

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
  const numeros = CASE.numeros.map(
    (n) => `- ${n.valor}${n.complemento ? ` ${n.complemento}` : ""} ${n.texto}.`,
  );
  return [
    `# ${EMPRESA.nome}`,
    "",
    `> Catalisador de vendas com IA. ${HERO.subtitulo}`,
    "",
    `${EMPRESA.razaoSocial}, CNPJ ${EMPRESA.cnpj}, ${EMPRESA.cidade}. Atende empresas em todo o Brasil.`,
    "",
    `Fundador: ${VISAO_360.fundador.nome}. ${VISAO_360.fundador.texto}`,
    "",
    "## Serviços",
    ...pilares,
    "## Segmento automotivo",
    `- [${AUTOMOTIVO.titulo}](${SITE_URL}${AUTOMOTIVO.href}): ${AUTOMOTIVO.texto} ${AUTOMOTIVO.preco}`,
    "",
    "## Case Motors Store",
    `Revenda de seminovos em Curitiba. ${CASE.fonte}`,
    ...numeros,
    "",
    "## Como começar",
    `- [Diagnóstico gratuito](${SITE_URL}/diagnostico): ${HERO.nota}`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(textoDoLlms(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
