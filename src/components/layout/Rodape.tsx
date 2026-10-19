import Link from "next/link";
import Icone from "@/components/Icone";
import Simbolo from "@/components/marca/Simbolo";
import { EMAIL, EMPRESA, PILARES, WHATSAPP } from "@/conteudo/home";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";
import { linkEmail } from "@/lib/email";

const EMPRESA_LINKS = [
  { rotulo: "Revendas de veículos", href: "/segmentos/revendas-de-veiculos" },
  { rotulo: "Case Motors Store", href: "/cases/motors-store" },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Privacidade", href: "/privacidade" },
];

const LINK = "inline-flex min-h-9 items-center transition-colors hover:text-texto";

export default function Rodape() {
  return (
    <footer className="adiada relative overflow-hidden border-t border-linha">
      <div className="conteiner grid gap-12 pb-14 pt-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Simbolo tamanho="pequeno" className="h-8 w-auto text-texto" />
            <p className="font-semibold leading-tight tracking-[-0.02em]">{EMPRESA.nome}</p>
          </div>
          <p className="mt-4 text-[0.9375rem] text-texto-secundario">
            Catalisador de vendas com <span className="text-acao-texto">IA</span>
          </p>
          <Link href="/diagnostico" className="botao botao-primario botao-compacto mt-7" data-evento="cta_click" data-local="rodape">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-3.5" />
          </Link>
        </div>

        <nav aria-labelledby="rodape-solucoes">
          <h2 id="rodape-solucoes" className="text-sm font-medium text-texto">
            Soluções
          </h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-texto-secundario">
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
          <h2 id="rodape-empresa" className="text-sm font-medium text-texto">
            Empresa
          </h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-texto-secundario">
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
          <h2 className="text-sm font-medium text-texto">Canais</h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-texto-secundario">
            <li>
              <Link href="/diagnostico" className={LINK} data-evento="cta_click" data-local="rodape">
                Pedir diagnóstico
              </Link>
            </li>
            <li>
              <a href={linkWhatsApp(WHATSAPP.mensagens.home)} target="_blank" rel="noopener" className={LINK} data-evento="click_whatsapp" data-local="rodape">
                WhatsApp {whatsappParaLer()}
              </a>
            </li>
            <li>
              <a href={linkEmail(EMAIL.assuntos.diagnostico)} className={LINK} data-evento="click_email" data-local="rodape">
                {EMPRESA.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="conteiner">
        <div className="flex flex-col gap-1 border-t border-linha py-6 text-sm text-texto-secundario md:flex-row md:justify-between">
          <p>
            {EMPRESA.razaoSocial} · CNPJ <span className="tabular-nums">{EMPRESA.cnpj}</span>
          </p>
          <p>{EMPRESA.cidade}, atendimento em todo o Brasil</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(7rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-fundo-alternado"
      >
        V2O5
      </p>
    </footer>
  );
}
