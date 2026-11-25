import { SITE_PADRAO } from "@/conteudo/sitePadrao";
import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, MARCA_DO_SITE, VISAO_360, type Vinheta } from "@/conteudo/home";
import { capacidade, mensalEmTexto, precoEmTexto, type Pilar } from "@/conteudo/precos";
import { ofertaDa, PLANOS_DE_CONTINUIDADE, precoDeEntrada, type IdOferta } from "@/conteudo/ofertas";
import type { Etapa } from "@/lib/tokens";

/**
 * As páginas de solução (plano, seções 3.2 e 4.2): uma por linha do
 * cardápio, com o H1 igual à busca-alvo, a resposta em duas frases no
 * primeiro parágrafo, o problema, o que entra, como funciona, o que roda na
 * Motors Store (só o que roda, com número do case) e as perguntas, que viram
 * FAQPage. Há dois tipos: as páginas das soluções (`oferta`: Presença, Sites
 * e, desde 25/11/2026, o Atendimento com IA na página do agente, no lugar do
 * Sprint), com os pacotes e o preço de referência de `ofertas.ts`; e as
 * páginas de recurso (CRM e automação), sem valor, que dizem como a linha
 * entra no Atendimento com IA. Todo preço citado aqui sai de `ofertas.ts`,
 * nunca digitado. Tudo que é número
 * sai de `CASE`, `CASE_MOTORS` ou da evidência da Visão 360, com fonte. `tests/solucoes.test.ts` confere.
 *
 * Sobre o agente: desde 17/11/2026 a página cita o Ney, agente de IA da
 * Motors Store em produção desde 21/10, com os números de
 * `CASE_MOTORS.atendimento`; a demonstração rotulada como fictícia continua.
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
  naMotors?: { titulo: string; texto: string; numeros: Numero[]; /** Quando os números não são os do funil (o Ney). */ fonte?: string };
  /** Página de recurso: como a linha entra no Atendimento com IA, a ficha "Na solução" (sem valor). */
  naSolucao?: string;
  /** Página de solução (27/10/2026): os pacotes de `ofertas.ts` no lugar da ficha "Na solução". */
  oferta?: IdOferta;
  /** Título e texto da seção "como funciona", quando não é "Do diagnóstico ao ar.". */
  como?: { titulo: string; apagado: string; texto: string };
  perguntas: { pergunta: string; resposta: string }[];
  /** Ids de `LINHAS` (home.ts) que combinam com esta. */
  relacionadas: string[];
}

