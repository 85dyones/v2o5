import Icone from "@/components/Icone";
import { WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * O botão fixo de WhatsApp do celular (plano, seção 6.1): canto inferior
 * direito, só abaixo de 768 px, com a mensagem pré-preenchida da página.
 * Server Component: um link, sem JavaScript.
 */
export default function BotaoWhatsAppFixo({ pagina }: { pagina: keyof typeof WHATSAPP.mensagens }) {
  return (
    <a
      href={linkWhatsApp(WHATSAPP.mensagens[pagina])}
      target="_blank"
      rel="noopener"
      className="botao-whatsapp fixed bottom-4 right-4 z-40 flex min-h-12 items-center gap-2 rounded-full pl-3.5 pr-4 text-[0.9375rem] font-semibold md:hidden"
      data-evento="click_whatsapp"
    >
      <Icone nome="conversa" className="size-5" />
      WhatsApp
    </a>
  );
}
