# Projeto: site novo da V2O5

**Status:** home, `/precos` e `/diagnostico` (formulário → `/api/leads` → n8n) em `main` desde 10/10. Privacidade e WhatsApp entraram em 10/10. Próximo: Dyones liga o webhook no n8n e as variáveis na Vercel; depois páginas de solução, resposta automática ao lead, DNS.
**Plano completo:** `docs/2026-10-08-plano-novo-site.md` (seções: 0 resumo, 1 diagnóstico, 2 case, 3 posicionamento/preço/marca, 4 mercado/SEO, 5 design e motion, 6 conversão, 7 rastreamento, 8 stack, 9 metas, 10 fases, 11 fora do escopo, 12 decisões, 13 riscos).

## Diagnóstico do site atual (08/10, Lighthouse mobile)
WordPress/Elementor/Astra na Hostinger. Performance 51, LCP 13,5 s (fundo de 1,4 MB), `lang="en-US"`, sem meta description, sem JSON-LD, H3 antes do H1, método numerado 1-2-2-4, "Hello world" e "test-post" no ar, login do admin exposto em `/wp-json/wp/v2/users`, ícones sociais com `href="#"`, marca invisível na busca.

## Fases
- **0 · decisões:** logo final (C1), protótipo navegável da home com preview na Vercel.
- **1 · lançamento:** base Next.js + testes de trava + CSP; home, 5 soluções, hub automotivo + 2 recortes, case Motors, preços, sobre, diagnóstico, privacidade, 404; motion (hero partículas, orquestrador, diagrama, contadores reais); SEO técnico e schema; formulário → `/api/leads` → Supabase + n8n + WhatsApp automático; camada de dados, GA4, CAPI pelo servidor, primeiro/último toque; Vercel + DNS; Search Console/Bing; entidade (Perfil de Empresa, redes, crédito na Motors).
- **2 · conteúdo:** guias (primeira onda), páginas automotivas restantes, `/gestao-de-trafego`, simulador, atualização do case em 90 dias, ecossistema do setor.
- **3 · produto:** Raio-X do site, agente de qualificação com agenda, conversões offline, sGTM, "este site em números".

## Conversão
Diagnóstico (principal; campos gerais + estoque e sistema de gestão quando automotivo) → `/diagnostico/recebido` com agenda. WhatsApp secundário. O lead recebe mensagem do agente da V2O5 em menos de 1 min (n8n + Evolution + Chatwoot da VPS). Página de rastreamento mostra ao visitante o que o site registrou da visita dele.

## Testes que travam decisões (cultura da Motors)
Contraste AA da paleta; máx. 2 famílias de fonte; título e descrição únicos; grafo JSON-LD por página; robôs de IA no grupo geral; redirecionamentos do WordPress; contrato da camada de dados e do webhook de lead; textos sem marcas de IA; orçamento de JS por rota; `prefers-reduced-motion`.

## Fora do escopo
Painel para editar o site; inglês; loja/pagamento; campanhas da própria V2O5; migração de e-mail; integração com sistema não integrado; páginas locais por cidade.
