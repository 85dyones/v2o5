import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Preços",
  description: "Valores de implantação e mensalidade de cada linha, sempre a partir de.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Preços" resumo="Valores de implantação e mensalidade de cada linha, sempre a partir de." />;
}
