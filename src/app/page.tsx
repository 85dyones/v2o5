import Home from "@/components/home/Home";
import JsonLd from "@/components/JsonLd";
import { TITULO_DA_HOME } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaHome } from "@/lib/schema";

export const metadata = metadataDa("/");

export default function Page() {
  return (
    <>
      <Home titulo={TITULO_DA_HOME} />
      <JsonLd grafo={grafoDaHome()} />
    </>
  );
}
