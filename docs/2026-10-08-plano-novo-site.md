# Novo site da V2O5: projeto e escopo

Rascunho para discussão, 08/10/2026. Nada foi implementado. As decisões em aberto estão na seção 12 e precisam de resposta antes do código.

## 0. Resumo

O site atual vende IA, automação e produção de sites, mas é um WordPress com Elementor que carrega uma foto de 1,4 MB, abre em inglês para o Google, não tem descrição em nenhuma página e ainda publica o "Hello world!" de instalação. Quem busca "V2O5" encontra o pentóxido de vanádio: a empresa não aparece. Quem chega pela indicação de um cliente da Motors e abre o v2o5.com.br encontra o oposto do que foi entregue lá.

Em Curitiba já existe concorrente fazendo o básico bem feito: a IAEO tem página de preço, páginas por nicho, fundadores identificados e `llms.txt`. O espaço que sobra para a V2O5 é o que ninguém da pesquisa mostrou: case com cliente nomeado e números, e site, rastreamento e automação entregues como um sistema só.

A proposta é reconstruir o site sobre a mesma base técnica da Motors (Next.js, Tailwind, Supabase, Vercel, n8n), com identidade própria, e tratar o site como a primeira prova da oferta. Cada coisa que a V2O5 promete a um cliente precisa estar funcionando no próprio site e ser verificável por quem visita: velocidade medida, SEO, rastreamento até a venda e atendimento automatizado no WhatsApp.

A Motors entra como case principal. É o maior ativo comercial da V2O5 hoje, e o site atual não menciona.

## 1. Diagnóstico do site atual

### 1.1 O que foi medido

Coleta feita em 08/10/2026 a partir deste ambiente. Lighthouse 12.6, perfil mobile com limitação simulada. Os números de laboratório passam por um proxy e servem para comparar, não como valor absoluto; Motors e IAEO foram medidas nas mesmas condições.

| Item | v2o5.com.br hoje | Observação |
|---|---|---|
| Plataforma | WordPress 6.8, Astra, Elementor, Hostinger (LiteSpeed) | 5 plugins na home, jQuery, Font Awesome inteiro |
| Performance (Lighthouse mobile) | 51 | IAEO: 66. Motors: 44 |
| LCP | 13,5 s | O elemento LCP é o fundo do hero: `12-1.jpg`, 1.397 KiB |
| TBT | 600 ms | GA via Site Kit (175 KiB) e o cliente de login do Google (100 KiB) sem uso visível |
| Peso total | 2.074 KiB | Para 2.142 caracteres de texto na home. IAEO: 633 KiB |
| Idioma declarado | `lang="en-US"` | Site em português |
| Meta description | Nenhuma página tem | |
| Dados estruturados (JSON-LD) | Nenhum | Sem Organization, Service, FAQ ou Person |
| Hierarquia de títulos | H3 antes do H1 | O método "em 4 passos" está numerado 1, 2, 2, 4 |
| Sitemap | Lista `/hello-world/`, `/test-post/` e `/blog/` vazio | As três respondem 200 |
| Usuários expostos | `/author/dyones/` no sitemap e `/wp-json/wp/v2/users` aberto | Entrega o login do administrador do WordPress |
| Redes sociais | Ícones de LinkedIn, Facebook, Twitter e WordPress com `href="#"` | São os ícones padrão do tema |
| Presença na busca | Buscas por "V2O5", "V2O5 ConsultorIA" e pelo domínio só trazem o composto químico | Não foi achado Perfil de Empresa no Google, Instagram ou LinkedIn da empresa. Confirmar no Search Console |
| Páginas | 4 (início, jornada, soluções, contrate) | Nenhuma mira uma busca com demanda |
| Prova | Nenhum case, número, logo, depoimento ou foto | |
| Rastreamento | Tag Google `GT-PBNTV3FG` via Site Kit | Sem eventos de conversão, sem Meta, sem UTM no lead |
| Conversão | Botões levam a `/contrate`, que leva a um Typebot | Nenhum link de WhatsApp no site |

