# Novo site da V2O5: projeto e escopo

Rascunho para discussão, 08/10/2026. Nada foi implementado. As decisões em aberto estão na seção 12 e precisam de resposta antes do código.

## 0. Resumo

O site atual vende IA, automação e produção de sites, mas é um WordPress com Elementor que carrega uma foto de 1,4 MB, abre em inglês para o Google, não tem descrição em nenhuma página e ainda publica o "Hello world!" de instalação. Quem chega pela indicação de um cliente da Motors e abre o v2o5.com.br encontra o oposto do que foi entregue lá.

A proposta é reconstruir o site sobre a mesma base técnica da Motors (Next.js, Tailwind, Supabase, Vercel, n8n), com identidade própria, e tratar o site como a primeira prova da oferta. Cada coisa que a V2O5 promete a um cliente precisa estar funcionando no próprio site e ser verificável por quem visita: velocidade medida, SEO, rastreamento até a venda e atendimento automatizado no WhatsApp.

A Motors entra como case principal. É o maior ativo comercial da V2O5 hoje, e o site atual não menciona.

## 1. Diagnóstico do site atual

### 1.1 O que foi medido

Coleta feita em 08/10/2026 a partir deste ambiente. Lighthouse 12.6, perfil mobile com limitação simulada. Os números de laboratório passam por um proxy e servem para comparar, não como valor absoluto; a Motors foi medida nas mesmas condições.

| Item | v2o5.com.br hoje | Observação |
|---|---|---|
| Plataforma | WordPress 6.8, Astra, Elementor, Hostinger (LiteSpeed) | 5 plugins na home, jQuery, Font Awesome inteiro |
| Performance (Lighthouse mobile) | 51 | |
| LCP | 13,5 s | O elemento LCP é o fundo do hero: `12-1.jpg`, 1.397 KiB |
| TBT | 600 ms | GA via Site Kit (175 KiB) e o cliente de login do Google (100 KiB) sem uso visível |
| Peso total | 2.074 KiB | Para 2.142 caracteres de texto na home |
| Idioma declarado | `lang="en-US"` | Site em português |
| Meta description | Nenhuma página tem | |
| Dados estruturados (JSON-LD) | Nenhum | Sem Organization, Service, FAQ ou Person |
| Hierarquia de títulos | H3 antes do H1 | O método "em 4 passos" está numerado 1, 2, 2, 4 |
| Sitemap | Lista `/hello-world/`, `/test-post/` e `/blog/` vazio | As três respondem 200 |
| Sitemap de usuários | Publica `/author/dyones/` | Expõe o login do WordPress |
| Páginas | 4 (início, jornada, soluções, contrate) | Nenhuma mira uma busca com demanda |
| Prova | Nenhum case, número, logo, depoimento ou foto | |
| Rastreamento | Tag Google `GT-PBNTV3FG` via Site Kit | Sem eventos de conversão, sem Meta, sem UTM no lead |
| Conversão | Botões levam a `/contrate`, que leva a um Typebot | Nenhum link de WhatsApp no site |

### 1.2 O problema de fundo

A V2O5 diz que faz sites que ranqueiam e convertem, rastreamento e automação com IA. O site não ranqueia (não há página mirando busca nenhuma), não mede conversão e não automatiza nada que o visitante perceba. Para um prospect técnico ou para alguém que compara agências, isso encerra a conversa.

Há também um problema de oferta. A página de soluções põe no mesmo nível "Instagram, Facebook, Google Meu Negócio, e-mail profissional" e "automações e SaaS sob medida". O pacote de presença básica é o mais fácil de entender e puxa a percepção de preço para baixo. A promessa "escalamos seu negócio com IA em 10 dias" aparece sem nenhum número que a sustente, e a escassez "só 5 diagnósticos por semana" é um recurso comum em landing pages que o público já reconhece.

### 1.3 O que aproveitar

O método em etapas (diagnóstico, plano em 24 h, execução curta, evolução com dados) é bom e fica, com nomes e numeração revistos. A história de 1992 vai para a página Sobre. O site tem quatro páginas e dois posts de teste, então a migração preserva pouco além das URLs atuais, que ganham redirecionamento.

## 2. O que o site não mostra

O que a V2O5 entregou para a Motors Store, segundo o repositório `motors-site-oficial`:

