# SEO, páginas e mercado

## Mapa de páginas (fase entre parênteses)
Prontas e indexáveis em 10/10: `/`, `/precos`, `/diagnostico`, `/privacidade`. `/diagnostico/recebido` existe com noindex. O resto está provisório (noindex).
Home `/` (1) · soluções `/agente-de-ia-para-whatsapp`, `/automacao-com-ia`, `/criacao-de-sites`, `/crm-com-whatsapp`, `/rastreamento-de-conversoes` (1), `/gestao-de-trafego` (2) · segmento `/segmentos/revendas-de-veiculos`, `/site-para-loja-de-carros`, `/agente-de-ia-para-loja-de-carros` (1), `/crm-para-revenda-de-carros`, `/integracao-revenda-mais`, `/trafego-pago-para-loja-de-carros` (2) · `/cases/motors-store`, `/precos`, `/sobre`, `/diagnostico`, `/diagnostico/recebido` (noindex), `/privacidade` (1) · `/simulador`, `/guias/{slug}` (2) · `/ferramentas/raio-x-do-site` (3).
Termos gerais ("agência de IA") são disputados: home carrega marca; busca qualificada vem das soluções com recorte e do automotivo. Demanda veio de autocomplete, sem ferramenta paga: validar no Planejador de Palavras-chave.

## Redirecionamentos do WordPress (testar em `next.config.ts`)
`/jornada/`→`/sobre` · `/solucoes/`→`/` · `/contrate/`→`/diagnostico` · `/politica-privacidade/`→`/privacidade` · `/blog/`→`/guias` · `/author/dyones/`→`/sobre` (301) · `/hello-world/`, `/test-post/` (410) · `/feed/`, `/comments/feed/`, `/wp-sitemap*.xml`→`/sitemap.xml`.

## Técnico (herdado da Motors)
`lang="pt-BR"`; canonical relativo por página, nunca no layout raiz; título e descrição únicos (teste); `sitemap.ts` com `lastModified` real; `robots.ts` com robôs de IA no grupo geral; `llms.txt` (baixa prioridade: Google diz não precisar); IndexNow por cron; Search Console + Bing Webmaster Tools; 404 com saída.
Schema por página com funções puras e teste de contagem de nós: Organization + ProfessionalService, Person (fundador), FAQPage na home e em `/precos` (as 8 perguntas de `conteudo/home.ts`), OfferCatalog em `/precos` (Offer por implantação e por mensalidade, de `precos.ts`), Article/FAQPage nos guias, BreadcrumbList. Sem AggregateRating próprio.

## Conteúdo
Método da Motors (`conteudo-seo/pacote/00-guia-normativo.md` no repo dela): 5 critérios eliminatórios, H1 = busca, resposta em 2 frases, FAQ igual ao schema, uma saída comercial, ondas por cluster. Primeira onda (fase 2): portais ou site próprio (custo por venda), tempo de resposta no WhatsApp, custo por lead e por venda, conversões offline do Google Ads, custo do carro parado no pátio.

## GEO/AEO
Menções fora do site pesam mais que links (estudo Ahrefs, correlação 0,66 a 0,74 vs ~0,2). Ações: NAP igual, Perfil de Empresa, crédito no rodapé da Motors, LinkedIn do fundador, ecossistema (parceiros Revenda Mais, Assovepar, mídia do setor), YouTube. Páginas mais citadas: preço, case com número, FAQ direto.

## Concorrência em uma linha
Agências de IA: IAEO (Curitiba, melhor execução, Lighthouse 66), Inovação Web, Dasckup, Madweb, Thothn'. Automotivo: Revenda Mais, Autoconf (Curitiba), AutoSDR (SEO forte), Motorleads (mais parecida), Webmotors+Syonet, OLX+Altimus, BNDV, Boom, agências de nicho. Lacuna: ninguém tem case nomeado com número nem mede venda.
