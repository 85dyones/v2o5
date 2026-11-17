# Case Motors Store

Autorizado em 08/10: nome, logo e números. O case declara que o fundador da V2O5 assina os guias da loja.

## O que a V2O5 entregou (repo `85dyones/motors-site-oficial`)
Site Next.js com vitrine, ficha, páginas de marca/modelo e 6 páginas locais; hub de 26 guias com método próprio, schema, `llms.txt`, IndexNow; camada de dados testada, Pixel + CAPI com `event_id`, GA4, GTM, UTM e click IDs no lead; painel com funil, estoque, clientes, investidores, mídia paga; n8n (sync de estoque com Revenda Mais, vendas incompletas, alertas de estagnação) com WhatsApp via Evolution e Chatwoot; gerador de descritivo com LLM validado contra invenção.

Desde 21/10/2026: **o Ney**, agente de IA da loja no WhatsApp (Evolution API, fora do Chatwoot), e desde 04/11 **o lead qualificado por ele no CRM do Revenda Mais**. Fonte no repo da Motors: `docs/ATENDIMENTO_IA.md`, `docs/FLUXO_DO_LEAD.md` e `docs/INTEGRACAO_REVENDAMAIS.md`. Como funciona:
- O Ney lê o estoque sincronizado do Revenda Mais (com o link de cada carro) e responde; manda as fotos em camadas (de fora primeiro, o interior se o cliente quiser).
- O modelo preenche a ficha (carro, pagamento, entrada, troca, prazo, visita) e uma régua de pesos soma o aquecimento de 0 a 100, com o motivo de cada ponto; morno a partir de 35, quente a partir de 65 (`atendimento_config`).
- Passa ao vendedor quando o cliente marca visita, chega à simulação, pede uma condição que só o vendedor dá (desconto, avaliação da troca) ou pede uma pessoa; o quente que para de responder por 30 minutos passa pela rodada.
- Na passagem, o lead vai ao CRM do Revenda Mais pelo WebHook de Recebimentos, com a origem da mídia (Site da Loja, Site da Loja - Meta ADS, Site da Loja - Google ADS, WhatsApp, WhatsApp - Meta ADS), o carro (`vehicle.id`) e a qualificação do Ney no texto da interação; o CRM distribui ao vendedor. Recusa: nova tentativa pela rodada de 15 minutos; na sexta, alerta ao dono. Não existe o sentido contrário: o que a equipe faz no Revenda Mais não volta.
- Quem cuida da mensagem do cliente que não está com o Ney é a loja (o dono); o Ney retoma só o lead parado. Pós-venda fica no painel.
- No n8n (17/11): ativos "Motors Atendimento — Entrada (Evolution)", "Motors Atendimento — Rodada", o sincronizador de estoque, o vigia da vitrine e o alerta de falha de integração; desligados "Vendas Incompletas", "Alertas de Estagnação" e o espelho do Chatwoot.

## Diagnosticado (confirmado pelo Dyones em 25/10/2026)
Gargalos da Motors Store antes da intervenção, registrados no roteiro `CLAUDE_SITE_IMPLEMENTATION_AJUSTADO.md` e publicados em `/cases/motors-store` como "Diagnosticado": baixa visibilidade em buscas orgânicas, buscadores e IAs; falta de leads qualificados; presença digital fraca; design do site ruim; site lento; acompanhamento comercial inconsistente. São diagnóstico, não resultado: o case separa o **diagnosticado**, o **implementado** (seção acima) e o **medido** (números abaixo). Sem métrica de antes e depois para estes itens; só entra quando houver dado verificável. Não presumir que SEO, visibilidade, leads e velocidade se resolvem pela mesma implementação (roteiro, seção 7).

