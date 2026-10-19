import Image, { type StaticImageData } from "next/image";
import estoque from "@/assets/motors/estoque.webp";
import veiculo from "@/assets/motors/veiculo.webp";
import vitrine from "@/assets/motors/vitrine.webp";

/**
 * Telas reais do site da Motors Store, capturadas no celular (390 px) em
 * 19/10/2026 (Dyones: o case mostra o trabalho, não só o descreve). Chapadas,
 * sem moldura de aparelho: fio de 2 px em tinta por cima e a legenda com o
 * endereço e a data. Abaixo da dobra, então nunca disputam o LCP com o H1.
 */
const CAPTURAS = {
  vitrine: {
    imagem: vitrine,
    endereco: "motorsstore.com.br",
    alt: "Vitrine do site da Motors Store no celular: veículo em destaque, preço e a busca por marca e modelo.",
  },
  estoque: {
    imagem: estoque,
    endereco: "motorsstore.com.br/estoque",
    alt: "Página de estoque do site da Motors Store no celular: título, ordenação, busca e o primeiro veículo da lista.",
  },
  veiculo: {
    imagem: veiculo,
    endereco: "motorsstore.com.br/carros/volkswagen/t-cross",
    alt: "Ficha de um veículo no site da Motors Store no celular: galeria de fotos, modelo, ano, preço e os botões de contato.",
  },
} satisfies Record<string, { imagem: StaticImageData; endereco: string; alt: string }>;

export const CAPTURADO_EM = "19/10/2026";
export type Captura = keyof typeof CAPTURAS;

export default function CapturasDaMotors({
  quais = ["vitrine", "estoque", "veiculo"],
  sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 30vw, 90vw",
  className = "",
}: {
  quais?: Captura[];
  /** Largura que cada tela ocupa, para o Next escolher o arquivo certo. */
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 ${quais.length > 1 ? "sm:grid-cols-3" : ""} ${className}`}>
      {quais.map((q, i) => {
        const c = CAPTURAS[q];
        return (
          // No celular as três empilhadas passam de duas telas de altura: fica a primeira.
          <figure key={q} className={`border-t-2 border-texto pt-3 ${i > 0 ? "hidden sm:block" : ""}`}>
            <Image src={c.imagem} alt={c.alt} sizes={sizes} className="h-auto w-full border border-linha" />
            <figcaption className="rotulo mt-2.5 break-words text-texto-secundario">
              {c.endereco}, capturado em {CAPTURADO_EM}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
