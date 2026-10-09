import Link from "next/link";
import Icone from "@/components/Icone";
import Simbolo from "@/components/marca/Simbolo";
import MenuCelular from "@/components/layout/MenuCelular";
import { NAVEGACAO } from "@/conteudo/home";

export function Marca() {
  return (
    <Link
      href="/"
      className="-ml-1 flex min-h-11 items-center gap-2 rounded-md px-1"
      aria-label="V2O5 Vendas e Tecnologia, página inicial"
    >
      <Simbolo tamanho="pequeno" className="h-[1.625rem] w-auto text-papel" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">V2O5</span>
    </Link>
  );
}

/**
 * Topo fixo: transparente sobre o hero e vidro fosco depois de rolar
 * (`.topo` no globals.css, por CSS). A navegação fica no centro de verdade
 * (grade de três colunas), o diagnóstico à direita.
 */
export default function Topo() {
  return (
    <header className="topo sticky top-0 z-30">
      <div className="conteiner flex h-16 items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Marca />
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium text-secundario transition-colors duration-150 hover:bg-vidro hover:text-papel"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:justify-self-end">
          <Link href="/diagnostico" className="botao botao-primario botao-compacto hidden sm:inline-flex">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-3.5" />
          </Link>
          <MenuCelular itens={NAVEGACAO.map(({ rotulo, href }) => ({ rotulo, href }))} />
        </div>
      </div>
    </header>
  );
}