## Números (lidos do banco em 17/11/2026, só contagens; tabela de leads começa em 05/09/2026)
Método de 08/10, refeito em 17/11 e conferido (a leitura até 08/10 dá de novo 56, 44/12, 42, 38, 37, 28 e 26): "site" é o lead com `canal` diferente de `WhatsApp`; "WhatsApp direto" é `canal = 'WhatsApp'`. Projeto Supabase `zwbqmzgnagfeqinqkolp`.
| Dado | Valor |
|---|---|
| Leads no funil | 237 (131 formulários do site, 106 WhatsApp direto) |
| Leads do site com `event_id` | 129 de 131 (98%) |
| com `_fbp` / ligados ao veículo | 119 / 113 de 131 |
| com UTM / com gclid ou fbclid | 103 / 96 de 131 |
| Desfechos no painel | 4 ganhos, 90 perdidos, 46 descartados, 97 abertos (não publicar: desde 04/11 a venda acontece no CRM do Revenda Mais e não volta ao painel) |
| Guias publicados | 26 |
| Estoque sincronizado | 148 veículos, 60 marcados como vendidos |

## O Ney e o CRM do Revenda Mais (lidos do banco em 17/11/2026, só contagens)
| Dado | Valor |
|---|---|
| Ney no ar | desde 21/10/2026 (primeira mensagem enviada); 800 leituras de qualificação, 598 com DeepSeek até 03/11 e 202 com Claude Haiku desde 03/11 (o modelo não vai ao texto público) |
| Clientes atendidos pelo Ney | 125 (leads com mensagem enviada por ele; 1.594 mensagens enviadas, 5 falharam) |
| Primeira resposta | 93 de 100 em até 1 min; mediana 38 s (da primeira mensagem do cliente desde 21/10 até a primeira mensagem enviada do Ney; 96 das 100 respondidas por ele) |
| Leads entregues ao CRM do Revenda Mais | 37 desde 04/11, nenhum pendente nem recusado |
| Última passagem de cada lead, por motivo | simulação 25, painel 13, pediu condição 8, pediu pessoa 6, outro assunto 5, pós-venda 3, agendou 2, quente 1 |
O tempo publicado é o do Ney, das mensagens gravadas por ele, e já inclui a espera de propósito pela rajada (30 s ou 20 s). Não há medida da resposta humana: ela acontece no Revenda Mais e não volta.

## Leitura de 08/10/2026 (histórico)
| Dado | Valor |
|---|---|
| Leads no funil | 56 (44 formulários do site, 12 WhatsApp direto via Chatwoot) |
| Leads do site com `event_id` | 42 de 44 (95%) |
| com `_fbp` / ligados ao veículo | 38 / 37 de 44 |
| com UTM / com gclid ou fbclid | 28 / 26 de 44 |
| Desfechos | 3 ganhos, 10 perdidos, 13 descartados, 30 abertos |
| Estoque sincronizado (08/10) | 132 veículos, 46 marcados como vendidos |
Naquela data, "primeiro contato registrado no painel" (26 de 56 leads, mediana ~3 h) media registro, não resposta.

## Problema de 08/10 no Chatwoot (superado em 17/11: o atendimento saiu do Chatwoot)
Respostas humanas no Chatwoot deixaram de gerar `contato` no funil desde 23/09 (último em 22/09; 30 e 32 por semana antes). Conversas continuam chegando (`atendimentos` atualiza todo dia). Transferências automáticas subiram de ~40 para 150 a 220 por dia: 1.688 para 50 leads, um com 154. A régua não tem teto por decisão de 28/08; o defeito provável está no reconhecimento do remetente humano (`src/lib/chatwootEventos.ts`, `src/app/api/chatwoot/eventos/route.ts`). Tarefa sugerida ao Dyones em 08/10. Superado: desde 21/10 o atendimento roda pelo Ney na Evolution API, fora do Chatwoot (o espelho do Chatwoot está desligado no n8n), e o case fala do atendimento só com os números do Ney (17/11).

## Referência de mídia
Plano de mídia da Motors usa margem bruta média de R$ 7.000 por carro e conversão lead→venda de 6% (premissas, não medição).
