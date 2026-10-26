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
   * 26/10/2026 (Dyones, referência "Organizar ferramentas V2O5"): a lista vira
   * "Tecnologias e ecossistemas", em nove categorias que mostram entregas e não
   * marcas. Cada categoria separa o que eu uso nos meus projetos do que posso
   * integrar sob avaliação técnica: nada aqui sugere implantação que ainda não
   * aconteceu. Itens só de credencial do n8n (Gemini, Google Sheets, Redis) e
   * os de infraestrutura, Kenlo e Canva vêm do documento do Dyones e aguardam a
   * confirmação dele (pendência 30). Sem nome de cliente.
   */
  ferramentas: {
    titulo: "Tecnologias e ecossistemas",
    texto:
      "Eu escolho a combinação para cada operação. A ferramenta vem do problema, das integrações e do resultado esperado, e cada projeto usa só o que o gargalo pede. Automação, atendimento e WhatsApp rodam no meu servidor.",
    categorias: [
      {
        titulo: "Sites, aplicações e dados",
        descricao: "Desenvolvimento, interfaces, bancos de dados e publicação.",
        grupos: [{ rotulo: "Nos meus projetos", itens: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL", "Redis", "Vercel", "GitHub"] }],
      },
      {
        titulo: "Infraestrutura, hospedagem e DevOps",
        descricao: "Onde as soluções rodam, como são publicadas e mantidas.",
        grupos: [
          {
            rotulo: "Nos meus projetos",
            itens: ["VPS", "Docker", "Easypanel", "Traefik", "Portainer", "GitHub Container Registry", "MinIO", "Hostinger", "DNS", "SSL/TLS", "Backups", "Monitoramento", "Gestão de domínios e hospedagem"],
          },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["Cloudflare", "AWS", "Google Cloud", "Microsoft Azure", "Hetzner"] },
        ],
        nota: "VPS é uma modalidade de infraestrutura, não uma ferramenta; Docker é a tecnologia, Easypanel a plataforma de gestão e Hostinger o provedor.",
      },
      {
        titulo: "Branding, design e comunicação",
        descricao: "Da estratégia de marca aos materiais aplicados no negócio.",
        grupos: [
          {
            rotulo: "O que eu entrego",
            itens: ["Estratégia e posicionamento", "Naming", "Identidade visual e logotipo", "Sistema e manual de marca", "Comunicação visual", "Aplicação da marca no site, nas redes e nos materiais"],
          },
          { rotulo: "Nos meus projetos", itens: ["Canva"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["Adobe Creative Cloud", "Adobe Express", "Figma"] },
        ],
        nota: "Branding entra num Sprint como capacidade, sob medida: não é um pacote à parte.",
      },
      {
        titulo: "Inteligência artificial e agentes",
        descricao: "Assistentes, modelos, agentes especializados e desenvolvimento assistido por IA.",
        grupos: [
          { rotulo: "Nos meus projetos", itens: ["OpenAI", "Anthropic Claude", "Claude Code", "Google Gemini"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["DeepSeek", "Microsoft Copilot", "Meta Llama", "Mistral", "xAI Grok", "Perplexity", "NotebookLM", "GitHub Copilot"] },
        ],
        nota: "Modelos de linguagem, assistentes de produtividade, pesquisa e ferramentas de desenvolvimento não são a mesma coisa. Custo, privacidade e adequação técnica decidem o que entra em cada projeto.",
      },
      {
        titulo: "Automação, integrações e processos",
        descricao: "Conectar sistemas, eliminar tarefas manuais e estruturar fluxos.",
        grupos: [
          { rotulo: "Nos meus projetos", itens: ["n8n", "Typebot", "APIs REST", "Webhooks"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["Flowise", "Supabase Edge Functions", "Make", "Zapier", "Microsoft Power Automate"] },
        ],
      },
      {
        titulo: "Atendimento, comunicação e relacionamento",
        descricao: "WhatsApp, centralização de canais, triagem e atendimento com IA.",
        grupos: [
          { rotulo: "Nos meus projetos", itens: ["WhatsApp", "Evolution API", "Chatwoot", "Typebot", "E-mail (SMTP)"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["WhatsApp Business Platform", "Instagram e outros canais digitais"] },
        ],
      },
      {
        titulo: "CRM, vendas e sistemas de gestão",
        descricao: "Gestão comercial, funil de vendas, operação e relacionamento.",
        grupos: [
          { rotulo: "Plataformas com experiência prática", itens: ["Revenda Mais", "Kenlo"] },
          { rotulo: "CRMs e automação comercial, compatíveis", itens: ["RD Station CRM", "RD Station Marketing", "HubSpot", "Pipedrive"] },
          { rotulo: "Sistemas corporativos, conforme a operação do cliente", itens: ["Salesforce", "Microsoft Dynamics 365", "Outros ERPs"] },
        ],
        nota: "Só as plataformas com experiência prática são implantações que eu fiz; as demais são compatibilidade técnica, avaliada caso a caso.",
      },
      {
        titulo: "Marketing, aquisição e conversão",
        descricao: "Atrair demanda, acompanhar campanhas e medir resultados.",
        grupos: [
          { rotulo: "Nos meus projetos", itens: ["Meta Ads", "Google Ads", "Google Analytics 4", "Google Tag Manager", "Meta Pixel", "API de Conversões", "Google Search Console"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["Looker Studio", "Mailchimp"] },
        ],
      },
      {
        titulo: "Dados, inteligência e mensuração",
        descricao: "Transformar informações dispersas em indicadores para decidir e melhorar processos.",
        grupos: [
          { rotulo: "Nos meus projetos", itens: ["SQL", "PostgreSQL", "Google Sheets", "GA4", "Dashboards operacionais", "Indicadores de eficiência", "Análise antes e depois"] },
          { rotulo: "Compatível, sob avaliação técnica", itens: ["Looker Studio"] },
        ],
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
    texto: "O diagnóstico é comigo: 45 minutos sobre presença, atendimento, operação e funil, para priorizar um gargalo.",
    botao: "Pedir diagnóstico gratuito",
  },
};
