# Plano de conteúdo da V2O5: guias, cases e blog

Avaliação de 26/10/2026, a pedido do Dyones ("avaliar o desenvolvimento de conteúdo, guias da V2O5 e também blog, para trabalharmos a indexação da marca nos buscadores, como fizemos para a Motors, ainda mais relevante, pois somos o case de clientes, somos o nosso portfólio"). **Atualizado em 27/10/2026 com as respostas do Dyones:** Search Console e Planejador serão criados com `v2o5consultoria@gmail.com`; o case V2O5 **não** será publicado por ora; o blog fica para depois da onda 1; LinkedIn e Instagram/Facebook existem, mas estão desatualizados e sem gestão, e o Perfil de Empresa no Google será criado; a fila de guias começa pelo que a V2O5 faz hoje (seção 5). O roteiro dos perfis e buscadores está em `docs/perfis-e-buscadores.md`. Base: o plano do site (`docs/2026-10-08-plano-novo-site.md`, seções 1, 4 e 7), o método da Motors (`motors-site-oficial/conteudo-seo/pacote/00-guia-normativo.md`) e duas buscas de mercado de 26/10.

## 1. Recomendação em cinco linhas

1. **Guias primeiro, em ondas**, com a régua da Motors (pergunta real, cadeira vazia, uma saída comercial, sem canibalizar, sobrevive doze meses). O `/guias` está `noindex` e "em construção".
2. **O case V2O5 como cliente zero fica de fora por ora** (decisão de 27/10). O antes medido do WordPress continua guardado como referência interna; a prova pública segue sendo a Motors, e o segundo segmento entra quando a 16ª Vara fechar.
3. **Blog separado só depois da primeira onda**, e com outra função (notas datadas do fundador com dado de operação), nunca misturado com os guias.
4. **Indexar a marca é mais do que publicar texto:** "V2O5" hoje só traz o composto químico. A V2O5 precisa existir como entidade (Perfil de Empresa, LinkedIn, Instagram, `sameAs`, menções e o crédito "Desenvolvido por V2O5" nos clientes).
5. **Medir com o que já temos:** Search Console e Bing, os scripts da Motors (`gsc.js`, `planejador.js`) e a linha de base de citações em IA (`BASELINE_IA.md`).

## 2. De onde partimos

| Item | Estado |
|---|---|
| `/guias` | `noindex`, "Em construção" (provisória); `/blog/` do WordPress já redireciona para `/guias` (301) |
| Páginas de busca da V2O5 | Home, 5 soluções, hub de revendas, case Motors, preços, sobre, diagnóstico: prontas e indexáveis |
| Dados próprios | Motors (26 guias, 132 veículos sincronizados, 42 de 44 leads com identificador, lidos em 08/10/2026) o método e as regras do agente da V2O5 (sem case público do próprio site) |
| Método de conteúdo | Existe e funciona na Motors: régua de cinco critérios, anatomia do guia, ondas, linkagem interna, trava de marcas de IA, humanizer |
| Infraestrutura da V2O5 | Falta: carregador de guias, rota `/guias/[slug]`, schema `Article` e `FAQPage`, entrada no sitemap, lista de relacionados |
| Search Console e Planejador da V2O5 | Serão criados com `v2o5consultoria@gmail.com`; até lá a demanda dos temas não está verificada |
| Perfil de Empresa, LinkedIn, Instagram, Facebook | LinkedIn e Instagram/Facebook existem, desatualizados e sem gestão; o Perfil de Empresa será criado (roteiro em `docs/perfis-e-buscadores.md`) |

## 3. O que a Motors ensinou e o que muda aqui

A Motors vende para o comprador e escreve do lado de quem recusa o carro: a cadeira vazia era "só quem reprova sete de cada dez carros escreve isso". A V2O5 vende para o dono de empresa e o lojista, e a busca genérica do nosso assunto já tem dono:

- **Atendimento no WhatsApp com IA:** Omie, Sebrae/PR, HeroSpark e Hora de Codar ocupam a primeira página com guias de passo a passo.
- **API de Conversões:** a própria Meta, Nuvemshop, Kommo e consultorias de rastreamento.

Entrar com o mesmo texto genérico perde. A cadeira vazia da V2O5 é **o que só quem implantou e mediu escreve**: o custo real de manter um agente de IA, quando o agente deve passar para a pessoa, como a venda volta ao anúncio, o que mudou numa operação depois de um Sprint. O critério 2 continua sendo o que mais reprova, e deve reprovar a maior parte das ideias.

## 4. Três peças, três funções

| Peça | Função | Formato | Regra |
|---|---|---|---|
| **Guias** (`/guias`) | Responder uma pergunta real e levar a uma única saída | Evergreen, 1.500 a 2.000 palavras, H1 igual à busca, resposta em duas frases, FAQ igual ao schema | Uma saída: `/diagnostico` ou uma página de capacidade. Post datado não entra aqui |
| **Cases** (`/cases`) | Provar | Antes diagnosticado, depois implementado, medido, com fonte e período | Só número medido. Motors (feito) e o segundo segmento quando a 16ª Vara fechar. O case do próprio site da V2O5 não será publicado por ora |
| **Blog / diário** (rota a definir) | Autoridade e frescor | Notas curtas e datadas do fundador, com um dado ou uma lição de projeto, espelhadas no LinkedIn | Só depois da onda 1; nenhuma nota sem dado próprio |

