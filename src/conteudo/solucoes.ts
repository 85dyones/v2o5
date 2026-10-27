import { SITE_PADRAO } from "@/conteudo/sitePadrao";
import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, MARCA_DO_SITE, VISAO_360, type Vinheta } from "@/conteudo/home";
import { capacidade, mensalEmTexto, precoEmTexto, type Pilar } from "@/conteudo/precos";
import { ofertaDa, PLANOS_DE_CONTINUIDADE, precoDeEntrada, type IdOferta } from "@/conteudo/ofertas";
import { CONDICOES, METODO, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import type { Etapa } from "@/lib/tokens";

/**
 * As páginas de solução (plano, seções 3.2 e 4.2): uma por linha do
 * cardápio, com o H1 igual à busca-alvo, a resposta em duas frases no
 * primeiro parágrafo, o problema, o que entra, como funciona, o que roda na
 * Motors Store (só o que roda, com número do case), como a linha entra num
 * Sprint e as perguntas, que viram FAQPage. Desde 27/10/2026 há dois tipos:
 * as páginas das quatro soluções (`oferta`: Branding, Presença, Sites e o
 * Sprint), com os pacotes e o preço de referência de `ofertas.ts`; e as
 * páginas de recurso (agente, CRM, automação, rastreamento), sem valor, que
 * dizem como a linha entra num Sprint. Todo preço citado aqui sai de
 * `ofertas.ts` ou `sprint.ts`, nunca digitado. Tudo que é número
 * sai de `CASE`, `CASE_MOTORS` ou da evidência da Visão 360, com fonte. `tests/solucoes.test.ts` confere.
 *
 * Sobre o agente: a memória do case não registra agente de IA na Motors,
 * então a página do agente não cita a loja (pendência 13); a prova dela é a
 * demonstração rotulada como fictícia.
 */

export interface Numero {
  valor: number;
  complemento: string;
  texto: string;
}

export interface Solucao {
  rota: string;
  /** A capacidade em `precos.ts` (`CAPACIDADES`), dado interno: o nome da linha. Nenhum valor dela é publicado. */
  linha: string;
  pilar: Pilar;
  etapa: Etapa;
  vinheta: Vinheta;
  sobretitulo: string;
  /** H1: a busca-alvo da página, em frase. */
  titulo: string;
  /** Curto de propósito: o LCP é o H1. */
  resumo: string;
  fatos: { rotulo: string; valor: string }[];
  problema: { titulo: string; texto: string; fonte?: string; href?: string };
  entregas: { titulo: string; texto: string }[];
  comoFunciona: { titulo: string; texto: string }[];
  /** Só quando a linha roda na Motors Store; os números são os do case, por referência. */
  naMotors?: { titulo: string; texto: string; numeros: Numero[] };
  /** Página de recurso: como a linha entra num Sprint de Eficiência, a ficha "No Sprint" (sem valor). */
  noSprint?: string;
  /** Página de solução (27/10/2026): os pacotes de `ofertas.ts` no lugar da ficha "No Sprint". */
  oferta?: IdOferta;
  /** Título e texto da seção "como funciona", quando não é "Do diagnóstico ao ar.". */
  como?: { titulo: string; apagado: string; texto: string };
  perguntas: { pergunta: string; resposta: string }[];
  /** Ids de `LINHAS` (home.ts) que combinam com esta. */
  relacionadas: string[];
}

const SITES = ofertaDa("sites");
const BRANDING = ofertaDa("branding");
const PRESENCA = ofertaDa("presenca");
const SPRINT = ofertaDa("sprint");
const continuidade = (i: number) => PLANOS_DE_CONTINUIDADE[i];

/** "a partir de R$ 2.900": o preço de entrada da solução. */
const entrada = (o: typeof SITES) => precoEmTexto({ valor: precoDeEntrada(o), aPartirDe: true });

/** "Os pacotes: Landing Page, R$ 2.900; ...": a resposta de preço do FAQ, sempre da tabela. */
const listaDePrecos = (o: typeof SITES) =>
  `Os pacotes: ${o.pacotes
    .map((p) => `${p.nome}, ${precoEmTexto(p.preco)}${p.mensal ? `, com mensalidade opcional de ${mensalEmTexto(p.mensal.valor)}` : ""}`)
    .join("; ")}`;

export const SOLUCOES: Solucao[] = [
  {
    rota: "/criacao-de-sites",
    linha: "sites",
    oferta: "sites",
    pilar: "mapa",
    etapa: "azul",
    vinheta: "site",
    sobretitulo: "Sites & Integrações",
    titulo: "Criação de sites profissionais, ligados ao sistema que você já usa.",
    resumo:
      "Site próprio que carrega rápido no celular, aparece no Google e grava a origem de cada contato. Com integração quando o escopo pede.",
    fatos: [
      { rotulo: "Resolve", valor: SITES.resolve },
      { rotulo: "Preço de entrada", valor: `${entrada(SITES)}, da landing page ao site automotivo integrado` },
      { rotulo: "Entrega-base", valor: "Onze itens iguais em todo site da V2O5, das páginas que o Google entende à entrega documentada" },
      {
        rotulo: "Em produção",
        valor: `Motors Store: site de estoque com ${CASE.numeros[2].valor} veículos sincronizados e ${CASE.numeros[1].valor} guias`,
      },
    ],
    problema: {
      titulo: "O site de template aparece bonito e some na busca.",
      texto:
        "Carrega devagar no celular, tem uma página só para todos os modelos ou serviços, e quem chega por um anúncio vira um contato sem origem. O Google só acha o que existe como página, e o contato que chega pelo site não aparece no sistema da empresa.",
    },
    entregas: SITE_PADRAO.itens,
    comoFunciona: [
      {
        titulo: "Diagnóstico",
        texto: "45 minutos com o fundador sobre presença, busca, o que a empresa vende e os sistemas que ela já usa.",
      },
      {
        titulo: "Proposta e estrutura",
        texto: "O pacote, as páginas e as integrações fechados por escrito. O mapa de páginas sai da busca real.",
      },
      {
        titulo: "Construção e medição",
        texto: "O site fica num endereço de teste, com as integrações conferidas e medido no celular antes de publicar.",
      },
      {
        titulo: "Publicação",
        texto: "Troca de DNS, Search Console e Perfil da Empresa. Depois, a continuidade, se você quiser.",
      },
    ],
    naMotors: {
      titulo: "No ar na Motors Store.",
      texto:
        "Site de estoque com vitrine, ficha de veículo, páginas por marca e modelo e seis páginas locais. O estoque entra sozinho do Revenda Mais.",
      numeros: [CASE.numeros[2], CASE.numeros[1]],
    },
    perguntas: [
      {
        pergunta: "Quanto custa um site profissional?",
        resposta: `${listaDePrecos(SITES)}. São preços de referência: o valor fechado sai em proposta, depois de conhecer o escopo e o sistema que o site precisa ligar. O diagnóstico inicial, de 45 minutos, é gratuito.`,
      },
      {
        pergunta: "Posso aproveitar o site que já tenho?",
        resposta:
          "O diagnóstico começa pelo site atual: velocidade, páginas, tags. Se a base for boa, a V2O5 trabalha em cima dela; se não, migra o conteúdo que vale e refaz o resto.",
      },
      {
        pergunta: "O site se liga ao meu CRM ou ao meu sistema de gestão?",
        resposta:
          "No Site Conectado e no Site Automotivo Integrado, sim. A integração entra na proposta depois de verificar a documentação, o acesso, os limites e os custos do sistema. Compatibilidade com qualquer sistema não é prometida.",
      },
      {
        pergunta: "E depois que o site vai ao ar?",
        resposta: `A continuidade é opcional. O ${continuidade(0).nome} (${mensalEmTexto(continuidade(0).mensal)}) cuida da hospedagem, do SSL, do backup e de até 1 hora de suporte por mês. Site com integração costuma seguir com as ${continuidade(1).nome} (${mensalEmTexto(continuidade(1).mensal)}).`,
      },
      {
        pergunta: "O site fica no meu nome?",
        resposta:
          "O domínio fica no nome da sua empresa, e o código e os dados são entregues nos termos do contrato. Com o Cuidado Técnico, a V2O5 cuida da hospedagem.",
      },
      {
        pergunta: "Preciso ter fotos e textos prontos?",
        resposta: "Os textos a V2O5 escreve e revisa com você. Fotos e vídeos ficam com a sua equipe ou com um fotógrafo parceiro que a V2O5 indica, contratado à parte.",
      },
      {
        pergunta: "O site vem com loja virtual?",
        resposta:
          "Não. Loja com pagamento fica fora dos pacotes. O site vende por WhatsApp, formulário e telefone, com a origem de cada contato gravada.",
      },
    ],
    relacionadas: ["rastreamento", "crm", "agente"],
  },
  {
    rota: "/agente-de-ia-para-whatsapp",
    linha: "agente",
    pilar: "operacao",
    etapa: "verde",
    vinheta: "agente",
    sobretitulo: "Agente de IA no WhatsApp",
    titulo: "Agente de IA para WhatsApp que responde, qualifica e agenda.",
    resumo:
      "Responde na hora, a qualquer hora, com as informações do seu negócio. Quando a conversa pede uma pessoa, chama alguém da equipe.",
    fatos: [
      { rotulo: "No Sprint", valor: "Intervenção para quando o gargalo é responder rápido e não perder o contato que chegou" },
      { rotulo: "O que entra", valor: "Agente treinado com a base de conhecimento da empresa, registro no CRM, ajustes de roteiro e passagem para a equipe, conforme o escopo" },
      { rotulo: "Custos de terceiros", valor: "Uso do modelo de IA e mensagens da API oficial do WhatsApp, discriminados na proposta" },
    ],
    problema: {
      titulo: "O contato chega às 21h e é respondido no dia seguinte.",
      texto: `Quem manda mensagem fora do horário também está conversando com o concorrente. ${VISAO_360.evidencia.texto}`,
      fonte: VISAO_360.evidencia.fonte,
      href: VISAO_360.evidencia.href,
    },
    entregas: [
      {
        titulo: "Responde com o que a empresa sabe",
        texto:
          "Base de conhecimento com estoque, serviços, horários, condições e perguntas frequentes. O agente só fala do que está lá, e diz quando não sabe.",
      },
      {
        titulo: "Qualifica antes de passar",
        texto:
          "Pergunta o que importa para o seu funil (interesse, prazo, forma de pagamento, região) e registra no CRM com a origem do contato.",
      },
      {
        titulo: "Agenda e avisa",
        texto: "Marca visita, test drive ou reunião na agenda da equipe e avisa o responsável no WhatsApp.",
      },
      {
        titulo: "Passa para uma pessoa",
        texto:
          "Quando a conversa pede alguém, o agente chama o vendedor com o histórico inteiro. Ninguém pergunta tudo de novo.",
      },
      {
        titulo: "API oficial do WhatsApp",
        texto: "Número verificado no nome da empresa, modelo de mensagem aprovado e saída fácil. O custo das mensagens é da Meta e fica discriminado na proposta.",
      },
      {
        titulo: "Roteiro ajustado todo mês",
        texto: "A V2O5 lê as conversas, corrige o roteiro e amplia a base de conhecimento. Faz parte da continuidade, quando contratada.",
      },
    ],
    comoFunciona: [
      {
        titulo: "Diagnóstico",
        texto: "O que a equipe responde hoje, quantas vezes por dia e em que ponto o cliente desiste.",
      },
      {
        titulo: "Base e roteiro",
        texto: "Montamos a base de conhecimento com você e escrevemos o roteiro no tom da empresa.",
      },
      {
        titulo: "Teste com a equipe",
        texto: "O agente roda num número de teste da V2O5 até a equipe aprovar as respostas.",
      },
      {
        titulo: "No ar e medido",
        texto: "Entra no número oficial da empresa. Toda conversa fica no CRM, com origem e desfecho.",
      },
    ],
    noSprint:
      "O agente entra num Sprint quando o gargalo é a resposta lenta ou o contato que se perde fora do horário. O Sprint mapeia o atendimento de hoje, define o que o agente responde e quando chama uma pessoa, implementa e compara o tempo de resposta e os contatos acompanhados antes e depois.",
    perguntas: [
      {
        pergunta: "O agente de IA atende sozinho?",
        resposta:
          "Responde na hora com as informações do seu negócio e, quando a conversa pede uma pessoa, chama alguém da equipe. A conversa fica registrada no CRM, com a origem do contato.",
      },
      {
        pergunta: "E se o cliente perguntar algo que a base não tem?",
        resposta:
          "O agente diz que vai confirmar e chama uma pessoa. Inventar resposta é o que a V2O5 mais evita: ele só afirma o que a base confirma.",
      },
      {
        pergunta: "Funciona no número que a empresa já usa?",
        resposta:
          "Sim, pela API oficial do WhatsApp, com o número verificado no nome da empresa. Os testes rodam num número da V2O5 até a equipe aprovar.",
      },
      {
        pergunta: "Quanto custam a IA e as mensagens?",
        resposta:
          "São custos de terceiros: o modelo de IA e as mensagens da API oficial do WhatsApp. Ficam discriminados na proposta do Sprint, separados do valor do projeto.",
      },
      {
        pergunta: "Preciso de um CRM?",
        resposta:
          "O agente registra cada conversa no CRM da V2O5 ou, por integração, no sistema que você já usa. Sem um lugar para registrar, a origem e o desfecho se perdem.",
      },
    ],
    relacionadas: ["crm", "automacao", "sites"],
  },
  {
    rota: "/automacao-com-ia",
    linha: "automacao",
    pilar: "operacao",
    etapa: "azul",
    vinheta: "fluxo",
    sobretitulo: "Automação de processos",
    titulo: "Automação de processos com IA e n8n.",
    resumo:
      "A tarefa que alguém faz à mão toda semana passa a rodar sozinha entre os sistemas que você já usa, com registro de cada execução.",
    fatos: [
      { rotulo: "No Sprint", valor: "Intervenção para quando o gargalo é tarefa repetida entre sistemas" },
      { rotulo: "Manutenção", valor: "definida na proposta ou na continuidade, se contratada" },
      { rotulo: "Em produção", valor: `Motors Store: ${CASE.numeros[2].valor} veículos sincronizados com o Revenda Mais` },
    ],
    problema: {
      titulo: "O processo existe, mas mora na cabeça de uma pessoa.",
      texto:
        "Atualizar o estoque no site, avisar o vendedor, mandar o obrigado, conferir a venda que ficou pela metade. Cada passo é feito à mão, quando dá tempo, e para quando a pessoa sai de férias.",
    },
    entregas: [
      {
        titulo: "Um fluxo por processo",
        texto: "Cada rotina vira um fluxo no n8n, entregue, testado e documentado. Você vê o que ele faz e quando rodou.",
      },
      {
        titulo: "Integração com o que você usa",
        texto: "ERP, planilha, CRM, WhatsApp, e-mail e os sistemas do seu setor. Em produção hoje: o estoque do Revenda Mais.",
      },
      {
        titulo: "IA onde faz diferença",
        texto:
          "Classificar uma mensagem, resumir uma conversa, escrever um descritivo a partir da ficha. Sempre validado contra invenção de dado.",
      },
      {
        titulo: "Alertas para a equipe",
        texto: "O lead parado, a venda sem desfecho, o estoque que não atualizou: a pessoa certa recebe o aviso no WhatsApp.",
      },
      {
        titulo: "Registro de cada execução",
        texto: "Toda rodada fica registrada, com erro ou sucesso, e o erro gera aviso. A correção entra na manutenção.",
      },
      {
        titulo: "O fluxo é seu",
        texto: "Roda no n8n da infraestrutura da V2O5, com backup e monitoramento. Se sair, leva o fluxo exportado em arquivo.",
      },
    ],
    comoFunciona: [
      { titulo: "Mapa do processo", texto: "Desenhamos o processo com quem faz hoje: entradas, decisões e saídas." },
      { titulo: "Fluxo em teste", texto: "O fluxo roda em paralelo ao processo manual até os dois baterem." },
      { titulo: "No ar", texto: "Passa a rodar sozinho, com alerta de erro e registro de cada execução." },
      { titulo: "Manutenção", texto: "Ajustes e correções dentro do período e do escopo definidos na proposta." },
    ],
    naMotors: {
      titulo: "Rodando na Motors Store.",
      texto:
        "Sincronização do estoque com o Revenda Mais, vendas incompletas e alertas de estagnação do funil, com WhatsApp pela Evolution API.",
      numeros: [CASE.numeros[2]],
    },
    noSprint:
      "A automação entra num Sprint quando o gargalo é uma tarefa repetida entre sistemas. O Sprint mapeia o processo real, tira as etapas desnecessárias antes de automatizar e mede o tempo e o retrabalho antes e depois.",
    perguntas: [
      {
        pergunta: "O que conta como um fluxo?",
        resposta: `Uma rotina do começo ao fim. A venda marcada no CRM que tira o carro do site, avisa o grupo e manda o obrigado ao cliente é um fluxo. O escopo do Sprint diz quantos fluxos entram.`,
      },
      {
        pergunta: "Preciso trocar o sistema de gestão que já uso?",
        resposta:
          `Não. A V2O5 liga o que você já usa. Em produção hoje: o estoque do Revenda Mais sincronizado com o site da Motors Store. ${listaDeSistemasIntegraveis()}, entre outros, entram como fluxo de integração.`,
      },
      {
        pergunta: "E quando o fluxo quebra?",
        resposta:
          "Ele avisa. Toda execução fica registrada, e a correção entra na manutenção prevista na proposta ou na continuidade.",
      },
      {
        pergunta: "Dá para usar IA sem inventar dado?",
        resposta:
          "Dá, com validação: o modelo só escreve a partir do que a ficha confirma, e a saída é conferida antes de publicar. É assim que o descritivo de veículo da Motors Store funciona.",
      },
      {
        pergunta: "Por que n8n?",
        resposta:
          "Roda na infraestrutura da V2O5, sem cobrança por tarefa executada, e o fluxo é exportável em arquivo se você sair.",
      },
    ],
    relacionadas: ["crm", "agente", "posvenda"],
  },
  {
    rota: "/crm-com-whatsapp",
    linha: "crm",
    pilar: "operacao",
    etapa: "azul",
    vinheta: "crm",
    sobretitulo: "CRM e sistemas sob medida",
    titulo: "CRM com WhatsApp integrado e IA.",
    resumo:
      "Cada contato num funil, com a origem, a etapa e o próximo passo à vista, no nome da sua empresa.",
    fatos: [
      { rotulo: "No Sprint", valor: "Intervenção para quando o gargalo é o funil espalhado entre conversas e planilhas" },
      { rotulo: "O que entra", valor: "Funil e campos do seu negócio, WhatsApp dentro do CRM, banco próprio, backups e treinamento da equipe, conforme o escopo" },
      { rotulo: "Em produção", valor: "Motors Store: painel com funil, estoque, clientes, investidores e mídia paga" },
    ],
    problema: {
      titulo: "O funil vive no WhatsApp de cada vendedor.",
      texto:
        "Quando o vendedor sai, os contatos vão junto. Ninguém sabe quantos leads chegaram no mês, de onde vieram nem quantos viraram venda. O CRM de prateleira resolve metade e cobra por cabeça.",
    },
    entregas: [
      {
        titulo: "Funil com origem",
        texto: "Cada lead entra com a campanha, o anúncio e a página que trouxe a pessoa. A venda sai com a origem conhecida.",
      },
      {
        titulo: "WhatsApp dentro do CRM",
        texto: "As conversas ficam no funil, com o histórico. O agente de IA e a equipe trabalham no mesmo lugar.",
      },
      {
        titulo: "Régua de alertas",
        texto: "Lead parado, visita marcada, proposta sem resposta: o responsável recebe o aviso.",
      },
      {
        titulo: "Sob medida para o seu setor",
        texto:
          "Os campos são os do seu negócio: veículo de interesse, imóvel, procedimento, contrato. A empresa não se adapta ao sistema.",
      },
      {
        titulo: "Banco próprio e backups",
        texto: "Os dados ficam num banco só seu, com backup diário e exportação quando pedir.",
      },
      {
        titulo: "Usuários e volume de dados",
        texto: "Quantos usuários e quanto de dado entram é definido na proposta do Sprint, conforme o tamanho da equipe e da base.",
      },
    ],
    comoFunciona: [
      { titulo: "Diagnóstico", texto: "Como a venda acontece hoje, da primeira mensagem ao fechamento." },
      { titulo: "Funil e campos", texto: "Desenhamos as etapas e os campos com a equipe de vendas." },
      { titulo: "Importação", texto: "Os contatos que existem, em planilha ou no sistema antigo, entram com origem e etapa." },
      { titulo: "Treinamento e ajuste", texto: "A equipe é treinada na implantação, e o primeiro mês ajusta o que a rotina pedir." },
    ],
    naMotors: {
      titulo: "O painel da Motors Store.",
      texto: "Funil de leads, estoque, clientes, investidores e mídia paga num painel só, com as conversas do Chatwoot.",
      numeros: [CASE_MOTORS.numeros.itens[0]],
    },
    noSprint:
      "O CRM entra num Sprint quando o gargalo é o funil espalhado entre conversas e planilhas. O Sprint mapeia como a venda acontece, desenha as etapas e os campos com a equipe, implanta e compara a proporção de contatos acompanhados e a conversão de etapa.",
    perguntas: [
      {
        pergunta: "Como ficam os usuários e o volume de dados?",
        resposta: "Definidos na proposta do Sprint, conforme o tamanho da equipe e da base de contatos.",
      },
      {
        pergunta: "Posso integrar com o sistema que já uso?",
        resposta: `Sim, por integração dentro de um Sprint. Em produção hoje: o estoque do Revenda Mais. Para revendas, ${listaDeSistemasIntegraveis()} entram do mesmo jeito.`,
      },
      {
        pergunta: "O WhatsApp fica dentro do CRM?",
        resposta:
          "Sim. As conversas entram no funil com o histórico, pela API oficial ou pelo Chatwoot, e o agente de IA trabalha no mesmo lugar que a equipe.",
      },
      {
        pergunta: "E se eu sair?",
        resposta: "Os dados ficam num banco do seu negócio, com exportação quando você pedir. Os termos de saída e de continuidade ficam no contrato.",
      },
      {
        pergunta: "Serve para qualquer setor?",
        resposta: "Serve. Os campos e as etapas são desenhados com você. O automotivo é o primeiro segmento com pacote pronto.",
      },
    ],
    relacionadas: ["agente", "dados", "automacao"],
  },
  {
    rota: "/rastreamento-de-conversoes",
    linha: "rastreamento",
    pilar: "mapa",
    etapa: "violeta",
    vinheta: "jornada",
    sobretitulo: "Rastreamento até a venda",
    titulo: "Rastreamento de conversões até a venda.",
    resumo:
      "GA4, API de Conversões da Meta e conversões offline do Google Ads, ligando cada venda ao anúncio que trouxe o cliente.",
    fatos: [
      { rotulo: "No Sprint", valor: "Intervenção para quando o gargalo é não saber de onde vem cada venda" },
      { rotulo: "O que entra", valor: "GA4 e GTM arrumados, API de Conversões da Meta, conversão offline do Google Ads e relatório de origem das vendas, conforme o escopo" },
      {
        rotulo: "Em produção",
        valor: `Motors Store: ${CASE.numeros[0].valor} ${CASE.numeros[0].complemento} leads do site com identificador único`,
      },
    ],
    problema: {
      titulo: "A campanha aprende com o formulário preenchido, e vende pouco.",
      texto:
        "Sem a venda de volta na plataforma, o Google e a Meta levam a verba para o anúncio que gera contato barato. O lead que virou venda e o que sumiu valem o mesmo para o algoritmo.",
    },
    entregas: [
      {
        titulo: "Camada de dados testada",
        texto:
          "Cada evento do site (clique no WhatsApp, formulário, ficha vista) com nome fixo e teste automático. Quando o site muda, o teste avisa.",
      },
      {
        titulo: "Identificador único por lead",
        texto: "O navegador e o servidor mandam a mesma conversão com o mesmo identificador. A Meta e o Google contam uma vez só.",
      },
      {
        titulo: "API de Conversões da Meta",
        texto: "Pelo servidor, com os parâmetros que o Pixel sozinho perde no celular.",
      },
      {
        titulo: "Conversões offline do Google Ads",
        texto: "A venda registrada no CRM volta para o Google Ads com o clique de origem. A campanha passa a otimizar por venda.",
      },
      {
        titulo: "GA4 e GTM arrumados",
        texto: "Eventos com nome certo, conversões marcadas e o relatório de origem das vendas no fim do mês.",
      },
      {
        titulo: "Conferência mensal",
        texto: "Todo mês a V2O5 confere a qualidade do dado: deduplicação, cobertura, parâmetros. Faz parte da continuidade, quando contratada.",
      },
    ],
    comoFunciona: [
      { titulo: "Auditoria", texto: "O que já existe (GA4, Pixel, GTM), o que duplica e o que falta." },
      { titulo: "Camada de dados", texto: "Eventos definidos com você e implementados no site, com teste." },
      {
        titulo: "Servidor",
        texto: "API de Conversões e identificador único; conversão offline quando o CRM registra a venda.",
      },
      { titulo: "Relatório", texto: "Origem de cada venda no relatório mensal, e a verba movida para onde a venda aparece." },
    ],
    naMotors: {
      titulo: "Medido na Motors Store.",
      texto:
        "Camada de dados versionada e testada; Meta Pixel com API de Conversões deduplicada por identificador; GA4 e GTM; UTM e click IDs gravados no lead.",
      numeros: [CASE.numeros[0]],
    },
    noSprint:
      "O rastreamento entra num Sprint quando o gargalo é não saber de onde vem cada venda. O Sprint audita o que já existe, implementa a camada de dados e compara a cobertura da origem nas vendas antes e depois.",
    perguntas: [
      {
        pergunta: "Vocês fazem tráfego pago sem rastreamento?",
        resposta:
          "Não. Sem rastreamento até a venda, a campanha otimiza pelo formulário preenchido, e a verba vai para o anúncio que gera contato barato, mesmo quando ele vende pouco. A gestão de tráfego começa com o rastreamento ligado.",
      },
      {
        pergunta: "Isso está de acordo com a LGPD?",
        resposta:
          "Trabalhamos com interesse legítimo e direito de oposição: a página de privacidade diz o que é guardado, por quanto tempo e como pedir para apagar, e o controle fica lá. É o modelo deste site.",
      },
      {
        pergunta: "Preciso trocar de ferramenta de anúncios?",
        resposta: "Não. GA4, Google Ads e Meta continuam os mesmos. O que muda é o dado que chega neles.",
      },
      {
        pergunta: "O que é conversão offline?",
        resposta:
          "A venda que acontece fora do site, na loja ou por telefone, volta para o Google Ads ligada ao clique que trouxe o cliente. O CRM registra a venda e um fluxo manda para o Google.",
      },
      {
        pergunta: "Funciona com o meu site atual?",
        resposta: "Funciona se o site aceitar tags e o formulário puder gravar a origem. O diagnóstico responde isso em 45 minutos.",
      },
    ],
    relacionadas: ["googleAds", "crm", "sites"],
  },
  {
    rota: "/branding-e-identidade",
    linha: "branding",
    oferta: "branding",
    pilar: "mapa",
    etapa: "violeta",
    vinheta: "marca",
    sobretitulo: "Branding & Identidade",
    titulo: "Branding e identidade visual que funcionam em todos os canais.",
    resumo: "Identidade visual com variações, cores, tipografia e guia de uso. Nos pacotes maiores, comunicação e posicionamento.",
    fatos: [
      { rotulo: "Resolve", valor: BRANDING.resolve },
      { rotulo: "Preço de entrada", valor: `${entrada(BRANDING)}, da identidade essencial ao reposicionamento` },
      { rotulo: "Entrega", valor: "Arquivos finais, guia de uso e as rodadas de revisão escritas no contrato" },
    ],
    problema: {
      titulo: "Um logotipo usado de cinco jeitos diferentes.",
      texto:
        "Cada canal mostra uma cor, uma fonte e um tom. O cliente não reconhece a empresa de um lugar para o outro, e a percepção fica abaixo do que ela entrega. A marca precisa de regras de uso, além do desenho.",
    },
    entregas: [
      {
        titulo: "Identidade visual",
        texto: "Logotipo e variações, paleta de cores e tipografia, desenhados para funcionar no celular, no papel e na fachada.",
      },
      {
        titulo: "Guia de uso",
        texto: "As regras para aplicar a marca sem depender de quem desenhou: tamanhos, cores, combinações e o que evitar.",
      },
      {
        titulo: "Aplicações",
        texto: "Do perfil das redes à proposta comercial, conforme o pacote.",
      },
      {
        titulo: "Comunicação e posicionamento",
        texto: "Tom de voz e mensagens principais na Marca em Uso; proposta de valor e plano de aplicação no Reposicionamento.",
      },
      {
        titulo: "Arquivos finais",
        texto: "Em vetor e em imagem, organizados para a equipe e para os fornecedores.",
      },
    ],
    comoFunciona: [
      {
        titulo: "Diagnóstico",
        texto: "45 minutos com o fundador sobre o que a marca precisa resolver e onde ela aparece hoje.",
      },
      {
        titulo: "Proposta",
        texto: "O pacote, os entregáveis, os arquivos finais e as rodadas de revisão por escrito.",
      },
      {
        titulo: "Criação e revisões",
        texto: "As propostas visuais e as rodadas de revisão previstas no pacote.",
      },
      {
        titulo: "Entrega",
        texto: "Arquivos finais e guia de uso. Nos pacotes maiores, a marca aplicada nos materiais combinados.",
      },
    ],
    perguntas: [
      {
        pergunta: "Quanto custa uma identidade visual?",
        resposta: `${listaDePrecos(BRANDING)}. São preços de referência: o valor fechado sai em proposta.`,
      },
      {
        pergunta: "Vocês fazem só o logotipo?",
        resposta:
          "O logotipo sozinho não é vendido como projeto de branding. O pacote menor já entrega as variações, as cores, a tipografia e o guia de uso, para a marca funcionar em todos os canais.",
      },
      {
        pergunta: "Qual a diferença entre identidade e reposicionamento?",
        resposta:
          "A identidade trata de como a marca aparece. O reposicionamento começa antes: diagnóstico, posicionamento e proposta de valor, e só depois a identidade nova ou revisada.",
      },
      {
        pergunta: "Quantas revisões estão incluídas?",
        resposta: "Duas rodadas na Identidade Essencial e duas por etapa na Marca em Uso. O número fica escrito no contrato.",
      },
      {
        pergunta: "O registro no INPI está incluído?",
        resposta: "Não. O registro da marca, a impressão e a produção de fotos e vídeos ficam fora dos pacotes.",
      },
    ],
    relacionadas: ["sites", "redes", "avaliacoes"],
  },
  {
    rota: "/presenca-digital-local",
    linha: "presenca",
    oferta: "presenca",
    pilar: "mapa",
    etapa: "verde",
    vinheta: "perfil",
    sobretitulo: "Presença Digital Local",
    titulo: "Presença digital para negócios locais: Google, redes e WhatsApp.",
    resumo: "Perfil no Google, redes e WhatsApp organizados, com modelos de conteúdo e, se quiser, a rotina mensal de publicações.",
    fatos: [
      { rotulo: "Resolve", valor: PRESENCA.resolve },
      {
        rotulo: "Preço de entrada",
        valor: `${entrada(PRESENCA)}, com mensalidade opcional a partir de ${mensalEmTexto(Math.min(...PRESENCA.pacotes.map((p) => p.mensal?.valor ?? Infinity)))}`,
      },
      { rotulo: "Para quem", valor: "Padaria, oficina, distribuidora, comércio de bairro e outros negócios locais" },
    ],
    problema: {
      titulo: "O cliente procura e encontra o horário errado.",
      texto:
        "Perfil no Google sem foto nem horário, rede social parada há meses e um WhatsApp que ninguém sabe se atende. Quem procura desiste antes de chamar, e a empresa nem fica sabendo.",
    },
    entregas: [
      {
        titulo: "Perfil da Empresa no Google",
        texto: "Configurado ou otimizado, com categorias, horário, fotos e chamada. A verificação depende do Google.",
      },
      {
        titulo: "Redes sociais",
        texto: "Uma ou duas redes organizadas, com descrição, destaques e link de contato.",
      },
      {
        titulo: "WhatsApp Business",
        texto: "Perfil, horário e mensagens de saudação e ausência, para quem chama saber que vai ser atendido.",
      },
      {
        titulo: "Modelos de conteúdo",
        texto: "Modelos com a identidade da empresa, para publicar sem começar do zero.",
      },
      {
        titulo: "Calendário e campanhas",
        texto: "As datas e as épocas do ramo, com campanhas prontas, na Presença Estruturada e na Assistida.",
      },
    ],
    comoFunciona: [
      {
        titulo: "Diagnóstico",
        texto: "45 minutos com o fundador sobre os canais que pesam no seu ramo e o que está desatualizado.",
      },
      {
        titulo: "Organização",
        texto: "Perfis, informações, contatos e botões de chamada revisados em todos os canais.",
      },
      {
        titulo: "Modelos e calendário",
        texto: "Os modelos de publicação e, conforme o pacote, o calendário e a campanha de lançamento.",
      },
      {
        titulo: "Rotina, se quiser",
        texto: "A mensalidade opcional: atualizações, o kit mensal de conteúdo ou a operação assistida.",
      },
    ],
    perguntas: [
      {
        pergunta: "Quanto custa?",
        resposta: `${listaDePrecos(PRESENCA)}. São preços de referência: o valor fechado sai em proposta.`,
      },
      {
        pergunta: "A mensalidade é obrigatória?",
        resposta:
          "Não. Dá para contratar só a implantação. A mensalidade entra quando você quer que a V2O5 mantenha os canais ou produza o conteúdo do mês.",
      },
      {
        pergunta: "Quantas publicações por mês?",
        resposta:
          "No kit da Presença Estruturada, quatro peças e uma campanha por mês. Na Assistida, oito peças de referência, com o volume final na proposta. Nenhum pacote tem publicação ilimitada.",
      },
      {
        pergunta: "Vocês respondem os comentários e as mensagens?",
        resposta:
          "A resposta a comentários e mensagens fica com a sua equipe. A V2O5 organiza os canais e, na Presença Assistida, orienta o atendimento.",
      },
      {
        pergunta: "A verba de anúncio está incluída?",
        resposta: "Não. Verba de anúncio, gravação presencial de fotos e vídeos e ferramentas pagas ficam fora dos pacotes.",
      },
      {
        pergunta: "E se eu precisar de um site?",
        resposta: "A Presença cuida dos canais que já existem. O site próprio entra em Sites & Integrações, contratado à parte.",
      },
    ],
    relacionadas: ["avaliacoes", "redes", "sites"],
  },
  {
    rota: "/sprint-de-eficiencia",
    linha: "sprint",
    oferta: "sprint",
    pilar: "operacao",
    etapa: "ambar",
    vinheta: "jornada",
    sobretitulo: "Sprint de Eficiência",
    titulo: "Sprint de Eficiência: um gargalo da operação resolvido e medido.",
    resumo: "Um projeto fechado para um gargalo: mapear, simplificar, implementar e comparar os indicadores antes e depois.",
    fatos: [
      { rotulo: "Resolve", valor: SPRINT.resolve },
      { rotulo: "Preço de entrada", valor: `${entrada(SPRINT)}, do Sprint Essencial ao Avançado` },
      { rotulo: "Método", valor: `${METODO.length} passos, do processo real à próxima decisão` },
    ],
    problema: {
      titulo: "A operação trava entre as ferramentas que já existem.",
      texto:
        "Dados copiados de um sistema para outro, contato que espera resposta, tarefa repetida todo dia. O Sprint começa pelo processo e só automatiza o que sobra depois de simplificar.",
    },
    entregas: [
      { titulo: "Mapa do fluxo e linha de base", texto: "Como o processo acontece hoje, onde trava e os indicadores do ponto de partida." },
      { titulo: "Fluxo simplificado", texto: "As etapas que sobram depois de tirar o que não precisa existir." },
      { titulo: "Solução implantada", texto: "Integrações, automações ou agentes que o gargalo pede, testados e documentados." },
      { titulo: "Antes e depois", texto: "Os indicadores disponíveis comparados com a linha de base." },
      { titulo: "Próxima decisão", texto: "O registro do que mudou e o próximo passo, ou o encerramento." },
    ],
    como: {
      titulo: "O método,",
      apagado: "em seis passos.",
      texto: "Vale para os três Sprints. Muda o tamanho do gargalo e o número de sistemas envolvidos.",
    },
    comoFunciona: METODO,
    perguntas: [
      {
        pergunta: "Quanto custa um Sprint?",
        resposta: `${listaDePrecos(SPRINT)}. ${SPRINT_DE_PRECOS.texto}`,
      },
      {
        pergunta: "O que um Sprint entrega?",
        resposta:
          "Um projeto fechado para um gargalo delimitado: mapeamento do fluxo atual, priorização, implementação da solução acordada, testes e comparação dos indicadores disponíveis antes e depois. A proposta define o problema, os entregáveis, as exclusões, o prazo, as responsabilidades do cliente e os critérios de aceite.",
      },
      {
        pergunta: "Como funciona o pagamento?",
        resposta: CONDICOES.itens[1].texto,
      },
      {
        pergunta: "E depois que o Sprint termina?",
        resposta: `O Sprint termina na entrega. Se a solução continua rodando, ela pode seguir com as ${continuidade(1).nome} (${mensalEmTexto(continuidade(1).mensal)}) ou a ${continuidade(2).nome} (${mensalEmTexto(continuidade(2).mensal)}), opcionais. IA, mensagens e nuvem de sistemas ficam por fora, pelo valor do provedor.`,
      },
      {
        pergunta: "Vocês prometem aumento de vendas?",
        resposta:
          "Não. O preço remunera a entrega acordada. O que se mede é o indicador combinado antes de começar, comparado com a linha de base.",
      },
    ],
    relacionadas: ["agente", "crm", "automacao"],
  },
];

export function solucaoDa(rota: string): Solucao {
  const s = SOLUCOES.find((x) => x.rota === rota);
  if (!s) throw new Error(`Rota sem página de solução: ${rota}`);
  return s;
}

/** A mensagem do botão fixo de WhatsApp, por página de solução. */
export const mensagemDaSolucao = (s: Solucao) =>
  `Olá! Vi a página de ${capacidade(s.linha).nome} no ${MARCA_DO_SITE} e quero conversar sobre a minha empresa.`;
