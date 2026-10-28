# Guias: primeira onda (briefs e clusters)

Rascunho de 28/10/2026 para decisão do Dyones. Nada aqui está publicado: `/guias` segue provisória e com `noindex`. Método: `memory/context/seo.md` (guia normativo da Motors: 5 critérios eliminatórios, H1 igual à busca, resposta em 2 frases, FAQ igual ao schema, uma saída comercial por guia).

## O que ainda não foi medido

- **Volumes e dificuldade: não medidos.** Sem Search Console (Windsor.ai e AdCopilot sem login) nem Planejador de Palavras-chave. As colunas de volume ficam vazias de propósito; ninguém publica estimativa sem fonte (regra do projeto).
- **Números dos textos:** só os do case, de `memory/projects/case-motors.md`, com período. Onde o brief pede dado, ele diz de onde tirar.
- **Ordem de prioridade** vem de proximidade com a oferta e de lacuna na concorrência (`seo.md`), não de tráfego.

## Clusters

Um cluster, uma página. Os termos vêm de autocomplete e do plano (seção 4.2); validar cada um antes de redigir.

| # | Cluster | Palavra principal | Apoio | Intenção | Saída comercial |
|---|---|---|---|---|---|
| 1 | Portal ou site próprio | site próprio ou portal para vender carros | custo por venda no portal, anunciar em portal vale a pena, loja de carros sem portal | comercial | `/criacao-de-sites` |
| 2 | Tempo de resposta | tempo de resposta no WhatsApp da loja de carros | demora para responder lead, lead de carro esfria, responder lead rápido | informacional | `/agente-de-ia-para-whatsapp` |
| 3 | Custo por lead e por venda | custo por lead de loja de carros | custo por venda, quanto gastar em anúncio de carro, lead barato que não vende | informacional | `/rastreamento-de-conversoes` |
| 4 | Conversões offline | conversões offline Google Ads | enviar venda do CRM para o Google, otimizar anúncio por venda | informacional | `/rastreamento-de-conversoes` |
| 5 | Carro parado no pátio | custo do carro parado no pátio | giro de estoque de seminovos, quanto custa estoque parado | informacional | `/segmentos/revendas-de-veiculos` |

Canibalização: o 3 e o 4 falam de medição. O 3 trata do custo e do que contar; o 4 trata só do envio da venda ao Google Ads. Se o Search Console mostrar a mesma consulta nos dois, funde-se num guia só.

Órfãs a pesquisar: "CRM para revenda de carros" (já é página do hub, não guia), "agente de IA para loja de carros" (idem).

## Roteiro

| Ordem | Guia | Por que primeiro |
|---|---|---|
| 1 | Tempo de resposta | Tem dado próprio da Motors (resposta no WhatsApp) e leva direto ao agente |
| 2 | Custo por lead e por venda | Lacuna na concorrência: ninguém mede venda |
| 3 | Portal ou site próprio | Maior intenção comercial, liga ao site |
| 4 | Conversões offline | Nicho técnico, pouca disputa |
| 5 | Carro parado no pátio | Liga ao hub; exige dado de terceiros com fonte |

## Briefs

Estrutura comum a todos: H1 igual à busca; resposta em 2 frases no primeiro parágrafo; 3 a 6 H2; FAQ de 3 a 5 perguntas, igual ao schema; autor `Person` do fundador (`/sobre#autor`) com a relação com a Motors declarada; `Article` + `FAQPage` + `BreadcrumbList`; uma saída comercial no fim. Título até 60 caracteres, descrição de 150 a 160. Tom: direto, sem travessão, sem "não é X, é Y", sem tríades de efeito.

### 1. Tempo de resposta no WhatsApp da loja de carros

- **Título:** "Tempo de resposta no WhatsApp: quanto custa demorar numa loja de carros"
- **Resposta em 2 frases:** o lead de carro pergunta a várias lojas ao mesmo tempo, e quem responde primeiro costuma ficar com a conversa. Medir o tempo até a primeira resposta é o primeiro passo para decidir se vale pôr um agente de IA para atender fora do horário.
- **H2:** como medir o tempo da primeira resposta (Chatwoot ou o relatório do WhatsApp Business); o que a Motors mediu (usar só o número de `case-motors.md`, com período); o que acontece fora do horário; quando um agente resolve e quando não resolve (lead que pede negociação continua com gente); como começar sem trocar de sistema.
- **FAQ:** qual é um bom tempo de resposta? Agente de IA substitui o vendedor? Dá para medir sem CRM? WhatsApp Business basta?
- **Dado externo:** buscar estudo com fonte e data sobre tempo de resposta a leads antes de citar qualquer número; sem fonte, o guia fica só com o dado da Motors.
- **Links internos:** `/agente-de-ia-para-whatsapp`, `/crm-com-whatsapp`, `/cases/motors-store`. **Saída:** `/diagnostico` (uma só).
- **Diferencial:** número real de uma revenda nomeada, com o método de medição.

