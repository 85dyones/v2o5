# Plano de conteúdo da V2O5: guias, cases e blog

Avaliação de 26/10/2026, a pedido do Dyones ("avaliar o desenvolvimento de conteúdo, guias da V2O5 e também blog, para trabalharmos a indexação da marca nos buscadores, como fizemos para a Motors, ainda mais relevante, pois somos o case de clientes, somos o nosso portfólio"). É uma proposta para decidir, não uma obra em andamento. Base: o plano do site (`docs/2026-10-08-plano-novo-site.md`, seções 1, 4 e 7), o método da Motors (`motors-site-oficial/conteudo-seo/pacote/00-guia-normativo.md`) e duas buscas de mercado de 26/10.

## 1. Recomendação em cinco linhas

1. **Guias primeiro, em ondas**, com a régua da Motors (pergunta real, cadeira vazia, uma saída comercial, sem canibalizar, sobrevive doze meses). O `/guias` está `noindex` e "em construção".
2. **A V2O5 como cliente zero é o conteúdo mais forte que temos:** um case com o antes medido do WordPress (Lighthouse 51, LCP 13,5 s, 2.074 KiB, sem JSON-LD, sem rastreamento) e o depois medido do site novo.
3. **Blog separado só depois da primeira onda**, e com outra função (notas datadas do fundador com dado de operação), nunca misturado com os guias.
4. **Indexar a marca é mais do que publicar texto:** "V2O5" hoje só traz o composto químico. A V2O5 precisa existir como entidade (Perfil de Empresa, LinkedIn, Instagram, `sameAs`, menções e o crédito "Desenvolvido por V2O5" nos clientes).
5. **Medir com o que já temos:** Search Console e Bing, os scripts da Motors (`gsc.js`, `planejador.js`) e a linha de base de citações em IA (`BASELINE_IA.md`).

## 2. De onde partimos

| Item | Estado |
|---|---|
| `/guias` | `noindex`, "Em construção" (provisória); `/blog/` do WordPress já redireciona para `/guias` (301) |
| Páginas de busca da V2O5 | Home, 5 soluções, hub de revendas, case Motors, preços, sobre, diagnóstico: prontas e indexáveis |
| Dados próprios | Motors (26 guias, 132 veículos sincronizados, 42 de 44 leads com identificador, lidos em 08/10/2026) e o antes/depois do próprio site da V2O5 |
| Método de conteúdo | Existe e funciona na Motors: régua de cinco critérios, anatomia do guia, ondas, linkagem interna, trava de marcas de IA, humanizer |
| Infraestrutura da V2O5 | Falta: carregador de guias, rota `/guias/[slug]`, schema `Article` e `FAQPage`, entrada no sitemap, lista de relacionados |
| Search Console da V2O5 | Sem confirmação nesta sessão; sem ela não há critério 1 |
| Perfil de Empresa, LinkedIn, Instagram | Não confirmados; o plano (4.7) os põe antes do lançamento |

## 3. O que a Motors ensinou e o que muda aqui

A Motors vende para o comprador e escreve do lado de quem recusa o carro: a cadeira vazia era "só quem reprova sete de cada dez carros escreve isso". A V2O5 vende para o dono de empresa e o lojista, e a busca genérica do nosso assunto já tem dono:

- **Atendimento no WhatsApp com IA:** Omie, Sebrae/PR, HeroSpark e Hora de Codar ocupam a primeira página com guias de passo a passo.
- **API de Conversões:** a própria Meta, Nuvemshop, Kommo e consultorias de rastreamento.

Entrar com o mesmo texto genérico perde. A cadeira vazia da V2O5 é **o que só quem implantou e mediu escreve**: o custo real de manter um agente de IA, quando o agente deve passar para a pessoa, como a venda volta ao anúncio, o que mudou numa operação depois de um Sprint. O critério 2 continua sendo o que mais reprova, e deve reprovar a maior parte das ideias.

## 4. Três peças, três funções

| Peça | Função | Formato | Regra |
|---|---|---|---|
| **Guias** (`/guias`) | Responder uma pergunta real e levar a uma única saída | Evergreen, 1.500 a 2.000 palavras, H1 igual à busca, resposta em duas frases, FAQ igual ao schema | Uma saída: `/diagnostico` ou uma página de capacidade. Post datado não entra aqui |
| **Cases** (`/cases`) | Provar | Antes diagnosticado, depois implementado, medido, com fonte e período | Só número medido. Motors (feito), **V2O5 (novo)**, e o segundo segmento quando a 16ª Vara fechar |
| **Blog / diário** (rota a definir) | Autoridade e frescor | Notas curtas e datadas do fundador, com um dado ou uma lição de projeto, espelhadas no LinkedIn | Só depois da onda 1; nenhuma nota sem dado próprio |

