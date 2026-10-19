import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import ControleDeMedicao from "@/components/privacidade/ControleDeMedicao";
import { EMAIL, EMPRESA, VISAO_360, WHATSAPP } from "@/conteudo/home";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";
import { linkWhatsApp, whatsappParaLer } from "@/lib/whatsapp";
import { linkEmail } from "@/lib/email";

const ROTA = "/privacidade";

export const metadata = metadataDa(ROTA);

/** Data da última revisão do texto. Muda sempre que o conteúdo mudar. */
export const ULTIMA_ATUALIZACAO = "13 de outubro de 2026";

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
    <section id={id} aria-labelledby={`titulo-${id}`}>
      <h2 id={`titulo-${id}`} className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
        {titulo}
      </h2>
      <div className="mt-4 grid gap-4 text-[1.0625rem] leading-relaxed text-texto-secundario [&_strong]:text-texto">
        {children}
      </div>
    </section>
  );
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="link-sublinhado text-texto">
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
            <p className="mt-4 text-sm text-texto-secundario">Última atualização: {ULTIMA_ATUALIZACAO}.</p>
          </header>

          <nav aria-label="Nesta página" className="mt-8">
            <ol className="grid gap-1 text-[0.9375rem]">
              {SECOES.map(([id, rotulo], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex min-h-9 items-center gap-3 text-texto-secundario hover:text-texto">
                    <span className="numero text-xs text-acao-texto">{String(i + 1).padStart(2, "0")}</span>
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
                {EMPRESA.nome}), CNPJ {EMPRESA.cnpj}. &ldquo;Controladora&rdquo; é o termo que a
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018) usa para quem decide como e por que os dados são
                tratados. O encarregado pelo tratamento é {VISAO_360.fundador.nome}, fundador da empresa, no endereço{" "}
                <a href={linkEmail(EMAIL.assuntos.privacidade, EMPRESA.emailPrivacidade)} className="link-sublinhado text-texto">
                  {EMPRESA.emailPrivacidade}
                </a>
                .
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
                navegador se você enviar o formulário, junto com ele, para sabermos qual canal trouxe o contato. As
                ferramentas de medição da <A href="#medicao">seção de medição</A> recebem as páginas abertas e os
                cliques nos botões de contato, e gravam cookies próprios. A hospedagem registra, em logs técnicos, o
                endereço IP e o navegador de cada acesso.
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
                  <strong>Melhorar o site e os anúncios.</strong> Entender o que as pessoas procuram e quais
                  anúncios trazem contatos, com as ferramentas da <A href="#medicao">seção de medição</A>.
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
                  segurança do formulário e a medição de uso e de anúncios. Você pode se opor na{" "}
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
                <strong>Este site mede visitas e o resultado dos anúncios com duas ferramentas</strong>, carregadas
                depois do conteúdo da página e com base no legítimo interesse: o Google Analytics 4 e, só quando há
                campanha ativa na Meta, o Pixel da Meta. O controle abaixo diz quais estão ligadas nesta versão do
                site e deixa você desligar a medição neste navegador.
              </p>
              <ControleDeMedicao />
              <p>
                <strong>Google Analytics 4</strong> (Google LLC) recebe as páginas abertas, o tipo de cada página, os
                cliques nos botões de contato e o envio do formulário, com dados técnicos do navegador e do aparelho e
                uma localização aproximada pelo endereço IP, que o Google não armazena, segundo a documentação do
                Google Analytics. Grava os cookies <code>_ga</code> e <code>_ga_…</code>, que distinguem o seu
                navegador por um identificador aleatório e duram até dois anos, segundo a mesma documentação. Os dados
                vão para googletagmanager.com, google-analytics.com, analytics.google.com e google.com. Não enviamos
                nome, e-mail nem telefone ao Google.
              </p>
              <p>
                <strong>Pixel da Meta</strong> (Meta Platforms) entra só quando a V2O5 anuncia na Meta, para medir o
                resultado desses anúncios. Recebe as páginas abertas, o clique no WhatsApp e o envio do formulário,
                sem a coleta automática de cliques e formulários que o Pixel oferece. Grava os cookies{" "}
                <code>_fbp</code> e <code>_fbc</code>, que duram até 90 dias, segundo a documentação da Meta. Os
                dados vão para connect.facebook.net e facebook.com.
              </p>
              <p>
                <strong>Pelo servidor, à Meta.</strong> Com o Pixel ligado, ao enviar o formulário o nosso servidor
                manda à Meta o mesmo evento, com um identificador comum para a conversão contar uma vez só. Vão
                e-mail, telefone e nome em hash (uma transformação que não se desfaz), o endereço IP, o navegador e
                os identificadores <code>_fbp</code> e <code>_fbc</code>, que também seguem com o pedido para a
                automação da V2O5. Com a medição desligada neste navegador, nada disso é enviado.
              </p>
              <p>
                <strong>Como se opor.</strong> Use o controle acima: ele grava a escolha neste navegador, apaga os
                cookies das ferramentas e a origem da visita, e vale até você religar. A escolha fica no
                armazenamento do navegador; limpar os dados do site a apaga. Você também pode pedir pelos canais da{" "}
                <A href="#contato">seção de contato</A>.
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
                  <strong>Google</strong> (Google Analytics 4): recebe os dados de uso descritos na{" "}
                  <A href="#medicao">seção de medição</A>, em servidores fora do Brasil.
                </li>
                <li>
                  <strong>Meta</strong> (Pixel e API de Conversões): recebe os dados da{" "}
                  <A href="#medicao">seção de medição</A>, só quando o Pixel está ligado.
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
              <p>
                <strong>Os cookies de medição</strong> duram o prazo dito na <A href="#medicao">seção de medição</A>{" "}
                ou até você desligar a medição. O Google Analytics guarda os dados de eventos pelo prazo de retenção
                configurado na propriedade da V2O5; a Meta, pelas regras da política dela.
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
                que só permite scripts dos domínios nomeados nesta política (Google e Meta). O formulário é validado
                no servidor, e o envio para a automação da V2O5
                vai assinado com um segredo que só os dois lados conhecem. O acesso aos dados é restrito à equipe
                que atende.
              </p>
            </Secao>

            <Secao id="contato" titulo="Como falar com a V2O5">
              <p>
                Para exercer qualquer direito, tirar dúvidas ou se opor a um tratamento, escreva para{" "}
                <a href={linkEmail(EMAIL.assuntos.privacidade, EMPRESA.emailPrivacidade)} className="link-sublinhado text-texto">
                  {EMPRESA.emailPrivacidade}
                </a>
                , chame no{" "}
                <a
                  href={linkWhatsApp(WHATSAPP.mensagens.home)}
                  target="_blank"
                  rel="noopener"
                  className="link-sublinhado text-texto"
                  data-evento="click_whatsapp"
                  data-local="privacidade"
                >
                  WhatsApp {whatsappParaLer()}
                </a>{" "}
                ou use o <Link href="/diagnostico" className="link-sublinhado text-texto" data-evento="cta_click" data-local="privacidade">formulário do site</Link>. O
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
