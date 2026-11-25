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
 * dezembro de 2019. Em 25/10/2026 a narrativa passou a tratar a IA como um
 * meio, não o centro, e não há mais "equipe completa de IA"; em 25/11/2026 o
 * foco passou ao pequeno negócio e o Sprint saiu. Os preços moram nas
 * páginas das soluções (27/10). Sem
 * foto até ela chegar (pendência 1) e sem citação inventada.
 * `tests/sobre.test.ts` confere.
 */
export const SOBRE = {
  rota: "/sobre",
  sobretitulo: "Sobre a V2O5",
  /** 25/11/2026 (foco em pequenos negócios, aprovado pelo Dyones); antes, "Simplificar o que é complexo." (26/10). */
  titulo: "Tecnologia que o pequeno negócio consegue usar.",
  /** Curto de propósito: o LCP é o H1 (medido em 13/10: com 131 caracteres o parágrafo roubava o posto). */
  resumo: "Ajudo pequenos negócios a serem achados no Google e a atenderem bem quem chega, com o que dá para manter no dia a dia.",
  /**
   * 26/10/2026 (Dyones: "sem falar em terceira pessoa, precisa ser pessoal"): a
   * página inteira passa à primeira pessoa; a V2O5 é a empresa que carrega a
   * visão dele. O propósito vem do roast, na voz dele; desde 25/11/2026,
   * voltado ao pequeno negócio (o título de três frases de efeito saiu).
   */
  proposito: {
    titulo: "O cliente bem atendido é o resultado.",
    texto:
      "Pequeno negócio não precisa de sistema grande. Precisa ser achado por quem procura perto, responder rápido e lembrar de quem já comprou. Eu escolho o caminho mais simples para cada uma dessas coisas.",
    decisao: [
      "Às vezes basta arrumar o perfil no Google.",
      "Às vezes é organizar o WhatsApp com um agente que responde na hora.",
      "Às vezes é ligar o site ao sistema que a empresa já usa.",
    ],
    fecho:
      "O que eu procuro é o que resolve com menos custo e menos esforço para quem vai usar todo dia. Pôr IA onde um perfil arrumado bastaria só gasta dinheiro.",
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
      "Quero que o dono de um negócio de bairro tenha o atendimento que as grandes redes têm, num tamanho que ele consegue pagar e manter.",
    sonho:
      "A V2O5 é o jeito que encontrei de juntar o que aprendi em marca, marketing, vendas e gestão com o que a tecnologia permite hoje, para que cada projeto deixe algo funcionando no dia a dia e um cliente mais bem atendido.",
  },
  /** Como um projeto anda, em quatro passos (25/11/2026; antes, o método em cinco perguntas do Sprint). */
  metodo: {
    titulo: "Como um projeto anda, em quatro passos.",
    texto: "Cada passo tem uma pergunta que precisa de resposta antes do seguinte.",
    etapas: [
      { etapa: "Diagnóstico", pergunta: "O que pesa mais hoje: ser achado, responder ou fazer o cliente voltar?" },
      { etapa: "Proposta", pergunta: "O que muda, quanto custa e em quanto tempo?" },
      { etapa: "Implantação", pergunta: "O que fica pronto e quem da equipe usa?" },
      { etapa: "Acompanhamento", pergunta: "O cliente está sendo mais bem atendido?" },
    ],
    saida: {
      titulo: "Todo projeto sai com três coisas.",
      itens: ["Algo funcionando no dia a dia", "A equipe sabendo usar", "O que medir daqui para a frente"],
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
      "Eu conduzo o diagnóstico e respondo por cada projeto, do diagnóstico à entrega. O que muda e o que medir são decisões minhas; a IA e as automações entram como ferramenta, onde ajudam. Quando o projeto pede, indico parceiros especializados, como fotografia, contratados à parte.",
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
        texto: "45 minutos comigo para ver o que mais pesa no seu negócio, sem compromisso. O que vem depois só proponho se houver um bom caso.",
      },
      {
        titulo: "Preço de referência, valor em proposta",
        texto: "Cada solução tem pacotes com preço de referência publicado. O valor fechado sai em proposta, depois que eu delimito o problema, o escopo e os entregáveis.",
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
  /** 25/11/2026: a Motors é um dos dois cases, e a 16ª Vara Cível entra como cliente (case autorizado em 17/11), sem detalhe de contrato. */
  motors: {
    titulo: "A relação com os dois cases.",
    texto:
      "A Motors Store, revenda de seminovos em Curitiba, é cliente da V2O5 e um dos dois cases do site. A relação é de fornecedora: montei e mantenho o sistema da loja, e assino os guias publicados nela. Os números do case são lidos no banco de dados da Motors, com fonte e período, e a loja autorizou a publicação do nome, do logo e dos números. A 16ª Vara Cível de Curitiba também é cliente: montei a triagem do WhatsApp da serventia, e a vara autorizou o case.",
    href: CASE_MOTORS.rota,
    botao: "Ler o case da Motors Store",
  },
  /**
   * 26/10/2026 (Dyones, referência "Organizar ferramentas V2O5"): a lista vira
   * "Tecnologias e ecossistemas", em categorias que mostram entregas e não
   * marcas. Só entra o que o Dyones usa ou tem experiência: o grupo "compatível,
   * sob avaliação técnica" do rascunho saiu (Dyones: "sobra"), e o Canva não
   * aparece em branding (ferramenta de pós-criação). Kenlo e Revenda Mais são
   * experiência dele (confirmado em 26/10). Itens só das credenciais do n8n
   * (Gemini, Google Sheets, Redis, PostgreSQL, SMTP) aguardam confirmação
   * (pendência 30). Sem nome de cliente. 25/11/2026 (foco em pequenos
   * negócios): saem "Branding, design e comunicação" (deixou de ser solução
   * em 12/11) e "Dados, inteligência e mensuração" (tom gerencial); o GA4 fica
   * em "Presença, busca e medição". Sete categorias.
   */
  ferramentas: {
    titulo: "Tecnologias e ecossistemas",
    texto:
      "Eu escolho a combinação para cada operação. A ferramenta vem do problema, das integrações e do resultado esperado, e cada projeto usa só o que o problema pede. Automação, atendimento e WhatsApp rodam no meu servidor.",
    categorias: [
      {
        titulo: "Sites, aplicações e dados",
        descricao: "Desenvolvimento, interfaces, bancos de dados e publicação.",
        itens: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL", "Redis", "Vercel", "GitHub"],
      },
      {
        titulo: "Infraestrutura, hospedagem e DevOps",
        descricao: "Onde as soluções rodam, como são publicadas e mantidas.",
        itens: ["VPS", "Docker", "Easypanel", "Traefik", "Portainer", "GitHub Container Registry", "MinIO", "Hostinger", "DNS", "SSL/TLS", "Backups", "Monitoramento", "Gestão de domínios e hospedagem"],
        nota: "VPS é uma modalidade de infraestrutura, não uma ferramenta; Docker é a tecnologia, Easypanel a plataforma de gestão e Hostinger o provedor.",
      },
      {
        titulo: "Inteligência artificial e agentes",
        descricao: "Assistentes, modelos, agentes especializados e desenvolvimento assistido por IA.",
        itens: ["OpenAI", "Anthropic Claude", "Claude Code", "Google Gemini"],
        nota: "Modelos de linguagem, assistentes de produtividade, pesquisa e ferramentas de desenvolvimento não são a mesma coisa. Custo, privacidade e adequação técnica decidem o que entra em cada projeto.",
      },
      {
        titulo: "Automação, integrações e processos",
        descricao: "Conectar sistemas, eliminar tarefas manuais e estruturar fluxos.",
        itens: ["n8n", "Typebot", "APIs REST", "Webhooks"],
      },
      {
        titulo: "Atendimento, comunicação e relacionamento",
        descricao: "WhatsApp, centralização de canais, triagem e atendimento com IA.",
        itens: ["WhatsApp", "Evolution API", "Chatwoot", "Typebot", "E-mail (SMTP)"],
      },
      {
        titulo: "CRM, vendas e sistemas de gestão",
        descricao: "Gestão comercial, funil de vendas, operação e relacionamento.",
        itens: ["Revenda Mais", "Kenlo", "CRM sob medida"],
      },
      {
        titulo: "Presença, busca e medição",
        descricao: "Ser encontrado por quem procura e saber de onde veio cada contato.",
        itens: ["Perfil da Empresa no Google", "Google Search Console", "GA4", "Instagram", "Facebook"],
      },
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
    texto: "O diagnóstico é comigo: 45 minutos sobre como o cliente acha o seu negócio, como é atendido e se volta a comprar.",
    botao: "Pedir diagnóstico gratuito",
  },
};
