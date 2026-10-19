import type { CSSProperties, ReactNode } from "react";
import type { Etapa } from "@/lib/tokens";

/**
 * A rota das etapas (direção B, `.bunshin/direction.md`): a linha que sai do
 * mapa da abertura e desce pela margem esquerda da página até o botão do
 * fecho. Cada seção é um trecho na cor da etapa de que fala; a que não é
 * etapa liga as paradas com um fio fino neutro.
 */

/** A cor de cada etapa na rota. A venda é o âmbar da ação. */
export const COR_DA_ROTA: Record<Etapa, string> = {
  violeta: "var(--color-etapa-atracao)",
  verde: "var(--color-etapa-atendimento)",
  azul: "var(--color-etapa-crm)",
  ambar: "var(--color-acao)",
};

/** A tinta clara de cada etapa, fundo do marca-texto. */
export const TINTA_DA_ETAPA: Record<Etapa, string> = {
  violeta: "var(--color-tinta-violeta)",
  verde: "var(--color-tinta-verde)",
  azul: "var(--color-tinta-azul)",
  ambar: "var(--color-tinta-ambar)",
};

/** A cor da etapa como texto sobre o papel (o âmbar vira o âmbar de texto). */
export const TEXTO_DA_ETAPA: Record<Etapa, string> = {
  violeta: "var(--color-etapa-atracao)",
  verde: "var(--color-etapa-atendimento)",
  azul: "var(--color-etapa-crm)",
  ambar: "var(--color-acao-texto)",
};

type Rotulagem = { "aria-labelledby": string; "aria-label"?: never } | { "aria-label": string; "aria-labelledby"?: never };

/**
 * Uma seção da home como trecho da rota. `etapa` pinta o trecho; sem ela, o
 * fio é fino e neutro. `etapaFim` troca a cor no fim da seção (soluções
 * termina no azul da gestão). `adiada` pula layout e pintura até a seção
 * chegar perto da tela.
 */
export function Trecho({
  id,
  etapa,
  etapaFim,
  adiada = true,
  className = "",
  miolo = "",
  children,
  ...rotulagem
}: {
  id?: string;
  etapa?: Etapa;
  etapaFim?: Etapa;
  adiada?: boolean;
  className?: string;
  miolo?: string;
  children: ReactNode;
} & Rotulagem) {
  const estilo = {
    ...(etapa ? { "--cor-da-rota": COR_DA_ROTA[etapa] } : {}),
    ...(etapaFim ? { "--cor-fim": COR_DA_ROTA[etapaFim] } : {}),
  } as CSSProperties;
  return (
    <section
      id={id}
      {...rotulagem}
      className={`trecho ${adiada ? "adiada" : ""} border-b border-linha ${className}`}
      style={estilo}
      data-fino={etapa ? undefined : ""}
      data-cor-fim={etapaFim ? "" : undefined}
      data-entra=""
    >
      <div className={`conteiner conteiner-rota py-secao ${miolo}`}>{children}</div>
    </section>
  );
}

/** O círculo da estação, na rota, à altura do título que o leva. */
export function Parada({ final = false }: { final?: boolean }) {
  return <span aria-hidden="true" className={final ? "parada parada-final" : "parada"} />;
}

/**
 * O texto com os trechos que decidem no marca-texto. Não muda palavra:
 * procura cada trecho no texto e só o embrulha.
 */
export function ComMarcas({ texto, marcas, etapa = "ambar" }: { texto: string; marcas: string[]; etapa?: Etapa }) {
  const partes: ReactNode[] = [];
  let resto = texto;
  let chave = 0;
  while (resto) {
    const achados = marcas
      .map((m) => ({ m, i: resto.indexOf(m) }))
      .filter((a) => a.i >= 0)
      .sort((a, b) => a.i - b.i);
    if (!achados.length) {
      partes.push(resto);
      break;
    }
    const { m, i } = achados[0];
    if (i > 0) partes.push(resto.slice(0, i));
    partes.push(
      <span key={chave++} className="marca-texto" style={{ "--tinta": TINTA_DA_ETAPA[etapa] } as CSSProperties}>
        {m}
      </span>,
    );
    resto = resto.slice(i + m.length);
  }
  return <>{partes}</>;
}
