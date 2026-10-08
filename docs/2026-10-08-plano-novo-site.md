# Novo site da V2O5: projeto e escopo

Versão 3.2, 08/10/2026, com as decisões do dia (seção 12). Nada foi implementado.

## 0. Resumo

O site atual vende IA, automação e produção de sites, mas é um WordPress com Elementor que carrega uma foto de 1,4 MB, abre em inglês para o Google, não tem descrição em nenhuma página e ainda publica o "Hello world!" de instalação. Quem busca "V2O5" encontra o pentóxido de vanádio: a empresa não aparece. Quem chega pela indicação de um cliente da Motors e abre o v2o5.com.br encontra o oposto do que foi entregue lá.

Decidido em 08/10: o site novo vende para revendas de veículos do Brasil inteiro, com o setor na home. Nesse mercado, a concorrência são os sistemas de gestão e os SaaS que vendem site, CRM e IA como módulos de mensalidade (Revenda Mais, Autoconf, AutoSDR, BNDV) e algumas agências de nicho. O site que eles entregam é um template com uma URL por carro, os dados ficam com o fornecedor e nenhum promete medir a venda. A V2O5 entra pelo que nenhum deles entrega junto: páginas de estoque por marca e modelo que ranqueiam, WhatsApp atendido por IA ligado ao funil e atribuição até a venda, sem a loja trocar o sistema de gestão que já usa.

A proposta é reconstruir o site sobre a mesma base técnica da Motors (Next.js, Tailwind, Supabase, Vercel, n8n), com identidade própria, e tratar o site como a primeira prova da oferta. Cada coisa que a V2O5 promete a uma revenda precisa estar funcionando no próprio site e ser verificável por quem visita: velocidade medida, SEO, rastreamento até a venda e atendimento automatizado no WhatsApp.

A Motors entra como case principal, com nome e números. É o maior ativo comercial da V2O5 hoje, e o site atual não menciona.

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

Isso é um case completo de aquisição e operação, do anúncio à venda. Entre os outros repositórios da conta, rede-auto e Motogestor-v3 parecem do setor automotivo e podem render mais cases ou produtos (seção 12). O 16V é de outro ramo: o projeto Supabase dele se chama 16-vara-civel.

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

Sobre tempo de resposta, o banco tem só um indicador indireto: o primeiro contato registrado no painel. Ele existe em 26 dos 56 leads, com mediana de cerca de 3 horas depois da entrada do lead e 10 leads atendidos em até 15 minutos. Isso mede o registro no painel e não a resposta no WhatsApp, então não entra no case. O tempo real de primeira resposta está nos relatórios do Chatwoot.

A consulta encontrou um problema na operação da Motors. Até 22/09, respostas dadas no Chatwoot geravam eventos de contato no funil (30 e 32 por semana nas semanas de 14 e 21/09). Desde 23/09 não houve nenhum, embora as conversas continuem chegando e atualizando a tabela `atendimentos` todo dia. No mesmo período, as transferências automáticas por estagnação saltaram de cerca de 40 para 150 a 220 por dia: são 1.688 no total, para 50 leads, com um lead transferido 154 vezes. A régua da Motors não tem teto de transferências por decisão de 28/08, então o número em si é a régua funcionando; o que parece quebrado é o reconhecimento da resposta humana vinda do Chatwoot. Precisa ser investigado no repositório da Motors antes de o case falar de atendimento.

Faltam dois dados que eu não consegui buscar daqui: o relatório de primeira resposta do Chatwoot (a chave da API está nas variáveis da Vercel e o acesso a credenciais foi bloqueado pela política de permissões desta sessão) e o Search Console (as credenciais do script `conteudo-seo/gsc.js` só existem no `.env.local` da sua máquina). Decidido em 08/10: esperar mais histórico antes de anexar os dois; eles entram na atualização de 90 dias do case.

Proposta: o case entra no lançamento com o que foi construído e os números acima, e ganha uma atualização com 90 dias de dado (cliques orgânicos, leads por mês por origem, vendas atribuídas).

O site da Motors não tem crédito nem link para a V2O5. Um "Desenvolvido por V2O5" no rodapé dela é a menção externa mais fácil de conseguir.

