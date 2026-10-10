# Case Motors Store

Autorizado em 08/10: nome, logo e números. O case declara que o fundador da V2O5 assina os guias da loja.

## O que a V2O5 entregou (repo `85dyones/motors-site-oficial`)
Site Next.js com vitrine, ficha, páginas de marca/modelo e 6 páginas locais; hub de 26 guias com método próprio, schema, `llms.txt`, IndexNow; camada de dados testada, Pixel + CAPI com `event_id`, GA4, GTM, UTM e click IDs no lead; painel com funil, estoque, clientes, investidores, mídia paga; n8n (sync de estoque com Revenda Mais, vendas incompletas, alertas de estagnação) com WhatsApp via Evolution e Chatwoot; gerador de descritivo com LLM validado contra invenção.

## Números (lidos do banco em 08/10/2026, só contagens; tabela de leads começa em 05/09/2026)
| Dado | Valor |
|---|---|
| Leads no funil | 56 (44 formulários do site, 12 WhatsApp direto via Chatwoot) |
| Leads do site com `event_id` | 42 de 44 (95%) |
| com `_fbp` / ligados ao veículo | 38 / 37 de 44 |
| com UTM / com gclid ou fbclid | 28 / 26 de 44 |
| Desfechos | 3 ganhos, 10 perdidos, 13 descartados, 30 abertos |
| Guias publicados | 26 |
| Estoque sincronizado | 132 veículos, 46 marcados como vendidos |
Sustenta case de sistema e qualidade de dado; ainda não sustenta resultado comercial. Atualizar com 90 dias (Search Console, relatório de primeira resposta do Chatwoot, leads/mês por origem, vendas atribuídas).

Não usar como tempo de resposta: "primeiro contato registrado no painel" (26 de 56 leads, mediana ~3 h, 10 em até 15 min) mede registro, não resposta.

## Problema aberto na Motors (achado em 08/10)
Respostas humanas no Chatwoot deixaram de gerar `contato` no funil desde 23/09 (último em 22/09; 30 e 32 por semana antes). Conversas continuam chegando (`atendimentos` atualiza todo dia). Transferências automáticas subiram de ~40 para 150 a 220 por dia: 1.688 para 50 leads, um com 154. A régua não tem teto por decisão de 28/08; o defeito provável está no reconhecimento do remetente humano (`src/lib/chatwootEventos.ts`, `src/app/api/chatwoot/eventos/route.ts`). Tarefa sugerida ao Dyones em 08/10. Até corrigir, o case não fala de atendimento.

## Referência de mídia
Plano de mídia da Motors usa margem bruta média de R$ 7.000 por carro e conversão lead→venda de 6% (premissas, não medição).
