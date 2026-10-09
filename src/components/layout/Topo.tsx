import Link from "next/link";
import Simbolo from "@/components/marca/Simbolo";
import MenuCelular from "@/components/layout/MenuCelular";
import { NAVEGACAO } from "@/conteudo/home";

export function Marca() {
  return (
    <Link
      href="/"
      className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-md px-1"
      aria-label="V2O5 Vendas e Tecnologia, página inicial"
    >
      <Simbolo reduzido className="h-7 w-auto text-papel" />
      <span className="text-[1.0625rem] font-bold tracking-[-0.02em]">V2O5</span>
    </Link>
  );
}

export default function Topo() {
  return (
    <header className="sticky top-0 z-30 border-b border-linha bg-tinta/85 backdrop-blur-md">
      <div className="conteiner flex h-16 items-center gap-4">
        <Marca />
        <nav aria-label="Principal" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] text-secundario transition-colors duration-150 hover:text-papel"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/diagnostico" className="botao botao-primario ml-auto hidden min-h-10 sm:inline-flex md:ml-2">
          Pedir diagnóstico
        </Link>
        <MenuCelular itens={NAVEGACAO.map(({ rotulo, href }) => ({ rotulo, href }))} />
      </div>
    </header>
  );
}
