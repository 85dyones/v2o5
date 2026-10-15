import { listaDeSistemasIntegraveis, SISTEMA_EM_PRODUCAO, SISTEMAS_INTEGRAVEIS } from "@/conteudo/diagnostico";
import { CASE } from "@/conteudo/home";
import {
  BRL,
  dataBR,
  DEGRAUS,
  FOTOGRAFIA_PARCEIRA,
  linhaDePreco,
  OFERTA_DO_COMPLETO,
  plano,
  precoDaLinha,
  REGRAS,
  USUARIOS_NO_CRM,
} from "@/conteudo/precos";

const completo = plano("completo");
const presenca = plano("presenca");

/**
 * Hub do segmento automotivo (`/segmentos/revendas-de-veiculos`): o plano
 * Completo com o site de estoque (o sistema da Motors Store), o caminho de um
 * lead na revenda, os módulos de revenda que entram depois, os números do
 * case e as perguntas de dono de loja. Preço só de `precos.ts`; número só de `CASE` (lido do
 * banco da Motors, com fonte e período). `tests/automotivo.test.ts` confere.
 *
 * Sobre o agente: a memória do case registra n8n, Evolution e Chatwoot na
 * Motors, não um agente de IA. Por isso o texto diz que o agente completa o
 * sistema, sem afirmar que roda na loja (pendência 13).
 */
