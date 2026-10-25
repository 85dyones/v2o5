import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, MARCA_DO_SITE, VISAO_360, type Vinheta } from "@/conteudo/home";
import { BRL, capacidade, DEGRAUS, FOTOGRAFIA_PARCEIRA, linhaDePreco, plano, precoDa, REGRAS, USUARIOS_NO_CRM, type Pilar } from "@/conteudo/precos";
import type { Etapa } from "@/lib/tokens";

/**
 * As páginas de solução (plano, seções 3.2 e 4.2): uma por linha do
 * cardápio, com o H1 igual à busca-alvo, a resposta em duas frases no
 * primeiro parágrafo, o problema, o que entra, como funciona, o que roda na
 * Motors Store (só o que roda, com número do case), o preço da tabela e as
 * perguntas, que viram FAQPage. Tudo que é preço sai de `precos.ts`; tudo
 * que é número sai de `CASE`, `CASE_MOTORS` ou da evidência da Visão 360,
 * com fonte. `tests/solucoes.test.ts` confere.
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
  /** A capacidade em `precos.ts` (`CAPACIDADES`): o plano ou a linha de onde sai o preço. */
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
  perguntas: { pergunta: string; resposta: string }[];
  /** Ids de `LINHAS` (home.ts) que combinam com esta. */
  relacionadas: string[];
}

const presenca = plano("presenca");
const automacao = linhaDePreco("automacao");
const rastreamento = linhaDePreco("rastreamento");

