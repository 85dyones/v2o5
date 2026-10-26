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
  titulo: "Simplificar o que é complexo.",
  /** Curto de propósito: o LCP é o H1 (medido em 13/10: com 131 caracteres o parágrafo roubava o posto). */
  resumo: "Eu gosto de entender como algo complexo funciona e de desenhar o caminho mais simples até o resultado.",
  /**
   * 26/10/2026 (Dyones: "sem falar em terceira pessoa, precisa ser pessoal"): a
   * página inteira passa à primeira pessoa; a V2O5 é a empresa que carrega a
   * visão dele. O propósito vem do roast, na voz dele.
   */
  proposito: {
    titulo: "A tecnologia é o meio. A melhoria é o trabalho. O resultado é a prova.",
    texto:
      "Meu gosto é pegar algo complexo, entender como funciona e desenhar o caminho mais simples entre o problema e o resultado. Esse caminho nem sempre passa por construir alguma coisa.",
    decisao: [
      "Às vezes a melhor solução é desenvolver um sistema.",
      "Às vezes é integrar duas ferramentas que a empresa já tem.",
      "Às vezes é eliminar uma etapa inútil do processo.",
    ],
    fecho:
      "O que eu procuro é descobrir qual delas resolve com menos desperdício. Automatizar com IA um processo que não precisava existir só gasta recurso em velocidade.",
  },
  /**
   * RASCUNHO para o Dyones reescrever com as palavras dele (pendência 32): a
   * visão e o que ele quer construir. Só usa o que ele já disse (o gosto por
   * entender sistemas e achar o desperdício, a visão 360, a tecnologia como
   * meio) e a direção do site; o sonho em si é dele.
   */
  visao: {
    titulo: "O que eu quero construir.",
    texto:
      "A V2O5 é o jeito que encontrei de juntar o que aprendi em marca, marketing, vendas e gestão com o que a tecnologia permite hoje. Eu penso em sistemas: gosto de entender uma operação por inteiro, achar onde o esforço se perde e desenhar um caminho melhor.",
    sonho:
      "Quero que a V2O5 seja lembrada por identificar problemas importantes, resolver alguns muito bem e provar o resultado, e não por prometer resolver tudo. Cada projeto deve deixar algo funcionando, uma evidência do que melhorou e uma decisão clara sobre o próximo passo.",
  },
  /** O método em cinco perguntas, que cada Sprint responde por escrito. */
  metodo: {
    titulo: "O método em cinco perguntas.",
    texto: "Todo projeto meu passa pelas mesmas cinco etapas, e cada uma tem uma pergunta que precisa de resposta antes de seguir.",
    etapas: [
      { etapa: "Diagnóstico", pergunta: "Qual problema estamos tentando resolver?" },
      { etapa: "Linha de base", pergunta: "Como funciona hoje e quanto custa?" },
      { etapa: "Intervenção", pergunta: "O que será alterado e por quê?" },
      { etapa: "Medição", pergunta: "Qual indicador deve mudar?" },
      { etapa: "Revisão", pergunta: "O resultado justificou o investimento?" },
    ],
    saida: {
      titulo: "Todo projeto sai com três coisas.",
      itens: ["Algo funcionando", "Evidência do que melhorou", "Uma decisão sobre o próximo passo"],
    },
  },
  fundador: {
    nome: VISAO_360.fundador.nome,
    papel: VISAO_360.fundador.papel,
    titulo: "Eu conduzo o diagnóstico",
    tituloApagado: "e a implantação.",
    /** O mesmo fato de `VISAO_360.fundador.texto` (que o JSON-LD e a home usam em terceira pessoa), agora em primeira. */
    texto:
      "Sou formado em Administração pela FAE Business School e estou na tecnologia desde 1992, quando ganhei um curso num concurso da escola. Em branding, fiz a mudança da Top Imóveis para Top Soluções Imobiliárias e assinei o blog da Top até agosto de 2024. Na Motors Store, assino os 26 guias do site. Sou eu quem conduz o diagnóstico gratuito.",
    /** Do site antigo (página Jornada), nas palavras dele, resumidas. */
    origem:
      "Até os sete anos o meu mundo era de livros. Em 1992, um concurso da escola me rendeu um curso de informática, e os computadores 386 e os disquetes viraram o começo de tudo.",
    fatos: [
      { rotulo: "Formação", valor: `Administração de Empresas, ${VISAO_360.fundador.escola}` },
      // 19/10 (Dyones): o ano sai do texto corrido para a ficha, com as mesmas palavras.
      { rotulo: "Na tecnologia", valor: "Desde 1992" },
      { rotulo: "Marca", valor: "Rebranding da Top Imóveis para Top Soluções Imobiliárias" },
      {
        rotulo: "Conteúdo",
        valor: "Assino os 26 guias do site da Motors Store; assinei o blog da Top Soluções Imobiliárias até agosto de 2024",
      },
      { rotulo: "Na V2O5", valor: "Conduzo o diagnóstico gratuito e a implantação de cada projeto" },
    ],
  },
  /** 26/10/2026 (Dyones): o texto anterior dava a impressão de mais uma empresa de IA; a IA é ferramenta de apoio. */
  equipe: {
    titulo: "Quem faz o trabalho",
    texto:
      "Eu conduzo o diagnóstico e respondo por cada projeto, do mapeamento da operação à entrega. O que muda no processo e o que medir são decisões minhas; a IA e as automações entram como ferramenta, onde ajudam. Quando o projeto pede, indico parceiros especializados, como fotografia, contratados à parte.",
  },
  nome: {
    titulo: "O nome vem de um catalisador.",
    texto:
      "V2O5 é o pentóxido de vanádio, o catalisador industrial da produção de ácido sulfúrico: acelera a reação e continua lá no fim, sem virar o produto final. Escolhi o nome porque é assim que eu quero trabalhar: ajudar a mudança a acontecer com menos esforço, sem ocupar o centro da operação. Tecnologia, automação e IA entram quando resolvem parte relevante do problema melhor do que uma alternativa mais simples.",
    cores:
      "O vanádio muda de cor conforme o estado de oxidação. As quatro cores do site são as quatro etapas do caminho do cliente: violeta na atração, verde no atendimento, azul na gestão e âmbar na venda.",
    assinatura: ASSINATURA,
  },
  jeito: {
    titulo: "Como eu trabalho.",
    texto: "Cinco regras que valem para todo projeto.",
    regras: [
      {
        titulo: "Começo pelo diagnóstico",
        texto: "45 minutos comigo para identificar e priorizar um gargalo, sem compromisso. O que vem depois só proponho se houver um bom caso.",
      },
      {
        titulo: "Preço fechado em proposta",
        texto: "O Sprint tem preço fechado em proposta, depois que eu delimito o gargalo, o escopo e os entregáveis. Os valores de partida estão na página de preços.",
      },
      {
        titulo: "Só publico número medido",
        texto: "Eu só publico o que foi lido no banco de dados do cliente, com período. Expectativa e promessa de resultado ficam fora.",
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
      "A Motors Store, revenda de seminovos em Curitiba, é cliente da V2O5 e o case principal do site. A relação é de fornecedora: montei e mantenho o sistema da loja, e assino os guias publicados nela. Os números do case são lidos no banco de dados da Motors, com fonte e período, e a loja autorizou a publicação do nome, do logo e dos números.",
    href: CASE_MOTORS.rota,
    botao: "Ler o case da Motors Store",
  },
  /**
   * 26/10/2026 (Dyones: "tem muito mais aqui"): a lista deixa de ser a pilha do
   * case e vira o que a V2O5 usa para construir, por função. Montada do que
   * está em `memory/context/infra.md` e das credenciais do n8n; Gemini, Google
   * Sheets, Redis, Postgres e SMTP vêm só das credenciais e aguardam a
   * confirmação do Dyones (pendência 30). Sem nome de cliente.
   */
  ferramentas: {
    titulo: "Com o que a V2O5 constrói",
    texto:
      "As ferramentas que eu uso, agrupadas pelo que fazem. Cada projeto usa só as que o gargalo pede. Automação, atendimento e WhatsApp rodam no servidor da V2O5.",
    grupos: [
      { titulo: "Sites e dados", itens: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "Supabase", "PostgreSQL", "Redis"] },
      { titulo: "Atendimento e mensagens", itens: ["WhatsApp", "Chatwoot", "Evolution API", "Typebot", "E-mail (SMTP)"] },
      { titulo: "Automação e IA", itens: ["n8n", "OpenAI", "Google Gemini", "Google Sheets"] },
      { titulo: "Medição e busca", itens: ["GA4", "Google Tag Manager", "Meta Pixel e API de Conversões", "Google Search Console"] },
      { titulo: "Sistemas de gestão", itens: ["Revenda Mais"] },
    ],
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
    titulo: "Quer conversar comigo?",
    texto: "O diagnóstico é comigo: 45 minutos sobre presença, atendimento, operação e funil, para priorizar um gargalo.",
    botao: "Pedir diagnóstico gratuito",
  },
};