Decidido em 08/10: nome, logo e números da Motors podem ser publicados, e o case declara que o fundador da V2O5 é o mesmo profissional que assina os guias da loja.

## 3. Posicionamento e oferta

### 3.1 Tese

Para revendas de veículos de todo o Brasil, a V2O5 monta a camada que gera e mede a venda: site com o estoque da loja que aparece no Google, WhatsApp atendido por IA, CRM com o funil e rastreamento até a venda fechada. A loja continua com o Revenda Mais, a Autoconf ou o sistema que já usa; a V2O5 integra. O site, os dados e os pixels ficam no domínio e nas contas da loja.

Frase de posicionamento para testar: "Fique com o seu sistema de gestão. A camada que gera e mede a venda é sua."

A diferença muda conforme o concorrente (seção 4.1). Frente aos sistemas de gestão e SaaS, é a posse e a profundidade: site com páginas de marca e modelo, atribuição até a venda. Frente às agências de nicho, é medir venda em vez de lead. Frente à Autoconf, que também é da região de Curitiba e também diz ter nascido dentro de uma loja, é a prova pública com números.

### 3.2 Linhas de serviço

| Linha | O que entrega | Página |
|---|---|---|
| Site de estoque | Site em Next.js com o estoque sincronizado, ficha por veículo, páginas de marca e modelo, guias, Core Web Vitals no verde. Inclui a fundação de presença (Perfil de Empresa no Google, domínio, e-mail) | `/site-para-loja-de-carros` |
| Atendimento com IA | Agente no WhatsApp que responde, qualifica e agenda, ligado ao funil | `/agente-de-ia-para-loja-de-carros` |
| CRM e funil | Funil da loja com responsável, próximo passo, alerta de estagnação e motivo de perda | `/crm-para-revenda-de-carros` |
| Rastreamento até a venda | GA4, GTM, API de Conversões da Meta, conversões offline do Google Ads, origem de cada venda | `/rastreamento-ate-a-venda` |
| Integração com o sistema de gestão | Estoque e leads sincronizados com o Revenda Mais, como na Motors. Outros sistemas só ganham página quando a integração existir | `/integracao-revenda-mais` |
| Gestão de tráfego | Google Ads e Meta otimizados pela venda registrada no CRM, com conversão offline. Só com o rastreamento ativo | `/trafego-pago-para-loja-de-carros` |

Outros setores continuam atendidos (decidido em 08/10). A home tem um bloco curto para eles, que leva a `/servicos` e às páginas genéricas da fase 2.

A porta de entrada continua sendo um diagnóstico gratuito, com entrega concreta: em uma conversa de 45 minutos a V2O5 olha o site, os anúncios, o atendimento e o funil da loja, e em até 24 h envia o mapa com as três mudanças de maior retorno, custo e prazo. O "Start Digital" sai do cardápio público e vira a etapa de fundação dos projetos de site (decidido em 08/10).

### 3.3 Preço

Decidido em 08/10: publicar, com a tabela abaixo aprovada no mesmo dia e o site de estoque a partir de R$ 7.900. A lógica: implantação mais mensalidade, sem fidelidade, preço "a partir de" em cada página de linha, uma página `/precos` com os pacotes e `offers` no schema. A implantação pode ser paga metade na assinatura e metade na entrega, ou parcelada em até 6 vezes.

| Linha | Implantação a partir de | Mensalidade a partir de | O que a mensalidade cobre |
|---|---|---|---|
| Site de estoque | R$ 7.900 | R$ 490 | Hospedagem, sincronização do estoque, manutenção, SEO técnico contínuo, relatório mensal |
| Atendimento com IA no WhatsApp | R$ 3.900 | R$ 790 | Agente rodando, uso do modelo de IA dentro de um teto de conversas, ajustes de roteiro |
| CRM e funil | R$ 4.900 | R$ 590 | Painel, régua de alertas, usuários da loja, suporte |
| Rastreamento até a venda | R$ 2.900 | R$ 290 | Monitoramento da qualidade do dado, relatório de origem das vendas |
| Gestão de tráfego (Google Ads e Meta) | sem implantação com o rastreamento ativo | R$ 1.800 + verba | Campanhas otimizadas pela venda registrada no CRM, não pelo lead |
| Pacote completo (site, IA, CRM, rastreamento e integração com o Revenda Mais) | R$ 14.900 | R$ 1.690 | Tudo das linhas acima, menos tráfego |
| Pacote completo com tráfego | R$ 14.900 | R$ 2.990 + verba | |
| Diagnóstico | grátis | | |