Até o lançamento, uma correção vale ser feita no WordPress atual: fechar a listagem de usuários (`/wp-json/wp/v2/users` e o sitemap de autores).

### 1.2 O problema de fundo

A V2O5 diz que faz sites que ranqueiam e convertem, rastreamento e automação com IA. O site não ranqueia (não há página mirando busca nenhuma e nem a marca aparece), não mede conversão e não automatiza nada que o visitante perceba. Para um prospect técnico ou para alguém que compara agências, isso encerra a conversa.

Há também um problema de oferta. A página de soluções põe no mesmo nível "Instagram, Facebook, Google Meu Negócio, e-mail profissional" e "automações e SaaS sob medida". O pacote de presença básica é o mais fácil de entender e puxa a percepção de preço para baixo. A promessa "escalamos seu negócio com IA em 10 dias" aparece sem nenhum número que a sustente, e a escassez "só 5 diagnósticos por semana" é um recurso comum em landing pages que o público já reconhece. O nome "Start Digital" tem outro problema: o autocomplete do Google completa com "reclame aqui", "pablo marçal" e "kiwify".

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

### 2.1 Números que o case já tem

Lidos do banco da Motors em 08/10/2026, só contagens. A tabela de leads começa em 05/09/2026, então o período é de cinco semanas.

| Dado | Valor |
|---|---|
| Leads no funil | 56 (44 dos formulários do site, 12 do WhatsApp direto pelo Chatwoot) |
| Leads do site com `event_id` (deduplicação com a Meta) | 42 de 44 |
| Leads do site com cookie `_fbp` | 38 de 44 |
| Leads do site ligados ao veículo de interesse | 37 de 44 |
| Leads do site com UTM / com `gclid` ou `fbclid` | 28 / 26 de 44 |
| Desfechos registrados | 3 ganhos, 10 perdidos, 13 descartados, 30 em aberto |
| Guias publicados | 26 |
| Veículos no estoque sincronizado | 132, dos quais 46 marcados como vendidos |

Isso sustenta um case de sistema e de qualidade de dado: 95% dos leads do formulário chegam com o identificador que permite deduplicar a conversão na Meta, e cada lead sabe qual carro motivou o contato. Não sustenta ainda um case de resultado comercial: cinco semanas e três vendas registradas são pouco para afirmar ganho.

Faltam três dados. O tempo de primeira resposta não está no banco (o campo `ultimo_contato_em` é outra coisa); o relatório de primeira resposta do Chatwoot tem. Tráfego orgânico e impressões estão no Search Console, que não foi consultado daqui. E o histórico anterior a setembro, se existir em outro lugar.

Proposta: o case entra no lançamento com o que foi construído e os números acima, e ganha uma atualização com 90 dias de dado (cliques orgânicos, leads por mês por origem, vendas atribuídas).

O site da Motors não tem crédito nem link para a V2O5. Um "Desenvolvido por V2O5" no rodapé dela é a menção externa mais fácil de conseguir.

Decidido em 08/10: nome, logo e números da Motors podem ser publicados, e o case declara que o fundador da V2O5 é o mesmo profissional que assina os guias da loja.

## 3. Posicionamento e oferta (proposta)

### 3.1 Tese

A V2O5 monta o sistema que leva o cliente do primeiro clique até a venda fechada: site que aparece no Google, rastreamento que diz de onde veio cada venda, e automação com IA que atende e acompanha o lead. O cliente fica com o sistema.

Os concorrentes pesquisados vendem uma das pontas, ou as três como serviços separados (seção 4.1). Juntar as três num projeto e provar com um case nomeado é o que diferencia.

### 3.2 Linhas de serviço

