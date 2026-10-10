import { EMPRESA } from "@/conteudo/home";

/**
 * O e-mail da V2O5, num lugar só, como o WhatsApp: o link e o endereço
 * escrito saem de `EMPRESA` para nunca discordarem. Por padrão é o endereço
 * público (diagnostico@); a página de privacidade passa o do encarregado.
 */
export function linkEmail(assunto?: string, endereco: string = EMPRESA.email): string {
  const texto = assunto?.trim() ? `?subject=${encodeURIComponent(assunto.trim())}` : "";
  return `mailto:${endereco}${texto}`;
}
