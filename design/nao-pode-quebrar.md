# O que não pode quebrar no redesign

Linha de base de **19/10/2026**, lida em produção (https://www.v2o5.com.br) com o `main` em `46c4103`. Tudo o que está aqui funciona hoje e tem gente, robô ou sistema dependendo disso: o Google (rotas, title, description, JSON-LD), o GA4 e a Meta (eventos), o n8n e o Chatwoot (formulário e WhatsApp). O redesign pode mudar a cara de tudo; isto aqui fica igual, ou muda de propósito e com o lado de lá avisado.

Fontes: `design/baseline/extracao-producao.json` (o que o site serviu), `design/baseline/jsonld.json` (grafos completos), o código em `src/` e `docs/n8n/LEIA-ME.md`. O texto de cada rota está em `content/`. Os scripts que geraram tudo estão em `design/baseline/ferramentas/` e podem rodar de novo contra o preview do redesign.

Já existem testes que travam boa parte disto (`npm test`): `paginas`, `schema`, `medicao`, `capi`, `leads`, `n8n`, `cabecalhos`, `redirecionamentos`, `robots`, `llms`, `ancoras`. Teste que quebrar no redesign é aviso, não detalhe para ajustar o teste.

## 1. Rotas

| Rota | Status | Indexa | No sitemap | `page_type` na medição | Texto |
|---|---|---|---|---|---|
| `/` | 200 | sim | sim | `home` | `content/home.md` |
| `/agente-de-ia-para-whatsapp` | 200 | sim | sim | `solucao · service_line=agente` | `content/agente-de-ia-para-whatsapp.md` |
| `/automacao-com-ia` | 200 | sim | sim | `solucao · service_line=automacao` | `content/automacao-com-ia.md` |
| `/criacao-de-sites` | 200 | sim | sim | `solucao · service_line=sites` | `content/criacao-de-sites.md` |
| `/crm-com-whatsapp` | 200 | sim | sim | `solucao · service_line=crm` | `content/crm-com-whatsapp.md` |
| `/rastreamento-de-conversoes` | 200 | sim | sim | `solucao · service_line=rastreamento` | `content/rastreamento-de-conversoes.md` |
| `/gestao-de-trafego` | 307 para `/precos#titulo-trafego` (19/10, Dyones, até ganhar texto) | · | não | · | `content/gestao-de-trafego.md` (texto da versão provisória) |
| `/segmentos/revendas-de-veiculos` | 200 | sim | sim | `segmento · segment=revendas-de-veiculos` | `content/segmentos/revendas-de-veiculos.md` |
| `/cases/motors-store` | 200 | sim | sim | `case` | `content/cases/motors-store.md` |
| `/precos` | 200 | sim | sim | `precos` | `content/precos.md` |
| `/sobre` | 200 | sim | sim | `sobre` | `content/sobre.md` |
| `/diagnostico` | 200 | sim | sim | `diagnostico` | `content/diagnostico.md` |
| `/diagnostico/recebido` | 200 | não (`noindex, follow`) | não | `recebido` | `content/diagnostico/recebido.md` |
| `/guias` | 200 | não (`noindex, follow`) | não | `guia` | `content/guias.md` |
| `/privacidade` | 200 | sim | sim | `privacidade` | `content/privacidade.md` |
| qualquer rota inexistente | 404 | não (`noindex`) | não | `nao-encontrada` | `content/nao-encontrada.md` |

Provisória hoje: `/guias`; `/gestao-de-trafego` responde 307 para `/precos#titulo-trafego` desde 19/10 (`REDIRECIONAMENTOS_PROVISORIOS` em `next.config.ts`), e os links de tráfego da home, do rodapé e das soluções apontam para lá. As provisórias ficam (`pronta: false` em `src/conteudo/paginas.ts`, com `noindex, follow` e fora do sitemap). Ganham conteúdo antes de entrar no sitemap, nunca o contrário.

### Domínio, canônico e respostas que não são página

- Endereço principal: `https://www.v2o5.com.br` (`SITE_URL` em `src/lib/site.ts`). O apex e o `http` respondem **308** para o `www`:
  - `https://v2o5.com.br/` → 308 `https://www.v2o5.com.br/`
  - `http://www.v2o5.com.br/` → 308 `https://www.v2o5.com.br/`
- Canonical de cada página = `SITE_URL` + rota (`alternates.canonical` em `metadataDa`). O da home sai sem barra final: `https://www.v2o5.com.br`; o sitemap usa `https://www.v2o5.com.br/`. É o comportamento atual; se mudar, que seja de propósito.
- Endereços do WordPress antigo, **301** (`REDIRECIONAMENTOS_DO_WORDPRESS` em `next.config.ts`; já indexados no Google):
  - `/jornada` → `/sobre`
  - `/solucoes` → `/`
  - `/contrate` → `/diagnostico`
  - `/politica-privacidade` → `/privacidade`
  - `/blog` → `/guias`
  - `/author/dyones` → `/sobre`
  - `/feed` → `/sitemap.xml`
  - `/comments/feed` → `/sitemap.xml`
  - `/wp-sitemap.xml` → `/sitemap.xml`
- **410** (não existem mais e não têm destino): `/hello-world`, `/test-post` (route handlers em `src/app/hello-world` e `src/app/test-post`).
- Rota inexistente: status **404**, `robots: noindex`, título "Página não encontrada | V2O5 Vendas e Tecnologia" e saídas para `/diagnostico`, `/#solucoes` e o case (`src/app/not-found.tsx`).
- `/api/leads` aceita só `POST` (um `GET` dá 405).
- `/robots.txt`, como servido hoje (`src/app/robots.ts`, um grupo só para todos os robôs, inclusive os de IA):

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /diagnostico/recebido

Sitemap: https://www.v2o5.com.br/sitemap.xml
```

- `/sitemap.xml`: 12 URLs, só as páginas com `pronta: true`, com `lastmod` = `atualizadaEm` às 12h de Brasília (data real da última mudança de conteúdo; mudar texto de uma página no redesign pede atualizar a data dela).
- `/llms.txt`: gerado de `src/conteudo/home.ts` e `precos.ts` (`src/app/llms.txt/route.ts`); cópia em `content/llms.txt.md`.
- Ícone: `src/app/icon.svg`, servido como `/icon.svg?icon.0elm14j1mf9e4.svg`; é também o `logo` da organização no JSON-LD (`https://www.v2o5.com.br/icon.svg`).
- `<html lang="pt-BR">`, `theme-color` `#121418`, `color-scheme: dark` (`src/app/layout.tsx`).
- Cabeçalhos de segurança em toda resposta (`CABECALHOS_DE_SEGURANCA` em `next.config.ts`): CSP sem nonce, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` sem câmera, microfone, geolocalização e `browsing-topics`, HSTS de 2 anos sem `preload`. A CSP só libera o Google Analytics e a Meta (`src/lib/terceiros.ts`); fonte, imagem ou script novo de fora no redesign tem de entrar ali, na CSP e em `/privacidade`.

### Âncoras que os links usam

Links com fragmento são `<a>` nativos (`LinkOuAncora`) e rolam sem suavidade; `src/lib/ancora.ts` confere o pouso. O redesign mantém estes `id`:

| Âncora | Existe na rota | Linkada de |
|---|---|---|
| `/#como-se-liga` | sim | `/` |
| `/#solucoes` | sim | 15 rotas (topo/rodapé) |
| `/agente-de-ia-para-whatsapp#titulo-preco` | sim | `/agente-de-ia-para-whatsapp` |
| `/automacao-com-ia#titulo-preco` | sim | `/automacao-com-ia` |
| `/criacao-de-sites#titulo-preco` | sim | `/criacao-de-sites` |
| `/crm-com-whatsapp#titulo-preco` | sim | `/crm-com-whatsapp` |
| `/precos#perguntas` | sim | `/precos` |
| `/precos#titulo-modulos` | sim | `/segmentos/revendas-de-veiculos` |
| `/precos#titulo-trafego` | sim | `/segmentos/revendas-de-veiculos` |
| `/privacidade#bases-legais` | sim | `/privacidade` |
| `/privacidade#compartilhamento` | sim | `/privacidade` |
| `/privacidade#contato` | sim | `/privacidade` |
| `/privacidade#controlador` | sim | `/privacidade` |
| `/privacidade#dados` | sim | `/privacidade` |
| `/privacidade#direitos` | sim | `/privacidade` |
| `/privacidade#finalidades` | sim | `/privacidade` |
| `/privacidade#medicao` | sim | `/privacidade` |
| `/privacidade#retencao` | sim | `/privacidade` |
| `/privacidade#seguranca` | sim | `/privacidade` |
| `/rastreamento-de-conversoes#titulo-preco` | sim | `/rastreamento-de-conversoes` |
| `/segmentos/revendas-de-veiculos#titulo-pacote` | sim | `/segmentos/revendas-de-veiculos` |
| `/sobre#autor` | sim | `/sobre` |

Fora da tabela: `#conteudo`, alvo do link "Pular para o conteúdo" e `id` do `<main>`, presente nas 16 rotas.

### Quem aponta para o site de fora

A vitrine de `diagnostico.v2o5.com.br` (`subdominios/diagnostico/`, publicada pelo projeto `v2o5-diagnosticos` na Vercel) linka para `/`, `/diagnostico`, `/precos`, `/sobre`, `/privacidade`, `/cases/motors-store`, `/gestao-de-trafego` (hoje 307 para `/precos#titulo-trafego`) e as cinco páginas de solução prontas, com `utm_source=diagnostico.v2o5.com.br`. Renomear ou tirar qualquer uma dessas rotas quebra links publicados; se precisar, entra um 301 em `next.config.ts`.

## 2. Title e description de cada rota

Como o site serve hoje. Saem de `PAGINAS` em `src/conteudo/paginas.ts` (`metadataDa`); o layout aplica o modelo `%s | V2O5 Vendas e Tecnologia` às internas, e a home usa o título inteiro. `tests/paginas.test.ts` cobra título e descrição únicos e canonical igual à rota.

| Rota | `<title>` | `meta description` |
|---|---|---|
| `/` | V2O5 Vendas e Tecnologia \| Catalisador de vendas com IA | Site, Perfil no Google, anúncios, agente de IA no WhatsApp e CRM montados por uma equipe só, num sistema que mostra de onde veio cada venda. Sem fidelidade. |
| `/agente-de-ia-para-whatsapp` | Agente de IA para WhatsApp \| V2O5 Vendas e Tecnologia | Agente de IA no WhatsApp que responde na hora com as informações do seu negócio, qualifica, agenda e passa para a equipe. A partir de R$ 3.900 + R$ 790/mês. |
| `/automacao-com-ia` | Automação de processos com IA e n8n \| V2O5 Vendas e Tecnologia | Fluxos no n8n que ligam os sistemas que a sua empresa já usa, com IA validada contra invenção de dado e registro de cada execução. R$ 1.900 por fluxo. |
| `/criacao-de-sites` | Criação de site profissional com SEO \| V2O5 Vendas e Tecnologia | Site rápido no celular, achado no Google e nas respostas das IAs, que grava de onde veio cada contato. Hospedagem e manutenção na mensalidade de R$ 690. |
| `/crm-com-whatsapp` | CRM com WhatsApp integrado \| V2O5 Vendas e Tecnologia | CRM sob medida com WhatsApp dentro do funil: cada contato com origem, etapa e próximo passo. 5 usuários inclusos, sem licença por pessoa, a partir de R$ 4.900. |
| `/rastreamento-de-conversoes` | Rastreamento de conversões até a venda \| V2O5 Vendas e Tecnologia | GA4, API de Conversões da Meta e conversões offline do Google Ads: cada lead e cada venda ligados ao anúncio que trouxe o cliente. A partir de R$ 2.900. |
| `/gestao-de-trafego` | Tráfego pago no Google e na Meta \| V2O5 Vendas e Tecnologia | Campanhas no Google Ads e na Meta (Instagram e Facebook), ajustadas pelo que virou venda. |
| `/segmentos/revendas-de-veiculos` | Sistema de vendas para revendas de veículos \| V2O5 Vendas e Tecnologia | Site de estoque ligado ao sistema da loja (Revenda Mais, Autoconf e outros), agente de IA no WhatsApp, CRM e rastreamento até a venda, a partir de R$ 14.900. |
| `/cases/motors-store` | Case Motors Store \| V2O5 Vendas e Tecnologia | O que a V2O5 montou para a Motors Store, revenda de seminovos em Curitiba, e os números do sistema rodando, lidos no banco de dados da loja. |
| `/precos` | Preços e planos \| V2O5 Vendas e Tecnologia | Três planos com preço fechado: Presença a partir de R$ 8.900 + R$ 990/mês, Atendimento com agente de IA e CRM, e o Completo. Sem fidelidade. |
| `/sobre` | Sobre a V2O5: quem faz e como trabalha \| V2O5 Vendas e Tecnologia | Quem é a V2O5 Vendas e Tecnologia, de onde vem o nome, o fundador que conduz o diagnóstico, a relação com a Motors Store e as regras de todo projeto. |
| `/diagnostico` | Diagnóstico gratuito \| V2O5 Vendas e Tecnologia | 45 minutos de conversa com o fundador e, em até 24 horas, um mapa do que fazer primeiro na sua empresa, com custo e prazo. Sem compromisso. |
| `/diagnostico/recebido` | Pedido recebido \| V2O5 Vendas e Tecnologia | Recebemos o seu pedido de diagnóstico. O que acontece agora e como a V2O5 entra em contato. |
| `/guias` | Guias \| V2O5 Vendas e Tecnologia | Guias com dados de operação real para quem vende pelo WhatsApp e pela internet. |
| `/privacidade` | Política de privacidade \| V2O5 Vendas e Tecnologia | Quais dados a V2O5 Vendas e Tecnologia coleta neste site, para quê, com quem compartilha, por quanto tempo guarda e como pedir acesso, correção ou exclusão. |
| 404 | Página não encontrada \| V2O5 Vendas e Tecnologia | Site, Perfil no Google, anúncios, agente de IA no WhatsApp e CRM montados por uma equipe só, num sistema que mostra de onde veio cada venda. Sem fidelidade. |

Não há Open Graph nem Twitter Card em nenhuma rota hoje (nenhuma `og:*` ou `twitter:*` no HTML). Acrescentar não quebra nada; só registro para ninguém procurar o que não existe.

O H1 de cada rota está no `frontmatter` do arquivo correspondente em `content/`.

## 3. JSON-LD

Um `<script type="application/ld+json">` por página, montado por funções puras em `src/lib/schema.ts` (componente `JsonLd`) e travado por `tests/schema.test.ts`. Grafos completos, como servidos, em `design/baseline/jsonld.json`.

| Rota | Nós do `@graph` (`@type` e `@id`) |
|---|---|
| `/` | Organization+ProfessionalService `/#organizacao`; WebSite `/#site`; Person `/sobre#autor`; FAQPage `/#perguntas` |
| `/agente-de-ia-para-whatsapp` | referência `/#organizacao`; BreadcrumbList `/agente-de-ia-para-whatsapp#trilha`; Service `/agente-de-ia-para-whatsapp#servico`; FAQPage `/agente-de-ia-para-whatsapp#perguntas` |
| `/automacao-com-ia` | referência `/#organizacao`; BreadcrumbList `/automacao-com-ia#trilha`; Service `/automacao-com-ia#servico`; FAQPage `/automacao-com-ia#perguntas` |
| `/criacao-de-sites` | referência `/#organizacao`; BreadcrumbList `/criacao-de-sites#trilha`; Service `/criacao-de-sites#servico`; FAQPage `/criacao-de-sites#perguntas` |
| `/crm-com-whatsapp` | referência `/#organizacao`; BreadcrumbList `/crm-com-whatsapp#trilha`; Service `/crm-com-whatsapp#servico`; FAQPage `/crm-com-whatsapp#perguntas` |
| `/rastreamento-de-conversoes` | referência `/#organizacao`; BreadcrumbList `/rastreamento-de-conversoes#trilha`; Service `/rastreamento-de-conversoes#servico`; FAQPage `/rastreamento-de-conversoes#perguntas` |
| `/gestao-de-trafego` | referência `/#organizacao`; BreadcrumbList `/gestao-de-trafego#trilha` |
| `/segmentos/revendas-de-veiculos` | referência `/#organizacao`; BreadcrumbList `/segmentos/revendas-de-veiculos#trilha`; Service `/segmentos/revendas-de-veiculos#servico`; FAQPage `/segmentos/revendas-de-veiculos#perguntas` |
| `/cases/motors-store` | referência `/#organizacao`; Person `/sobre#autor`; BreadcrumbList `/cases/motors-store#trilha`; Article `/cases/motors-store#artigo` |
| `/precos` | referência `/#organizacao`; BreadcrumbList `/precos#trilha`; OfferCatalog `/precos#catalogo`; FAQPage `/precos#perguntas` |
| `/sobre` | referência `/#organizacao`; BreadcrumbList `/sobre#trilha`; Person `/sobre#autor`; AboutPage `/sobre#pagina` |
| `/diagnostico` | referência `/#organizacao`; BreadcrumbList `/diagnostico#trilha` |
| `/diagnostico/recebido` | referência `/#organizacao`; BreadcrumbList `/diagnostico/recebido#trilha` |
| `/guias` | referência `/#organizacao`; BreadcrumbList `/guias#trilha` |
| `/privacidade` | referência `/#organizacao`; BreadcrumbList `/privacidade#trilha` |

Regras que o redesign mantém:

- Os três `@id` fixos: organização `https://www.v2o5.com.br/#organizacao`, site `https://www.v2o5.com.br/#site`, fundador `https://www.v2o5.com.br/sobre#autor` (a página `/sobre` tem de continuar com o `id="autor"`). As internas referenciam a organização só pelo `@id`.
- `FAQPage` com as mesmas perguntas e respostas que a página mostra (home, `/precos`, as cinco páginas de solução prontas e o hub de revendas). O Google pede que o dado estruturado bata com o texto visível: mudar uma resposta em `content/` sem mudar o `@graph` (ou o contrário) é erro. Hoje os dois saem do mesmo array em `src/conteudo/`.
- Preços do `OfferCatalog` (`/precos#catalogo`) e dos `Service` saem de `src/conteudo/precos.ts`, os mesmos números da tabela visível; o Completo por tempo limitado leva `priceValidUntil`.
- Decisões registradas no código: sem `sameAs` (perfis ainda não existem), sem `AggregateRating` próprio, endereço só com cidade e estado (sede residencial), telefone no formato `+55 41 99808-9550`.

## 4. Rastreamento: eventos, `event_id`, Meta CAPI e GA4

### Estado em produção em 19/10/2026

- Nenhum script de terceiro carregou na home (rede vazia fora do próprio domínio; `window.gtag` não existe, `window.fbq` não existe). Ou seja: `NEXT_PUBLIC_GA4_ID` e `NEXT_PUBLIC_META_PIXEL_ID` não estão no build de produção, como o `CLAUDE.md` já anotava (falta pôr os IDs na Vercel). O aviso de medição não aparece.
- A API de Conversões roda no servidor e só com `META_PIXEL_ID` e `META_CAPI_TOKEN`; isso não dá para ver de fora, e a listagem de variáveis da Vercel respondeu 404 nesta sessão. **Não verificado.**
- Consequência para o redesign: o contrato abaixo está todo no código e testado, mas ninguém está olhando os números ainda. Quebrar um `data-evento` hoje não aparece em relatório nenhum; aparece no dia em que os IDs entrarem. Por isso a conferência é pelo DOM e pelos testes, não pelo GA4.

### O contrato do clique

Os CTAs e os links de WhatsApp e e-mail não têm JavaScript próprio: levam `data-evento` e `data-local`, e `components/layout/Medicao.tsx` ouve os cliques no documento (`eventoDoClique` em `src/lib/medicao.ts`). O rótulo enviado é o **texto visível do botão** (até 60 caracteres). Mudar o texto de um botão no redesign muda o `cta_label` nos relatórios; mudar ou perder o `data-local` quebra a série histórica do local.

| Evento GA4 | Parâmetros | Evento na Meta | Quando |
|---|---|---|---|
| `page_view` | `page_type`, e `service_line` ou `segment` quando houver (tabela da seção 1) | `PageView` | a cada rota, inclusive na navegação do App Router; o `gtag` é configurado com `send_page_view: false` |
| `cta_click` | `cta_location` (= `data-local`), `cta_label` (texto) | nenhum | clique em `[data-evento="cta_click"]` |
| `click_whatsapp` | `whatsapp_location` (= `data-local`), `pos_lead: "nao"` | `Contact` (padrão), `content_name` = local | clique em link de WhatsApp sem lead nesta sessão |
| `click_whatsapp_pos_lead` | `whatsapp_location`, `pos_lead: "sim"` | nenhum | o mesmo clique depois de um lead na sessão (não conta como conversão) |
| `click_email` | `email_location` | nenhum | clique em `[data-evento="click_email"]` |
| `form_start` | `form_id: "diagnostico"` | nenhum | primeiro `input` ou `change` no formulário |
| `generate_lead` | `event_id`, `form_id`, `lead_type: "diagnostico"`, `segmento` | `Lead` com `{content_name: form_id, content_category: segmento}` e `{eventID: event_id}` | `/api/leads` aceitou o envio |

`data-local` em uso, por rota (topo, menu do celular e rodapé são iguais em todas):

- Comuns: `click_email` → `rodape`, `click_whatsapp` → `rodape`, `cta_click` → `menu`, `cta_click` → `rodape`, `cta_click` → `topo`. O `menu` só existe no celular.

| Rota | `cta_click` | `click_whatsapp` | `click_email` |
|---|---|---|---|
| `/` | `hero`, `garantias`, `case`, `chamada-curta`, `automotivo`, `fechamento` | `botao-fixo` | · |
| `/agente-de-ia-para-whatsapp` | `hero`, `preco`, `garantias`, `fechamento` | `botao-fixo` | · |
| `/automacao-com-ia` | `hero`, `na-motors`, `preco`, `garantias`, `fechamento` | `botao-fixo` | · |
| `/criacao-de-sites` | `hero`, `na-motors`, `preco`, `garantias`, `fechamento` | `botao-fixo` | · |
| `/crm-com-whatsapp` | `hero`, `na-motors`, `preco`, `garantias`, `fechamento` | `botao-fixo` | · |
| `/rastreamento-de-conversoes` | `hero`, `na-motors`, `preco`, `garantias`, `fechamento` | `botao-fixo` | · |
| `/gestao-de-trafego` | · | · | · |
| `/segmentos/revendas-de-veiculos` | `hero`, `pacote`, `case`, `chamada` | `fotografia`, `botao-fixo` | · |
| `/cases/motors-store` | `chamada` | · | · |
| `/precos` | `hero`, `planos`, `garantias`, `fechamento`; novos no redesign (19/10, Dyones): `trafego`, `modulos`, `servicos` (as linhas do cardápio; o rótulo é o começo do texto da linha, que abre com o título) | `fotografia`, `botao-fixo` | · |
| `/sobre` | `hero`, `chamada` | `empresa`, `botao-fixo` | `empresa` |
| `/diagnostico` | · | `diagnostico` | `diagnostico` |
| `/diagnostico/recebido` | · | `recebido` | · |
| `/guias` | · | · | · |
| `/privacidade` | `privacidade` | `privacidade` | · |
| 404 | `nao-encontrada` | · | · |

### `event_id` e a deduplicação Pixel + CAPI

O mesmo identificador sai do servidor e volta para o navegador, para a Meta contar o lead uma vez só:

1. `POST /api/leads` valida o lead e gera `event_id = "Lead." + randomUUID()` (`src/app/api/leads/route.ts`).
2. Entrega ao n8n com esse `event_id` no corpo (seção 5). Se a entrega falhar, responde 502 e **não** há evento.
3. Depois de responder (`after()`), manda o evento `Lead` à API de Conversões com o mesmo `event_id`, se houver configuração e a pessoa não tiver desligado a medição (`medicao: "desligada"` no corpo).
4. Responde `{ ok: true, event_id }`. O navegador dispara `generate_lead` (GA4) e `fbq('track', 'Lead', ..., { eventID: event_id })`, grava `v2o5.lead` no `sessionStorage` e vai para `/diagnostico/recebido`.
5. Daí em diante, clique no WhatsApp nesta sessão vira `click_whatsapp_pos_lead`, sem `Contact` na Meta.

A armadilha de robô (campo `site` preenchido) responde `{ ok: true, event_id }` com um id falso e não entrega nada ao n8n nem à Meta. O redesign mantém o campo escondido do jeito que está (fora da tela, `tabindex=-1`, `aria-hidden`).

### Meta CAPI (servidor)

- `src/lib/capi.ts`: `POST https://graph.facebook.com/v22.0/{META_PIXEL_ID}/events`, token no corpo (nunca na URL), tempo limite de 4 s, nunca lança erro (o lead já foi aceito).
- Evento: `event_name: "Lead"`, `action_source: "website"`, `event_source_url` = `SITE_URL` + página do envio (padrão `/diagnostico`), `custom_data: { content_name: "diagnostico", content_category: <segmento>, lead_type: "diagnostico" }`.
- `user_data`: e-mail, telefone, primeiro e último nome e país (`br`) em SHA-256 depois de normalizar; IP, user agent e `fbp`/`fbc` em claro. O `fbc` vem do cookie `_fbc` ou é montado do `fbclid` da entrada (`fb.1.<ms>.<fbclid>`).
- Variáveis: `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_CAPI_TEST_CODE` (só durante conferência). O formulário só manda `fbp` e `fbc` se a medição não estiver desligada.

### GA4 e Pixel (navegador)

- Só carregam com `NEXT_PUBLIC_GA4_ID` (formato `G-...`) e `NEXT_PUBLIC_META_PIXEL_ID` (só dígitos) e sem oposição gravada; ID com formato errado não carrega nada.
- Carregam depois do `load`, no primeiro momento ocioso ou em até 2 s (`depoisDoConteudo`). Lição da Motors: Pixel e GTM custavam 2,4 s de TBT. O redesign não puxa as tags para o `<head>`.
- Filas preparadas antes dos scripts (`dataLayer`/`gtag` e `fbq`), Pixel com `autoConfig: false` (sem coleta automática de cliques e formulários), sem GTM.

### O que fica guardado no navegador

| Chave | Onde | Para quê |
|---|---|---|
| `v2o5.medicao` = `desligada` | `localStorage` | oposição feita em `/privacidade#medicao`; nenhuma tag carrega e o servidor não manda nada à Meta |
| `v2o5.aviso` = `visto` | `localStorage` | o aviso de medição já foi fechado |
| `v2o5.origem` | `sessionStorage` | primeiro toque da visita: UTMs, `gclid`, `gbraid`, `wbraid`, `fbclid`, `referrer` de fora e página de entrada (`components/layout/PrimeiroToque.tsx`) |
| `v2o5.lead` | `sessionStorage` | `event_id` do lead desta sessão (separa `click_whatsapp_pos_lead`) |
| `_ga`, `_gid`, `_ga_<id>`, `_fbp`, `_fbc` | cookies | das ferramentas; a oposição apaga todos, no host e no domínio pai |

O evento de janela `v2o5-medicao-mudou` avisa os componentes quando a oposição muda.

## 5. O formulário de `/diagnostico`

Componente `src/components/diagnostico/Formulario.tsx`; opções em `src/conteudo/diagnostico.ts`; validação em `src/lib/leads.ts`, a **mesma** no navegador e na API. Textos visíveis, inclusive mensagens de erro, em `content/diagnostico.md`.

### Campos, como servidos

`<form>` sem `action` (envio por `fetch`), `noValidate` = true, rotulado pelo próprio título.

| `name` | Tipo | Rótulo | Obrigatório | `autocomplete` | Valores enviados |
|---|---|---|---|---|---|
| `nome` | text | Seu nome | sim | `name` | texto livre |
| `empresa` | text | Empresa | sim | `organization` | texto livre |
| `whatsapp` | tel | WhatsApp com DDD | sim | `tel-national` | normalizado para só dígitos com `55` (10 ou 11 dígitos; celular com 9) |
| `email` | email | E-mail | sim | `email` | minúsculas |
| `segmento` | select | Segmento | sim | · | `automotivo` (Revenda de veículos), `servicos` (Serviços), `comercio` (Comércio), `imobiliario` (Imobiliário), `saude` (Saúde), `industria` (Indústria), `outro` (Outro) |
| `porte` | select | Quantas pessoas trabalham na empresa | não | · | `1` (Só eu), `2-5` (2 a 5 pessoas), `6-20` (6 a 20 pessoas), `21+` (Mais de 20) |
| `estoque` (só com segmento `automotivo`) | select | Tamanho do estoque | não | · | `ate-30` (Até 30 veículos), `31-80` (31 a 80), `81-150` (81 a 150), `151+` (Mais de 150) |
| `sistema` (só com segmento `automotivo`) | select | Sistema de gestão da loja | não | · | `revenda-mais` (Revenda Mais), `autoconf` (Autoconf), `bndv` (BNDV), `boom` (Boom), `altimus` (Altimus), `syonet` (Syonet), `outro` (Outro), `nenhum` (Nenhum) |
| `objetivo` (caixas; vai no corpo como `objetivos: []`) | checkbox × 6 | O que você quer resolver primeiro | pelo menos um | · | `aparecer` (Aparecer no Google e no Maps), `contatos` (Mais contatos do site e dos anúncios), `responder` (Responder mais rápido no WhatsApp), `funil` (Organizar o funil e o CRM), `integrar` (Integrar os sistemas que já uso), `marca` (Rever a marca) |
| `mensagem` | textarea (máx. 1500) | Algo mais que a gente deva saber (opcional) | não | · | texto livre |
| `site` | text, fora da tela, `tabindex=-1` | Site (armadilha) | tem de ir vazio | `off` | · |

Os códigos (`automotivo`, `2-5`, `aparecer`, `31-80`, `revenda-mais`...) são contrato com o n8n: o nó "Lead" do fluxo `lead-do-diagnostico.json` traduz cada código para o rótulo. Trocar um rótulo é livre; trocar um código exige mudar `leads.ts`, `diagnostico.ts` e o fluxo do n8n juntos.

### Envio e respostas

- `POST /api/leads`, `Content-Type: application/json`, com os campos acima e mais: `objetivos` (array), `origem` (`v2o5.origem` + `fbp`/`fbc` se a medição estiver ligada), `pagina` (`location.pathname`), `medicao: "desligada"` quando houver oposição, `site` (armadilha).
- Respostas: **200** `{ok, event_id}` → `router.push("/diagnostico/recebido")`; **400** `{ok:false, erros}` por campo (o foco vai ao primeiro campo com erro) ou `json`; **413** acima de 16 KB; **429** acima de 5 envios por IP em 10 min; **503** `canal` sem `LEADS_WEBHOOK_URL` (mostra a mensagem de configuração); **502** `entrega` quando o n8n não aceita.
- `/diagnostico/recebido` é `noindex`, fora do sitemap e bloqueada no `robots.txt`; tem o próprio link de WhatsApp (`recebido`).

### Entrega ao n8n

- `POST` em `LEADS_WEBHOOK_URL` (fluxo `lead-do-diagnostico.json`), cabeçalho `X-V2O5-Segredo: <LEADS_WEBHOOK_SECRET>`, tempo limite de 8 s.
- Corpo: `{ event_id, recebido_em, fonte: "site", lead }`, com `lead` = `{ nome, whatsapp, email, empresa, segmento, porte?, objetivos[], estoque?, sistema?, mensagem?, pagina?, origem{...} }`. Exemplo completo em `docs/n8n/LEIA-ME.md`. O n8n marca o contato no Chatwoot com `origem = v2o5`, grava a campanha em `origem_da_visita`, avisa o Dyones e manda a primeira mensagem pelo WhatsApp.

### Medição e acessibilidade do formulário

- `form_start` no primeiro toque e `generate_lead` no sucesso (seção 4). Com a medição desligada, o corpo leva `medicao: "desligada"` e o servidor não chama a Meta.
- Cada campo tem `<label for>`; erro com `aria-invalid` e `aria-describedby` apontando a mensagem; mensagem geral com `role="alert"`; botão desabilitado enquanto envia; consentimento e link para `/privacidade` embaixo do botão.

## 6. O link de WhatsApp

- Número: `5541998089550` (`EMPRESA.whatsapp` em `src/conteudo/home.ts`). Link e número escrito saem do mesmo campo (`src/lib/whatsapp.ts`): `(41) 99808-9550` no rodapé e `+55 41 99808-9550` no JSON-LD.
- Formato: `https://wa.me/5541998089550?text=<mensagem com encodeURIComponent>`, `target="_blank"`, `rel="noopener"`, `data-evento="click_whatsapp"` e o `data-local` do lugar.
- **Toda mensagem pronta tem o trecho `site da V2O5`** (`MARCA_DO_SITE`). É por ele que o fluxo `origem-do-lead.json` do n8n reconhece a primeira mensagem, marca o contato com `origem = v2o5` e libera o agente de IA. Mensagem sem esse trecho cai na caixa como conversa comum, sem agente. A comparação ignora maiúscula, acento e espaço repetido, mas não ignora outra redação.
- Botão fixo: canto inferior direito, só abaixo de 768 px (`md:hidden`), link que funciona sem JavaScript (`BotaoWhatsAppFixo`). Desde 19/10 (Dyones) fica escondido enquanto o primeiro botão principal da página está na tela (`EsconderNaAbertura`); sem JavaScript, sempre à mostra. Não aparece em `/guias`, `/cases/motors-store`, `/diagnostico`, `/diagnostico/recebido`, `/privacidade` nem na 404.

As mensagens moram em `WHATSAPP.mensagens` (`src/conteudo/home.ts`), na frase das páginas de solução (`src/conteudo/solucoes.ts`, com o nome da linha no meio) e na do fotógrafo parceiro (`src/conteudo/precos.ts`). Como servidas hoje, decodificadas do `href`:

| Rota | `data-local` | Mensagem |
|---|---|---|
| `/` | `botao-fixo` | Olá! Vim pelo site da V2O5 e quero pedir o diagnóstico gratuito. |
| `/agente-de-ia-para-whatsapp` | `botao-fixo` | Olá! Vi a página de Agente de IA no WhatsApp no site da V2O5 e quero conversar sobre a minha empresa. |
| `/automacao-com-ia` | `botao-fixo` | Olá! Vi a página de Automação de processos no site da V2O5 e quero conversar sobre a minha empresa. |
| `/criacao-de-sites` | `botao-fixo` | Olá! Vi a página de Sites e presença no site da V2O5 e quero conversar sobre a minha empresa. |
| `/crm-com-whatsapp` | `botao-fixo` | Olá! Vi a página de CRM e sistemas sob medida no site da V2O5 e quero conversar sobre a minha empresa. |
| `/rastreamento-de-conversoes` | `botao-fixo` | Olá! Vi a página de Rastreamento até a venda no site da V2O5 e quero conversar sobre a minha empresa. |
| `/segmentos/revendas-de-veiculos` | `fotografia` | Olá! Vi no site da V2O5 a indicação de fotógrafo parceiro e quero saber mais. |
| `/segmentos/revendas-de-veiculos` | `botao-fixo` | Olá! Vi a página de revendas no site da V2O5 e quero conversar sobre a minha loja. |
| `/precos` | `fotografia` | Olá! Vi no site da V2O5 a indicação de fotógrafo parceiro e quero saber mais. |
| `/precos` | `botao-fixo` | Olá! Vi a página de preços no site da V2O5 e quero conversar sobre a minha empresa. |
| `/sobre` | `empresa` | Olá! Vi a página Sobre no site da V2O5 e quero conversar sobre a minha empresa. |
| `/sobre` | `botao-fixo` | Olá! Vi a página Sobre no site da V2O5 e quero conversar sobre a minha empresa. |
| `/diagnostico` | `diagnostico` | Olá! Vim pelo site da V2O5 e quero marcar o diagnóstico gratuito. |
| `/diagnostico/recebido` | `recebido` | Olá! Acabei de pedir o diagnóstico no site da V2O5 e quero adiantar a conversa. |
| `/privacidade` | `privacidade` | Olá! Vim pelo site da V2O5 e quero pedir o diagnóstico gratuito. |
| todas (rodapé) | `rodape` | Olá! Vim pelo site da V2O5 e quero pedir o diagnóstico gratuito. |

E-mail, com o mesmo contrato (`data-evento="click_email"`, link de `src/lib/email.ts`):

- `mailto:diagnostico@v2o5.com.br?subject=Quero o diagnóstico gratuito`: `data-local` `diagnostico`, `empresa`, `rodape`
- `mailto:privacidade@v2o5.com.br?subject=Meus dados pessoais`: sem `data-evento` em `/privacidade` (o contato do encarregado, LGPD art. 41; não é medido)

## 7. Como conferir antes de publicar o redesign

1. `npm test`, `npm run lint` e `npm run build` limpos.
2. Rodar `design/baseline/ferramentas/extrair.cjs` contra o preview da branch e comparar com `extracao-producao.json`: mesmas rotas e status, mesmos `title`, `description`, `canonical` e `robots`, mesmo JSON-LD, mesmos pares `data-evento`/`data-local`, mesmas mensagens de WhatsApp e os mesmos campos do formulário.
3. Gerar o `content/` de novo a partir do preview e fazer `git diff content/`: a diferença tem de ser zero palavra, ou só o que foi decidido mudar.
4. Enviar um pedido de diagnóstico no preview (teste (a) do `docs/n8n/LEIA-ME.md`) e ver o lead chegar ao n8n e ao Chatwoot com `origem = v2o5`; clicar no WhatsApp de uma página e ver o agente responder.
5. Rodar o Dembrandt com `--compare design/baseline/dembrandt-2026-10-19.json` para ver o que mudou no visual (no redesign, mudar é o esperado; serve para registrar o quê).

## Atualização de 25/10/2026 (home em torno do Sprint de Eficiência)

Mudança de propósito, decidida pelo Dyones (`memory/decisoes.md`, 25/10): H1, `<title>` e `description` da home mudaram; o JSON-LD, as rotas, o sitemap, os redirecionamentos e as âncoras `#solucoes` e `#como-se-liga` seguem iguais. Novas âncoras na home: `#problemas`, `#metodo`, `#indicadores`, `#case`, `#como-trabalhamos`, `#nome`. `data-local` novos no `cta_click` da home: `hero-metodo`, `sprint`; saíram da home `garantias` e `chamada-curta`. O texto da home em `content/home.md` é o de 19/10 e precisa ser extraído de novo.

Ajuste de 25/10 (roteiro ajustado): `/diagnostico`, a home, `/sobre`, `/criacao-de-sites`, o hub automotivo e o case deixaram de prometer "mapa em até 24 horas"; o title de `/diagnostico` não mudou, a `description` sim. `/cases/motors-store` ganhou a seção "O que travava a Motors Store" antes de "O que a V2O5 montou" e dos números, e o FAQ da home (e o `FAQPage`) trocou a resposta sobre o diagnóstico. Formulário, campos, `/api/leads`, consentimento e eventos seguem iguais.

Aprovação do apêndice (25/10): `/precos` ganhou a seção `#titulo-sprint` (faixas do Sprint e da continuidade, condições), entre os planos e o tráfego; `src/conteudo/sprint.ts` é a fonte e `tests/sprint.test.ts` confere contra `memory/context/oferta.md`. O `OfferCatalog` do JSON-LD de `/precos` não mudou (só os três planos). A escada da home linka `/precos#titulo-sprint` com `data-local="escada"`; o `llms.txt` ganhou a seção do Sprint (e o agente do n8n lê o `llms.txt`). O case usa "Antes: diagnosticado", "Depois: implementado" e "Medido".

## Atualização de 25/10/2026 (só o Sprint tem valor público)

Decisão do Dyones: "preços só dos sprints" e "manter apenas o descrito no plano atualizado no apêndice". Mudou de propósito:
- `/precos` virou a página do Sprint de Eficiência (H1 "Sprint de Eficiência: preço fechado em proposta."), com as três faixas, as condições e o FAQ. Saíram os três planos, o tráfego, os módulos, os serviços, o fotógrafo parceiro e a mensalidade de continuidade com valor. `<title>` "Preços do Sprint de Eficiência"; o `OfferCatalog` do JSON-LD agora tem só as três faixas do Sprint (`priceSpecification`). Âncoras `#titulo-trafego`, `#titulo-modulos`, `#titulo-planos` e `#cresce` deixaram de existir; `#titulo-sprint` e `#perguntas` ficam.
- As cinco páginas de solução e o hub de revendas não publicam valor: a âncora `#titulo-preco` virou `#titulo-no-sprint` ("Como entra num Sprint"), o JSON-LD `Service` não traz `offers`, e a descrição de cada uma não tem preço. O hub perdeu os módulos (consulta veicular, área de repasse, tráfego, reativação, painel) e o plano Completo; o repasse não é produto da V2O5.
- Home: o catálogo `#solucoes` perdeu a coluna de preço e o "contratada avulsa"; `#como-se-liga` e `#solucoes` seguem. Saíram o bloco de garantias (nas soluções, no `/diagnostico` e em `/precos`) e as perguntas de plano, usuário extra, dólar e fidelidade do FAQ da home e do `FAQPage`.
- `/gestao-de-trafego` responde 307 para `/#solucoes` (antes `/precos#titulo-trafego`).
- `/sobre`: a IA deixa de ser o catalisador e some a "equipe completa de IA"; as cinco regras trocam "preço publicado" e "o sistema é seu" por preço em proposta e escopo e aceite por escrito.
- `tests/precos-nao-publicados.test.ts` trava tudo isso: nenhum valor de `precos.ts` (dado interno) pode aparecer em página, dado público, vitrine, `llms.txt` ou fluxo do n8n.

Ajuste do mesmo dia (25/10, Dyones): "os preços dos sprints estão lá, mas as recorrências não, precisamos destes valores lá também, mas na maioria dos casos, vai haver algo recorrente ou pode haver." A recorrência que acompanha o Sprint (estabilidade e suporte, R$ 1.200 a R$ 2.500 por mês; evolução contínua, R$ 2.500 a R$ 5.000 por mês) volta ao público como faixa de referência, com o aviso de que na maioria dos projetos há uma parte recorrente e pode haver em todos: `/precos#titulo-sprint`, escada e FAQ da home, `llms.txt`, vitrine, agente do n8n e `OfferCatalog` (duas `UnitPriceSpecification` com `unitCode` MON). Planos, tráfego, módulos e serviços continuam fora.

Redação da recorrência (25/10, Dyones): `/precos#titulo-sprint` abre "O que continua depois da entrega" com três itens (gestão continuada, nuvem, IA e mensagens), a faixa mensal paga a gestão e nuvem e IA ficam por fora, discriminadas, gerenciadas pela V2O5. A frase "na maioria dos projetos" saiu. O consumo de IA e de mensagens vem pelo valor do provedor, com teto mensal combinado e aviso antes de ultrapassá-lo. Ficam de fora do texto público: margem sobre o provedor e a possibilidade de a solução rodar nas contas do cliente.

## Atualização de 25/10/2026 (planos voltam ao hub automotivo)

Decisão do Dyones: "os preços dos planos de presença, atendimento e completo podem ficar no segmento automotivo". O valor de Presença (R$ 8.900 + R$ 990/mês), Atendimento (R$ 7.900 + R$ 1.590/mês) e Completo (R$ 14.900 + R$ 1.990/mês até 31/12/2026, depois R$ 2.290) aparece só em `/segmentos/revendas-de-veiculos` (seção `#titulo-planos`); tráfego, módulos e serviços seguem internos, e `llms.txt`, schema, vitrine e agente do n8n não citam valor de plano. `/precos` cobre só a política do Sprint. Para não repetir o case, o hub perdeu "O caminho de um lead" e "Medido na Motors Store" (âncoras `#titulo-caminho` e `#titulo-medido`) e ganhou `#titulo-case`, que aponta para `/cases/motors-store`. `tests/precos-nao-publicados.test.ts` libera os valores dos planos só nos dois arquivos do hub.

## Atualização de 25/10/2026 (três Sprints como guarda-chuva)

- Home: nova seção `#tres-sprints` (os três Sprints, com faixa e duração de `sprint.ts`) depois do método; o catálogo `#solucoes` virou "O catálogo de capacidades", com a operação primeiro ("Organizar a operação") e "Trazer mais gente" depois. Saíram os cartões "Painel do dono" e "Reativação de base"; entraram "Diagnóstico e análise de operação", "Consultoria de processos" e "Indicadores e painéis". `#solucoes` e `#como-se-liga` seguem.
- Hub automotivo: `#titulo-planos` mostra os "modelos de Sprint para revendas" (Mapa e Operação com IA na Sprint Integrada, Completo na Avançada); a recorrência da Presença subiu para R$ 1.200.
- `/criacao-de-sites`: as entregas são a entrega-base do site (`SITE_PADRAO`, nove itens).
- `/precos`: link para o catálogo acima das três faixas. `llms.txt` descreve os três Sprints e o catálogo, sem valor de modelo.

## Atualização de 26/10/2026 (/sobre e Como tudo se liga)

- `/sobre`: o H1 virou "Simplificar o que é complexo."; novas âncoras `#titulo-proposito` e `#titulo-metodo` (método em cinco perguntas e as três saídas de todo projeto). `#autor` (alvo do `@id` do fundador no JSON-LD), o retrato, os dados da empresa e o JSON-LD seguem iguais; `<title>` e `description` mudaram, `atualizadaEm` 2026-10-26.
- Home: a âncora `#como-se-liga` e o diagrama seguem; só o título e o texto de apoio mudaram (exemplo de um Sprint Integrada).

## Atualização de 26/10/2026 (diagrama, ordem da home e /sobre em primeira pessoa)

- Home: `#como-se-liga` tem cinco paradas (Site, WhatsApp, Agente de IA, CRM, Venda) e duas camadas (n8n e Rastreamento); a ordem das seções agora é Dores, Método, Escada (porta de entrada), Três Sprints, Catálogo `#solucoes`, Como se liga, Indicadores, Projeto real, Automotivo. Âncoras e `data-local` seguem.
- `/sobre`: texto em primeira pessoa; nova âncora `#titulo-visao`; `#autor`, o JSON-LD do fundador e o retrato seguem. O botão do hero passou a "Quem sou eu" (mesmo `#autor`).

## Atualização de 26/10/2026 (Sprints "a partir de")

- Os três Sprints mostram só o valor de partida (R$ 3.000, R$ 6.000, R$ 12.000), sem teto: home (`#tres-sprints`, escada, FAQ), `/precos#titulo-sprint`, `llms.txt`, vitrine e `description` de `/precos`. O `OfferCatalog` do JSON-LD traz só `minPrice` nos três Sprints; as duas ofertas mensais seguem com `minPrice` e `maxPrice`. Rótulos "Ver as faixas" viraram "Ver os valores".

## Atualização de 26/10/2026 (/sobre: Tecnologias e ecossistemas)

- `/sobre`: a seção `#titulo-ferramentas` virou "Tecnologias e ecossistemas", um acordeão de nove categorias com `<details name="tecnologias">` (sem JavaScript; a primeira abre por padrão). `#autor`, `#titulo-visao`, `#titulo-metodo` e o JSON-LD seguem.


## Atualização de 27/10/2026 (quatro soluções e a continuidade)

Decisão do Dyones (`memory/decisoes.md`, 27/10; arquitetura em `docs/2026-10-27-portfolio-no-site.md`). Nenhuma rota saiu e nenhum redirecionamento mudou.

- Rotas novas, prontas e no sitemap:

  | Rota | Status | Indexa | No sitemap | `page_type` na medição | Texto |
  |---|---|---|---|---|---|
  | `/branding-e-identidade` | 200 | sim | sim | `solucao · service_line=branding` | `content/branding-e-identidade.md` |
  | `/presenca-digital-local` | 200 | sim | sim | `solucao · service_line=presenca` | `content/presenca-digital-local.md` |
  | `/sprint-de-eficiencia` | 200 | sim | sim | `solucao · service_line=sprint` | `content/sprint-de-eficiencia.md` |
  | `/continuidade` | 200 | sim | sim | `continuidade` | `content/continuidade.md` |

- `/criacao-de-sites` mantém o endereço e o `service_line=sites`; o H1, o título e a descrição passam a Sites & Integrações, com os quatro pacotes em `#titulo-pacotes`.
- Âncoras novas: `#titulo-pacotes` nas quatro soluções (botão "Ver os pacotes" da abertura e `url` das ofertas no JSON-LD); `/continuidade#manutencao-tecnica`, `#conteudo-e-campanhas` e `#monitoramento-e-otimizacao` (submenu do topo); `/continuidade#titulo-limites`; `/precos#titulo-pacotes`.
- Âncoras que continuam: `/#solucoes` passa a ser a seção das quatro soluções (404, `/gestao-de-trafego` e a vitrine apontam para ela); `/#como-se-liga` e `/#metodo` seguem na home; `/precos#titulo-sprint` pousa no grupo do Sprint em "Todos os pacotes". As páginas de recurso (agente, CRM, automação, rastreamento) levam "Ver os Sprints e os valores" a `/sprint-de-eficiencia#titulo-pacotes`.
- Topo: Soluções e Continuidade abrem um painel em `<details>` nativo (`SubmenuDoTopo`); Esc e clique fora fecham, e o foco volta ao rótulo. Preços, Case e Sobre seguem como link. O menu do celular mostra os grupos com os links embaixo. Rodapé: Soluções (as quatro e a Continuidade), Recursos (as quatro páginas de recurso) e Empresa.
- JSON-LD: as quatro soluções publicam `Service` com `hasOfferCatalog` (pacotes com `price` ou `minPrice`); `/precos` publica o catálogo inteiro; `/continuidade` os três planos com `unitCode: MON`. Valores só de `ofertas.ts` e `sprint.ts` (`tests/precos-publicos.test.ts`).
- Medição: `continuidade` entrou em `TipoDePagina`; `LINHA_DA_ROTA` ganhou `branding`, `presenca` e `sprint`. Nenhum evento mudou de nome.
- Formulário, `/api/leads`, WhatsApp e eventos: sem mudança.
- `content/` reextraído do build local da branch para todas as rotas (inclui o que mudou em 25/10 e 26/10 e não tinha sido reextraído).
