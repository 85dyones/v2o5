import Icone from "@/components/Icone";
import { WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * O botão fixo de WhatsApp do celular (plano, seção 6.1): canto inferior
 * direito, só abaixo de 768 px, com a mensagem pré-preenchida da página.
 * Server Component: um link, sem JavaScript.
 */
export default function BotaoWhatsAppFixo({
  pagina,
  mensagem,
}: {
  pagina: keyof typeof WHATSAPP.mensagens;
  /** Mensagem própria (páginas de solução), no lugar da mensagem da página. */
  mensagem?: string;
}) {
  return (
    <a
      href={linkWhatsApp(mensagem ?? WHATSAPP.mensagens[pagina])}
      target="_blank"
      rel="noopener"
      className="botao-whatsapp fixed bottom-4 right-4 z-40 flex min-h-12 items-center gap-2 pl-3.5 pr-4 text-[0.9375rem] font-semibold md:hidden"
      data-evento="click_whatsapp"
      data-local="botao-fixo"
    >
      <Icone nome="conversa" className="size-5" />
      WhatsApp
    </a>
  );
}
