# Case 16ª Vara Cível (atendimento automatizado)

Resumo preliminar de 14/10/2026, montado com os documentos do Drive do Dyones, o repositório `85dyones/16V` e o projeto na Supabase. O fluxo do n8n ainda não foi lido: o repositório não o contém (Dyones, 14/10: "fluxo está sem repo atualizado") e a sessão não entra no n8n (pendência 18). Nada daqui vai para o site antes de o fluxo ser lido, de a Vara autorizar o nome e de haver número medido (regra de 11/10: cliente compra resultado).

## O cliente
16ª Vara Cível do Foro Central da Comarca da Região Metropolitana de Curitiba (TJPR). Juíza titular nas portarias: Tathiana Yumi Arai Junkes; o fluxograma cita duas magistradas (Juliane e Tathiana). Fontes: portarias 02/2016 (atos ordinatórios, PROJUDI) e 03/2024 (prazo para custas), na pasta "N8N RAG FILES SUPABASE" do Drive; pasta "Portarias 16a Vara Civel" compartilhada em 01/10/2025.

## O problema (inferido do fluxograma; confirmar com o Dyones)
O balcão da serventia recebe contatos sobre andamento de processo e pedidos de diligência. Parte é do gabinete, parte da serventia, e cada diligência tem um setor. O atendimento humano gastava tempo triando e encaminhando.

## O que foi desenhado ("Fluxograma - Atendimento Automatizado - 16ª Vara Cível", 07/05/2025)
1. Boas-vindas.
2. Menu: 1 para processos, 2 para outros assuntos.
3. Processos: pede o número e pergunta se está concluso com a magistrada ou aguardando análise da serventia. Concluso: pergunta qual magistrada e orienta contato por e-mail ou presencial com o gabinete, exibindo os e-mails. Serventia: pergunta a diligência, responde "encaminhado ao setor responsável, análise em até 48h" e encaminha.
4. Outros assuntos: orienta atendimento presencial ou canal específico.

Setores de encaminhamento (11): Desarquivamento/Arquivamento, Recolhimento de Guias, Análise de Petições/Juntadas/Manifestações, Alvará, Mandado, Termo, Sisbajud, Renajud, Sistemas, Retorno de Conclusão, Decurso de Prazo. O número do processo é salvo em pastas por setor e, se possível, enviado por WhatsApp ao responsável do setor.

## O que foi orçado ("Orçamento Agent IA 16ª Vara Cível", Curitiba, 13/05/2025)
| Item | Valor |
|---|---|
| Setup: banco SQL com RAG, programação do agente de atendimento, treinamento do modelo, até 6 h de customização | R$ 1.450 |
| Operação 100% cloud | R$ 380/mês |
| Suporte avulso | R$ 125/h |
Condições: 50% na assinatura e 50% na entrega; mensal antecipado até o dia 5; validade 30 dias.

## Stack (repositório `85dyones/16V` + Supabase; o fluxo em si só no n8n)
O repositório `85dyones/16V` (privado) tem um arquivo só, `compose.yaml.txt`, enviado em 30/04/2025, e uma branch `claude/claude-md-...` de 29/01/2026 com um CLAUDE.md gerado que descreve a mesma coisa. Nenhum JSON de workflow: a lógica mora no n8n. O compose define:
- n8n 1.44.0 em Docker, com Postgres 16 e Redis 7 (fila Bull), fuso America/Sao_Paulo, porta 5678, dados em `./n8n_data` e `./pg_data`.
- WhatsApp pela **API oficial da Meta** (WhatsApp Business, token e ID do número), não pela Evolution.
- OpenAI como modelo de IA.
- `WEBHOOK_URL=https://bot16vara.tjpr.br/`: o webhook do bot num subdomínio do TJPR, o que indica hospedagem ou domínio cedido pelo tribunal (não conferido: a sondagem do host foi bloqueada pela política da sessão).
- As credenciais no arquivo são marcadores, não valores reais (o CLAUDE.md de 01/2026 diz o mesmo); nada a copiar.

Supabase: projeto `16-vara-civel` (org V2O5, região sa-east-1, Postgres 15) criado em 05/05/2025, dois dias antes do fluxograma, para o banco com RAG das portarias. Status em 14/10/2026: INACTIVE. O Supabase avisou pausa por inatividade em 13/01, 20/01 e 03/03/2026 e pausou em 04/03/2026 (e-mails de ant.wilson@supabase.com). Ou o atendimento não roda mais na Supabase, ou o RAG saiu de lá (o compose não cita Supabase: o n8n usa Postgres próprio): confirmar se está ativo hoje e desde quando.

## Desdobramento: 1ª Vara Cível
"Vara Civel - Proposta Comercial V2O5", Curitiba, 25/07/2025, A/C Eliane Pêgo: agente de atendimento de balcão treinado, banco RAG, até 6 h de customização; setup R$ 1.750 e plano mensal R$ 390 (hospedagem, manutenção, suporte); bônus de fechamento R$ 1.350 e R$ 270/mês; validade 7 dias. Desfecho desconhecido.

## O que falta para virar case publicável
- Ler o fluxo do n8n (exportação em `docs/n8n/` ou leitura pela API com chave no ambiente; o repositório 16V não o tem): gatilho, como o RAG é consultado, como o encaminhamento por setor e o aviso ao responsável acontecem, o que é salvo e onde. Linha do tempo até aqui: compose em 30/04/2025, Supabase em 05/05, fluxograma em 07/05, orçamento em 13/05, proposta à 1ª Vara em 25/07/2025.
- Autorização da Vara para nome e logo (órgão público: conferir se há termo ou se o case sai sem nome, como "vara cível de Curitiba").
- Números medidos, com período: atendimentos por mês, parcela resolvida sem humano, tempo de resposta, encaminhamentos por setor, horas da equipe poupadas. Sem número, o case descreve só o sistema.
- Data de entrada em produção e situação atual (o Supabase pausado em 03/2026 pede essa resposta).
- Onde entra no site: segundo segmento ("serviços e órgãos públicos" ou "atendimento") ou case avulso em `/cases/`. Decisão do Dyones.
