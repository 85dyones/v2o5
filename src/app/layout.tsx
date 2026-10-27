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
    default: "V2O5 Vendas e Tecnologia | Menos atrito entre problema e resultado",
    template: "%s | V2O5 Vendas e Tecnologia",
  },
  description:
    "A V2O5 acha o gargalo, simplifica o processo e implementa tecnologia, automação e IA para a operação render mais e ser medida. Comece pelo Sprint de Eficiência.",
  applicationName: "V2O5 Vendas e Tecnologia",
  // Verificação do Search Console e do Bing por meta tag (só quando a variável existe; `.env.example`).
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
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
