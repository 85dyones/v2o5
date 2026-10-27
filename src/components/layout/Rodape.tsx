import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
import Icone from "@/components/Icone";
import Construcao from "@/components/marca/Construcao";
import Simbolo from "@/components/marca/Simbolo";
import { ASSINATURA, EMAIL, EMPRESA, WHATSAPP } from "@/conteudo/home";
import { OFERTAS } from "@/conteudo/ofertas";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";
import { linkEmail } from "@/lib/email";

const EMPRESA_LINKS = [
  { rotulo: "Revendas de veículos", href: "/segmentos/revendas-de-veiculos" },
  { rotulo: "Case Motors Store", href: "/cases/motors-store" },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Privacidade", href: "/privacidade" },
];

/** As páginas de recurso do Sprint: sem preço, fora do menu, ligadas daqui (27/10/2026). */
const RECURSOS = [
  { rotulo: "Agente de IA no WhatsApp", href: "/agente-de-ia-para-whatsapp" },
  { rotulo: "CRM com WhatsApp", href: "/crm-com-whatsapp" },
  { rotulo: "Automação com IA", href: "/automacao-com-ia" },
  { rotulo: "Rastreamento até a venda", href: "/rastreamento-de-conversoes" },
];

const LINK = "inline-flex min-h-9 items-center transition-colors hover:text-texto";

export default function Rodape() {
  return (
    <footer className="adiada relative overflow-hidden border-t-2 border-texto">
      <div className="conteiner grid md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="border-b border-linha py-12 md:border-b-0 md:border-r md:py-14 md:pr-8">
          <div className="flex items-center gap-3">
            <Simbolo tamanho="pequeno" className="h-8 w-auto text-texto" />
            <p className="font-semibold leading-tight tracking-[-0.02em]">{EMPRESA.nome}</p>
          </div>
          <p className="mt-4 text-[0.9375rem] text-texto-secundario">
            {ASSINATURA}
          </p>
          <Link href="/diagnostico" className="botao botao-primario botao-compacto mt-7" data-evento="cta_click" data-local="rodape">
            Pedir diagnóstico
            <Icone nome="seta" className="seta size-3.5" />
          </Link>
        </div>

        <nav aria-labelledby="rodape-solucoes" className="border-b border-linha py-10 md:border-b-0 md:border-r md:px-8 md:py-14">
          <h2 id="rodape-solucoes" className="rotulo text-texto">
            Soluções
          </h2>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-texto-secundario">
            {[...OFERTAS.map((o) => ({ rotulo: o.nome, href: o.rota })), { rotulo: "Continuidade", href: "/continuidade" }].map((s) => (
              <li key={s.href}>
                <LinkOuAncora href={s.href} className={LINK}>
                  {s.rotulo}
                </LinkOuAncora>
              </li>
            ))}
          </ul>
          <h3 className="rotulo mt-8 text-texto">Recursos</h3>
          <ul className="mt-4 space-y-0.5 text-[0.9375rem] text-texto-secundario">
            {RECURSOS.map((s) => (
              <li key={s.href}>
                <LinkOuAncora href={s.href} className={LINK}>
                  {s.rotulo}
                </LinkOuAncora>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-empresa" className="border-b border-linha py-10 md:border-b-0 md:border-r md:px-8 md:py-14">
          <h2 id="rodape-empresa" className="rotulo text-texto">
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

        <div className="py-10 md:px-8 md:py-14">
          <h2 className="rotulo text-texto">Canais</h2>
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
        <div className="flex flex-col gap-1 border-t border-linha py-5 text-sm text-texto-secundario md:flex-row md:justify-between">
          <p>
            {EMPRESA.razaoSocial} · CNPJ <span className="tabular-nums">{EMPRESA.cnpj}</span>
          </p>
          <p>Atendimento em todo o Brasil</p>
        </div>
      </div>

      {/* A planta do símbolo, cortada pela base (19/10): no lugar da marca grande e apagada. */}
      <div className="border-t border-linha">
        <Construcao
          tom="planta"
          viewBox="0 20 128 52"
          preserveAspectRatio="xMidYMin slice"
          className="pointer-events-none mx-auto block aspect-[128/40] w-full max-w-[44rem]"
        />
      </div>
    </footer>
  );
}
