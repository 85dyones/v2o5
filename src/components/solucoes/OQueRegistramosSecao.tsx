import { Parada, Trecho } from "@/components/rota/Rota";
import OQueRegistramos from "@/components/solucoes/OQueRegistramos";
import { solucaoDa } from "@/conteudo/solucoes";

/**
 * A demonstração da página de rastreamento, como trecho da rota na cor da
 * etapa da página. Fica no servidor; só a ficha da origem roda no
 * navegador. O sobretítulo "Demonstração" virou o nome acessível da seção
 * (decisão de 19/10).
 */
export function OQueRegistramosSecao() {
  const { etapa } = solucaoDa("/rastreamento-de-conversoes");
  return (
    <Trecho aria-label="Demonstração" etapa={etapa}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="relative col-span-12 lg:col-span-5">
          <Parada />
          <h2 id="titulo-registro" className="titulo-secao">
            O que este site registrou <span className="apagado">da sua visita.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[30rem]">
            É a origem que o formulário do diagnóstico manda junto com o lead. Chegue por um anúncio com utm ou gclid na
            URL e veja aparecer aqui.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:pt-2">
          <OQueRegistramos />
        </div>
      </div>
    </Trecho>
  );
}
