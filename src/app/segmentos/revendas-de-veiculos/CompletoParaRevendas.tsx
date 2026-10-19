import Link from "next/link";
import Icone from "@/components/Icone";
import { ComMarcas } from "@/components/rota/Rota";
import {
  BRL,
  dataBR,
  DEGRAUS,
  mensalidadeDoCompletoComTrafego,
  mesesQueUmaVendaPaga,
  OFERTA_DO_COMPLETO,
  plano,
  REGRAS,
  somaDosPlanosSeparados,
  USUARIOS_NO_CRM,
} from "@/conteudo/precos";

/**
 * O preço do plano Completo no hub, como ficha: o que vem, os dois valores
 * no marca-texto e, ao lado, a conta da margem por carro. Fica aqui (só o hub
 * usa) e lê tudo de `precos.ts`, como a versão antiga de
 * `components/precos/TabelaDePrecos.tsx`. O rótulo "Plano Completo", que
 * ficava acima do título, virou o nome do grupo (decisão de 19/10).
 */
/** Valor em real que não parte entre "R$" e o número no texto corrido (mesma regra do ComMarcas). */
const semQuebra = (t: string) => t.replace(/R\$ (?=\d)/g, "R$\u00A0");

export function CompletoParaRevendas() {
  const p = plano("completo");
  const separados = somaDosPlanosSeparados();
  const meses = mesesQueUmaVendaPaga();
  const implantacao = BRL(p.implantacao);
  const mensalidade = BRL(OFERTA_DO_COMPLETO.mensalidade);
  const conta = `Com uma margem de ${BRL(REGRAS.margemPorCarro)} por carro, uma venda a mais a cada ${meses} meses paga a mensalidade do Completo.`;
  return (
    <div role="group" aria-label="Plano Completo" className="grid grid-cols-12 border-y-2 border-texto">
      <div className="col-span-12 py-8 md:py-10 lg:col-span-7 lg:pr-10">
        <h3 className="text-titulo-3 max-w-[24ch]">O sistema da Motors Store na sua loja.</h3>
        <p className="mt-5 max-w-[36rem] text-[0.9375rem] leading-relaxed text-texto-secundario">
          Site de estoque integrado ao sistema da loja, agente de IA no WhatsApp, CRM com {USUARIOS_NO_CRM} usuários,
          rastreamento até a venda e um fluxo de automação. Presença e Atendimento separados somam {semQuebra(BRL(separados.implantacao))}{" "}
          de implantação e {semQuebra(BRL(separados.mensalidade))} por mês.
        </p>

        {/* Os dois valores que decidem, grandes e no marca-texto, em células de fio. */}
        <dl className="mt-8 grid grid-cols-1 border-y border-linha sm:grid-cols-2">
          <div className="py-5 pr-4 md:py-6 md:pr-6">
            <dt className="rotulo text-texto-secundario">Implantação a partir de</dt>
            <dd className="mt-3 text-titulo-2 tabular-nums">
              <ComMarcas texto={implantacao} marcas={[implantacao]} />
            </dd>
          </div>
          <div className="border-t border-linha py-5 sm:border-l sm:border-t-0 sm:pl-4 md:py-6 md:pl-6">
            <dt className="rotulo text-texto-secundario">Mensalidade a partir de</dt>
            <dd className="mt-3 text-titulo-2 tabular-nums">
              <ComMarcas texto={mensalidade} marcas={[mensalidade]} />
            </dd>
            <dd className="mt-2 text-sm text-texto-secundario">
              <del className="tabular-nums">{semQuebra(BRL(p.mensalidade))}</del> até {dataBR(OFERTA_DO_COMPLETO.ate)}
            </dd>
          </div>
        </dl>

        {p.bonus ? (
          <p className="mt-6 text-[0.9375rem] font-medium leading-relaxed">
            <ComMarcas texto={p.bonus} marcas={["Bônus de fechamento:"]} etapa="verde" />
          </p>
        ) : null}
        <p className="mt-3 max-w-[36rem] text-[0.9375rem] leading-relaxed text-texto-secundario">
          Com Google Ads e Meta Ads: {semQuebra(BRL(mensalidadeDoCompletoComTrafego()))} por mês mais a verba, com o feed de catálogo
          incluso. Usuário extra {semQuebra(BRL(DEGRAUS.usuarioExtra))} por mês.
        </p>
        <Link href="/precos" className="botao botao-secundario mt-8" data-evento="cta_click" data-local="pacote">
          Ver todos os planos
          <Icone nome="seta" className="seta size-4" />
        </Link>
      </div>

      {/* A conta da margem, na célula do cartão: o rótulo informa, a frase decide. */}
      <div className="col-span-12 flex flex-col justify-center border-t border-linha bg-fundo-cartao px-5 py-8 md:px-8 md:py-10 lg:col-span-5 lg:border-l lg:border-t-0">
        <p className="rotulo text-texto-secundario">A conta que importa</p>
        <p className="mt-4 text-[1.5rem] font-semibold leading-tight tracking-[-0.025em]">
          <ComMarcas texto={conta} marcas={[`uma venda a mais a cada ${meses} meses`]} />
        </p>
        <p className="mt-5 text-sm leading-relaxed text-texto-secundario">
          A margem é a referência do plano de mídia da Motors Store. Na sua loja, a conta sai no diagnóstico, com o
          seu número.
        </p>
      </div>
    </div>
  );
}