| Linha | O que entrega | Página |
|---|---|---|
| Sites que ranqueiam | Site ou landing em Next.js, SEO técnico, conteúdo com método, Core Web Vitals no verde. Inclui a fundação de presença (Perfil de Empresa no Google, domínio, e-mail) | `/criacao-de-sites-curitiba` |
| Rastreamento e atribuição | GA4, GTM, API de Conversões da Meta, conversões otimizadas do Google Ads, UTM e click ID no CRM, conversão offline | `/rastreamento-de-conversoes` |
| Automação e agentes de IA | Atendimento no WhatsApp com IA, n8n, integrações, follow-up, alertas de funil | `/agente-de-ia-para-whatsapp` e `/consultoria-n8n` |
| Sistemas sob medida | CRM com WhatsApp, painel, funil, integrações com ERP | `/crm-com-whatsapp` |

A porta de entrada continua sendo um diagnóstico gratuito, com entrega concreta: em uma conversa de 45 minutos a V2O5 olha site, rastreamento, atendimento e funil, e em até 24 h envia o mapa com as três mudanças de maior retorno, custo e prazo. O "Start Digital" sai do cardápio público e vira a etapa de fundação dentro dos projetos de site. Decisão em aberto na seção 12.

### 3.3 Marca

V2O5 é a fórmula do pentóxido de vanádio, catalisador usado na produção industrial de ácido sulfúrico (confirmado em 08/10: o nome vem daí). Um catalisador acelera uma reação e continua lá no fim. A V2O5 acelera a venda da revenda e o sistema fica com a loja.

O vanádio dá também o sistema de cor. Em solução, cada estado de oxidação tem uma cor: V²⁺ violeta, V³⁺ verde, V⁴⁺ azul, V⁵⁺ amarelo. No site, elas viram as etapas do lead: site (violeta), atendimento com IA (verde), CRM (azul) e venda rastreada (âmbar). O âmbar do V⁵⁺, o estado do V2O5, é a única cor de ação.

Proposta visual no canvas [Marca V2O5: propostas](https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3):

- Direção B, recomendada: um funil visto de cima. É uma pirâmide de base quadrada (no cristal de V2O5, cada vanádio fica dentro de uma pirâmide de base quadrada formada por cinco oxigênios) com o vértice deslocado e marcado em âmbar. Funciona a 16 px, no avatar do WhatsApp e no favicon. O vértice fora do centro evita a leitura de "X numa caixa".
- Direção A: só tipográfica, V₂O₅ com os índices em mono e âmbar. Mais direta, mas o selo pequeno vira um "V" e perde a fórmula.
- Cores com contraste medido, tipografia (Geist e Geist Mono, duas famílias como na Motors) e aplicações (topo do site, imagem de compartilhamento, conversa no WhatsApp).

Forma fixa do nome, recomendada: "V2O5 Tecnologia", com algarismos normais no texto corrido, igual no site, no schema, no Perfil de Empresa, no WhatsApp Business e nas redes. Tira a marca da colisão com o composto químico sem o trocadilho, que se perde na fala e em minúsculas. "V2O5 ConsultorIA" entra no schema como `alternateName`, para quem já conhecia o nome. A assinatura "Sites, CRM e IA para revendas de veículos" acompanha o nome e pode mudar com o foco; o nome não muda.

O Google pede que o nome no Perfil de Empresa seja o que a empresa usa no mundo real. Se o nome fantasia do CNPJ for outro, vale alinhar os dois.

## 4. Mercado, busca e arquitetura de páginas

Sem ferramenta paga de SEO, a demanda foi inferida pelo autocomplete do Google e pelo que os concorrentes publicam. Isso mostra se existe busca, não quanta. Antes de escrever o texto final de cada página, os termos passam pelo Planejador de Palavras-chave do Google Ads, que é o critério 1 do método da Motors.

### 4.1 Concorrência e referências

