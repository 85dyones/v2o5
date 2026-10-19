import { CASE_MOTORS } from "@/conteudo/case";
import { EMPRESA, VISAO_360 } from "@/conteudo/home";
import { REGRAS } from "@/conteudo/precos";

/**
 * A página Sobre (plano, seção 6.3: fundador com nome e trajetória,
 * declarando a relação com a Motors; `/jornada/` do site antigo redireciona
 * para cá). Só fato registrado: o que o Dyones contou (FAE, Top, diagnóstico),
 * o que publicou no site antigo (livros até os 7 anos, o concurso de 1992)
 * e o que a memória do case confirma (os 26 guias). Respostas do Dyones em
 * 13/10: a relação com a Motors é de fornecedora; a equipe é o fundador com
 * uma equipe completa de IA; a empresa foi fundada em dezembro de 2019. Sem
 * foto até ela chegar (pendência 1) e sem citação inventada.
 * `tests/sobre.test.ts` confere.
 */
export const SOBRE = {
  rota: "/sobre",
  sobretitulo: "Sobre a V2O5",
  titulo: "Quem faz a V2O5, de onde vem o nome e como ela trabalha.",
  /** Curto de propósito: o LCP é o H1 (medido em 13/10: com 131 caracteres o parágrafo roubava o posto). */
  resumo: "Uma equipe só, do site ao CRM, com preço publicado e número medido. De Almirante Tamandaré, na região de Curitiba.",
  fundador: {
    nome: VISAO_360.fundador.nome,
    papel: VISAO_360.fundador.papel,
    texto: VISAO_360.fundador.texto,
    /** Do site antigo (página Jornada), nas palavras dele, resumidas. */
    origem:
      "Até os sete anos o mundo dele era de livros. Em 1992, um concurso da escola rendeu um curso de informática, e os computadores 386 e os disquetes viraram o começo de tudo.",
    fatos: [
      { rotulo: "Formação", valor: `Administração de Empresas, ${VISAO_360.fundador.escola}` },
      // 19/10 (Dyones): o ano sai do texto corrido para a ficha, com as mesmas palavras.
      { rotulo: "Na informática", valor: "Desde 1992" },
      { rotulo: "Marca", valor: "Rebranding da Top Imóveis para Top Soluções Imobiliárias" },
      { rotulo: "Conteúdo", valor: "Assina os 26 guias do site da Motors Store" },
      { rotulo: "Na V2O5", valor: "Conduz o diagnóstico gratuito e a implantação de cada projeto" },
    ],
  },
  equipe: {
    titulo: "A equipe",
    texto:
      "A V2O5 é o fundador com uma equipe completa de IA: agentes que pesquisam, escrevem, programam, testam e medem, sob a direção dele. É o mesmo tipo de sistema que a V2O5 implanta nos clientes, usado primeiro na própria empresa.",
  },
  nome: {
    titulo: "O nome vem de um catalisador.",
    texto:
      "V2O5 é o pentóxido de vanádio, o catalisador industrial da produção de ácido sulfúrico: acelera a reação e continua lá no fim. A V2O5 acelera o negócio, e o catalisador dela é a inteligência artificial. O sistema fica com o cliente.",
    cores:
      "O vanádio muda de cor conforme o estado de oxidação. As quatro cores do site são as quatro etapas do caminho do cliente: violeta na atração, verde no atendimento, azul na gestão e âmbar na venda.",
    assinatura: "Catalisador de vendas com IA",
  },
  jeito: {
    titulo: "Como a V2O5 trabalha.",
    texto: "Cinco regras que valem para todo projeto e estão escritas na página de preços.",
    regras: [
      {
        titulo: "Começa pelo diagnóstico",
        texto: "45 minutos com o fundador e, em até 24 horas, um mapa do que fazer primeiro, com custo e prazo, para usar com ou sem a V2O5.",
      },
      {
        titulo: "Preço publicado",
        texto: "Toda linha tem preço a partir de na tabela, e o que cresce com o cliente tem preço antes de crescer. O final sai do diagnóstico, com o escopo fechado.",
      },
      {
        titulo: "Só número medido",
        texto: "O site publica o que foi lido no banco de dados do cliente, com período. Expectativa e promessa de resultado ficam fora.",
      },
      {
        titulo: "Integração só quando roda",
        texto: "Uma integração entra na lista quando está em produção num cliente. Hoje: o estoque do Revenda Mais.",
      },
      {
        titulo: "O sistema é seu",
        texto: `Sem fidelidade. Se sair, recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
      },
    ],
  },
  motors: {
    titulo: "A relação com a Motors Store.",
    texto:
      "A Motors Store, revenda de seminovos em Curitiba, é cliente da V2O5 e o case principal do site. A relação é de fornecedora: a V2O5 montou e mantém o sistema da loja, e o fundador assina os guias publicados nela. Os números do case são lidos no banco de dados da Motors, com fonte e período, e a publicação do nome, do logo e dos números foi autorizada pela loja.",
    href: CASE_MOTORS.rota,
    botao: "Ler o case da Motors Store",
  },
  ferramentas: {
    titulo: "Com o que a V2O5 constrói",
    texto: "A mesma base em todo projeto: o que entra por uma linha aparece nas outras. Automação, atendimento e WhatsApp rodam no servidor da V2O5.",
    itens: CASE_MOTORS.stack.itens,
  },
  empresa: {
    titulo: "A empresa",
    nome: EMPRESA.nome,
    razaoSocial: EMPRESA.razaoSocial,
    cnpj: EMPRESA.cnpj,
    cidade: EMPRESA.cidade,
    fundacao: EMPRESA.fundacaoPorExtenso,
    atendimento: "Atendimento remoto para empresas de todo o Brasil; reunião presencial na região de Curitiba quando o projeto pede.",
    antes: "Antes do site novo, a V2O5 se apresentava como V2O5 ConsultorIA.",
  },
  chamada: {
    titulo: "Quer conversar com quem vai fazer?",
    texto: "O diagnóstico é com o fundador. 45 minutos sobre presença, atendimento, operação e funil, e um mapa em até 24 horas.",
    botao: "Pedir diagnóstico gratuito",
  },
};