- site em Next.js com vitrine, ficha de veículo, páginas de marca e modelo e seis páginas locais escritas à mão;
- hub de conteúdo com 26 guias, método editorial próprio, schema por página, `llms.txt` e IndexNow;
- rastreamento com camada de dados versionada e testada, Meta Pixel com CAPI deduplicado por `event_id`, GA4, GTM e captura de UTM e click IDs no lead;
- painel administrativo com funil de leads, estoque, clientes, investidores e mídia paga;
- automações no n8n (sincronização de estoque com o RevendaMais, vendas incompletas, alertas de estagnação do funil) com WhatsApp via Evolution API e atribuição no Chatwoot;
- gerador de descritivo de veículo com LLM, com validação contra invenção de dados.

Isso é um case completo de aquisição e operação, do anúncio à venda. Os outros repositórios da conta (smart-parking-v2o5, rede-auto, freespot, Motogestor-v3, 16V) podem render mais cases ou produtos; depende do que pode ser mostrado (seção 12).

O fato de o mesmo autor assinar os guias da Motors e fundar a V2O5 precisa aparecer no case de forma explícita. Esconder isso e ser descoberto depois custa mais do que declarar.

## 3. Posicionamento e oferta (proposta)

### 3.1 Tese

A V2O5 monta o sistema que leva o cliente do primeiro clique até a venda fechada: site que aparece no Google, rastreamento que diz de onde veio cada venda, e automação com IA que atende e acompanha o lead. O cliente fica com o sistema.

O diferencial frente às agências de automação pesquisadas (seção 4.1) é juntar as três pontas num projeto só e provar com um case que tem número.

### 3.2 Linhas de serviço

| Linha | O que entrega | Página |
|---|---|---|
| Sites que ranqueiam | Site ou landing em Next.js, SEO técnico, conteúdo com método, Core Web Vitals no verde | `/criacao-de-sites` |
| Rastreamento e atribuição | GA4, GTM, Meta CAPI, conversões otimizadas do Google Ads, UTM e click ID no CRM, conversão offline | `/rastreamento-e-atribuicao` |
| Automação e agentes de IA | Atendimento no WhatsApp com IA, n8n, integrações, follow-up, alertas de funil | `/automacao-com-ia` e `/agente-de-ia-whatsapp` |
| Sistemas sob medida | CRM, painel, funil, integrações com ERP | `/sistemas-sob-medida` |

A porta de entrada continua sendo um diagnóstico gratuito, com entrega concreta: em uma conversa de 45 minutos a V2O5 olha site, rastreamento, atendimento e funil, e em até 24 h envia o mapa com as três mudanças de maior retorno, custo e prazo. O "Start Digital" (redes, Perfil de Empresa no Google, e-mail) sai do cardápio público e vira a etapa de fundação dentro dos projetos de site. Decisão em aberto na seção 12.

### 3.3 Conceito de marca

V2O5 é a fórmula do pentóxido de vanádio, catalisador usado na produção industrial de ácido sulfúrico. Um catalisador acelera uma reação e continua lá no fim. Isso descreve bem a proposta: a V2O5 acelera o negócio e o sistema fica com o cliente.

O vanádio tem uma propriedade visual que pode virar sistema de cor. Em solução, cada estado de oxidação tem uma cor: V²⁺ violeta, V³⁺ verde, V⁴⁺ azul, V⁵⁺ amarelo. Quatro estados, quatro linhas de serviço. O amarelo-âmbar do V⁵⁺ (o do V2O5) fica como cor de ação; as outras três aparecem só em diagramas e etiquetas das linhas.

Precisa de confirmação: se o nome veio mesmo daí, e se a marca atual (logo e o trocadilho "ConsultorIA") fica.

## 4. Mercado, busca e arquitetura de páginas

### 4.1 Concorrência e referências

(preenchido a partir da pesquisa de mercado, ver abaixo)

### 4.2 Mapa de páginas

(preenchido a partir da pesquisa de mercado, ver abaixo)

### 4.3 Redirecionamentos do site atual