export const HUB_AUTOMOTIVO = {
  rota: "/segmentos/revendas-de-veiculos",
  sobretitulo: "Revendas de veículos",
  titulo: "O sistema da Motors Store, pronto para a sua revenda.",
  /** Curto de propósito: o LCP da página é o H1 (`tests/automotivo.test.ts`). */
  resumo:
    "Site de estoque ligado ao sistema que a loja já usa, agente de IA no WhatsApp, CRM e rastreamento até a venda, com preço publicado.",
  /** Os sistemas de gestão com que o Completo trabalha: um em produção, os outros por fluxo (Dyones, 13/10). */
  sistemas: {
    rotulo: "Funciona com o sistema da loja",
    emProducao: SISTEMA_EM_PRODUCAO,
    integraveis: SISTEMAS_INTEGRAVEIS,
    outros: "outro sistema, por fluxo",
  },
  fatos: [
    {
      rotulo: "Plano Completo",
      valor: `a partir de ${BRL(completo.implantacao)} de implantação e ${BRL(OFERTA_DO_COMPLETO.mensalidade)} por mês até ${dataBR(OFERTA_DO_COMPLETO.ate)}`,
    },
    { rotulo: "Integração em produção", valor: "Revenda Mais: o estoque entra no site e no agente sozinho" },
    { rotulo: "Integráveis por fluxo", valor: listaDeSistemasIntegraveis() },
    { rotulo: "Referência", valor: "Motors Store, revenda de seminovos em Curitiba, com números lidos do banco" },
  ],
  pacote: {
    titulo: "O que vem no Completo.",
    texto:
      "Quatro peças na mesma base: o que entra por uma aparece nas outras. Site, rastreamento, painel e automações rodam na Motors Store; o agente de IA no WhatsApp completa o sistema.",
    pecas: [
      {
        linha: "Sites e presença",
        titulo: "Site de estoque integrado ao sistema da loja",
        texto:
          `Vitrine, ficha de veículo, páginas por marca e modelo e páginas locais. O carro entra no site quando entra no sistema de gestão e sai quando é vendido. Em produção com o Revenda Mais. ${listaDeSistemasIntegraveis()} entram por fluxo de integração.`,
      },
      {
        linha: "Agente de IA no WhatsApp",
        titulo: "Atende à noite e no fim de semana",
        texto:
          "Responde com o estoque real, qualifica o interesse, agenda a visita e passa ao vendedor a conversa e a origem do contato.",
      },
      {
        linha: "CRM e sistemas sob medida",
        titulo: "Funil com origem e próximo passo",
        texto: `Cada lead com o carro de interesse, o anúncio que trouxe a pessoa e o responsável. ${USUARIOS_NO_CRM} usuários inclusos.`,
      },
      {
        linha: "Rastreamento até a venda",
        titulo: "A venda volta para o Google e a Meta",
        texto:
          "Pixel, API de Conversões e GA4 com um identificador único por lead. A campanha passa a otimizar pelo carro vendido.",
      },
    ],
  },
  caminho: {
    titulo: "O caminho de um lead na revenda.",
    texto: "Do carro que entra no estoque à venda que volta para o anúncio, sem ninguém digitar duas vezes.",
    passos: [
      {
        titulo: "O carro entra no sistema da loja",
        texto: `Revenda Mais, ${listaDeSistemasIntegraveis().replace(" e ", ", ")} ou outro: na sincronização seguinte está no site, na ficha do agente e no feed de anúncios.`,
      },
      {
        titulo: "Alguém busca o modelo",
        texto: "Acha o anúncio de veículo no Google, o catálogo na Meta ou a página do carro na busca.",
      },
      {
        titulo: "Chama no WhatsApp às 21h",
        texto: "O agente responde com a ficha, o preço e os horários de visita, e avisa o vendedor.",
      },
      {
        titulo: "O lead entra no CRM com a origem",
        texto: "O vendedor começa o dia com o nome, o carro e o anúncio que trouxe a pessoa.",
      },
      {
        titulo: "A venda é registrada",
        texto: "O carro sai do site, o cliente recebe o obrigado e Google e Meta recebem a conversão uma vez só.",
      },
    ],
  },
  extras: {
    titulo: "Módulos para a revenda.",
    texto: "Entram em cima do Completo ou do Atendimento, na mesma base. Cada um com preço publicado.",
    itens: [
      {
        nome: linhaDePreco("consulta").nome,
        preco: precoDaLinha(linhaDePreco("consulta")),
        href: "/diagnostico",
        link: "no diagnóstico",
        texto:
          "Antes de comprar: FIPE do mês sem custo, histórico de 24 meses com tendência e faixa de compra, e a placa com dez checagens (leilão, sinistro, gravame, roubo, débitos, recall e outras) e um veredito.",
      },
      {
        nome: linhaDePreco("repasse").nome,
        preco: precoDaLinha(linhaDePreco("repasse")),
        href: "/diagnostico",
        link: "no diagnóstico",
        texto:
          "O carro que não vai para a vitrine sai às claras: laudo, conta aberta contra a FIPE e ficha de defeitos com foto, para lojistas e consumidores inscritos.",
      },
      {
        nome: "Google Ads e Meta Ads no Completo",
        preco: precoDaLinha(linhaDePreco("trafegoNoCompleto")),
        href: "/precos#titulo-trafego",
        texto:
          "As duas plataformas pela mesma equipe: anúncios de veículos no Google, catálogo na Meta e o feed do estoque incluso. Começa com o rastreamento ligado.",
      },
      {
        nome: linhaDePreco("reativacao").nome,
        preco: precoDaLinha(linhaDePreco("reativacao")),
        href: "/precos#titulo-modulos",
        texto:
          "Quem comprou há dois ou três anos recebe a mensagem certa: troca, avaliação do usado, oferta do mês. SMS com link rastreado e campanha de WhatsApp, só com base própria.",
      },
      {
        nome: linhaDePreco("painel").nome,
        preco: precoDaLinha(linhaDePreco("painel")),
        href: "/precos#titulo-modulos",
        texto: `Leads, custo por lead e vendas por origem, com o estoque na mesma tela. No Completo, a implantação é bônus de fechamento. Usuário extra ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
      },
    ],
  },
  case: {
    titulo: "Medido na Motors Store.",
    texto: "Os números do sistema rodando, lidos no banco de dados da loja. O case completo tem o que foi construído, peça por peça.",
    fonte: CASE.fonte,
    numeros: CASE.numeros,
    href: "/cases/motors-store",
    botao: "Ler o case completo",
  },
  perguntas: [
    {
      pergunta: "Minha loja usa outro sistema de gestão. O Completo funciona?",
      resposta:
        `Funciona. O Completo lê o estoque do sistema que a loja já usa. Com o Revenda Mais a integração está em produção. ${listaDeSistemasIntegraveis()} entram como fluxo de integração, orçado no diagnóstico depois de ver a API ou a exportação que cada um oferece; o mesmo vale para outro sistema.`,
    },
    {
      pergunta: "O painel do dono vem no Completo?",
      resposta: `A implantação do painel, a partir de ${BRL(linhaDePreco("painel").implantacao ?? 0)}, vem de bônus para quem fecha o Completo. A mensalidade dele, a partir de ${BRL(linhaDePreco("painel").mensalidade ?? 0)}, entra na mesma fatura do plano. O que cresce com o uso (usuários, dados, conversas) e os repasses ficam fora.`,
    },
    {
      pergunta: "Quantos usuários o Completo inclui?",
      resposta: `${USUARIOS_NO_CRM} usuários no CRM, sem licença por pessoa. Cada usuário extra custa ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
    },
    {
      pergunta: "O agente responde com o estoque de verdade?",
      resposta:
        "Sim. Ele consulta o mesmo estoque do site, sincronizado com o sistema da loja, e só fala do que a ficha confirma. Quando a conversa pede uma pessoa, chama o vendedor.",
    },
    {
      pergunta: "Preciso de fotógrafo?",
      resposta: `Se a loja já tem equipe ou fotógrafo, o site, o feed de anúncios e o agente usam as fotos que estão no sistema. Se não tem, a V2O5 indica parceiros de fotografia, com pacote mensal a partir de ${BRL(FOTOGRAFIA_PARCEIRA.aPartirDe)}.`,
    },
    {
      pergunta: "Posso começar só pelo site de estoque?",
      resposta: `Pode. O site de estoque vem no plano Presença, a partir de ${BRL(presenca.implantacao)} de implantação e ${BRL(presenca.mensalidade)} por mês, com o Google e o rastreamento até a venda. O Atendimento entra depois, na mesma base.`,
    },
    {
      pergunta: "Quanto custa a consulta por placa?",
      resposta: `${BRL(linhaDePreco("consulta").porUso!.valor)} por placa, na fatura do mês, além do módulo (${BRL(linhaDePreco("consulta").implantacao!)} de implantação e ${BRL(linhaDePreco("consulta").mensalidade!)} por mês). A FIPE do mês sai sem custo, e uma placa já consultada abre do histórico sem cobrar de novo.`,
    },
    {
      pergunta: "O site e os dados são meus?",
      resposta: `Sim. Sem fidelidade: se sair, você recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
    },
  ],
  chamada: {
    titulo: "Quer ver o Completo rodando na sua revenda?",
    texto:
      "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o sistema da Motors Store, e um mapa do que fazer primeiro, com custo e prazo.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver a tabela de preços",
  },
};
