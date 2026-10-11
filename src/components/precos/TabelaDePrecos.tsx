import Link from "next/link";
import Icone from "@/components/Icone";
import {
  AUTOMOTIVO_PRECO,
  BRL,
  descontoDoPacote,
  LINHAS_DE_PRECO,
  mensalidadeDoPacoteComTrafego,
  mesesQueUmaVendaPaga,
  REGRAS,
  somaDoPacote,
  type LinhaDePreco,
} from "@/conteudo/precos";

function implantacao(l: LinhaDePreco) {
  if (l.implantacao) return `${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`;
  return l.semImplantacao ?? "";
}

function mensalidade(l: LinhaDePreco) {
  if (!l.mensalidade) return l.unidade ? "sem mensalidade" : "";
  return `${BRL(l.mensalidade)}/mês${l.maisVerba ? " + verba" : ""}`;
}

/**
 * A tabela de `precos.ts`: tabela de verdade no desktop, cartões no celular.
 * Todo valor é "a partir de"; o final sai do diagnóstico, com escopo fechado.
 */
export function Tabela() {
  return (
    <>
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="text-sm text-secundario">
            <th scope="col" className="pb-4 pr-4 font-medium">
              Linha
            </th>
            <th scope="col" className="pb-4 pr-4 font-medium">
              Implantação a partir de
            </th>
            <th scope="col" className="pb-4 pr-4 font-medium">
              Mensalidade a partir de
            </th>
            <th scope="col" className="pb-4 font-medium">
              O que cobre
            </th>
          </tr>
        </thead>
        <tbody>
          {LINHAS_DE_PRECO.map((l) => (
            <tr key={l.id} className="border-t border-linha align-top">
              <th scope="row" className="py-5 pr-4 font-semibold tracking-[-0.01em]">
                <Link href={l.href} className="link-sublinhado">
                  {l.nome}
                </Link>
              </th>
              <td className="py-5 pr-4 tabular-nums">{implantacao(l)}</td>
              <td className="py-5 pr-4 tabular-nums">{mensalidade(l)}</td>
              <td className="max-w-[24rem] py-5 text-[0.9375rem] leading-relaxed text-secundario">{l.cobre}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="grid gap-3 md:hidden">
        {LINHAS_DE_PRECO.map((l) => (
          <li key={l.id} className="superficie p-5">
            <Link href={l.href} className="titulo-cartao link-sublinhado">
              {l.nome}
            </Link>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.9375rem]">
              <dt className="text-secundario">Implantação</dt>
              <dd className="tabular-nums">{implantacao(l) || "sem"}</dd>
              <dt className="text-secundario">Mensalidade</dt>
              <dd className="tabular-nums">{mensalidade(l) || "sem"}</dd>
            </dl>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-secundario">{l.cobre}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

/** O pacote automotivo com o desconto calculado sobre as linhas avulsas. */
export function Pacote() {
  const { pacote, siteDeEstoque } = AUTOMOTIVO_PRECO;
  const soma = somaDoPacote();
  const desconto = descontoDoPacote();
  const meses = mesesQueUmaVendaPaga();
  return (
    <div className="superficie grid overflow-hidden lg:grid-cols-[1.2fr_1fr]">
      <div className="p-7 md:p-9">
        <p className="sobretitulo">Revendas de veículos</p>
        <h3 className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em]">
          Pacote completo: o sistema da Motors Store na sua loja.
        </h3>
        <p className="mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-secundario">
          Site de estoque integrado ao Revenda Mais, agente de IA no WhatsApp, CRM e rastreamento até a venda. As
          mesmas linhas avulsas somam {BRL(soma.implantacao)} de implantação e {BRL(soma.mensalidade)} por mês.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-vidro p-4 contorno">
            <dt className="text-sm text-secundario">Implantação a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(pacote.implantacao)}</dd>
            <dd className="mt-1 text-sm text-verde-claro">{desconto.implantacao}% menos que as linhas avulsas</dd>
          </div>
          <div className="rounded-xl bg-vidro p-4 contorno">
            <dt className="text-sm text-secundario">Mensalidade a partir de</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{BRL(pacote.mensalidade)}</dd>
            <dd className="mt-1 text-sm text-verde-claro">{desconto.mensalidade}% menos que as linhas avulsas</dd>
          </div>
        </dl>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-secundario">
          Com tráfego pago: {BRL(mensalidadeDoPacoteComTrafego())} por mês mais a verba. Só o site de estoque:{" "}
          {BRL(siteDeEstoque.implantacao)} de implantação e {BRL(siteDeEstoque.mensalidade)} por mês.
        </p>
        <Link href="/segmentos/revendas-de-veiculos" className="botao botao-secundario mt-7">
          Ver a página de revendas
          <Icone nome="seta" className="seta size-4" />
        </Link>
      </div>
      <div className="flex flex-col justify-center border-t border-linha bg-[rgb(12_13_16/0.35)] p-7 md:p-9 lg:border-l lg:border-t-0">
        <p className="text-sm font-medium text-secundario">A conta que importa</p>
        <p className="mt-3 text-[1.125rem] leading-snug">
          Com uma margem de {BRL(REGRAS.margemPorCarro)} por carro, uma venda a mais a cada {meses} meses paga a
          mensalidade do pacote.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-secundario">
          A margem é a referência do plano de mídia da Motors Store. Na sua loja, a conta sai no diagnóstico, com o
          seu número.
        </p>
      </div>
    </div>
  );
}

/** O que fica fora da mensalidade, sem letra miúda. */
export function ForaDaMensalidade() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {[
        ["Verba de anúncios", "Paga direto ao Google e à Meta, no valor que você decidir."],
        ["Uso de IA e mensagens", "O modelo de IA e as mensagens da API oficial do WhatsApp, pelo valor real, na mesma fatura."],
        ["Fotos e vídeos", "A produção de imagem fica com a sua equipe ou com um fotógrafo parceiro."],
      ].map(([titulo, texto]) => (
        <li key={titulo} className="rounded-2xl bg-vidro p-5 contorno">
          <p className="font-semibold tracking-[-0.01em]">{titulo}</p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">{texto}</p>
        </li>
      ))}
    </ul>
  );
}