| De | Para | Código |
|---|---|---|
| `/jornada/` | `/sobre` | 301 |
| `/solucoes/` | `/` (ou `/servicos`, se existir hub) | 301 |
| `/contrate/` | `/diagnostico` | 301 |
| `/politica-privacidade/` | `/privacidade` | 301 |
| `/blog/` | `/guias` | 301 |
| `/author/dyones/` | `/sobre` | 301 |
| `/hello-world/`, `/test-post/` | | 410 |
| `/feed/`, `/comments/feed/`, `/wp-sitemap*.xml` | `/sitemap.xml` ou 410 | 301/410 |

Os redirecionamentos ficam em `next.config.ts` e um teste trava a lista, como na Motors.

### 4.4 SEO técnico

Herdado da Motors e aplicado desde o primeiro deploy:

- `lang="pt-BR"`, `metadataBase` pelo domínio, canonical relativo por página e nunca no layout raiz;
- título e descrição únicos por página, travados por teste;
- `sitemap.ts` com `lastModified` real e `robots.ts` com o grupo de robôs de IA igual ao grupo geral;
- `llms.txt` com os fatos citáveis da V2O5 e o índice de páginas, nos moldes do da Motors;
- IndexNow por cron na Vercel;
- imagens via `next/image`, fontes locais com métricas de fallback, sem jQuery, sem biblioteca de ícones inteira;
- 404 que mantém o status e oferece saída (serviços, cases, diagnóstico).

### 4.5 Dados estruturados

Um grafo por página, montado por funções puras e testado pela contagem de nós, como na Motors:

- `Organization` + `ProfessionalService` com `@id` estável, `sameAs` para Instagram, LinkedIn e Perfil de Empresa, `areaServed` Curitiba e Brasil;
- `Person` do fundador (`/sobre#autor`), ligado como autor dos guias e como `founder`;
- `Service` em cada página de linha, com `provider` apontando para a organização;
- `Article` e `FAQPage` nos guias; `BreadcrumbList` em todas as internas;
- nos cases, `Article` com `about` apontando para a organização do cliente.

Sem `AggregateRating` próprio (regra T7 da Motors).

### 4.6 Conteúdo

O método da Motors (`conteudo-seo/pacote/00-guia-normativo.md`) vale quase inteiro: os cinco critérios eliminatórios para um tema entrar, a anatomia do guia (H1 igual à busca, resposta em duas frases no primeiro parágrafo, 3 a 6 H2, FAQ idêntico ao schema), uma única saída comercial por guia e publicação em ondas por cluster. As travas específicas de carro (T1, T2, T8) saem; entram travas da V2O5, por exemplo nunca prometer resultado sem número de case e nunca citar preço de ferramenta de terceiro sem data.

O "lugar vazio" da V2O5 é escrever com dados de uma operação real (a da Motors, com autorização) sobre temas que concorrentes tratam em abstrato: quanto tempo de resposta no WhatsApp custa em venda, como medir de onde veio a venda quando o fechamento é offline, o que o pixel deixa de contar e o CAPI recupera.

Os textos passam pelo humanizer e por um teste de marcas de IA, como na Motors.

### 4.7 Busca por IA (GEO/AEO)

(preenchido a partir da pesquisa de mercado, ver abaixo)

## 5. Design e motion

### 5.1 Direção visual

A arquitetura do Modernist vem inteira: tokens `--brand-*` derivados por `color-mix`, `@theme` do Tailwind 4, classes em `@layer components`, régua de 2 px entre seções, seções numeradas, rótulos em caixa alta espaçada, raio mínimo, contraste AA testado. A Motors já provou que esse sistema é leve e acessível.

A identidade muda. Proposta para validar em tela antes de codar:

- base clara de papel com seções escuras de tinta onde o assunto é o sistema (diagramas, rastreamento, código), em vez do visual escuro com degradê roxo e esferas brilhantes que quase toda agência de IA usa;
- âmbar V⁵⁺ como única cor de ação; violeta, verde e azul só para identificar linhas de serviço em diagramas;
- tipografia em duas famílias (regra testada na Motors): uma grotesca para display e texto e uma mono para rótulos, números e trechos de fluxo. Geist com Geist Mono é a opção de partida; a alternativa é manter a Archivo para títulos e trocar só o texto.

Antes de implementar, a ideia é montar dois estudos visuais da home (hero e uma seção de case) para você escolher.

### 5.2 Motion

A Motors usa quase só CSS: régua que se desenha, número que conta, foto que surge. Para a V2O5 o motion precisa ser parte da prova, porque é uma das coisas que ela vende, sem custar a performance que ela também vende.