const SITES = ofertaDa("sites");
const PRESENCA = ofertaDa("presenca");
const ATENDIMENTO = ofertaDa("atendimento");
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
      { rotulo: "Preço de entrada", valor: `${entrada(SITES)}, da landing page ao site conectado` },
      { rotulo: "Entrega-base", valor: "Onze itens iguais em todo site da V2O5, das páginas que o Google entende à entrega documentada" },
      {
        rotulo: "Em produção",
        valor: `Motors Store: site de estoque com ${CASE.numeros[1].valor} veículos sincronizados e ${CASE.numeros[0].valor} guias`,
      },
    ],
    problema: {
      titulo: "O site de template aparece bonito e some na busca.",
      texto:
        "Carrega devagar no celular, tem uma página só para todos os produtos ou serviços, e quem chega pelo Google vira um contato sem origem. O Google só acha o que existe como página, e o contato que chega pelo site não aparece no sistema da empresa.",
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
      numeros: [CASE.numeros[1], CASE.numeros[0]],
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
          "No Site Conectado, sim. A integração entra na proposta depois de verificar a documentação, o acesso, os limites e os custos do sistema. Compatibilidade com qualquer sistema não é prometida.",
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
    relacionadas: ["agente", "avaliacoes", "crm"],
  },
  {
    rota: "/agente-de-ia-para-whatsapp",
    linha: "atendimento",
    oferta: "atendimento",
    pilar: "operacao",
    etapa: "ambar",
    vinheta: "agente",
    sobretitulo: "Atendimento com IA",
    titulo: "Agente de IA para WhatsApp que responde, qualifica e agenda.",
    resumo:
      "WhatsApp organizado e um agente de IA que responde na hora. Quando a conversa pede uma pessoa, chama alguém da equipe.",
    fatos: [
      { rotulo: "Resolve", valor: ATENDIMENTO.resolve },
      { rotulo: "Preço de entrada", valor: `${entrada(ATENDIMENTO)}, do Atendimento Essencial ao Integrado` },
      { rotulo: "Custos de terceiros", valor: "Uso do modelo de IA e mensagens do WhatsApp, pelo valor do provedor, discriminados na proposta" },
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
          "Base de conhecimento com produtos, serviços, horários, condições e perguntas frequentes. O agente só fala do que está lá, e diz quando não sabe.",
      },
      {
        titulo: "Qualifica antes de passar",
        texto:
          "Pergunta o que importa para o seu funil (interesse, prazo, forma de pagamento, região) e registra no CRM com a origem do contato.",
      },
      {
        titulo: "Agenda e avisa",
        texto: "Marca horário, visita ou reunião na agenda da equipe e avisa o responsável no WhatsApp.",
      },
      {
        titulo: "Passa para uma pessoa",
        texto:
          "Quando a conversa pede alguém, o agente chama a pessoa certa da equipe com o histórico inteiro. Ninguém pergunta tudo de novo.",
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
    naMotors: {
      titulo: "O Ney, na Motors Store.",
      texto:
        "O agente de IA da loja responde com o estoque real, preenche a ficha do cliente e passa o lead pronto ao CRM do Revenda Mais quando ele marca a visita, chega à simulação ou pede uma pessoa.",
      numeros: [CASE_MOTORS.atendimento.numeros[1], CASE_MOTORS.atendimento.numeros[2]],
      fonte: CASE_MOTORS.atendimento.fonte,
    },
    perguntas: [
      {
        pergunta: "Quanto custa?",
        resposta: `${listaDePrecos(ATENDIMENTO)}. São preços de referência: o valor fechado sai em proposta, depois de conhecer o atendimento de hoje e o sistema que o agente precisa ligar.`,
      },
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
          "São custos de terceiros: o modelo de IA e as mensagens do WhatsApp. Ficam discriminados na proposta, separados do valor da implantação, com teto mensal combinado e aviso antes de ultrapassá-lo.",
      },
      {
        pergunta: "Preciso de um CRM?",
        resposta:
          "O agente registra cada conversa no CRM da V2O5 ou, por integração, no sistema que você já usa. Sem um lugar para registrar, a origem e o desfecho se perdem.",
      },
    ],
    relacionadas: ["crm", "automacao", "posvenda"],
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
      { rotulo: "Na solução", valor: "Entra no Atendimento com IA quando uma tarefa repetida trava o atendimento ou a venda" },
      { rotulo: "Manutenção", valor: "definida na proposta ou na continuidade, se contratada" },
      { rotulo: "Em produção", valor: `Motors Store: ${CASE.numeros[1].valor} veículos sincronizados com o Revenda Mais` },
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
        "Sincronização do estoque com o Revenda Mais, entrada das conversas do WhatsApp pela Evolution API, rodada do atendimento a cada 15 minutos e alerta de falha de integração.",
      numeros: [CASE.numeros[1]],
    },
    naSolucao:
      "A automação entra no Atendimento com IA quando uma tarefa repetida trava o atendimento: avisar a equipe, registrar o contato, atualizar o estoque ou o catálogo do site. A proposta diz quantos fluxos entram e o que cada um faz.",
    perguntas: [
      {
        pergunta: "O que conta como um fluxo?",
        resposta: `Uma rotina do começo ao fim. A venda marcada no CRM que tira o produto do site, avisa o grupo e manda o obrigado ao cliente é um fluxo. A proposta diz quantos fluxos entram.`,
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
      { rotulo: "Na solução", valor: "Entra no Atendimento com IA quando os contatos ficam espalhados entre conversas e planilhas" },
      { rotulo: "O que entra", valor: "Funil e campos do seu negócio, WhatsApp dentro do CRM, banco próprio, backups e treinamento da equipe, conforme o escopo" },
      { rotulo: "Em produção", valor: "Motors Store: lead qualificado pelo agente de IA no CRM do Revenda Mais, com a origem e a ficha" },
    ],
    problema: {
      titulo: "O funil vive no WhatsApp de cada vendedor.",
      texto:
        "Quando o vendedor sai, os contatos vão junto. Ninguém sabe quantos leads chegaram no mês, de onde vieram nem quantos viraram venda. O CRM de prateleira resolve metade e cobra por cabeça.",
    },
    entregas: [
      {
        titulo: "Funil com origem",
        texto: "Cada contato entra com a origem: Google, Instagram, site ou indicação. A venda sai com a origem conhecida.",
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
        texto: "Quantos usuários e quanto de dado entram é definido na proposta, conforme o tamanho da equipe e da base.",
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
      texto:
        "O lead qualificado pelo Ney vai ao CRM do Revenda Mais com a origem, o carro e a ficha, e o painel da loja mostra quem está com o agente, quem já foi ao CRM e quem precisa do dono.",
      numeros: [CASE_MOTORS.numeros.itens[0], CASE_MOTORS.atendimento.numeros[2]],
    },
    naSolucao:
      "O CRM entra no Atendimento com IA quando os contatos se perdem entre conversas e planilhas. No Essencial, a lista de contatos com a origem; no Integrado, a ligação com o CRM ou o sistema que a empresa já usa, com as etapas e os campos desenhados com a equipe.",
    perguntas: [
      {
        pergunta: "Como ficam os usuários e o volume de dados?",
        resposta: "Definidos na proposta, conforme o tamanho da equipe e da base de contatos.",
      },
      {
        pergunta: "Posso integrar com o sistema que já uso?",
        resposta: `Sim, por integração, no Atendimento Integrado. Em produção hoje: o estoque do Revenda Mais. Para revendas, ${listaDeSistemasIntegraveis()} entram do mesmo jeito.`,
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
        resposta: "Serve. Os campos e as etapas são desenhados com você. Revenda de veículos é o segmento com case: a Motors Store.",
      },
    ],
    relacionadas: ["agente", "automacao", "posvenda"],
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
    resumo: "Perfil no Google, redes e WhatsApp organizados, com pedido de avaliação, modelos de conteúdo e, se quiser, a rotina mensal de publicações.",
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
        titulo: "Avaliações no Google",
        texto: "Link direto e mensagem pronta para pedir a avaliação a quem comprou. Avaliação recente pesa na busca do bairro.",
      },
      {
        titulo: "Modelos de conteúdo",
        texto: "Modelos com a identidade da empresa, para publicar sem começar do zero.",
      },
      {
        titulo: "Calendário e campanhas",
        texto: "As datas e as épocas do ramo, com campanhas prontas, na Presença Estruturada.",
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
        texto: "A mensalidade opcional: atualizações nos canais ou o kit mensal de conteúdo.",
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
          "No kit da Presença Estruturada, quatro peças e uma campanha por mês. Nenhum pacote tem publicação ilimitada.",
      },
      {
        pergunta: "Vocês respondem os comentários e as mensagens?",
        resposta:
          "A resposta a comentários e mensagens fica com a sua equipe. A V2O5 organiza os canais. Para o WhatsApp responder sozinho, existe o Atendimento com IA.",
      },
      {
        pergunta: "Vocês pedem as avaliações por mim?",
        resposta:
          "A V2O5 prepara o link direto e a mensagem, e a sua equipe manda para quem comprou. Avaliação comprada ou trocada por brinde vai contra as regras do Google.",
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
];

export function solucaoDa(rota: string): Solucao {
  const s = SOLUCOES.find((x) => x.rota === rota);
  if (!s) throw new Error(`Rota sem página de solução: ${rota}`);
  return s;
}

/** A mensagem do botão fixo de WhatsApp, por página de solução. */
export const mensagemDaSolucao = (s: Solucao) =>
  `Olá! Vi a página de ${capacidade(s.linha).nome} no ${MARCA_DO_SITE} e quero conversar sobre a minha empresa.`;
