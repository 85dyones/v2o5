# Lote 1: link da bio e banco de legendas (agenda de 26/11 a 07/12/2026)

> **Atualização de 26/11:** os três fixos saem hoje, quinta 26/11; os 25 reels e os 12 carrosséis saem de sexta 27/11 a domingo 06/12, sempre com o primeiro post às 09:00, e o LinkedIn vai até segunda 07/12 (`semana-1-agenda.md`, a agenda completa).
>
> **Atualização de 25/11 (foco em pequenos negócios):** as legendas e os textos de 18/11 que estavam aqui saíram, porque vendiam o Sprint e usavam a promessa antiga. O banco das legendas dos reels é `lote-1-agenda.csv` (versão de 25/11, promessa "Descubra onde seu negócio perde cliente. Gratuitamente." e até 5 hashtags), e a agenda da semana de 01/12 é `semana-1-agenda.md`, gerada por `social/carrosseis/agenda-semana1.py`. Os arquivos são `L1-XX-v3.mp4` e `capas/L1-XX-v3.jpg`.
>
> **Atualização de 18/11:** para a semana de 01/12 vale `semana-1-agenda.md` (3 reels e 2 carrosséis por dia, 15 dos 25 reels). Esta agenda segue valendo para o link da bio por dia e como banco das legendas dos reels; os 10 reels restantes vão para a semana de 08/12.

Horários em Brasília (UTC-3). Cada dia mistura os cinco ângulos e o ângulo de cada horário gira de um dia para o outro (o horário não pesa sempre sobre o mesmo ângulo). Os arquivos `L1-XX-v3.mp4` e as capas `capas/L1-XX-v3.jpg` (arte com o gancho e o destaque âmbar de legenda; gerada por `video/gravacoes/gerar-capas.mjs` a partir de `video/capas.json`) estão em `video/saida/` (fora do git). A tabela completa, uma linha por post, está em `lote-1-agenda.csv`.

## Link da bio, trocado todo dia de manhã (datas de 26/11)
O Instagram não tem link clicável na legenda: o link de todos os posts é o da bio. Por isso o UTM é por dia, não por reel. Trocar o link da bio antes do primeiro post de cada dia (09:00):

- **quinta 26/11 (fixos, hoje):** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=bio&utm_campaign=posts-fixos&utm_content=fixos`
- **sexta 27/11:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D1`
- **sábado 28/11:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D2`
- **domingo 29/11:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D3`
- **segunda 30/11:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D4`
- **terça 01/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D5`
- **quarta 02/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D6`
- **quinta 03/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D7`
- **sexta 04/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D8`
- **sábado 05/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D9`
- **domingo 06/12:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D10`

A leitura por reel (visualizações, retenção, seguidores) vem dos insights do Instagram. Os cliques e leads vêm por dia, no GA4 e no CRM, pelo `utm_content` (`fixos` e L1-D1 a L1-D10).

## Legendas

Uma por reel, em `lote-1-agenda.csv` (coluna `legenda`, a do Instagram): o gancho do reel, "Cena de exemplo." quando o vídeo é ilustrativo, a fonte quando há número real, a promessa, "Link na bio." e até 5 hashtags do tema. As legendas do Facebook (com o link clicável) e do LinkedIn (com o link no primeiro comentário) saem em `semana-1-agenda.md`, gerada por `social/carrosseis/agenda-semana1.py`.
