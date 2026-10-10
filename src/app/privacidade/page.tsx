import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import ControleDeOrigem from "@/components/privacidade/ControleDeOrigem";
import { EMPRESA, VISAO_360, WHATSAPP } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";

const ROTA = "/privacidade";

export const metadata = metadataDa(ROTA);

/** Data da última revisão do texto. Muda sempre que o conteúdo mudar. */
export const ULTIMA_ATUALIZACAO = "10 de outubro de 2026";

const SECOES = [
  ["controlador", "Quem responde pelos seus dados"],
  ["dados", "Quais dados este site coleta"],
  ["finalidades", "Para que usamos"],
  ["bases-legais", "Bases legais"],
  ["medicao", "Medição, anúncios e a sua oposição"],
  ["compartilhamento", "Com quem compartilhamos"],
  ["retencao", "Por quanto tempo guardamos"],
  ["direitos", "Seus direitos"],
  ["seguranca", "Segurança"],
  ["contato", "Como falar com a V2O5"],
] as const;

function Secao({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`titulo-${id}`} className="scroll-mt-24">
      <h2 id={`titulo-${id}`} className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
        {titulo}
      </h2>
      <div className="mt-4 grid gap-4 text-[1.0625rem] leading-relaxed text-secundario [&_strong]:text-papel">
        {children}
      </div>
    </section>
  );
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="link-sublinhado text-papel">
    {children}
  </a>
);

/**
 * A política de privacidade, no modelo da Motors (plano, seção 7.5): diz o
 * que o site faz hoje, não o que o plano promete. Quem muda o código de
 * coleta (`lib/leads.ts`, `lib/origem.ts`, `/api/leads`, tags) muda este
 * texto na mesma rodada; `tests/privacidade.test.ts` amarra as pontas.
 */
