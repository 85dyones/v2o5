import { EMPRESA } from "@/conteudo/home";

/**
 * O WhatsApp da V2O5, num lugar só: o link e o número escrito saem do mesmo
 * campo (`EMPRESA.whatsapp`, só dígitos com o 55), para rótulo e destino
 * nunca discordarem, lição da Motors (`lib/whatsapp.ts` de lá).
 */

export function linkWhatsApp(mensagem?: string): string {
  const texto = mensagem?.trim() ? `?text=${encodeURIComponent(mensagem.trim())}` : "";
  return `https://wa.me/${EMPRESA.whatsapp}${texto}`;
}

/** "(41) 99808-9550", para ler e anotar. */
export function whatsappParaLer(): string {
  const d = EMPRESA.whatsapp.replace(/^55/, "");
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const meio = resto.length === 9 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, meio)}-${resto.slice(meio)}`;
}

/** "+55 41 99808-9550", o formato que o schema.org e o Google esperam. */
export function whatsappInternacional(): string {
  const d = EMPRESA.whatsapp;
  return `+${d.slice(0, 2)} ${d.slice(2, 4)} ${whatsappParaLer().slice(5)}`;
}
