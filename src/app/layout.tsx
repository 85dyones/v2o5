import type { Metadata, Viewport } from "next";
import { Geist } from "./fontes";
import Ancora from "@/components/layout/Ancora";
import FonteMonoTardia from "@/components/layout/FonteMonoTardia";
import Medicao from "@/components/layout/Medicao";
import PrimeiroToque from "@/components/layout/PrimeiroToque";
import { SUFIXO_DO_TITULO, TITULO_PADRAO } from "@/conteudo/paginas";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_PADRAO,
    template: `%s${SUFIXO_DO_TITULO}`,
  },
  description:
    "A V2O5 digitaliza pequenos negócios: coloca o negócio no Google e organiza o atendimento no WhatsApp, com sites, integrações e IA. Comece pelo diagnóstico gratuito.",
  applicationName: "V2O5 Vendas e Tecnologia",
  openGraph: { type: "website", siteName: "V2O5 Vendas e Tecnologia", locale: "pt_BR", url: "/" },
  twitter: { card: "summary" },
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