export default function Pagina() {
  const razao = EMPRESA.razaoSocial.replace(/\.$/, "");
  return (
    <>
      <Topo />
      <main id="conteudo" className="conteiner py-16 md:py-24">
        <article className="mx-auto max-w-[44rem]">
          <header className="border-b border-linha pb-8">
            <p className="sobretitulo">Privacidade e LGPD</p>
            <h1 className="titulo-secao mt-5">Política de privacidade</h1>
            <p className="texto-guia mt-6">
              Esta página explica quais dados a {EMPRESA.nome} coleta quando você usa este site, por que coleta,
              com quem compartilha, por quanto tempo guarda e como você pede acesso, correção ou exclusão.
            </p>
            <p className="mt-4 text-sm text-secundario">Última atualização: {ULTIMA_ATUALIZACAO}.</p>
          </header>

          <nav aria-label="Nesta página" className="mt-8">
            <ol className="grid gap-1 text-[0.9375rem]">
              {SECOES.map(([id, rotulo], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex min-h-9 items-center gap-3 text-secundario hover:text-papel">
                    <span className="numero text-xs text-ambar">{String(i + 1).padStart(2, "0")}</span>
                    {rotulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 grid gap-14">
            <Secao id="controlador" titulo="Quem responde pelos seus dados">
              <p>
                A controladora dos dados pessoais tratados neste site é a <strong>{razao}</strong> (nome fantasia{" "}
                {EMPRESA.nome}), CNPJ {EMPRESA.cnpj}, com sede em {EMPRESA.cidade}. &ldquo;Controladora&rdquo; é o termo que a
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018) usa para quem decide como e por que os dados são
                tratados. O encarregado pelo tratamento é {VISAO_360.fundador.nome}, fundador da empresa.
              </p>
            </Secao>

            <Secao id="dados" titulo="Quais dados este site coleta">
              <p>Coletamos dados em três momentos.</p>
              <p>
                <strong>Quando você pede o diagnóstico.</strong> O formulário pede nome, WhatsApp, e-mail, nome da
                empresa, segmento, quantas pessoas trabalham nela e o que você quer resolver primeiro. Se o segmento
                é revenda de veículos, pede também o tamanho do estoque e o sistema de gestão que a loja usa. Há um
                campo livre, opcional. Nada disso é exigido para navegar; só para ser atendido.
              </p>
              <p>
                <strong>Enquanto você navega.</strong> Se você chegou por um anúncio ou por um link de campanha, os
                parâmetros desse link (utm, gclid, gbraid, wbraid, fbclid), o site de onde veio e a primeira página
                aberta ficam guardados no seu navegador, no armazenamento da sessão, até a aba fechar. Eles só saem do
                navegador se você enviar o formulário, junto com ele, para sabermos qual canal trouxe o contato. A
                hospedagem registra, em logs técnicos, o endereço IP e o navegador de cada acesso.
              </p>
              <p>
                <strong>Quando você chama no WhatsApp.</strong> A conversa acontece no WhatsApp, com o número e o nome
                que você usa lá, e fica registrada na ferramenta de atendimento da V2O5.
              </p>
              <p>
                Não coletamos dados sensíveis (origem racial, convicção religiosa, opinião política, saúde,
                biometria) nem dados de crianças e adolescentes de forma intencional.
              </p>
            </Secao>

            <Secao id="finalidades" titulo="Para que usamos">
              <ul className="grid gap-3 pl-5 [&>li]:list-disc">
                <li>
                  <strong>Atender o seu pedido.</strong> Marcar e fazer o diagnóstico, montar o mapa, enviar a proposta
                  e continuar a conversa pelo WhatsApp ou pelo e-mail.
                </li>
                <li>
                  <strong>Saber de onde veio o contato.</strong> Ligar o pedido ao anúncio, à busca ou ao site que o
                  trouxe, para investir onde dá resultado. É o mesmo serviço que oferecemos aos clientes, aplicado a
                  nós.
                </li>
                <li>
                  <strong>Segurança.</strong> Barrar envio automatizado de formulários: um campo escondido que só
                  robô preenche e um limite de envios por endereço IP em dez minutos.
                </li>
                <li>
                  <strong>Melhorar o site.</strong> Entender o que as pessoas procuram, quando as ferramentas de
                  medição entrarem (veja a seção de medição).
                </li>
              </ul>
            </Secao>

            <Secao id="bases-legais" titulo="Bases legais">
              <p>A LGPD exige uma justificativa legal para cada tratamento. As nossas são:</p>
              <ul className="grid gap-3 pl-5 [&>li]:list-disc">
                <li>
                  <strong>Procedimentos preliminares a um contrato</strong> (art. 7º, V): os dados do formulário e
                  da conversa, para o diagnóstico e a proposta.
                </li>
                <li>
                  <strong>Legítimo interesse</strong> (art. 7º, IX): a origem da visita guardada no navegador, a
                  segurança do formulário e, quando entrarem, a medição de uso e de anúncios. Você pode se opor na{" "}
                  <A href="#medicao">seção de medição</A> ou pelos canais da <A href="#contato">seção de contato</A>.
                </li>
                <li>
                  <strong>Obrigação legal</strong> (art. 7º, II): registros que a legislação fiscal e civil exige
                  quando há contrato.
                </li>
              </ul>
            </Secao>

            <Secao id="medicao" titulo="Medição, anúncios e a sua oposição">
              <p>
                <strong>Hoje este site não carrega ferramentas de análise nem de publicidade.</strong> Não há Google
                Analytics, Google Ads nem Meta Pixel ativos, e não há cookie de terceiro. O único dado guardado antes
                do formulário é a origem da visita descrita acima, e só no seu navegador.
              </p>
              <ControleDeOrigem />
              <p>
                Quando as ferramentas de medição entrarem, elas serão carregadas com base no legítimo interesse, para
                medir o resultado dos nossos anúncios e entender como o site é usado, e esta página mudará antes: o
                nome de cada ferramenta, o que ela recebe e um controle para desligar a medição neste navegador
                ficarão nesta seção.
              </p>
            </Secao>

            <Secao id="compartilhamento" titulo="Com quem compartilhamos">
              <p>
                <strong>Não vendemos seus dados.</strong> Compartilhamos só com quem é necessário para o site e o
                atendimento funcionarem:
              </p>
              <ul className="grid gap-3 pl-5 [&>li]:list-disc">
                <li>
                  <strong>Hospedagem do site</strong> (Vercel): serve as páginas e recebe o formulário. Opera
                  servidores fora do Brasil; a transferência segue as garantias da LGPD.
                </li>
                <li>
                  <strong>Automação e atendimento da V2O5</strong> (n8n e Chatwoot, em servidor próprio): recebem o
                  pedido de diagnóstico, avisam a equipe e guardam a conversa.
                </li>
                <li>
                  <strong>WhatsApp</strong> (Meta): quando você conversa por lá, vale a política do WhatsApp.
                </li>
                <li>
                  <strong>Autoridades</strong>: quando houver obrigação legal ou ordem judicial.
                </li>
              </ul>
            </Secao>

            <Secao id="retencao" titulo="Por quanto tempo guardamos">
              <p>
                <strong>Os dados do formulário</strong> ficam conosco enquanto o atendimento e a relação comercial
                durarem, e são apagados quando você pedir, pelos canais da <A href="#contato">seção de contato</A>.
              </p>
              <p>
                <strong>A origem da visita</strong> fica no seu navegador até a aba fechar. <strong>O endereço IP</strong>{" "}
                usado no limite de envios fica na memória do servidor por dez minutos. Os logs da hospedagem seguem o
                prazo da Vercel.
              </p>
            </Secao>

            <Secao id="direitos" titulo="Seus direitos">
              <p>A LGPD (art. 18) garante a você, a qualquer momento e sem custo:</p>
              <ul className="grid gap-2 pl-5 [&>li]:list-disc">
                <li>confirmar se tratamos seus dados e acessá-los;</li>
                <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
                <li>pedir anonimização, bloqueio ou eliminação do que for desnecessário ou excessivo;</li>
                <li>pedir a portabilidade e saber com quem compartilhamos;</li>
                <li>opor-se a um tratamento feito com base no legítimo interesse;</li>
                <li>revogar um consentimento, quando o tratamento depender dele.</li>
              </ul>
              <p>
                Respondemos pelos canais da <A href="#contato">seção de contato</A>. Se achar que o seu pedido não
                foi atendido, você pode recorrer à Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </Secao>

            <Secao id="seguranca" titulo="Segurança">
              <p>
                O site só funciona por conexão criptografada (HTTPS) e aplica uma política de segurança de conteúdo
                que impede scripts de fora. O formulário é validado no servidor, e o envio para a automação da V2O5
                vai assinado com um segredo que só os dois lados conhecem. O acesso aos dados é restrito à equipe
                que atende.
              </p>
            </Secao>

            <Secao id="contato" titulo="Como falar com a V2O5">
              <p>
                Para exercer qualquer direito, tirar dúvidas ou se opor a um tratamento, chame no{" "}
                <a
                  href={linkWhatsApp(WHATSAPP.mensagens.home)}
                  target="_blank"
                  rel="noopener"
                  className="link-sublinhado text-papel"
                >
                  WhatsApp {whatsappParaLer()}
                </a>{" "}
                ou use o <Link href="/diagnostico" className="link-sublinhado text-papel">formulário do site</Link>. O
                pedido é respondido pelo encarregado, {VISAO_360.fundador.nome}.
              </p>
              <p>
                Esta política pode mudar quando o site mudar. A data no topo diz qual versão está valendo, e as
                mudanças que ampliam a coleta entram aqui antes de entrar no código.
              </p>
            </Secao>
          </div>
        </article>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDaInterna(ROTA)} />
    </>
  );
}
