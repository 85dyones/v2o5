# Handoff: agendar o lote 1 no Meta Business Suite (17/11/2026)

Para o agente que vai executar no Chrome, com o Dyones acompanhando. Objetivo: deixar os 25 reels do lote 1 agendados no Instagram (e 5 no Facebook) de terça 01/12 a sábado 05/12/2026, sem publicar nada agora.

## Insumos
- `docs/reels/lote-1-agenda.csv` (uma linha por post: data, hora, código, arquivo, capa, legenda, legenda do Facebook, link da bio do dia) e `docs/reels/lote-1-agenda.md` (a mesma coisa para leitura).
- Vídeos `L1-01.mp4` a `L1-25.mp4` e capas `capas/L1-XX.jpg`, na pasta de downloads do Dyones (os arquivos não estão no git). Conferir antes de começar que existem os 25 vídeos e as 25 capas; se faltar algum, parar e avisar.
- Horários em Brasília. Conferir que o fuso do Business Suite é America/Sao_Paulo.

## Regras
- Só agendar. Nunca clicar em "Publicar agora".
- Não alterar legenda, hashtags, horário nem arquivo. Colar exatamente o texto do CSV.
- Não adicionar música, figurinha, enquete nem marcação. O vídeo já tem o som do final.
- Não mexer em anúncios, orçamentos, permissões, pagamento nem em outras contas. Se o Business Suite pedir login, código ou confirmação, parar e pedir ao Dyones.
- Se algo recusar (formato, tamanho, limite, erro), não improvisar: registrar o reel e o erro e seguir para o próximo.

## Passo a passo (por reel do Instagram)
1. Business Suite, Planejador, Criar reel. Escolher só a conta do Instagram @v2o5_consultoria (desligar o compartilhamento no Facebook).
2. Enviar o `L1-XX.mp4` da linha.
3. Colar a coluna `legenda` (a primeira linha é o gancho; a última tem as hashtags).
4. Capa: escolher "Enviar capa" e subir `capas/L1-XX.jpg`. Se não aceitar, escolher o quadro mais próximo de 3,4 segundos.
5. Programar: marcar data e hora da linha. Confirmar o fuso.
6. Salvar o agendamento e conferir no Planejador que ele aparece no dia e na hora certos.

## Facebook (5 reels, um por dia, o do horário das 11:30)
São as linhas com `legenda_facebook` preenchida. Criar um reel separado só para a página "V2O5 Vendas e Tecnologia", com o mesmo vídeo, a legenda `legenda_facebook` (sem hashtags e sem "link na bio") e o mesmo horário. Confirmar que a página tem o botão de contato (WhatsApp ou "Enviar mensagem") ativo, porque a legenda manda "pedir pelo botão da página".

## O link da bio muda todo dia (tarefa manual)
O Instagram não agenda a troca de link da bio. Antes do primeiro post de cada dia (até 08:15), o Dyones (ou o agente, na sessão dele) troca o link da bio pelo da coluna `link_da_bio_do_dia`. Se um dia ficar sem a troca, os cliques daquele dia entram no UTM do dia anterior: avisar para registrar.

## Conferência final
Devolver ao Dyones:
- Uma tabela com data, hora, código, rede e estado (agendado ou com erro) dos 30 agendamentos (25 Instagram e 5 Facebook).
- Capturas do Planejador de cada dia (terça a sábado).
- Os erros, com o código do reel.
- Confirmação de que nada foi publicado.

## Fora deste handoff
O LinkedIn não agenda pelo Business Suite. Os três posts (terça, quarta e quinta às 10:00) estão em `lote-1-agenda.md` e entram no agendador da própria página do LinkedIn, com o link no primeiro comentário.
