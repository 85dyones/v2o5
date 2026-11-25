# Handoff: ligar a medição (GA4) do site (17/11/2026)

Para o agente que vai executar, junto com o Dyones. Objetivo: o site v2o5.com.br passar a medir visitas e `generate_lead` no GA4, para a coluna "cliques UTM" dos reels existir. Prazo: sexta 20/11/2026, antes da sequência de fundação (sábado 21/11). Origem: pendência 16 em `memory/pendencias.md`.

## Contexto
- O código está pronto desde 13/10: `src/lib/medicao.ts` e `src/components/layout/Medicao.tsx`. O GA4 só carrega com `NEXT_PUBLIC_GA4_ID` no formato `G-XXXXXXXXXX` e depois que a pessoa não se opôs (controle em `/privacidade`). Não há nada a programar para ligar o GA4.
- Variáveis em `.env.example`. A Vercel tem o projeto `v2o5`; o domínio principal é `www.v2o5.com.br`.
- O primeiro toque (UTM, click ID, referrer, entrada) já viaja com o lead: `src/lib/origem.ts` e `src/lib/leads.ts`.
- O Pixel da Meta e a API de Conversões ficam de fora: só quando houver campanha (pendência 16, segunda parte).

## O que só o Dyones faz
- Entrar com a conta Google para criar a propriedade GA4 (ou dar acesso ao agente).
- Aprovar a criação da variável na Vercel, se o agente não tiver permissão.

## Passos
1. **Propriedade GA4** "V2O5 site", fuso America/Sao_Paulo, moeda BRL. Fluxo de dados da web `https://www.v2o5.com.br`. Anotar o ID de métricas (`G-...`).
2. **Variável na Vercel** (projeto `v2o5`): `NEXT_PUBLIC_GA4_ID` em Production e Preview. A variável `NEXT_PUBLIC_` entra no build: depois de criar, **refazer o deploy de produção** (redeploy do último deploy ou merge no `main`).
3. **Conferir no site publicado**, em janela anônima, sem oposição: abrir a home e o `/diagnostico` e ver o evento em Relatórios em tempo real. Conferir também que, com a oposição ativada em `/privacidade`, o GA4 não carrega.
4. **Evento-chave:** marcar `generate_lead` como evento-chave. Se ele ainda não apareceu (só aparece depois de um lead), enviar um lead de teste (item 6) e marcar depois.
5. **Dimensões personalizadas** (escopo de evento): `page_type`, `service_line`, `cta_location`, `whatsapp_location`. Retenção de dados de eventos: 14 meses.
6. **Teste do caminho da UTM**, ponta a ponta, com um lead de teste claramente marcado ("TESTE reels"): abrir
   `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-teste&utm_campaign=100-reels&utm_content=TESTE-01`, preencher o formulário e conferir:
   - no GA4, a sessão com origem `instagram / reel-teste` e o `generate_lead`;
   - no Supabase (projeto `v2o5-site`), o lead com `utm_content = TESTE-01`;
   - no n8n, a execução do fluxo do diagnóstico, com `origem = v2o5`;
   - no Chatwoot (conta 1, caixa 12), o contato com a origem.
   Depois, apagar ou marcar como teste o contato, para não entrar na contagem de leads dos reels.
7. Atualizar `memory/pendencias.md` (item 16) e `memory/decisoes.md` com o que ficou ligado e a data. Se o `utm_content` não aparecer em algum ponto, registrar onde parou e abrir PR de correção separado.

## Não fazer
- Não pôr o ID nem qualquer chave no repositório. Só na Vercel.
- Não ligar Pixel nem CAPI.
- Não desligar o controle de oposição para testar.
- Não declarar "medindo" sem ter visto o evento no tempo real do GA4 do domínio publicado.

## O que devolver ao Dyones
O ID da propriedade (sem chave secreta), o resultado dos passos 3 a 6 (visto ou não visto), o que ficou pendente e por quê. Texto sem travessão.
