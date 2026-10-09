import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { TITULOS } from "@/conteudo/home";

// A segunda opção de H1, para o Dyones comparar navegando. Some quando ele
// escolher.
export const metadata: Metadata = {
  title: "Opção B do título",
  robots: { index: false, follow: false },
};

export default function Pagina() {
  return <Home titulo={TITULOS.b} />;
}
