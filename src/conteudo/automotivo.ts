import { listaDeSistemasIntegraveis, SISTEMA_EM_PRODUCAO, SISTEMAS_INTEGRAVEIS } from "@/conteudo/diagnostico";
import { CASE } from "@/conteudo/home";
import {
  AUTOMOTIVO_PRECO,
  BRL,
  DEGRAUS,
  FOTOGRAFIA_PARCEIRA,
  linhaDePreco,
  precoDa,
  REGRAS,
  TETO_DA_MENSALIDADE,
} from "@/conteudo/precos";

/**
 * Hub do segmento automotivo (`/segmentos/revendas-de-veiculos`): o pacote
 * que junta quatro linhas do cardápio, o caminho de um lead na revenda, as
 * linhas avulsas que fazem sentido depois, os números do case e as perguntas
 * de dono de loja. Preço só de `precos.ts`; número só de `CASE` (lido do
 * banco da Motors, com fonte e período). `tests/automotivo.test.ts` confere.
 *
 * Sobre o agente: a memória do case registra n8n, Evolution e Chatwoot na
 * Motors, não um agente de IA. Por isso o texto diz que o agente completa o
 * pacote, sem afirmar que roda na loja (pendência 13).
 */
export const HUB_AUTOMOTIVO = {
  rota: "/segmentos/revendas-de-veiculos",
  sobretitulo: "Revendas de veículos",
  titulo: "O sistema da Motors Store, pronto para a sua revenda.",
  /** Curto de propósito: o LCP da página é o H1 (`tests/automotivo.test.ts`). */
  resumo:
    "Site de estoque ligado ao sistema que a loja já usa, agente de IA no WhatsApp, CRM e rastreamento até a venda, com preço publicado.",
  /** Os sistemas de gestão com que o pacote trabalha: um em produção, os outros por fluxo (Dyones, 13/10). */
  sistemas: {
    rotulo: "Funciona com o sistema da loja",
    emProducao: SISTEMA_EM_PRODUCAO,
    integraveis: SISTEMAS_INTEGRAVEIS,
    outros: "outro sistema, por fluxo",
  },
  fatos: [
    {
      rotulo: "Pacote completo",
      valor: `a partir de ${BRL(AUTOMOTIVO_PRECO.pacote.implantacao)} de implantação e ${BRL(AUTOMOTIVO_PRECO.pacote.mensalidade)} por mês`,
    },
    { rotulo: "Integração em produção", valor: "Revenda Mais: o estoque entra no site e no agente sozinho" },
    { rotulo: "Integráveis por fluxo", valor: listaDeSistemasIntegraveis() },
    { rotulo: "Referência", valor: "Motors Store, revenda de seminovos em Curitiba, com números lidos do banco" },
  ],
  pacote: {
    titulo: "O que vem no pacote.",
    texto:
      "Quatro linhas do cardápio na mesma base: o que entra por uma aparece nas outras. Site, rastreamento, painel e automações rodam na Motors Store; o agente de IA no WhatsApp completa o pacote.",
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
        texto: `Cada lead com o carro de interesse, o anúncio que trouxe a pessoa e o responsável. ${AUTOMOTIVO_PRECO.pacote.usuarios} usuários inclusos.`,
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
    titulo: "Para a revenda, depois do pacote.",
    texto: "Linhas avulsas da tabela que fazem sentido com o pacote rodando. Cada uma com preço publicado.",
    itens: [
      {
        nome: "Google Ads e Meta Ads no pacote",
        preco: `${BRL(AUTOMOTIVO_PRECO.trafegoNoPacote)}/mês + verba`,
        href: "/precos#titulo-trafego",
        texto:
          "As duas plataformas pela mesma equipe: anúncios de veículos no Google, catálogo na Meta e o feed do estoque incluso. Começa com o rastreamento ligado.",
      },
      {
        nome: "Reativação de base",
        preco: precoDa("reativacao"),
        href: "/precos#titulo-reativacao",
        texto:
          "Quem comprou há dois ou três anos recebe a conversa certa: troca, avaliação do usado, oferta do mês. Só base própria, com saída fácil.",
      },
      {
        nome: "Pós-venda e recorrência",
        preco: precoDa("posvenda"),
        href: "/precos",
        texto: "Revisão, seguro e troca na data certa, pelo WhatsApp, ligados ao CRM.",
      },
      {
        nome: "Avaliações no Google",
        preco: precoDa("avaliacoes"),
        href: "/precos",
        texto: "Pedido de avaliação depois da entrega do carro, com o link certo e o acompanhamento no painel.",
      },
      {
        nome: "Painel do dono",
        preco: precoDa("painel"),
        href: "/precos",
        texto: `Leads, custo por lead e vendas por origem, com o estoque na mesma tela. Usuário extra ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
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
      pergunta: "Minha loja usa outro sistema de gestão. O pacote funciona?",
      resposta:
        `Funciona. O pacote lê o estoque do sistema que a loja já usa. Com o Revenda Mais a integração está em produção. ${listaDeSistemasIntegraveis()} entram como fluxo de integração, orçado no diagnóstico depois de ver a API ou a exportação que cada um oferece; o mesmo vale para outro sistema.`,
    },
    {
      pergunta: "Se eu somar o painel do dono ao pacote, a mensalidade sobe?",
      resposta: `Não. O pacote já está no teto da mensalidade, ${BRL(TETO_DA_MENSALIDADE)}. O painel entra com a implantação dele, a partir de ${BRL(linhaDePreco("painel").implantacao ?? 0)}, e a mensalidade do conjunto continua em ${BRL(TETO_DA_MENSALIDADE)}. Só o que cresce com o uso (usuários, dados, conversas) e os repasses ficam fora.`,
    },
    {
      pergunta: "Quantos usuários o pacote inclui?",
      resposta: `${AUTOMOTIVO_PRECO.pacote.usuarios} usuários no CRM, sem licença por pessoa. Cada usuário extra custa ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
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
      resposta: `Pode. O site de estoque avulso custa a partir de ${BRL(AUTOMOTIVO_PRECO.siteDeEstoque.implantacao)} de implantação e ${BRL(AUTOMOTIVO_PRECO.siteDeEstoque.mensalidade)} por mês, e as outras linhas entram depois, na mesma base.`,
    },
    {
      pergunta: "O site e os dados são meus?",
      resposta: `Sim. Sem fidelidade: se sair, você recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
    },
  ],
  chamada: {
    titulo: "Quer ver o pacote rodando na sua revenda?",
    texto:
      "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o sistema da Motors Store, e um mapa do que fazer primeiro, com custo e prazo.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver a tabela de preços",
  },
};
