# Lote 1: agenda de postagem (terça 01/12 a sábado 05/12/2026)

> **Atualização de 25/11 (foco em pequenos negócios):** as legendas e os textos de 18/11 que estavam aqui saíram, porque vendiam o Sprint e usavam a promessa antiga. O banco das legendas dos reels é `lote-1-agenda.csv` (versão de 25/11, promessa "Descubra onde seu negócio perde cliente. Gratuitamente." e até 5 hashtags), e a agenda da semana de 01/12 é `semana-1-agenda.md`, gerada por `social/carrosseis/agenda-semana1.py`. Os arquivos são `L1-XX-v3.mp4` e `capas/L1-XX-v3.jpg`.
>
> **Atualização de 18/11:** para a semana de 01/12 vale `semana-1-agenda.md` (3 reels e 2 carrosséis por dia, 15 dos 25 reels). Esta agenda segue valendo para o link da bio por dia e como banco das legendas dos reels; os 10 reels restantes vão para a semana de 08/12.

Horários em Brasília (UTC-3). Cada dia mistura os cinco ângulos e o ângulo de cada horário gira de um dia para o outro (o horário não pesa sempre sobre o mesmo ângulo). Os arquivos `L1-XX-v3.mp4` e as capas `capas/L1-XX-v3.jpg` (arte com o gancho e o destaque âmbar de legenda; gerada por `video/gravacoes/gerar-capas.mjs` a partir de `video/capas.json`) estão em `video/saida/` (fora do git). A tabela completa, uma linha por post, está em `lote-1-agenda.csv`.

## Link da bio, trocado todo dia de manhã
O Instagram não tem link clicável na legenda: o link de todos os reels é o da bio. Por isso o UTM é por dia, não por reel. Trocar o link da bio antes do primeiro post de cada dia:

- **terça 01/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D1`
- **quarta 02/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D2`
- **quinta 03/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D3`
- **sexta 04/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D4`
- **sábado 05/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D5`

A leitura por reel (visualizações, retenção, seguidores) vem dos insights do Instagram. Os cliques e leads vêm por dia, no GA4 e no CRM, pelo `utm_content` (L1-D1 a L1-D5).

## Legendas

Uma por reel, em `lote-1-agenda.csv` (colunas `legenda` e `legenda_facebook`): o gancho do reel, a promessa, "Link na bio." e até 5 hashtags do tema. Para a semana de 01/12, copie de `semana-1-agenda.md`, que já põe o gancho do padrão v2 na primeira linha e marca "Cena de exemplo." onde o reel usa cenário ilustrativo.
