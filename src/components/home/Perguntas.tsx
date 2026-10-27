import { Parada, Trecho } from "@/components/rota/Rota";
import { PERGUNTAS } from "@/conteudo/home";

/**
 * As perguntas de quem está decidindo contratar, com as respostas das regras
 * comerciais. `<details>` nativo: abre sem JavaScript, e `name` deixa uma
 * aberta por vez. O schema FAQPage repete as mesmas perguntas (`schema.ts`).
 * O sobretítulo virou o nome acessível da seção (decisão de 19/10).
 */
export default function Perguntas({
  id = "perguntas",
  lista = PERGUNTAS,
  sobretitulo = "Antes de contratar",
  titulo = "O que todo mundo pergunta",
  texto = "Preço, pagamento, o que cada solução entrega e o que vem depois. Se a sua pergunta não está aqui, ela cabe no diagnóstico.",
}: {
  id?: string;
  lista?: { pergunta: string; resposta: string }[];
  sobretitulo?: string;
  titulo?: string;
  texto?: string;
}) {
  return (
    <Trecho id={id} aria-label={sobretitulo}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="relative col-span-12 lg:col-span-5">
          <Parada />
          <h2 id={`titulo-${id}`} className="titulo-secao">
            {titulo} <span className="apagado">antes de fechar.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[30rem]">{texto}</p>
        </div>
        <div className="col-span-12 border-t-2 border-texto lg:col-span-7">
          {lista.map((p) => (
            <details key={p.pergunta} name={id} className="pergunta group border-b border-linha">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] transition-colors hover:bg-fundo-cartao">
                {p.pergunta}
                <span
                  aria-hidden="true"
                  className="pergunta-sinal relative mr-2 flex size-8 shrink-0 items-center justify-center contorno-forte"
                />
              </summary>
              <p className="pb-6 pr-4 text-[0.9375rem] leading-relaxed text-texto-secundario md:pr-16">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </Trecho>
  );
}
