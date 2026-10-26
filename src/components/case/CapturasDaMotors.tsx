import Image, { type StaticImageData } from "next/image";
import estoque from "@/assets/motors/estoque.webp";
import veiculo from "@/assets/motors/veiculo.webp";
import bairro from "@/assets/motors/bairro.webp";
import financiamento from "@/assets/motors/financiamento.webp";
import guias from "@/assets/motors/guias.webp";
import perfil from "@/assets/motors/perfil.webp";
import vitrine from "@/assets/motors/vitrine.webp";

/**
 * Telas reais do site da Motors Store, capturadas no celular (390 px) em
 * 19/10/2026 e, as quatro novas (guias, perfil do carro certo, página de
 * bairro e simulador de financiamento), em 26/10/2026 (Dyones: o case mostra
 * o trabalho, não só o descreve). Chapadas,
 * sem moldura de aparelho: fio de 2 px em tinta por cima e a legenda com o
 * endereço e a data. Abaixo da dobra, então nunca disputam o LCP com o H1.
 */
const CAPTURAS = {
  vitrine: {
    imagem: vitrine,
    endereco: "motorsstore.com.br",
    alt: "Vitrine do site da Motors Store no celular: veículo em destaque, preço e a busca por marca e modelo.",
    em: "19/10/2026",
  },
  estoque: {
    imagem: estoque,
    endereco: "motorsstore.com.br/estoque",
    alt: "Página de estoque do site da Motors Store no celular: título, ordenação, busca e o primeiro veículo da lista.",
    em: "19/10/2026",
  },
  veiculo: {
    imagem: veiculo,
    endereco: "motorsstore.com.br/carros/volkswagen/t-cross",
    alt: "Ficha de um veículo no site da Motors Store no celular: galeria de fotos, modelo, ano, preço e os botões de contato.",
    em: "19/10/2026",
  },
  guias: {
    imagem: guias,
    endereco: "motorsstore.com.br/guias",
    alt: "Página de guias do site da Motors Store no celular: busca por dúvida, a contagem de guias publicados e o guia em destaque sobre a perícia cautelar.",
    em: "26/10/2026",
  },
  perfil: {
    imagem: perfil,
    endereco: "motorsstore.com.br/carro-perfeito",
    alt: "Ferramenta Garagem Profiler no site da Motors Store no celular: cinco perguntas até o carro certo, com o perfil se formando ao vivo.",
    em: "26/10/2026",
  },
  bairro: {
    imagem: bairro,
    endereco: "motorsstore.com.br/seminovos-bacacheri",
    alt: "Página local do bairro Bacacheri no site da Motors Store no celular: endereço da loja, quantidade de veículos à venda e o resumo da seleção.",
    em: "26/10/2026",
  },
  financiamento: {
    imagem: financiamento,
    endereco: "motorsstore.com.br/financiamento",
    alt: "Página de financiamento do site da Motors Store no celular: explicação, resumo da seleção e o simulador de parcela com o estoque real.",
    em: "26/10/2026",
  },
} satisfies Record<string, { imagem: StaticImageData; endereco: string; alt: string; em: string }>;

/** Todas as telas, na ordem em que a galeria as mostra. */
export const TODAS_AS_CAPTURAS = ["vitrine", "estoque", "veiculo", "guias", "perfil", "bairro", "financiamento"] as const;
export type Captura = keyof typeof CAPTURAS;

export default function CapturasDaMotors({
  quais = ["vitrine", "estoque", "veiculo"],
  sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 30vw, 90vw",
  className = "",
  galeria = false,
}: {
  quais?: readonly Captura[];
  /** Largura que cada tela ocupa, para o Next escolher o arquivo certo. */
  sizes?: string;
  className?: string;
  /** Várias telas lado a lado: no celular, uma faixa que desliza; do `sm` em diante, grade. */
  galeria?: boolean;
}) {
  const moldura = galeria
    ? "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4"
    : `grid gap-6 ${quais.length > 1 ? "sm:grid-cols-3" : ""}`;
  return (
    <div className={`${moldura} ${className}`}>
      {quais.map((q, i) => {
        const c = CAPTURAS[q];
        return (
          // Fora da galeria, no celular as três empilhadas passam de duas telas de altura: fica a primeira.
          <figure
            key={q}
            className={`border-t-2 border-texto pt-3 ${galeria ? "w-[68vw] max-w-[17rem] shrink-0 snap-start sm:w-auto sm:max-w-none" : i > 0 ? "hidden sm:block" : ""}`}
          >
            <Image src={c.imagem} alt={c.alt} sizes={sizes} className="h-auto w-full border border-linha" />
            <figcaption className="rotulo mt-2.5 break-words text-texto-secundario">
              {c.endereco}, capturado em {c.em}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
