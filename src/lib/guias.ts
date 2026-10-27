import { SAIDAS_PERMITIDAS, type Guia } from "@/conteudo/guias/tipos";

/** Conta as palavras de um texto corrido. */
const palavras = (t: string) => t.split(/\s+/).filter(Boolean).length;

/** O texto do guia, todo junto, para as travas de redação. */
export function textoDoGuia(g: Guia): string {
  return [
    g.titulo,
    g.descricao,
    g.resposta,
    ...g.secoes.flatMap((s) => [s.pergunta, ...s.paragrafos, ...(s.tabela ? [s.tabela.legenda, ...s.tabela.cabecalho, ...s.tabela.linhas.flat()] : [])]),
    ...g.faq.flatMap((f) => [f.pergunta, f.resposta]),
    g.saida.titulo,
    g.saida.texto,
    g.saida.botao,
  ].join("\n");
}

/**
 * As travas do método (`docs/plano-de-conteudo.md`): devolve a lista de
 * problemas; vazia quer dizer que o guia está pronto para o estado dele.
 * Rascunho pode ser curto; publicado precisa ter corpo (900 palavras).
 */
export function problemasDoGuia(g: Guia): string[] {
  const p: string[] = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug)) p.push("slug fora do padrão (minúsculas, números e hífen)");
  if (g.titulo.length > 60) p.push(`H1 com ${g.titulo.length} caracteres (máximo 60)`);
  if (g.descricao.length < 40 || g.descricao.length > 160) p.push(`descrição com ${g.descricao.length} caracteres (de 40 a 160)`);
  if (!/[.!?]$/.test(g.resposta) || (g.resposta.match(/[.!?](\s|$)/g) ?? []).length > 2) p.push("a resposta tem de ter até duas frases");
  if (g.secoes.length < 3 || g.secoes.length > 6) p.push(`${g.secoes.length} perguntas H2 (de 3 a 6)`);
  if (g.faq.length < 3 || g.faq.length > 4) p.push(`${g.faq.length} perguntas no FAQ (3 ou 4)`);
  if (!SAIDAS_PERMITIDAS.includes(g.saida.href)) p.push(`saída fora das permitidas: ${g.saida.href}`);
  if (g.relacionados.includes(g.slug)) p.push("relaciona a si mesmo");
  if (g.atualizadaEm < g.publicadoEm) p.push("atualizado antes de publicado");
  const texto = textoDoGuia(g);
  if (/[—–]/.test(texto)) p.push("travessão no texto");
  if (/não é [^.\n]{3,40}, é /i.test(texto)) p.push('contraste "não é X, é Y"');
  if (/vale ressaltar|é importante destacar|no fim do dia|a verdade é que/i.test(texto)) p.push("marca de texto de IA");
  if (/(R\$\s?\d|\d\s?%)/.test(texto) && g.fontes.length === 0) p.push("número ou valor sem fonte");
  if (g.fontes.length === 0) p.push("sem fonte");
  if (g.estado === "publicado") {
    const total = palavras(texto);
    if (total < 900) p.push(`só ${total} palavras (mínimo 900 para publicar)`);
  }
  return p;
}
