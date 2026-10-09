import Link from "next/link";
import Simbolo from "@/components/marca/Simbolo";
import { EMPRESA, LINHAS } from "@/conteudo/home";

const EMPRESA_LINKS = [
  { rotulo: "Revendas de veículos", href: "/segmentos/revendas-de-veiculos" },
  { rotulo: "Case Motors Store", href: "/cases/motors-store" },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Privacidade", href: "/privacidade" },
];

export default function Rodape() {
  return (
    <footer className="adiada border-t border-linha">
      <div className="conteiner grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Simbolo className="h-9 w-auto text-papel" />
            <p className="font-bold leading-tight">{EMPRESA.nome}</p>
          </div>
          <p className="mt-4 text-[0.9375rem] text-secundario">
            Catalisador de vendas com <span className="text-ambar">IA</span>
          </p>
          <p className="mt-6 text-sm leading-relaxed text-secundario">
            {EMPRESA.razaoSocial}
            <br />
            CNPJ <span className="tabular-nums">{EMPRESA.cnpj}</span>
            <br />
            {EMPRESA.cidade}, atendimento em todo o Brasil
          </p>
        </div>

        <nav aria-labelledby="rodape-solucoes">
          <h2 id="rodape-solucoes" className="text-sm font-semibold">
            Soluções
          </h2>
          <ul className="mt-4 space-y-1 text-[0.9375rem] text-secundario">
            {LINHAS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-papel">
                  {l.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-empresa">
          <h2 id="rodape-empresa" className="text-sm font-semibold">
            Empresa
          </h2>
          <ul className="mt-4 space-y-1 text-[0.9375rem] text-secundario">
            {EMPRESA_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-papel">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Canais</h2>
          <ul className="mt-4 space-y-1 text-[0.9375rem] text-secundario">
            <li>
              <Link href="/diagnostico" className="inline-flex min-h-9 items-center hover:text-papel">
                Pedir diagnóstico
              </Link>
            </li>
            {/* Número do WhatsApp e e-mail públicos ainda não definidos: não inventar. */}
            <li className="flex min-h-9 items-center gap-2">
              WhatsApp <span className="rotulo text-[0.6875rem] text-secundario">a confirmar</span>
            </li>
            <li className="flex min-h-9 items-center gap-2">
              E-mail <span className="rotulo text-[0.6875rem] text-secundario">a confirmar</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