- Peça principal: no hero, um diagrama em SVG mostra o caminho de um lead (busca ou anúncio, site, WhatsApp, agente de IA, CRM, venda) com os nós acendendo em sequência e o evento correspondente aparecendo em mono (`generate_lead`, `event_id`, `gclid`). O diagrama é montado no servidor e animado com CSS (`offset-path`, `stroke-dashoffset`).
- Seções que reagem à rolagem com `animation-timeline: view()` dentro de `@supports`, com fallback estático.
- View Transitions entre páginas, pelo suporte do React 19.2 (no Next 16 ainda atrás de flag experimental). Navegador sem suporte troca de página normalmente.
- Nenhuma biblioteca de animação por padrão. Se uma peça pedir orquestração em JS, ela entra isolada e carregada sob demanda só naquela seção.
- `prefers-reduced-motion` respeitado em tudo, com teste, como na Motors.

O diagrama não mostra dado inventado como se fosse real. Se exibir números, eles vêm do case com fonte, ou o rótulo diz que é demonstração.

## 6. Conversão

### 6.1 Caminhos

1. Diagnóstico (principal): formulário curto em `/diagnostico` e em blocos nas páginas de serviço. Campos: nome, WhatsApp, e-mail, site atual, o que quer resolver (opções), porte (opcional). Ao enviar, vai para `/diagnostico/recebido` com o que acontece em seguida e o link de agenda.
2. WhatsApp (secundário): botão fixo no mobile, mensagem pré-preenchida por página.
3. Ferramenta (fase 3): Raio-X do site. A pessoa informa a URL e recebe performance, SEO básico e tags de rastreamento encontradas. Atrai quem tem site ruim, que é o público, e demonstra competência na hora.

### 6.2 O próprio site como demonstração

O lead que chega pelo formulário recebe uma mensagem no WhatsApp em menos de um minuto, enviada pelo agente da V2O5 rodando no n8n, Evolution API e Chatwoot que já estão no ar em `n8n.v2o5.com.br`, `evolution.v2o5.com.br` e `chat.v2o5.com.br`. O agente confirma o pedido, faz duas ou três perguntas de qualificação e oferece horário. Quem pediu automação de atendimento vê uma funcionando com ele mesmo.

Na página de rastreamento, um bloco mostra ao visitante o que o site registrou da visita dele (origem, UTM, páginas vistas), com o texto de privacidade ao lado. Isso explica o serviço melhor que um parágrafo.

No rodapé, "este site em números": peso da página, LCP medido em campo pelo Speed Insights e quantidade de scripts de terceiros.

### 6.3 Prova

- Case Motors com contexto, problema medido, o que foi construído, resultado em número, stack e depoimento. Depende de autorização e dos números (seção 12).
- Fundador com nome, foto e trajetória na página Sobre e na assinatura dos guias.
- Faixa de preço por linha de serviço ("projetos a partir de"), se você topar publicar. Filtra lead fora do perfil.
- CNPJ, cidade e canais no rodapé.

## 7. Rastreabilidade

### 7.1 A lição da Motors

No Lighthouse de hoje, a Motors bloqueia a thread principal por cerca de 2,4 s no mobile (TBT 2.450 ms). O Pixel da Meta responde por 1.362 ms e o GTM por 1.060 ms. O rastreamento está correto e está custando performance. A V2O5 não pode repetir isso no próprio site, e a solução vira serviço a oferecer, inclusive para a Motors.

### 7.2 Arquitetura proposta

- Conversões saem do servidor. `POST /api/leads` grava no Supabase, envia `Lead` ao Meta CAPI e `generate_lead` ao GA4 (Measurement Protocol) com o mesmo `event_id` que o navegador usa, e avisa o n8n.
- No navegador, a camada de dados é código do site (como `src/lib/dataLayer.ts` da Motors) e as tags de terceiros carregam depois do conteúdo principal. Meta Pixel só entra se houver campanha de remarketing ativa.
- Opção a decidir: GTM server-side num subdomínio próprio (`sinal.v2o5.com.br`), hospedado na VPS que já existe ou em serviço gerenciado. Tira as tags do navegador e melhora a coleta com bloqueadores. É mais infra para manter.
- Orçamento: scripts de terceiros somam no máximo 50 ms de bloqueio no Lighthouse mobile. Se passar, o build avisa.