A implantação do pacote completo fica em R$ 14.900 (decidido em 08/10): 24% de desconto sobre a soma das linhas avulsas, R$ 19.600. É o desconto que a página de preço mostra para empurrar o pacote.

Fora da mensalidade, e sempre por conta do cliente: a infraestrutura (hospedagem, banco, uso do modelo de IA e, quando a loja usar a API oficial do WhatsApp, o custo por mensagem da Meta) vem na mesma fatura da V2O5, discriminada e somada à mensalidade pelo valor real (decidido em 08/10). A verba de mídia é paga direto ao Google e à Meta. Produção de fotos e vídeos não está incluída.

Para outros setores, a mesma lógica: site institucional a partir de R$ 7.900 + R$ 290/mês (mesmo piso do site de estoque, decidido em 08/10), agente de IA no WhatsApp a partir de R$ 3.900 + R$ 790/mês, automação no n8n a partir de R$ 1.900 por fluxo, gestão de tráfego a partir de R$ 1.800/mês.

Como esses números se comparam com o mercado, pelas páginas públicas em 08/10/2026:

| Fornecedor | Preço publicado |
|---|---|
| Revenda Mais | Gerencial R$ 600/mês + adesão; CRM + R$ 500; NF-e + R$ 400; site sem preço publicado |
| Autoconf | R$ 299 a R$ 899/mês; plano com agente de IA R$ 1.199 |
| AutoSDR | R$ 387, R$ 777 ou R$ 1.297/mês, sem fidelidade |
| IAEO (agência de IA, fora do setor) | Chatbot R$ 2 a 5 mil/mês; automação R$ 5 a 15 mil; sistema R$ 15 a 50 mil |

A mensalidade do pacote completo fica perto da pilha do Revenda Mais e abaixo do chatbot da IAEO, sem substituir o sistema de gestão da loja. O argumento da página de preço é custo por venda. O plano de mídia da Motors usa como referência uma margem bruta média de R$ 7.000 por carro; com essa margem, uma venda a mais a cada quatro meses paga a mensalidade do pacote completo (4 × R$ 1.690 = R$ 6.760).

Cláusula de saída (aceita em 08/10 com a tabela): se a loja cancelar, recebe o código, os dados e o domínio em até 15 dias. É o que torna verdadeira a frase "a camada é sua". A infraestrutura fica nas contas operadas pela V2O5 e é repassada na fatura; na saída, as contas ou os dados migram para a loja junto com o código.

### 3.4 Marca

V2O5 é a fórmula do pentóxido de vanádio, catalisador usado na produção industrial de ácido sulfúrico (confirmado em 08/10: o nome vem daí). Um catalisador acelera uma reação e continua lá no fim. A V2O5 acelera a venda da revenda e o sistema fica com a loja.

O vanádio dá também o sistema de cor. Em solução, cada estado de oxidação tem uma cor: V²⁺ violeta, V³⁺ verde, V⁴⁺ azul, V⁵⁺ amarelo. No site, elas viram as etapas do lead: site (violeta), atendimento com IA (verde), CRM (azul) e venda rastreada (âmbar). O âmbar do V⁵⁺, o estado do V2O5, é a única cor de ação.

Proposta visual no canvas [Marca V2O5](https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3):

- Direção B, escolhida em 08/10: um funil visto de cima. É uma pirâmide de base quadrada (no cristal de V2O5, cada vanádio fica dentro de uma pirâmide de base quadrada formada por cinco oxigênios) com o vértice deslocado e marcado em âmbar. Funciona a 16 px, no avatar do WhatsApp e no favicon. O vértice fora do centro evita a leitura de "X numa caixa".
- Direção A: só tipográfica, V₂O₅ com os índices em mono e âmbar. Mais direta, mas o selo pequeno vira um "V" e perde a fórmula.
- Cores com contraste medido, tipografia (Geist e Geist Mono, duas famílias como na Motors) e aplicações (topo do site, imagem de compartilhamento, conversa no WhatsApp).
- Em comparação desde 08/10, a pedido, duas evoluções do logo atual (a nuvem com as soluções rodando dentro): C1, nuvem neural, em que a rede dentro da nuvem é a molécula V2O5 (dois vanádios e cinco oxigênios) e um sinal a percorre até o ponto âmbar; e C2, nuvem formada por três engrenagens que giram. As duas têm versão animada (só CSS ou SVG, parada com redução de movimento), estática e de impressão em uma cor. O quadro de comparação põe atual, B, C1 e C2 nas mesmas medidas.

