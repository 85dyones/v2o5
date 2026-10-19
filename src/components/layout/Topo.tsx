import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
import Icone from "@/components/Icone";
import Simbolo from "@/components/marca/Simbolo";
import MenuCelular from "@/components/layout/MenuCelular";
import { NAVEGACAO } from "@/conteudo/home";

export function Marca() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2" aria-label="V2O5 Vendas e Tecnologia, página inicial">
      <Simbolo tamanho="pequeno" className="h-[1.625rem] w-auto text-texto" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">V2O5</span>
    </Link>
  );
}

/**
 * Topo fixo em células (da ITSUA e da CROX): a marca, os links e o
 * diagnóstico separados por fio, papel liso e fio de 2 px em tinta embaixo
 * (`.topo` no globals.css). Sem vidro fosco.
 */
export default function Topo() {
  return (
    <header className="topo sticky top-0 z-30">
      <div className="conteiner flex h-16 items-stretch md:pl-0">
        <div className="flex items-center pr-5 md:border-r md:border-linha md:pl-8 md:pr-6 xl:pl-10">
          <Marca />
        </div>
        <nav aria-label="Principal" className="hidden md:flex">
          <ul className="flex">
            {NAVEGACAO.map((item) => (
              <li key={item.href} className="flex border-r border-linha">
                <LinkOuAncora
                  href={item.href}
                  className="flex items-center px-4 text-sm font-medium text-texto-secundario transition-colors hover:bg-fundo-cartao hover:text-texto lg:px-5"
                >
                  {item.rotulo}
                </LinkOuAncora>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:border-l md:border-linha md:pl-3">
          <Link href="/diagnostico" className="botao botao-primario botao-compacto hidden sm:inline-flex" data-evento="cta_click" data-local="topo">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-3.5" />
          </Link>
          <MenuCelular itens={NAVEGACAO.map(({ rotulo, href }) => ({ rotulo, href }))} />
        </div>
      </div>
    </header>
  );
}