### 4.1 O case V2O5 como cliente zero: adiado

Decisão do Dyones em 27/10: o case do próprio site não será publicado agora. O antes medido em 08/10 (WordPress, Lighthouse mobile 51, LCP 13,5 s, 2.074 KiB, sem JSON-LD) fica no plano do site como registro interno, e os guias que dependiam dele usam só a entrega-base do site e o método. Se mudar de ideia, o formato é o do case da Motors (antes, depois, medido).

## 5. Fila inicial de guias (a partir do que a V2O5 faz hoje)

Lista de trabalho, não de publicação: cada tema ainda precisa passar no critério 1 (pergunta real, pelo Search Console e pelo Planejador, depois que existirem). Os critérios 2 a 5 já foram olhados. H1 com até 60 caracteres, igual à busca; uma saída por guia; "Dado" diz o que falta ter em mãos para escrever. Os guias de dado próprio só entram com número lido com fonte e período.

| # | Cluster | H1 (e busca-alvo) | Cadeira vazia | Saída | Dado necessário | Onda |
|---|---|---|---|---|---|---|
| 1 | Atendimento | Quanto custa manter um agente de IA no WhatsApp | Decomposição real: gestão, nuvem, IA e mensagens, com teto combinado e aviso; sem tabela de plano | `/agente-de-ia-para-whatsapp` | Valores públicos da recorrência e o custo de provedor (fontes oficiais) | 1 |
| 2 | Atendimento | Quando o agente de IA deve passar para uma pessoa | As regras de passagem do agente da V2O5 (pedido de horário, negociação, reclamação, áudio) | `/agente-de-ia-para-whatsapp` | As regras (já escritas no agente) | 1 |
| 3 | Atendimento | WhatsApp API oficial ou Evolution: qual escolher | Quem usa os dois no servidor próprio e conhece o risco de bloqueio | `/agente-de-ia-para-whatsapp` | Política oficial da Meta (fonte) | 2 |
| 4 | Atendimento | Tempo de resposta no WhatsApp e venda | O estudo da HBR (já citado na home) com a leitura de operação | `/diagnostico` | Estudo e, se houver, dado da Motors | 2 |
| 5 | Rastreamento | Como a venda volta para o anúncio do Google e da Meta | O fluxo real: `event_id` por lead, servidor e navegador, venda no CRM | `/rastreamento-de-conversoes` | Fluxo do site; o dado da Motors (42 de 44 leads com identificador) | 1 |
| 6 | Rastreamento | Pixel e API de Conversões sem contar a venda duas vezes | Deduplicação por `event_id` explicada com o nosso caso | `/rastreamento-de-conversoes` | Documentação da Meta (fonte) | 1 |
| 7 | Rastreamento | API de Conversões da Meta: quando a configuração simples basta | Onde o clique da Meta resolve e onde falta a venda do CRM | `/rastreamento-de-conversoes` | Anúncio da Meta de abril/2026 (fonte) | 2 |
| 8 | Processo | Simplificar antes de automatizar: as cinco perguntas | O método do `/sobre`, em exemplo | `/diagnostico` | O método (já escrito) | 1 |
| 9 | Processo | Como achar o gargalo da sua operação em 45 minutos | O roteiro do Diagnóstico de Gargalo, sem prometer mapa | `/diagnostico` | O roteiro (já escrito) | 1 |
| 10 | Processo | Integrar CRM e WhatsApp sem trocar de sistema | Revenda Mais e Kenlo, onde há experiência | `/crm-com-whatsapp` | A experiência do Dyones (entrevista curta) | 2 |
| 11 | Processo | O que vale automatizar no n8n e o que não vale | Critérios de quem automatiza e também recusa automação | `/automacao-com-ia` | Critérios do Dyones | 2 |
| 12 | Sites | O que um site profissional precisa ter para ser achado | A entrega-base de onze itens, explicada | `/criacao-de-sites` | A entrega-base (já escrita) | 1 |
| 13 | Sites | Como o seu site aparece nas respostas de IA | O que o Google diz (sem otimização especial) e o que fazemos mesmo assim (`llms.txt`, dados estruturados) | `/criacao-de-sites` | Documentação do Google (fonte) | 2 |
| 14 | Revendas | Site de estoque integrado ao sistema da loja | Revenda Mais em produção, o resto por fluxo | `/segmentos/revendas-de-veiculos` | O que roda hoje (já no site) | 2 |
| 15 | Revendas | Portal ou site próprio: custo por venda na revenda | Só com número lido na Motors, com fonte e período | `/segmentos/revendas-de-veiculos` | **Falta o dado**; fica bloqueado até lê-lo | 3 |