### 4.1 O case V2O5 como cliente zero

O mesmo método que vendemos, aplicado ao nosso site, com a estrutura do case da Motors:

- **Antes (diagnosticado, 08/10/2026):** WordPress 6.8, Lighthouse mobile 51, LCP 13,5 s, TBT 600 ms, 2.074 KiB para 2.142 caracteres, `lang="en-US"`, nenhuma meta description, nenhum JSON-LD, listagem de usuários exposta, nenhuma página mirando busca com demanda.
- **Depois (implementado):** Next.js na Vercel, SEO técnico, schema, rastreamento por variável com API de Conversões, formulário até o n8n, agente no WhatsApp, redesign direção B.
- **Medido:** Lighthouse e LCP do site novo (a refazer com a mesma ferramenta e o mesmo perfil, para comparar), Search Console depois de 90 dias, leads com origem.

É também a prova de que o método de cinco perguntas funciona em quem o vende. Rota sugerida: `/cases/v2o5`.

## 5. Primeira onda de guias (candidatas, ainda sem verificação de demanda)

Cada tema precisa passar nos cinco critérios; o critério 1 (pergunta real) exige o Search Console ou o Planejador do Google Ads, que não consegui consultar nesta sessão. A coluna "cadeira vazia" é o que impede o guia de parecer o de um blog genérico.

| Cluster | Guia candidato | Cadeira vazia (dado ou experiência própria) | Saída |
|---|---|---|---|
| Atendimento | Quanto custa manter um agente de IA no WhatsApp | A decomposição real: gestão, nuvem, IA e mensagens, com teto combinado e aviso (nosso modelo de recorrência) | `/agente-de-ia-para-whatsapp` |
| Atendimento | Quando o agente de IA deve passar para uma pessoa | As nossas regras de passagem (pedido de horário, preço, reclamação, áudio) | `/agente-de-ia-para-whatsapp` |
| Atendimento | Tempo de resposta no WhatsApp e venda | O estudo da HBR (citado na home) mais o dado da Motors, se houver | `/diagnostico` |
| Rastreamento | Como a venda volta para o anúncio | O fluxo real: `event_id` por lead, Pixel e API de Conversões sem contar duas vezes (Motors: 42 de 44 leads com identificador) | `/rastreamento-de-conversoes` |
| Rastreamento | API de Conversões do Meta para pequenas empresas | Onde a configuração de um clique da Meta basta e onde não basta | `/rastreamento-de-conversoes` |
| Processo | Simplificar antes de automatizar: as cinco perguntas | O método do `/sobre`, com um exemplo medido | `/diagnostico` |
| Processo | Integrar CRM e WhatsApp sem trocar de sistema | Revenda Mais e Kenlo, sem citar o que não implantamos | `/crm-com-whatsapp` |
| Sites | O que um site precisa ter para ser achado no Google e nas respostas de IA | A entrega-base do site (onze itens) e o antes/depois do nosso próprio site | `/criacao-de-sites` |
| Revendas | Portal ou site próprio: custo por venda em uma revenda | Só com dado da Motors, com fonte e período | `/segmentos/revendas-de-veiculos` |

Regra de ouro herdada: nada de percentual ou resultado sem fonte. A estatística de "17,8% menor custo por resultado" que a Meta divulga é dado do fornecedor e só entra citada como tal.

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
| 0 | Estrutura de guias no site, testes, Search Console e Bing ligados, entidade (Perfil, LinkedIn, Instagram) | Acesso ao Search Console e ao Planejador; contas sociais |
| 1 | Case V2O5 + 6 a 8 guias de atendimento e rastreamento | Medição do site novo; critério 1 verificado |
| 2 | Guias de processo e sites, e o hub de revendas com os dados da Motors | Onda 1 publicada e lida no Search Console |
| 3 | Blog ou diário do fundador; segundo segmento (16ª Vara) quando fechar | Dado próprio e autorização |

## 10. O que preciso do Dyones

1. **Search Console e Planejador de Palavras-chave da V2O5:** existem e posso usar? Sem eles, os temas ficam sem critério 1.
2. **Case V2O5:** autoriza publicar o antes (WordPress, medido em 08/10) e o depois, com os números medidos?
3. **Blog:** concorda em esperar a onda 1, e em chamá-lo de diário ou notas do fundador, e não de blog?
4. **Perfil de Empresa, LinkedIn e Instagram:** quais já existem e quais crio o roteiro?
5. **Temas:** a lista da seção 5 é a que você quer ver passar pela régua, ou há assuntos seus (dado de projeto) que valem mais?