| Empresa | O que vende | O que faz bem | Onde falha |
|---|---|---|---|
| [IAEO](https://iaeo.com.br), Curitiba | Consultoria e implementação de IA | Página de preço (chatbot R$ 2 a 5 mil/mês, automação R$ 5 a 15 mil, sistema R$ 15 a 50 mil), páginas por nicho, schema local com coordenadas, fundadores identificados, `llms.txt` | Cases com percentual e sem nome de cliente. Lighthouse mobile 66, LCP 5,1 s |
| [Thothn' Mkt](https://thothnmkt.com/agentes-de-ia/), Curitiba | Agentes de IA, sites e tráfego | Mix parecido com o da V2O5 | Imagens de placeholder, erros de digitação, telefone divergente, nenhuma prova |
| [Inovação Web](https://inovacaoweb.com.br), São Paulo | Automação de vendas e atendimento com IA | Prova social mais forte do grupo (logos, Sebrae, cases com número e prazo), preço "a partir de" R$ 1.500 | Números sem fonte, escassez forçada, nenhum conteúdo |
| [Dasckup](https://www.dasckup.com/automacao-para-empresas), São Paulo | n8n com IA | Calculadora de ROI, preço a partir de R$ 4.900 | Texto de exemplo esquecido na página de depoimentos, oferta diluída |
| [Madweb](https://www.madweb.com.br/automacao-com-ia/), São Paulo | Agência completa com página de n8n | O modelo mais próximo de sites + automação + SEO, FAQ com schema | Estatísticas sem fonte, depoimento anônimo |
| [AutoSDR](https://blog.autosdr.com.br) | CRM com IA para revendas (SaaS, a partir de R$ 297/mês) | Domina "crm para revenda" com conteúdo comparativo | É produto de prateleira; a V2O5 vende sob medida e integrado |

O que isso muda no plano:

- Publicar faixa de preço é o padrão entre os concorrentes mais fortes (IAEO, Inovação Web, Dasckup). Ficar sem preço passa a ser a exceção.
- Nenhum deles tem case com cliente nomeado, período e fonte. É a vaga que o case da Motors ocupa.
- Sites locais fracos como o da Thothn' mostram que dá para ganhar espaço em Curitiba com o básico bem feito.
- Nenhum concorrente usa a própria performance como argumento. IAEO, o melhor deles, carrega em 5,1 s no mobile.

Referências de design e motion fora do Brasil: [Sierra](https://sierra.ai) (Next.js, animações em Rive, tom editorial), [Decagon](https://decagon.ai) (números de prova na primeira dobra) e [Morningside AI](https://www.morningside.ai) (modelo de agência). Servem de régua de acabamento; o peso de JS delas não serve de modelo.

### 4.2 Mapa de páginas

Confiança na demanda: A alta, M média, B baixa.

| Página | Busca-alvo | Intenção | Demanda | Fase |
|---|---|---|---|---|
| `/` | automação com IA para empresas em Curitiba, marca | Comercial | M | 1 |
| `/agente-de-ia-para-whatsapp` | agente de ia para whatsapp, automação de atendimento whatsapp com ia | Comercial | A, com SaaS disputando a versão genérica | 1 |
| `/consultoria-n8n` | consultoria n8n, automação n8n para empresas | Comercial | B, com pouca concorrência | 1 |
| `/criacao-de-sites-curitiba` | criação de site profissional curitiba, landing page curitiba | Comercial local | M | 1 |
| `/rastreamento-de-conversoes` | api de conversões meta, rastreamento de conversões | Comercial técnica | M | 1 |
| `/crm-com-whatsapp` | crm com whatsapp integrado e ia | Comercial | M | 1 |
| `/cases/motors-store` | case de revenda em Curitiba | Prova | | 1 |
| `/sobre` | V2O5, fundador | Marca e entidade | | 1 |
| `/diagnostico` e `/diagnostico/recebido` | diagnóstico gratuito | Conversão (a segunda sem indexação) | | 1 |
| `/privacidade` | | Obrigatória | | 1 |
| `/ia-para-revenda-de-veiculos` | crm para revenda de carros, ia para revenda de veículos, site para loja de carros | Setor | M | 2 |
| `/quanto-custa-agente-de-ia-whatsapp` | quanto custa um chatbot ou agente de ia para whatsapp | Pesquisa de compra | M | 2 |
| `/quanto-custa-um-site` | quanto custa um site profissional | Pesquisa de compra | M | 2 |
| `/guias` e primeira onda | ver abaixo | Informacional com saída comercial | B a M | 2 |
| `/ia-para-clinicas` | agente de ia para clínicas | Setor | M | Só com case ou decisão de entrar no nicho |
| `/ferramentas/raio-x-do-site` | | Captação | | 3 |

Candidatos para a primeira onda de guias, todos com dado de operação real como ângulo: API oficial do WhatsApp ou Evolution API (custo e risco de bloqueio), API de Conversões ou só pixel, como integrar WhatsApp com CRM, como medir a venda offline que veio do Google Ads. Termos de "n8n vs make vs zapier" e de curso ficam de fora: há sites que dominam com seis ou mais páginas cada. Buscas com "grátis" ou "github" também ficam de fora, porque são de quem quer fazer sozinho.

O endereço dos guias é `/guias/{slug}`, como na Motors.

### 4.3 Redirecionamentos do site atual

| De | Para | Código |
|---|---|---|
| `/jornada/` | `/sobre` | 301 |
| `/solucoes/` | `/` | 301 |
| `/contrate/` | `/diagnostico` | 301 |
| `/politica-privacidade/` | `/privacidade` | 301 |
| `/blog/` | `/guias` | 301 |
| `/author/dyones/` | `/sobre` | 301 |
| `/hello-world/`, `/test-post/` | | 410 |
| `/feed/`, `/comments/feed/`, `/wp-sitemap*.xml` | `/sitemap.xml` | 301 |

Os redirecionamentos ficam em `next.config.ts` e um teste trava a lista, como na Motors.

### 4.4 SEO técnico

Herdado da Motors e aplicado desde o primeiro deploy:

- `lang="pt-BR"`, `metadataBase` pelo domínio, canonical relativo por página e nunca no layout raiz;
- título e descrição únicos por página, travados por teste;
- `sitemap.ts` com `lastModified` real e `robots.ts` com os robôs de IA (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) no mesmo grupo do geral, como na Motors;
- Search Console e Bing Webmaster Tools, com IndexNow por cron na Vercel (o ChatGPT também busca pelo Bing);
- `llms.txt` com os fatos citáveis da V2O5, como prioridade baixa: o Google diz que não precisa de arquivo especial para aparecer nos recursos de IA ([documentação](https://developers.google.com/search/docs/appearance/ai-features)), mas é barato e outros assistentes leem;
- imagens via `next/image`, fontes locais com métricas de fallback, sem jQuery, sem biblioteca de ícones inteira;
- 404 que mantém o status e oferece saída (serviços, cases, diagnóstico).

### 4.5 Dados estruturados

Um grafo por página, montado por funções puras e testado pela contagem de nós, como na Motors:

- `Organization` + `ProfessionalService` com `@id` estável, nome fixo da marca, `sameAs` para Perfil de Empresa, Instagram e LinkedIn, `areaServed` Curitiba e Brasil;
- `Person` do fundador (`/sobre#autor`), ligado como autor dos guias e como `founder`;
- `Service` em cada página de linha, com `provider` apontando para a organização e `offers` com a faixa de preço, se for publicada;
- `Article` e `FAQPage` nos guias; `BreadcrumbList` em todas as internas;
- nos cases, `Article` com `about` apontando para a organização do cliente.

Sem `AggregateRating` próprio (regra T7 da Motors).

### 4.6 Conteúdo

O método da Motors (`conteudo-seo/pacote/00-guia-normativo.md`) vale quase inteiro: os cinco critérios eliminatórios para um tema entrar, a anatomia do guia (H1 igual à busca, resposta em duas frases no primeiro parágrafo, 3 a 6 H2, FAQ idêntico ao schema), uma única saída comercial por guia e publicação em ondas por cluster. As travas específicas de carro (T1, T2, T8) saem; entram travas da V2O5, por exemplo nunca prometer resultado sem número de case e nunca citar preço de ferramenta de terceiro sem data.

O lugar vazio da V2O5 é escrever com dados de uma operação real (a da Motors, com autorização) sobre temas que os concorrentes tratam em abstrato: quanto tempo de resposta no WhatsApp custa em venda, como medir de onde veio a venda quando o fechamento é offline, o que o pixel deixa de contar e o CAPI recupera.

Os textos passam pelo humanizer e por um teste de marcas de IA, como na Motors.

### 4.7 Busca por IA (GEO/AEO)

O Google diz que AI Overviews e AI Mode usam os mesmos requisitos da busca comum e que não há otimização especial ([documentação](https://developers.google.com/search/docs/appearance/ai-features)). A base, então, é o SEO das seções anteriores. O que muda é o peso das menções fora do site: um estudo da Ahrefs com 75 mil marcas encontrou correlação de 0,66 a 0,74 entre menções da marca (na web e no YouTube) e visibilidade em respostas de IA, contra cerca de 0,2 para backlinks ([estudo](https://ahrefs.com/blog/ai-brand-visibility-correlations)).

Ações, em ordem de custo:

1. Nome, endereço e telefone iguais em todo lugar, e schema com `sameAs` (seção 4.5).
2. Perfil de Empresa no Google criado ou revisado, com pedido de avaliação a cada projeto entregue.
3. Crédito "Desenvolvido por V2O5" no rodapé da Motors e dos próximos clientes, com permissão.
4. Instagram e LinkedIn reais no ar antes do lançamento, e artigos do fundador no LinkedIn.
5. Diretórios de agências e listas da imprensa local.
6. Vídeos curtos no YouTube com "V2O5" no título, mostrando um fluxo funcionando.

As páginas que respostas de IA mais citam nesse mercado são as de preço, os cases com número e os FAQs de resposta direta. As três estão no mapa.

## 5. Design e motion

### 5.1 Direção visual

A arquitetura do Modernist vem inteira: tokens `--brand-*` derivados por `color-mix`, `@theme` do Tailwind 4, classes em `@layer components`, régua de 2 px entre seções, seções numeradas, rótulos em caixa alta espaçada, raio mínimo, contraste AA testado. A Motors já provou que esse sistema é leve e acessível.

A identidade muda. Proposta para validar em tela antes de codar:

- base clara de papel com seções escuras de tinta onde o assunto é o sistema (diagramas, rastreamento, código), em vez do visual escuro com degradê roxo e esferas brilhantes que quase toda agência de IA usa;
- âmbar V⁵⁺ como única cor de ação; violeta, verde e azul só para identificar as etapas do lead em diagramas e etiquetas (seção 3.3);
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
- Faixa de preço por linha de serviço ("projetos a partir de"), se você topar publicar. Filtra lead fora do perfil e é o que os concorrentes mais fortes já fazem.
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

O lead grava primeiro e último toque (UTM, `gclid`, `gbraid`, `wbraid`, `fbclid`, `_fbc`, `_fbp`, página de entrada, referrer). A Motors guarda só o último entre visitas; aqui os dois ficam. Quando o negócio fecha no CRM da V2O5, o n8n envia a conversão offline ao Google Ads (pelo `gclid`) e ao Meta (CAPI, evento de compra) com o valor. A V2O5 passa a saber quanto cada canal vendeu, e esse fluxo é o que ela vende como rastreabilidade.

### 7.5 Consentimento

Decidido em 08/10: o mesmo modelo da Motors. Base legal de interesse legítimo (LGPD, art. 7º, IX), tags carregadas na chegada e aviso de cookies informativo. A oposição fica na página de privacidade: grava `ag_cookie_consent=rejected` e apaga `_fbp`, `_fbc` e as chaves de campanha. O código da Motors (`IntegrationsTracker`, a verificação de oposição antes das tags e o texto de `/privacidade`) vem adaptado. Consent Mode v2 fica documentado como alternativa, como lá.

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

- respostas da seção 12;
- números e autorização do case Motors;
- validação do mapa de páginas no Planejador de Palavras-chave;
- escolha visual entre os dois estudos da home.

### Fase 1: lançamento

- base do projeto (Next.js, tokens, fontes, primitivos, testes de trava, CI, cabeçalhos de segurança);
- páginas: home, cinco páginas de serviço, case Motors, sobre, diagnóstico e recebido, privacidade, 404;
- SEO técnico, schema, sitemap, robots, `llms.txt`, redirecionamentos;
- formulário, `/api/leads`, Supabase, Turnstile, rate limit, webhook n8n, mensagem automática no WhatsApp;
- camada de dados, GA4, CAPI pelo servidor, captura de primeiro e último toque, consentimento;
- deploy na Vercel, troca de DNS do apex e `www`, Search Console e Bing Webmaster Tools com o sitemap novo;
- entidade: Perfil de Empresa no Google, Instagram e LinkedIn reais, crédito no rodapé da Motors.

O WordPress fica no ar em subdomínio de backup por 30 dias antes de cancelar a hospedagem.

### Fase 2: conteúdo e alcance

- hub `/guias` e a primeira onda (4 a 6 guias de um cluster só);
- `/ia-para-revenda-de-veiculos` e as duas páginas de preço;
- segundo case, se houver;
- diretórios, imprensa local, LinkedIn do fundador.

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
- migração do e-mail da Hostinger;
- páginas de nicho sem case ou sem decisão de entrar no nicho.

## 12. Decisões em aberto

1. Público e geografia: PME em geral com revendas de veículos como vertical de prova, ou foco declarado em revendas desde a home? Curitiba como praça principal ou Brasil inteiro com atendimento remoto?
2. Oferta: o Start Digital sai do cardápio público e vira fundação dos projetos de site? O diagnóstico continua gratuito e a escassez "5 por semana" é real?
3. Case Motors: pode publicar nome, logo e quais números (leads por mês, tempo de resposta, tráfego orgânico, conversões rastreadas)? Há depoimento? Como declarar a relação do fundador com a loja?
4. Outros projetos (smart-parking-v2o5, rede-auto, freespot, Motogestor-v3, 16V): algum é cliente ou produto que possa virar case?
5. Marca: o nome vem do pentóxido de vanádio? Qual a forma fixa da marca ("V2O5 ConsultorIA" ou "V2O5" com descritor)? O logo atual fica?
6. Preço: publicar faixa "a partir de" por linha de serviço?
7. Fundador: usar nome completo e foto (Dyones Oliveira, como nos guias da Motors)?
8. Endereço: a V2O5 tem endereço para o Perfil de Empresa ou atende como empresa de área de serviço, sem endereço público? Há CNPJ para o rodapé?
9. Agenda: Cal.com, agenda do Google ou só WhatsApp?
10. Consentimento: Consent Mode v2 com banner (recomendado) ou interesse legítimo como na Motors?
11. GTM server-side já na fase 1, na fase 3 ou não usar?
12. Contas: Vercel e Supabase na mesma conta da Motors ou separadas? Há conta do Google Ads da V2O5 para o Planejador de Palavras-chave?
13. Crédito "Desenvolvido por V2O5" no rodapé da Motors: pode?

## 13. Riscos

| Risco | Mitigação |
|---|---|
| Troca de DNS derrubar e-mail ou os subdomínios da VPS | Mudar só o registro do apex e do `www`; conferir MX, SPF, DKIM, DMARC e os A de `n8n`, `chat`, `chatwoot` e `evolution` antes e depois |
| Case sem número vira texto de agência genérica | Não publicar o case sem pelo menos dois números com fonte e período |
| Motion pesar e contradizer a promessa de performance | Orçamento de JS por rota e Lighthouse CI bloqueando o merge |
| Conteúdo de IA genérico | Método da Motors: critério do lugar vazio, dado próprio, humanizer e teste de marcas |
| Marca seguir invisível por colidir com o composto químico | Forma fixa da marca, schema com `sameAs`, Perfil de Empresa e menções externas desde a fase 1 |
| Rastreamento sem consentimento adequado | Decisão 10 antes da fase 1, texto de privacidade revisado |