A primeira onda (1, 2, 5, 6, 8, 9 e 12) usa material que já existe, sem depender de dado novo. Ela é a que dá para escrever assim que a estrutura de guias estiver no ar e o Search Console confirmar a demanda. Depois da lista, os guias que pedem a voz do Dyones (10, 11) levam uma conversa curta de entrevista, e os temas mais pessoais entram na segunda rodada, como combinado.

## 6. Indexar a marca, não só as páginas

Alinhado à seção 4.7 do plano. Em ordem de custo:

1. **Entidade:** Perfil de Empresa como empresa de área de serviço (sede residencial oculta), LinkedIn e Instagram reais, NAP idêntico em todo lugar e `sameAs` no schema da `Organization` e do fundador.
2. **Desambiguação do nome:** usar sempre "V2O5 Vendas e Tecnologia" nos títulos, no schema e nas menções, porque "V2O5" sozinho é o pentóxido de vanádio.
3. **Buscadores:** Search Console e Bing Webmaster com sitemap enviado; IndexNow por cron para o Bing (o ChatGPT também busca por ele).
4. **Crédito nos clientes:** "Desenvolvido por V2O5" no rodapé da Motors e dos próximos, com permissão. É backlink e é menção.
5. **Fundador como autor:** `Person` ligado a cada guia (já existe em `/sobre#autor`); artigos do fundador no LinkedIn com dado de operação.
6. **Comunidades técnicas:** n8n, Chatwoot e Evolution API, com o case técnico.
7. **Linha de base de IA:** repetir o `BASELINE_IA.md` da Motors para a marca ("o que é a V2O5", "quem faz automação com IA em Curitiba") antes e depois de cada onda.

## 7. Estrutura técnica no site novo

Proposta mínima, na mesma linha dos outros conteúdos (módulos em `src/conteudo/`), sem CMS:

- `src/conteudo/guias/*.ts` por guia (slug, H1, resumo, seções, tabela, FAQ, saída, relacionados, data, fonte dos números) e um índice; ou MDX no repositório, como o plano previa.
- `/guias` (índice com busca simples e temas) e `/guias/[slug]`, com `Article` + `BreadcrumbList` + `FAQPage` do mesmo array que o texto, `lastModified` real no sitemap e `noindex` removido só quando houver a onda 1.
- Testes que travam: um guia, uma saída; FAQ igual ao schema; título e descrição únicos; sem travessão e sem marcas de IA (a régua da Motors); toda fonte de número presente; nenhum nome de cliente além da Motors autorizada.
- Linkagem interna: cada guia aponta para uma página de capacidade e para o case, e cada página de capacidade lista os guias do seu cluster.
- Imagem de compartilhamento por guia; sem biblioteca nova de animação.

## 8. Medição

Search Console é a fonte da verdade. Mensal: impressões nas queries do cluster, posição média por guia, queries novas sem página (fila seguinte), leads em `/diagnostico` com origem orgânica. Marcos propostos: **90 dias**, primeiros guias indexados e a marca aparecendo na busca por "V2O5 Vendas e Tecnologia"; **180 dias**, leads orgânicos medidos e citações em respostas de IA comparadas com a linha de base.

## 9. Ordem de trabalho (ondas, não semanas)

| Onda | Conteúdo | Pré-requisito |
|---|---|---|
| 0 | Estrutura de guias no site e testes; Search Console, Bing e Planejador criados; perfis (Perfil de Empresa, LinkedIn, Instagram, Facebook) atualizados | Roteiro de `docs/perfis-e-buscadores.md` feito pelo Dyones |
| 1 | Sete guias (1, 2, 5, 6, 8, 9 e 12) | Estrutura de guias no ar; critério 1 verificado no Search Console e no Planejador |
| 2 | Guias de processo e sites, e o hub de revendas com os dados da Motors | Onda 1 publicada e lida no Search Console |
| 3 | Blog ou diário do fundador; segundo segmento (16ª Vara) quando fechar | Dado próprio e autorização |

## 10. Decisões de 27/10 e o que falta

1. **Search Console e Planejador:** criar com `v2o5consultoria@gmail.com`, seguindo `docs/perfis-e-buscadores.md`. Sem conector de navegador nesta sessão, quem clica é o Dyones.
2. **Case V2O5:** não será publicado por ora (decidido).
3. **Blog:** depois da onda 1, como diário ou notas do fundador (decidido).
4. **Perfis:** LinkedIn e Instagram/Facebook existem e serão atualizados e geridos; o Perfil de Empresa será criado. Falta o Dyones passar as URLs para o `sameAs`.
5. **Temas:** a seção 5 é a fila inicial; os assuntos mais pessoais entram depois de ajuste (decidido).
6. **Próximo passo técnico (aguarda "siga"):** estrutura de guias no site (`/guias`, `/guias/[slug]`, schema, sitemap, testes), ainda com `noindex` até a onda 1.