### 7.3 Eventos

Mesma estrutura da Motors, com nomes da V2O5. Nenhum dado pessoal na camada de dados.

| Evento | Quando | Parâmetros principais |
|---|---|---|
| `page_context` | Toda página | `page_type` (home, servico, case, guia, diagnostico, sobre), `service_line` |
| `cta_click` | Clique em CTA | `cta_location`, `cta_label` |
| `click_whatsapp` | Clique no WhatsApp | `whatsapp_location`, `pos_lead` |
| `form_start` | Primeiro campo preenchido | `form_id` |
| `generate_lead` | Envio aceito pelo servidor | `lead_type`, `form_id`, `event_id` |
| `schedule_call` | Agenda confirmada (webhook da agenda) | `event_id` |
| `tool_use` | Raio-X executado (fase 3) | `tool_name` |

Conversões primárias: `generate_lead` e `schedule_call`. `click_whatsapp` com `pos_lead=true` fica fora da contagem, regra que a Motors já aprendeu.

### 7.4 Atribuição até a venda

O lead grava primeiro e último toque (UTM, `gclid`, `gbraid`, `wbraid`, `fbclid`, `_fbc`, `_fbp`, página de entrada, referrer). A Motors guarda só o último entre visitas; aqui os dois ficam. Quando o negócio fecha no CRM da V2O5, o n8n envia a conversão offline ao Google Ads (pelo `gclid`) e ao Meta (CAPI, evento de compra) com o valor. A V2O5 passa a saber quanto cada canal vendeu, e esse fluxo é o que ela vende como "rastreabilidade".

### 7.5 Consentimento

A Motors usa interesse legítimo e um aviso informativo. Para uma empresa que vende rastreamento, a recomendação é Consent Mode v2 com banner de aceitar e recusar, funcionando direito, e conversões de lead pelo servidor com base no envio do formulário e no aviso de privacidade. Decisão sua, com orientação jurídica se precisar.

## 8. Stack e engenharia

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 16, App Router, React 19, TypeScript | Mesma base da Motors |
| Estilo | Tailwind 4 + arquitetura Modernist | Tokens e classes já testados |
| Conteúdo | MDX no repositório para guias e cases | O autor é quem desenvolve; o conteúdo vira PR, é revisado e gerado estático. A Motors usa banco porque a equipe da loja edita pelo painel |
| Dados | Supabase (leads e eventos) | Projeto novo, separado da Motors |
| Automação | n8n, Evolution API, Chatwoot já na VPS da V2O5 | Já existe |
| Anti-spam | Turnstile + rate limit Upstash ligado desde o início | Na Motors o rate limit nunca foi ativado em produção |
| Hospedagem | Vercel | DNS fica na Hostinger; muda só o apex e o `www` |
| Segurança | CSP e cabeçalhos de segurança em `next.config.ts` | Lacuna conhecida da Motors |
| Qualidade | Vitest para travar decisões, ESLint, Lighthouse CI no preview | Cultura da Motors |
| Convenção | Código, tabelas e commits em português | Igual à Motors |

Testes que travam decisões desde o início: contraste AA da paleta, no máximo duas famílias de fonte, título e descrição únicos, grafo JSON-LD por página, robôs de IA iguais ao grupo geral, lista de redirecionamentos do site antigo, contrato da camada de dados, contrato do webhook de lead, textos sem marcas de IA e orçamento de JS por rota.

## 9. Metas e critérios de aceite

Para o lançamento:

- Lighthouse mobile ≥ 95 em performance, acessibilidade, boas práticas e SEO em todas as páginas;
- LCP ≤ 1,8 s, TBT ≤ 150 ms e CLS ≤ 0,05 no laboratório; Core Web Vitals "bom" no CrUX depois de 28 dias de tráfego;
- JS da home ≤ 130 KB comprimido; peso total da home ≤ 500 KB;
- toda página com título, descrição, canonical e JSON-LD válidos (Rich Results Test sem erro);
- `generate_lead` chegando no GA4 (DebugView) e no Meta (Test Events) com `event_id` deduplicado, e o lead no Supabase com primeiro e último toque;
- redirecionamentos do site antigo respondendo 301/410 e nenhuma URL antiga com 404;
- e-mail, n8n, Chatwoot e Evolution funcionando depois da troca de DNS.

