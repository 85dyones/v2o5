import { PERGUNTAS } from "@/conteudo/home";

/**
 * As perguntas de quem está decidindo contratar, com as respostas das regras
 * comerciais. `<details>` nativo: abre sem JavaScript, e `name` deixa uma
 * aberta por vez. O schema FAQPage repete as mesmas perguntas (`schema.ts`).
 */
export default function Perguntas({ id = "perguntas" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`titulo-${id}`} className="adiada py-24 md:py-32">
      <div className="conteiner grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <p className="sobretitulo">Antes de contratar</p>
          <h2 id={`titulo-${id}`} className="titulo-secao mt-5">
            O que todo mundo pergunta <span className="apagado">antes de fechar.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[30rem]">
            Preço, fidelidade, o que entra na mensalidade e o que fica de fora. Se a sua pergunta não está aqui, ela cabe
            no diagnóstico.
          </p>
        </div>
        <div className="superficie divide-y divide-linha px-2 md:px-4">
          {PERGUNTAS.map((p) => (
            <details key={p.pergunta} name={id} className="pergunta group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-4 py-4 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] md:px-5">
                {p.pergunta}
                <span
                  aria-hidden="true"
                  className="pergunta-sinal relative flex size-7 shrink-0 items-center justify-center rounded-full bg-vidro-forte contorno"
                />
              </summary>
              <p className="px-4 pb-5 text-[0.9375rem] leading-relaxed text-secundario md:px-5 md:pr-16">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
