import type { Metadata, Viewport } from "next";
import { Geist } from "./fontes";
import Ancora from "@/components/layout/Ancora";
import FonteMonoTardia from "@/components/layout/FonteMonoTardia";
import Medicao from "@/components/layout/Medicao";
import PrimeiroToque from "@/components/layout/PrimeiroToque";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "V2O5 Vendas e Tecnologia | Catalisador de vendas com IA",
    template: "%s | V2O5 Vendas e Tecnologia",
  },
  description:
    "Site, Perfil no Google, anúncios, agente de IA no WhatsApp e CRM montados por uma equipe só, num sistema que mostra de onde veio cada venda. Sem fidelidade.",
  applicationName: "V2O5 Vendas e Tecnologia",
};

export const viewport: Viewport = {
  themeColor: "#F2F1EC",
  colorScheme: "light",
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
        <PrimeiroToque />
        <Medicao />
        <Ancora />
      </body>
    </html>
  );
}