Para os 90 dias seguintes (acompanhamento, não critério de aceite): leads qualificados por mês, diagnósticos agendados, cliques orgânicos não-marca no Search Console, consultas em que a V2O5 aparece em respostas de IA.

## 10. Fases

### Fase 0: decisões (esta conversa)

Respostas da seção 12, números e autorização do case Motors, escolha visual entre os dois estudos.

### Fase 1: lançamento

- base do projeto (Next.js, tokens, fontes, primitivos, testes de trava, CI, cabeçalhos de segurança);
- páginas: home, quatro páginas de serviço, case Motors, sobre, diagnóstico e recebido, privacidade, 404;
- SEO técnico, schema, sitemap, robots, `llms.txt`, redirecionamentos;
- formulário, `/api/leads`, Supabase, Turnstile, rate limit, webhook n8n, mensagem automática no WhatsApp;
- camada de dados, GA4, CAPI pelo servidor, captura de primeiro e último toque, consentimento;
- deploy na Vercel, troca de DNS do apex e `www`, Search Console com o sitemap novo.

O WordPress fica no ar em subdomínio de backup por 30 dias antes de cancelar a hospedagem.

### Fase 2: conteúdo e alcance

- hub `/guias` e a primeira onda (6 a 8 guias de um cluster só);
- página vertical de revendas de veículos;
- até duas páginas locais de Curitiba, cada uma escrita à mão (sem gerador, mesma regra da Motors);
- segundo case, se houver;
- Perfil de Empresa no Google revisado e NAP igual em todos os canais.

### Fase 3: produto e atribuição completa

- Raio-X do site como ferramenta de captação;
- agente de qualificação no WhatsApp com agenda integrada;
- conversões offline do CRM para Google Ads e Meta;
- GTM server-side, se a decisão da 7.2 for por ele;
- "este site em números" com dado de campo.

## 11. Fora do escopo

- painel administrativo para editar o site (o conteúdo vive no repositório);
- versão em inglês (dá para planejar `hreflang` depois);
- loja ou pagamento online;
- mídia paga (o site fica pronto para ela; campanha é outro projeto);
- migração do e-mail da Hostinger.

## 12. Decisões em aberto

1. Público: PME em geral, com revendas de veículos como vertical de prova, ou foco declarado em revendas e concessionárias desde a home?
2. Oferta: o Start Digital sai do cardápio público e vira fundação dos projetos de site? O diagnóstico continua gratuito e a escassez "5 por semana" é real?
3. Case Motors: pode publicar nome, logo e quais números (leads por mês, tempo de resposta, tráfego orgânico, conversões rastreadas)? Há depoimento? Como declarar a relação do fundador com a loja?
4. Outros projetos (smart-parking-v2o5, rede-auto, freespot, Motogestor-v3, 16V): algum é cliente ou produto que possa virar case?
5. Marca: o nome vem do pentóxido de vanádio? O logo atual fica? O "ConsultorIA" fica?
6. Preço: publicar faixa "a partir de" por linha de serviço?
7. Fundador: usar nome completo e foto (Dyones Oliveira, como nos guias da Motors)?
8. Agenda: Cal.com, agenda do Google ou só WhatsApp?
9. Consentimento: Consent Mode v2 com banner (recomendado) ou interesse legítimo como na Motors?
10. GTM server-side já na fase 1, na fase 3 ou não usar?
11. Contas: Vercel e Supabase na mesma conta/organização da Motors ou separadas?

## 13. Riscos

| Risco | Mitigação |
|---|---|
| Troca de DNS derrubar e-mail ou os subdomínios da VPS | Mudar só o registro do apex e do `www`; conferir MX, SPF, DKIM, DMARC e os A de `n8n`, `chat`, `chatwoot` e `evolution` antes e depois |
| Case sem número vira texto de agência genérica | Não publicar o case sem pelo menos dois números com fonte e período |
| Motion pesar e contradizer a promessa de performance | Orçamento de JS por rota e Lighthouse CI bloqueando o merge |
| Conteúdo de IA genérico | Método da Motors: critério do lugar vazio, dado próprio, humanizer e teste de marcas |
| Rastreamento sem consentimento adequado | Decisão 9 antes da fase 1, texto de privacidade revisado |
