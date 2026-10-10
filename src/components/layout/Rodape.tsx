import Link from "next/link";
import Icone from "@/components/Icone";
import Simbolo from "@/components/marca/Simbolo";
import { EMPRESA, PILARES } from "@/conteudo/home";

const EMPRESA_LINKS = [
  { rotulo: "Revendas de veículos", href: "/segmentos/revendas-de-veiculos" },
  { rotulo: "Case Motors Store", href: "/cases/motors-store" },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Privacidade", href: "/privacidade" },
];

const LINK = "inline-flex min-h-9 items-center transition-colors duration-150 hover:text-papel";

export default function Rodape() {
  return (
    <footer className="adiada relative overflow-hidden border-t border-linha">
      <div className="conteiner grid gap-12 pb-14 pt-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Simbolo tamanho="pequeno" className="h-8 w-auto text-papel" />
            <p className="font-semibold leading-tight tracking-[-0.02em]">{EMPRESA.nome}</p>
          </div>
          <p className="mt-4 text-[0.9375rem] text-secundario">
            Catalisador de vendas com <span className="text-ambar">IA</span>
          </p>
          <Link href="/diagnostico" className="botao botao-primario botao-compacto mt-7">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-3.5" />
          </Link>
        </div>

        <nav aria-labelledby="rodape-solucoes">
          <h2 id="rodape-solucoes" className="text-sm font-medium text-papel">
            Soluções
          </h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-secundario">
            {PILARES.flatMap((p) => p.servicos).map((s) => (
              <li key={s.titulo}>
                <Link href={s.href} className={LINK}>
                  {s.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-empresa">
          <h2 id="rodape-empresa" className="text-sm font-medium text-papel">
            Empresa
          </h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-secundario">
            {EMPRESA_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={LINK}>
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-papel">Canais</h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-secundario">
            <li>
              <Link href="/diagnostico" className={LINK}>
                Pedir diagnóstico
              </Link>
            </li>
            {/* Número do WhatsApp e e-mail públicos ainda não definidos: não inventar. */}
            <li className="flex min-h-9 items-center gap-2">
              WhatsApp <span className="chip text-secundario">a confirmar</span>
            </li>
            <li className="flex min-h-9 items-center gap-2">
              E-mail <span className="chip text-secundario">a confirmar</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="conteiner">
        <div className="flex flex-col gap-1 border-t border-linha py-6 text-sm text-secundario md:flex-row md:justify-between">
          <p>
            {EMPRESA.razaoSocial} · CNPJ <span className="tabular-nums">{EMPRESA.cnpj}</span>
          </p>
          <p>{EMPRESA.cidade}, atendimento em todo o Brasil</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(7rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-transparent [background-clip:text] [-webkit-background-clip:text] bg-[linear-gradient(180deg,rgb(242_241_236/0.09),rgb(242_241_236/0))]"
      >
        V2O5
      </p>
    </footer>
  );
}
