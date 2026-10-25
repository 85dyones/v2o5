import { CASE_MOTORS } from "@/conteudo/case";
import { ASSINATURA } from "@/conteudo/home";
import { EMPRESA, VISAO_360 } from "@/conteudo/home";

/**
 * A página Sobre (plano, seção 6.3: fundador com nome e trajetória,
 * declarando a relação com a Motors; `/jornada/` do site antigo redireciona
 * para cá). Só fato registrado: o que o Dyones contou (FAE, Top, diagnóstico),
 * o que publicou no site antigo (livros até os 7 anos, o concurso de 1992)
 * e o que a memória do case confirma (os 26 guias). Respostas do Dyones em
 * 13/10: a relação com a Motors é de fornecedora; a empresa foi fundada em
 * dezembro de 2019. Em 25/10/2026 a narrativa passou ao posicionamento do
 * Sprint de Eficiência: a IA é um meio, não o centro, e não há mais "equipe
 * completa de IA" nem preço publicado de plano. Sem
 * foto até ela chegar (pendência 1) e sem citação inventada.
 * `tests/sobre.test.ts` confere.
 */
export const SOBRE = {
  rota: "/sobre",
  sobretitulo: "Sobre a V2O5",
  titulo: "Quem faz a V2O5, de onde vem o nome e como ela trabalha.",
  /** Curto de propósito: o LCP é o H1 (medido em 13/10: com 131 caracteres o parágrafo roubava o posto). */
  resumo: "Um método para achar o gargalo, simplificar o processo e medir o que mudou.",
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
      { rotulo: "Na tecnologia", valor: "Desde 1992" },
      { rotulo: "Marca", valor: "Rebranding da Top Imóveis para Top Soluções Imobiliárias" },
      {
        rotulo: "Conteúdo",
        valor: "Assina os 26 guias do site da Motors Store; assinou o blog da Top Soluções Imobiliárias até agosto de 2024",
      },
      { rotulo: "Na V2O5", valor: "Conduz o diagnóstico gratuito e a implantação de cada projeto" },
    ],
  },
  equipe: {
    titulo: "A equipe",
    texto:
      "O fundador conduz o diagnóstico e responde por cada projeto. Na execução, usa agentes de IA para pesquisar, escrever, programar, testar e medir, sob a direção dele: o mesmo tipo de apoio que a V2O5 aplica nos projetos, usado primeiro na própria empresa.",
  },
  nome: {
    titulo: "O nome vem de um catalisador.",
    texto:
      "V2O5 é o pentóxido de vanádio, o catalisador industrial da produção de ácido sulfúrico: acelera a reação e continua lá no fim. A V2O5 trabalha como catalisador: ajuda a mudança a acontecer com menos esforço, sem ocupar o centro da operação. Tecnologia, automação e IA entram quando resolvem parte relevante do problema melhor do que uma alternativa mais simples.",
    cores:
      "O vanádio muda de cor conforme o estado de oxidação. As quatro cores do site são as quatro etapas do caminho do cliente: violeta na atração, verde no atendimento, azul na gestão e âmbar na venda.",
    assinatura: ASSINATURA,
  },
  jeito: {
    titulo: "Como a V2O5 trabalha.",
    texto: "Cinco regras que valem para todo projeto.",
    regras: [
      {
        titulo: "Começa pelo diagnóstico",
        texto: "45 minutos com o fundador para identificar e priorizar um gargalo, sem compromisso. O que vem depois só é proposto se houver um bom caso.",
      },
      {
        titulo: "Preço fechado em proposta",
        texto: "O Sprint tem preço fechado em proposta, depois de delimitar o gargalo, o escopo e os entregáveis. As faixas de referência estão na página de preços.",
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
        titulo: "Escopo e aceite por escrito",
        texto: "Toda proposta define problema, entregáveis, exclusões, prazo, responsabilidades do cliente e critérios de aceite. Mudança de escopo exige nova estimativa e aprovação.",
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
    fundacao: EMPRESA.fundacaoPorExtenso,
    atendimento: "Atendimento remoto para empresas de todo o Brasil.",
    antes: "Antes do site novo, a V2O5 se apresentava como V2O5 ConsultorIA.",
  },
  chamada: {
    titulo: "Quer conversar com quem vai fazer?",
    texto: "O diagnóstico é com o fundador: 45 minutos sobre presença, atendimento, operação e funil, para priorizar um gargalo.",
    botao: "Pedir diagnóstico gratuito",
  },
};