O conceito, reforçado em 08/10: a V2O5 é o catalisador, e o catalisador é a IA. A assinatura proposta passa a ser "Catalisador de vendas com IA", com o "IA" em âmbar, como o logo atual já fazia em "ConsultorIA". A frase "Sites, CRM e IA para revendas de veículos" sai da assinatura e fica como descrição no topo do site.

Decidido em 08/10: direção B, e a forma fixa do nome é o nome fantasia do CNPJ, "V2O5 Vendas e Tecnologia", com algarismos normais no texto corrido. Ela vai igual no site, no schema, no Perfil de Empresa, no WhatsApp Business e nas redes. O logo usa só "V2O5"; o nome completo aparece no texto, no rodapé e nos perfis.

Dados públicos do CNPJ 68.490.470/0001-14, consultados em 08/10/2026: razão social V2O5 Tecnologia da Informação Ltda., nome fantasia V2O5 Vendas e Tecnologia, situação ativa desde 10/08/2026, microempresa no Simples Nacional, sede em Almirante Tamandaré/PR, na região metropolitana de Curitiba. No schema entram `legalName`, `taxID` e o nome fantasia como `name`; "V2O5" e "V2O5 ConsultorIA" entram como `alternateName`.

Um ponto para o contador: a atividade principal registrada é intermediação e agenciamento de serviços (7490-1/04), e as secundárias incluem suporte técnico em TI e promoção de vendas. Desenvolvimento de software sob encomenda e agência de publicidade não aparecem. Vale confirmar se os códigos atuais cobrem a emissão de nota para site, sistema e gestão de tráfego.

## 4. Mercado, busca e arquitetura de páginas

Sem ferramenta paga de SEO, a demanda foi inferida pelo autocomplete do Google e pelo que os concorrentes publicam, em duas pesquisas (agências de IA em geral e o setor automotivo). Isso mostra se existe busca, não quanta. Antes de escrever o texto final de cada página, os termos passam pelo Planejador de Palavras-chave do Google Ads, que é o critério 1 do método da Motors.

### 4.1 Concorrência e referências

No setor automotivo:

