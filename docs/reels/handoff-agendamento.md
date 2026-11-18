# Handoff: postar o lote 1 direto nas redes, pelo conector do Chrome (18/11/2026)

Para o agente que vai executar. Objetivo: colocar os 25 reels do lote 1 no Instagram (e 5 no Facebook) de terça 01/12 a sábado 05/12/2026, **operando as próprias redes pelo conector do Chrome** (Claude in Chrome), no navegador em que o Dyones já está logado. A razão é manter as funções de reel de cada rede (capa, áudio, compartilhamento entre redes, agendamento nativo, ajustes de vídeo) que ferramentas de terceiros e o Meta Business Suite costumam limitar. Se uma função não existir na versão web, o agente avisa em vez de contornar.

## Insumos
- `docs/reels/lote-1-agenda.csv` (uma linha por post: data, hora, código, arquivo, capa, legenda, legenda do Facebook, link da bio do dia) e `docs/reels/lote-1-agenda.md` (a mesma coisa para leitura).
- Vídeos `L1-01.mp4` a `L1-25.mp4` e capas `capas/L1-XX.jpg`, na pasta de downloads do Dyones (os arquivos não estão no git). Conferir antes de começar que existem os 25 vídeos e as 25 capas; se faltar algum, parar e avisar.
- Horários em Brasília (America/Sao_Paulo).

## Como usar o conector do Chrome
1. Abrir o navegador já logado do Dyones. Instagram: `instagram.com` na conta `@v2o5_consultoria`. Facebook: `facebook.com`, atuando como a página "V2O5 Vendas e Tecnologia" (trocar o perfil de atuação para a página antes de criar o reel).
2. Se alguma tela pedir senha, código, confirmação ou captcha, parar e pedir ao Dyones. O agente nunca digita credenciais.
3. Usar o compositor nativo de reels de cada rede. Para cada reel, antes de preencher, ler as opções que a tela oferece (capa, áudio, legenda, texto alternativo, compartilhar no Facebook, agendamento, configurações avançadas) e registrar quais existem. Não afirmar que uma função existe sem tê-la visto na tela.
4. Enviar o arquivo pelo seletor de arquivos do navegador, apontando para o `L1-XX.mp4` da pasta de downloads.

## O que preservar em cada reel do Instagram
- **Formato de reel** (o vídeo vertical, nunca como post de feed comum). Conferir na tela de revisão que a proporção é 9:16 e que aparece como reel.
- **Capa:** usar `capas/L1-XX.jpg` (arte com o gancho e o destaque âmbar de legenda, 1080x1920). Se o compositor só aceitar escolher um quadro do vídeo, escolher o mais próximo de 3,4 s.
- **Legenda:** colar exatamente a coluna `legenda` (a primeira linha é o gancho; a última tem as hashtags).
- **Compartilhar também no feed:** manter ligado o padrão de reel (aparece no feed e na grade). Não aplicar filtros, melhorias nem efeitos.
- **Compartilhar no Facebook:** desligado nos reels do Instagram. O Facebook leva legenda própria (abaixo).
- **Áudio:** o vídeo já tem o efeito sonoro do final. Não trocar nem acrescentar música sem pedir ao Dyones. Se o Dyones quiser música da biblioteca do Instagram, essa escolha costuma existir só no aplicativo do celular; nesse caso registrar quais reels e deixar para ele.
- **Reel de teste:** a conta tem 7 seguidores (o recurso exige ao menos 200). Postar como reel normal. Se o botão "Teste" aparecer, não usar sem perguntar.
- **Agendamento:** se o compositor tiver a opção de agendar (em configurações avançadas ou ao lado do botão de compartilhar), agendar para a data e hora da linha. Se não tiver, não publicar na hora: parar e perguntar ao Dyones o que fazer (ver "Se não houver agendamento nativo").

## Facebook (5 reels, um por dia, o do horário das 11:30)
São as linhas com `legenda_facebook` preenchida. Criar o reel como a página (aba Reels, Criar reel), com o mesmo vídeo, a capa `capas/L1-XX.jpg`, a legenda `legenda_facebook` (sem hashtags e sem "link na bio") e o horário da linha. Confirmar que a página tem o botão de contato (WhatsApp ou "Enviar mensagem") ativo, porque a legenda manda pedir pelo botão.

## Se não houver agendamento nativo
Não existe garantia de que o compositor web de cada rede agende. Se faltar, o agente não publica fora de hora. Opções que o Dyones escolhe:
- **A.** Postar na hora de cada horário com o agente na sessão (exige a sessão aberta nos cinco dias, até 20:00).
- **B.** Agendar pelo Meta Business Suite, ciente de que ele costuma limitar áudio da biblioteca e outras funções de reel (não confirmado: o agente descreve o que vê).
- **C.** O Dyones agenda pelo aplicativo do celular, e o agente só prepara o material e as legendas.

## Regras
- Nunca publicar fora do horário da linha. Nunca clicar em "Compartilhar" ou "Publicar" sem o horário agendado ou a ordem do Dyones para aquele reel.
- Não alterar legenda, hashtags, horário nem arquivo.
- Não mexer em anúncios, orçamentos, permissões, pagamento, nem em outras contas ou páginas.
- Não aceitar termos nem mudar configurações da conta.
- Se algo recusar (formato, tamanho, limite, erro), não improvisar: registrar o reel e o erro e seguir para o próximo.

## O link da bio muda todo dia (tarefa manual)
O Instagram não agenda a troca de link da bio. Antes do primeiro post de cada dia (até 08:15), o Dyones (ou o agente, na sessão dele, em Editar perfil) troca o link da bio pelo da coluna `link_da_bio_do_dia`. Se um dia ficar sem a troca, os cliques daquele dia entram no UTM do dia anterior: avisar para registrar.

## Conferência final
Devolver ao Dyones:
- Uma tabela com data, hora, código, rede e estado (agendado, publicado ou com erro) dos 30 posts (25 no Instagram e 5 no Facebook).
- Capturas de tela de cada reel agendado ou da lista de agendados de cada dia.
- As funções de reel que a versão web **não** ofereceu (por exemplo, agendamento, áudio, capa), reel a reel, para o Dyones decidir.
- Os erros, com o código do reel.
- Confirmação de que nada foi publicado fora do horário.

## Fora deste handoff
O LinkedIn tem handoff próprio. Os três posts (terça, quarta e quinta às 10:00) estão em `lote-1-agenda.md` e entram pelo agendador da página do LinkedIn, com o link no primeiro comentário.
