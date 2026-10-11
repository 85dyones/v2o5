import type { Metadata, Viewport } from "next";
import { Geist } from "./fontes";
import FonteMonoTardia from "@/components/layout/FonteMonoTardia";
import LuzDoCursor from "@/components/layout/LuzDoCursor";
import PrimeiroToque from "@/components/layout/PrimeiroToque";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://v2o5.com.br"),
  title: {
    default: "V2O5 Vendas e Tecnologia | Catalisador de vendas com IA",
    template: "%s | V2O5 Vendas e Tecnologia",
  },
  description:
    "Site, Perfil no Google, anúncios, agente de IA no WhatsApp e CRM montados por uma equipe só, num sistema que mostra de onde veio cada venda. Sem fidelidade.",
  applicationName: "V2O5 Vendas e Tecnologia",
};

export const viewport: Viewport = {
  themeColor: "#121418",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={Geist.variable}>
      <body>
        <a
          href="#conteudo"
          className="botao botao-primario fixed left-3 top-3 z-50 -translate-y-24 focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        {children}
        <FonteMonoTardia />
        <LuzDoCursor />
        <PrimeiroToque />
      </body>
    </html>
  );
}
