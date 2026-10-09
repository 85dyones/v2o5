import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Case Motors Store",
  description: "Como o sistema da V2O5 roda numa revenda de seminovos em Curitiba.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Case Motors Store" resumo="Como o sistema da V2O5 roda numa revenda de seminovos em Curitiba." />;
}