### 2. Custo por lead e custo por venda numa loja de carros

- **Título:** "Custo por lead e por venda na loja de carros: o que contar"
- **Resposta em 2 frases:** custo por lead mede o anúncio; custo por venda mede o negócio, e só dá para calcular quando o lead tem origem registrada até a venda. A maioria das lojas para no lead porque a venda fecha no balcão ou no WhatsApp, fora do alcance do anúncio.
- **H2:** as duas contas lado a lado; de onde sai o custo (verba, ferramenta, hora da equipe); como ligar o lead à venda (origem, UTM, identificador de deduplicação); exemplo da Motors (42 de 44 leads com identificador de deduplicação, número do case, conferir período); o que fazer com a conta pronta.
- **FAQ:** o que é um custo por lead bom? Como saber de onde veio a venda? Preciso de CRM?
- **Links internos:** `/rastreamento-de-conversoes`, `/cases/motors-store`. **Saída:** `/rastreamento-de-conversoes`.
- **Diferencial:** lacuna do setor (ninguém mede venda).

### 3. Site próprio ou portal para vender carros

- **Título:** "Site próprio ou portal: onde vender carro custa menos por venda"
- **Resposta em 2 frases:** o portal traz volume e cobra por ele; o site próprio traz menos tráfego e fica com o contato do cliente. A comparação certa é custo por venda de cada canal, não preço da mensalidade.
- **H2:** o que cada canal entrega; como comparar sem enganar a si mesmo (mesma janela, mesma definição de venda); o que o site próprio precisa ter para vender (vitrine, ficha, WhatsApp, medição); quando manter os dois; como a Motors trata os dois (conferir no case).
- **FAQ:** dá para viver sem portal? Quanto tempo leva para o site próprio render? O que mais pesa na ficha do veículo?
- **Dado externo:** preços de portais mudam; citar só com fonte e data de consulta, ou não citar.
- **Links internos:** `/criacao-de-sites`, `/segmentos/revendas-de-veiculos`. **Saída:** `/criacao-de-sites`.

### 4. Conversões offline no Google Ads

- **Título:** "Conversões offline no Google Ads: envie a venda, não só o lead"
- **Resposta em 2 frases:** conversão offline devolve ao Google Ads a venda que aconteceu fora do site, ligada ao clique que a originou. Com isso a campanha passa a ser otimizada por venda, não por formulário preenchido.
- **H2:** o que é e quando faz sentido (volume mínimo de vendas); o que guardar no lead (GCLID e data); como enviar (importação, API ou integração via n8n); como conferir que chegou; limites e privacidade (LGPD, consentimento).
- **FAQ:** preciso de GCLID? Quanto tempo o Google aceita? Funciona com WhatsApp?
- **Dado externo:** citar a documentação oficial do Google Ads (links e data de consulta); conferir os prazos atuais antes de escrever.
- **Links internos:** `/rastreamento-de-conversoes`, `/privacidade`. **Saída:** `/rastreamento-de-conversoes`.

### 5. Custo do carro parado no pátio

- **Título:** "Custo do carro parado no pátio: como calcular por dia"
- **Resposta em 2 frases:** carro parado custa capital, depreciação, seguro, pátio e comissão de oportunidade; somar tudo por dia mostra quando baixar o preço vale mais que esperar. A conta serve de regra para o estoque e para a verba de anúncio.
- **H2:** os custos que entram na conta; fórmula por dia com exemplo numérico claramente marcado como ilustração, nunca como dado do setor; quando baixar o preço; ligar giro, anúncio e medição; o que o painel da Motors mostra (só o que o case autoriza).
- **FAQ:** qual é o prazo ideal de giro? Depreciação entra na conta? Como saber o custo do meu pátio?
- **Dado externo:** taxas de depreciação e juros só com fonte (FIPE, Banco Central) e data.
- **Links internos:** `/segmentos/revendas-de-veiculos`, `/cases/motors-store`. **Saída:** `/diagnostico`.

## Antes de publicar

1. Foto e assinatura do fundador (pendências 1, 11 e 24b): o `Person` de `/sobre#autor` já existe; a foto falta.
2. Validar os cinco termos no Search Console (quando o Windsor.ai ou o AdCopilot estiver logado) ou no Planejador de Palavras-chave.
3. Infraestrutura: o hub é MDX no repositório (`infra.md`) e ainda não existe. Montar rota `/guias/[slug]`, índice em `/guias`, `Article` + `FAQPage` em `lib/schema.ts` e entradas no sitemap, tudo com teste. Tirar o `noindex` de `/guias` só com o primeiro guia publicado.
4. Texto final passa pelo humanizer e por revisão do Dyones. Nenhum número do case sem conferir `case-motors.md`.