export const SOLUCOES: Solucao[] = [
  {
    rota: "/criacao-de-sites",
    linha: "sites",
    pilar: "mapa",
    etapa: "violeta",
    vinheta: "site",
    sobretitulo: "Sites e presença",
    titulo: "Criação de site profissional com SEO e rastreamento.",
    resumo:
      "Site que carrega rápido no celular, aparece no Google e grava de onde veio cada contato. Hospedagem e manutenção na mensalidade.",
    fatos: [
      { rotulo: "Preço", valor: precoDa("sites") },
      {
        rotulo: "A mensalidade cobre",
        valor: "Hospedagem, manutenção, atualizações de segurança, SEO técnico, Perfil da Empresa no Google, rastreamento até a venda e relatório mensal",
      },
      {
        rotulo: "Em produção",
        valor: `Motors Store: site de estoque com ${CASE.numeros[2].valor} veículos sincronizados e ${CASE.numeros[1].valor} guias`,
      },
    ],
    problema: {
      titulo: "O site de template aparece bonito e some na busca.",
      texto:
        "Carrega devagar no celular, tem uma página só para todos os modelos ou serviços, e quem chega por um anúncio vira um contato sem origem. O Google só acha o que existe como página, e a verba de mídia não aprende com o que virou venda.",
    },
    entregas: [
      {
        titulo: "Páginas que o Google entende",
        texto:
          "Uma página por serviço, produto ou modelo, com título, descrição e dados estruturados. É o que faz a empresa aparecer na busca e nas respostas das IAs.",
      },
      {
        titulo: "Rápido no celular",
        texto:
          "Next.js com o mínimo de JavaScript, imagens no tamanho certo e o título carregando antes de tudo. Este site segue a mesma receita.",
      },
      {
        titulo: "Perfil da Empresa no Google",
        texto: "O antigo Google Meu Negócio, completo, verificado e ligado ao site, para quem busca perto aparecer no Maps.",
      },
      {
        titulo: "Origem de cada contato",
        texto:
          "Cada botão de WhatsApp e cada formulário gravam a campanha, o anúncio e a página de entrada. Sem isso, o rastreamento até a venda não tem por onde começar.",
      },
      {
        titulo: "Domínio, e-mail e hospedagem",
        texto:
          "Domínio e e-mail profissional entram na fundação do projeto. Hospedagem, atualizações de segurança e monitoramento ficam na mensalidade.",
      },
      {
        titulo: "O código é seu",
        texto: `Se sair, recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias. Sem fidelidade.`,
      },
    ],
    comoFunciona: [
      {
        titulo: "Diagnóstico",
        texto: "45 minutos com o fundador sobre presença, busca e o que a empresa vende, para priorizar o que entra no site.",
      },
      {
        titulo: "Estrutura e textos",
        texto: "Mapa de páginas pela busca real e textos escritos para o cliente, revisados com você antes de ir ao ar.",
      },
      {
        titulo: "Construção e medição",
        texto: "O site fica num endereço de teste e é medido no celular antes de publicar.",
      },
      {
        titulo: "Publicação e rotina",
        texto: "Troca de DNS, Search Console, Perfil da Empresa e o relatório mensal do que a busca trouxe.",
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
        resposta: `O site vem no plano Presença, a partir de ${BRL(presenca.implantacao)} de implantação e ${BRL(presenca.mensalidade)} por mês, junto com o Perfil da Empresa no Google, o SEO técnico, o rastreamento até a venda e o pedido de avaliação. A mensalidade cobre hospedagem, manutenção, atualizações de segurança e o relatório mensal. Domínio e e-mail profissional entram na fundação do projeto.`,
      },
      {
        pergunta: "Posso aproveitar o site que já tenho?",
        resposta:
          "O diagnóstico começa pelo site atual: velocidade, páginas, tags. Se a base for boa, a V2O5 trabalha em cima dela; se não, migra o conteúdo que vale e refaz o resto.",
      },
      {
        pergunta: "O site fica no meu nome?",
        resposta: `Sim. Domínio, hospedagem e código no nome da sua empresa desde o primeiro dia. Se sair, recebe tudo em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
      },
      {
        pergunta: "Preciso ter fotos e textos prontos?",
        resposta: `Os textos a V2O5 escreve e revisa com você. Fotos e vídeos ficam com a sua equipe ou com um fotógrafo parceiro que a V2O5 indica, a partir de ${BRL(FOTOGRAFIA_PARCEIRA.aPartirDe)} por mês.`,
      },
      {
        pergunta: "O site vem com loja virtual?",
        resposta:
          "Não. Loja com pagamento está fora do cardápio. O site vende por WhatsApp, formulário e telefone, com a origem de cada contato gravada.",
      },
    ],
    relacionadas: ["rastreamento", "agente", "redes"],
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
      { rotulo: "Preço", valor: precoDa("agente") },
      { rotulo: "Inclui", valor: `${DEGRAUS.conversas.bloco} conversas por mês, o CRM com ${USUARIOS_NO_CRM} usuários, ajustes de roteiro e da base de conhecimento, suporte` },
      { rotulo: "Por fora, pelo valor real", valor: "uso do modelo de IA e mensagens da API oficial do WhatsApp, na mesma fatura" },
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
        texto: "Número verificado no nome da empresa, modelo de mensagem aprovado e saída fácil. As mensagens são repassadas pelo valor da Meta.",
      },
      {
        titulo: "Roteiro ajustado todo mês",
        texto: "A V2O5 lê as conversas, corrige o roteiro e amplia a base de conhecimento. Entra na mensalidade.",
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
        resposta: `Pelo valor real, discriminados na mesma fatura. A mensalidade inclui ${DEGRAUS.conversas.bloco} conversas por mês; cada ${DEGRAUS.conversas.bloco} a mais custam ${BRL(DEGRAUS.conversas.valor)} por mês.`,
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
      { rotulo: "Preço", valor: precoDa("automacao") },
      { rotulo: "Manutenção", valor: "entra na mensalidade do CRM ou do site" },
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
      { titulo: "Manutenção", texto: "Ajustes e correções entram na mensalidade do CRM ou do site." },
    ],
    naMotors: {
      titulo: "Rodando na Motors Store.",
      texto:
        "Sincronização do estoque com o Revenda Mais, vendas incompletas e alertas de estagnação do funil, com WhatsApp pela Evolution API.",
      numeros: [CASE.numeros[2]],
    },
    perguntas: [
      {
        pergunta: "O que conta como um fluxo?",
        resposta: `Uma rotina do começo ao fim. A venda marcada no CRM que tira o carro do site, avisa o grupo e manda o obrigado ao cliente é um fluxo. Cada um custa a partir de ${BRL(automacao.implantacao!)}.`,
      },
      {
        pergunta: "Preciso trocar o sistema de gestão que já uso?",
        resposta:
          `Não. A V2O5 liga o que você já usa. Em produção hoje: o estoque do Revenda Mais sincronizado com o site da Motors Store. ${listaDeSistemasIntegraveis()} e outros sistemas entram como fluxo de integração.`,
      },
      {
        pergunta: "E quando o fluxo quebra?",
        resposta:
          "Ele avisa. Toda execução fica registrada, e a correção entra na manutenção, dentro da mensalidade do CRM ou do site.",
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
      "Cada contato num funil, com a origem, a etapa e o próximo passo à vista. Sem licença por usuário e no nome da sua empresa.",
    fatos: [
      { rotulo: "Preço", valor: precoDa("crm") },
      { rotulo: "Inclui", valor: `${USUARIOS_NO_CRM} usuários, o agente de IA no WhatsApp, banco próprio, backups e suporte` },
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
        titulo: "Sem licença por usuário",
        texto: `${USUARIOS_NO_CRM} usuários inclusos; usuário extra ${BRL(DEGRAUS.usuarioExtra)} por mês. Acima de ${DEGRAUS.dados.limite} de dados, mais ${BRL(DEGRAUS.dados.valor)} por mês.`,
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
    perguntas: [
      {
        pergunta: "Tem cobrança por usuário?",
        resposta: `O CRM vem com ${USUARIOS_NO_CRM} usuários, sem licença por pessoa. Acima disso, cada usuário extra custa ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
      },
      {
        pergunta: "Posso integrar com o sistema que já uso?",
        resposta: `Sim, por fluxo de automação, a partir de ${BRL(automacao.implantacao!)} por fluxo. Em produção hoje: o estoque do Revenda Mais. Para revendas, ${listaDeSistemasIntegraveis()} entram do mesmo jeito.`,
      },
      {
        pergunta: "O WhatsApp fica dentro do CRM?",
        resposta:
          "Sim. As conversas entram no funil com o histórico, pela API oficial ou pelo Chatwoot, e o agente de IA trabalha no mesmo lugar que a equipe.",
      },
      {
        pergunta: "E se eu sair?",
        resposta: `Você recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias. Sem fidelidade.`,
      },
      {
        pergunta: "Serve para qualquer setor?",
        resposta: "Serve. Os campos e as etapas são desenhados com você. O automotivo é o primeiro segmento com pacote pronto.",
      },
    ],
    relacionadas: ["agente", "painel", "automacao"],
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
      { rotulo: "Preço", valor: precoDa("rastreamento") },
      { rotulo: "A mensalidade cobre", valor: rastreamento.cobre },
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
        texto: "Todo mês a V2O5 confere a qualidade do dado: deduplicação, cobertura, parâmetros. Entra na mensalidade.",
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
];

export function solucaoDa(rota: string): Solucao {
  const s = SOLUCOES.find((x) => x.rota === rota);
  if (!s) throw new Error(`Rota sem página de solução: ${rota}`);
  return s;
}

/** A mensagem do botão fixo de WhatsApp, por página de solução. */
export const mensagemDaSolucao = (s: Solucao) =>
  `Olá! Vi a página de ${capacidade(s.linha).nome} no ${MARCA_DO_SITE} e quero conversar sobre a minha empresa.`;