| Quem | O que vende | Onde é forte | Onde falha |
|---|---|---|---|
| [Revenda Mais](https://revendamais.com.br) | Sistema de gestão, integrador com mais de 20 portais, site, CRM com WhatsApp oficial e "IA SDR" | Base grande ("+5.000 lojas"), 1.585 avaliações no Google | O site do lojista é template ligado ao estoque, sem página de marca ou modelo. A pilha completa passa de R$ 1.500/mês |
| [Autoconf](https://autoconf.com.br), Curitiba | Gestão, site, integrador, CRM e agente de IA | Discurso de quem "nasceu dentro de uma loja", "+1.400 revendas" | Mesmo discurso e mesma cidade da V2O5. Avaliação pública reclama de recurso travado por plano e suporte só por chat |
| [AutoSDR](https://autosdr.com.br) | IA no WhatsApp 24 h, CRM, catálogo, publicação em 7 portais | O mais forte em SEO no nicho: dezenas de comparativos no blog | Catálogo sem SEO, sem integração com sistema de gestão na página, sem atribuição até a venda |
| [Motorleads](https://motorleads.co) | Sites, landing pages, mídia paga, WhatsApp API, call tracking | O mais parecido com a V2O5; case com 34% de tráfego orgânico | Mede evento, não venda |
| Webmotors (Cockpit + Syonet) e OLX (Altimus) | CRM e estoque dentro do portal | Escala e distribuição | Foco em concessionária de marca; os dados ficam no portal, que agora é dono do CRM |
| BNDV, Boom Sistemas, Mobiauto Mobigestor | Gestão, leads, integrador | Base instalada | Sem IA (BNDV), sem site (Boom), site como acessório do portal (Mobiauto) |
| Agências de nicho (Nagase, MediaCar, Capta, E-Dialog Motor) | Tráfego pago e sites | Volume de lead em anúncio | Nenhuma publica preço; medem lead, não venda; a MediaCar não tem case publicado |

O que se repete em quase todos: site de template com uma URL por veículo, nenhuma promessa de CAPI ou conversão offline amarrada à venda, e dados presos ao fornecedor. Com Webmotors comprando a Syonet (ago/2026) e a OLX dona da Altimus, essa dependência tende a crescer, e "a camada é sua" ganha força como argumento.

Fora do setor, as agências de IA genéricas da primeira pesquisa continuam como concorrência secundária. A [IAEO](https://iaeo.com.br), de Curitiba, segue como referência de execução: preço publicado, páginas por nicho, fundadores identificados. Mede 66 no Lighthouse mobile, com LCP de 5,1 s.

Referências de design e motion fora do Brasil: [Sierra](https://sierra.ai), [Decagon](https://decagon.ai) e [Morningside AI](https://www.morningside.ai). Servem de régua de acabamento; o peso de JS delas não serve de modelo.

### 4.2 Mapa de páginas

Demanda e chance relativas entre si (A alta, M média, B baixa), estimadas por autocomplete e SERP em 08/10/2026, sem ferramenta paga. A home deixa de mirar Curitiba; a sede, em Almirante Tamandaré, aparece no Sobre e no schema.

| Página | Busca-alvo | Demanda | Chance | Fase |
|---|---|---|---|---|
| `/` | tecnologia para revendas de veículos, marca | | | 1 |
| `/site-para-loja-de-carros` | site para loja de carros, site para revenda de veículos, criar site para loja de carros | M | M a A | 1 |
| `/crm-para-revenda-de-carros` | crm para revenda de carros, crm para loja de carros | M | M | 1 |
| `/agente-de-ia-para-loja-de-carros` | agente de ia para loja de carros, ia para concessionária, chatbot para loja de carros | B, subindo | A | 1 |
| `/rastreamento-ate-a-venda` | conversões offline google ads, api de conversões, no recorte loja de carros | B | A | 1 |
| `/integracao-revenda-mais` | revenda mais api, revenda mais crm | B | A | 1 |
| `/cases/motors-store` | case de revenda | B | A | 1 |
| `/precos` | quanto custa site, crm ou ia para loja de carros | M | M | 1 |
| `/sobre`, `/diagnostico`, `/diagnostico/recebido` (sem indexação), `/privacidade` | marca, conversão | | | 1 |
| `/site-para-loja-de-motos` | site para loja de motos | B | A | 2 |
| `/guias` e primeira onda (abaixo) | informacional com saída comercial | B a M | M a A | 2 |
| `/trafego-pago-para-loja-de-carros` | tráfego pago e marketing para loja de carros | M | M | 1 |
| `/servicos`, `/agente-de-ia-para-whatsapp`, `/consultoria-n8n`, `/criacao-de-sites` | as buscas genéricas da primeira pesquisa, para outros setores | A a B | B a M | 2 |
| `/integracao-autoconf` e afins | autoconf api | B | A | Só quando a integração existir |
| `/ferramentas/raio-x-do-site` | | | | 3 |

Termos que ficam de fora: "sistema para revenda de veículos" (SERP dos sistemas de gestão; a V2O5 entra só pelo ângulo da integração), "site para concessionária" (ambíguo com concessionária de rodovia), "como anunciar carros" (misturado com pessoa física) e buscas com "grátis".

Primeira onda de guias, todas com dado da Motors como ângulo próprio:

- portais ou site próprio, comparando custo por venda e não por lead (busca: "vale a pena pagar para anunciar na webmotors");
- tempo de resposta no WhatsApp e venda de carro (os números que circulam no setor não têm fonte primária localizável; depende do relatório de primeira resposta do Chatwoot);
- custo por lead e custo por venda na revenda;
- conversões offline do Google Ads para loja de carros;
- giro de estoque e custo do carro parado no pátio (a Motors já tem rascunho: "O custo de carregar ferro: o CDI no pátio", peça que o guia normativo de lá recusou por ser para lojista, que é o leitor da V2O5).

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

- `Organization` + `ProfessionalService` com `@id` estável, nome fixo da marca, `sameAs` para Perfil de Empresa, Instagram e LinkedIn, `areaServed` Brasil, `legalName` e `taxID` do CNPJ, endereço só com cidade e estado (Almirante Tamandaré, PR), porque a sede é residencial;
- `Person` do fundador (`/sobre#autor`), ligado como autor dos guias e como `founder`;
- `Service` em cada página de linha, com `provider` apontando para a organização e `offers` com o preço "a partir de";
- `Article` e `FAQPage` nos guias; `BreadcrumbList` em todas as internas;
- nos cases, `Article` com `about` apontando para a organização do cliente.

Sem `AggregateRating` próprio (regra T7 da Motors).

### 4.6 Conteúdo

O método da Motors (`conteudo-seo/pacote/00-guia-normativo.md`) vale quase inteiro: os cinco critérios eliminatórios para um tema entrar, a anatomia do guia (H1 igual à busca, resposta em duas frases no primeiro parágrafo, 3 a 6 H2, FAQ idêntico ao schema), uma única saída comercial por guia e publicação em ondas por cluster. As travas específicas de carro (T1, T2, T8) saem; entram travas da V2O5, por exemplo nunca prometer resultado sem número de case e nunca citar preço de ferramenta de terceiro sem data.

O lugar vazio da V2O5 é escrever para o lojista com dados de uma loja real (a Motors, autorizado em 08/10) sobre temas que os fornecedores tratam com números reciclados: tempo de resposta no WhatsApp e venda, custo por venda em portal e em site próprio, giro e custo de pátio, venda offline atribuída ao anúncio. A lista da primeira onda está na seção 4.2.

Os textos passam pelo humanizer e por um teste de marcas de IA, como na Motors.

### 4.7 Busca por IA (GEO/AEO)

O Google diz que AI Overviews e AI Mode usam os mesmos requisitos da busca comum e que não há otimização especial ([documentação](https://developers.google.com/search/docs/appearance/ai-features)). A base, então, é o SEO das seções anteriores. O que muda é o peso das menções fora do site: um estudo da Ahrefs com 75 mil marcas encontrou correlação de 0,66 a 0,74 entre menções da marca (na web e no YouTube) e visibilidade em respostas de IA, contra cerca de 0,2 para backlinks ([estudo](https://ahrefs.com/blog/ai-brand-visibility-correlations)).

Ações, em ordem de custo:

1. Nome, endereço e telefone iguais em todo lugar, e schema com `sameAs` (seção 4.5).
2. Perfil de Empresa no Google como empresa de área de serviço (a sede é residencial e fica oculta), com pedido de avaliação a cada projeto entregue.
3. Crédito "Desenvolvido por V2O5" no rodapé da Motors e dos próximos clientes, com permissão.
4. Instagram e LinkedIn reais no ar antes do lançamento, e artigos do fundador no LinkedIn com dado da operação da Motors.
5. Ecossistema do setor: pedir listagem nas páginas de parceiros e integrações do Revenda Mais; Fenauto (cerca de 48 mil revendas; o congresso de 11 a 13/11/2026 fica de fora por decisão de 08/10); Assovepar, no Paraná (Liquida Assovepar e Congresso Automotivo na FIEP); mídia do setor (Garagem360, AutoData, Bem Paraná, Tribuna PR); educadores de lojistas (G30 IA, Mentoria TCAR, IBAUTO), como convidado.
6. Comunidades técnicas de n8n, Chatwoot e Evolution API, com o case técnico.
7. Vídeos curtos no YouTube com "V2O5" no título, mostrando um fluxo funcionando.

As páginas que respostas de IA mais citam nesse mercado são as de preço, os cases com número e os FAQs de resposta direta. As três estão no mapa.

## 5. Design e motion

### 5.1 Direção visual

A arquitetura do Modernist vem inteira: tokens `--brand-*` derivados por `color-mix`, `@theme` do Tailwind 4, classes em `@layer components`, régua de 2 px entre seções, seções numeradas, rótulos em caixa alta espaçada, raio mínimo, contraste AA testado. A Motors já provou que esse sistema é leve e acessível.

A identidade muda. Proposta para validar em tela antes de codar:

- base clara de papel com seções escuras de tinta onde o assunto é o sistema (diagramas, rastreamento, código), em vez do visual escuro com degradê roxo e esferas brilhantes que quase toda agência de IA usa;
- âmbar V⁵⁺ como única cor de ação; violeta, verde e azul só para identificar as etapas do lead em diagramas e etiquetas (seção 3.4);
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

1. Diagnóstico (principal): formulário curto em `/diagnostico` e em blocos nas páginas de serviço. Campos: nome, WhatsApp, e-mail, loja, cidade, tamanho do estoque (faixas), sistema de gestão que usa (Revenda Mais, Autoconf, BNDV, Boom, outro, nenhum) e o que quer resolver (opções). O sistema de gestão qualifica e já diz se a integração existe. Ao enviar, vai para `/diagnostico/recebido` com o que acontece em seguida e o link de agenda.
2. WhatsApp (secundário): botão fixo no mobile, mensagem pré-preenchida por página.
3. Ferramenta (fase 3): Raio-X do site da revenda. A pessoa informa a URL e recebe velocidade, se o site tem páginas de marca e modelo, e quais tags de rastreamento existem (GA4, Pixel, CAPI). Atrai a loja com site de template, que é o público, e demonstra competência na hora.

### 6.2 O próprio site como demonstração

O lead que chega pelo formulário recebe uma mensagem no WhatsApp em menos de um minuto, enviada pelo agente da V2O5 rodando no n8n, Evolution API e Chatwoot que já estão no ar em `n8n.v2o5.com.br`, `evolution.v2o5.com.br` e `chat.v2o5.com.br`. O agente confirma o pedido, faz duas ou três perguntas de qualificação e oferece horário. O lojista que pediu atendimento com IA vê um funcionando com ele mesmo.

Na página de rastreamento, um bloco mostra ao visitante o que o site registrou da visita dele (origem, UTM, páginas vistas), com o texto de privacidade ao lado. Isso explica o serviço melhor que um parágrafo.

No rodapé, "este site em números": peso da página, LCP medido em campo pelo Speed Insights e quantidade de scripts de terceiros.

### 6.3 Prova

- Case Motors com contexto, problema, o que foi construído, os números da seção 2.1, stack e depoimento, se houver. Atualização com 90 dias de dado.
- Fundador com nome, foto e trajetória na página Sobre e na assinatura dos guias, declarando a relação com a Motors.
- Preço "a partir de" em cada linha e a página `/precos` (seção 3.3).
- Integrações listadas só quando existem e funcionam: hoje, Revenda Mais.
- CNPJ, cidade-base e canais no rodapé.

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

### Fase 0: decisões

- respostas pendentes da seção 12 e validação da tabela de preço;
- investigação, no repositório da Motors, da parada do reconhecimento de respostas do Chatwoot desde 23/09;
- validação do mapa de páginas no Planejador de Palavras-chave;
- logo final vetorizado a partir da direção B e, em seguida, dois estudos visuais da home.

### Fase 1: lançamento

- base do projeto (Next.js, tokens, fontes, primitivos, testes de trava, CI, cabeçalhos de segurança);
- páginas: home, seis páginas de linha, case Motors, preços, sobre, diagnóstico e recebido, privacidade, 404;
- SEO técnico, schema, sitemap, robots, `llms.txt`, redirecionamentos;
- formulário, `/api/leads`, Supabase, Turnstile, rate limit, webhook n8n, mensagem automática no WhatsApp;
- camada de dados, GA4, CAPI pelo servidor, captura de primeiro e último toque, consentimento no modelo da Motors;
- deploy na Vercel, troca de DNS do apex e `www`, Search Console e Bing Webmaster Tools com o sitemap novo;
- entidade: Perfil de Empresa no Google, Instagram e LinkedIn reais, crédito no rodapé da Motors.

O WordPress fica no ar em subdomínio de backup por 30 dias antes de cancelar a hospedagem.

### Fase 2: conteúdo e alcance

- hub `/guias` e a primeira onda (seção 4.2);
- `/site-para-loja-de-motos`;
- `/servicos` e as páginas genéricas para outros setores;
- atualização do case Motors com 90 dias de dado, incluindo o relatório de primeira resposta do Chatwoot e o Search Console;
- ecossistema do setor: listagem de parceiro no Revenda Mais, Fenauto, Assovepar, mídia do setor.

### Fase 3: produto e atribuição completa

- Raio-X do site da revenda como ferramenta de captação;
- agente de qualificação no WhatsApp com agenda integrada;
- conversões offline do CRM para Google Ads e Meta;
- GTM server-side, se a decisão da 7.2 for por ele;
- "este site em números" com dado de campo;

## 11. Fora do escopo

- painel administrativo para editar o site (o conteúdo vive no repositório);
- versão em inglês;
- loja ou pagamento online;
- campanhas de mídia da própria V2O5 (o site fica pronto para elas; rodar a campanha é outro projeto);
- migração do e-mail da Hostinger;
- página de integração com sistema de gestão que a V2O5 ainda não integrou;
- páginas locais por cidade (a venda é nacional; o Perfil de Empresa cobre a sede).

## 12. Decisões

### Tomadas em 08/10/2026

1. Case Motors: nome, logo e números podem ser publicados, e o case declara que o fundador da V2O5 assina os guias da loja.
2. Público: Brasil inteiro, com revendas de veículos desde a home. Outros setores continuam atendidos.
3. Start Digital: sai do cardápio público e vira a fundação dos projetos de site.
4. Preço: publicar "a partir de" por linha; tabela da seção 3.3 aprovada, com site (de estoque ou institucional) a partir de R$ 7.900, pacote completo a R$ 14.900 (24% de desconto), infraestrutura repassada na mesma fatura e cláusula de saída.
5. Marca: direção B; nome fixo "V2O5 Vendas e Tecnologia", CNPJ 68.490.470/0001-14.
6. Consentimento: o mesmo modelo da Motors.
7. Gestão de tráfego entra como linha de serviço, com página na fase 1.
8. rede-auto e Motogestor-v3 são produtos em estudo, fora do site por ora; o Motogestor vai para a linha da Motors Store.
9. Fenauto 2026: não.
10. Endereço da sede é residencial: Perfil de Empresa como empresa de área de serviço, sem endereço visível; site e schema mostram só cidade e estado.
11. Dados do Chatwoot e do Search Console da Motors: esperar mais histórico. O case lança com os números da seção 2.1 e ganha a atualização depois.

### Em aberto

1. Logo: confirmar a direção B ou trocar por C1 ou C2 depois da comparação no canvas.
2. Fundador: foto para a página Sobre e para os guias.
3. Agenda: Cal.com, agenda do Google ou só WhatsApp?
4. GTM server-side na fase 1, na fase 3 ou não usar?
5. Contas: Vercel e Supabase na mesma conta da Motors ou separadas? Há conta do Google Ads da V2O5 para o Planejador de Palavras-chave?
6. Crédito "Desenvolvido por V2O5" no rodapé da Motors: pode?
7. CNAE: conferir com o contador se os códigos do CNPJ cobrem site, sistema e tráfego.

## 13. Riscos

| Risco | Mitigação |
|---|---|
| Troca de DNS derrubar e-mail ou os subdomínios da VPS | Mudar só o registro do apex e do `www`; conferir MX, SPF, DKIM, DMARC e os A de `n8n`, `chat`, `chatwoot` e `evolution` antes e depois |
| Case com pouco tempo de dado ser lido como exagero | Publicar só o que a seção 2.1 sustenta, com período, e atualizar com 90 dias |
| Case falar de atendimento com a integração do Chatwoot parada | Corrigir na Motors antes; até lá, o case não cita tempo de resposta |
| Autoconf ocupar o mesmo discurso na região de Curitiba | Prova numérica e pública, e a posse do sistema como diferença |
| Prometer integração que não existe | Página de integração só depois da integração em produção |
| Motion pesar e contradizer a promessa de performance | Orçamento de JS por rota e Lighthouse CI bloqueando o merge |
| Conteúdo de IA genérico | Método da Motors: critério do lugar vazio, dado próprio, humanizer e teste de marcas |
| Marca seguir invisível por colidir com o composto químico | Forma fixa da marca, schema com `sameAs`, Perfil de Empresa e menções externas desde a fase 1 |
| Base legal do rastreamento questionada | Texto de privacidade revisado e oposição funcionando na página, como na Motors |
