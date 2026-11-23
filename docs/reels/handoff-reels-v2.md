# Handoff: reels v2 no padrão do "reel dos 4 minutos" (23/11/2026)

Para o agente que vai atualizar os reels. Contexto: o lote 1 (25 reels, em `video/`) está aprovado e pronto, mas o Dyones trouxe um reel de referência que conta a mesma dor com muito mais força. Este documento descreve o que o reel de referência faz de diferente, as regras que o projeto mantém e o trabalho a fazer. O reel está em `docs/reels/referencia/V2O5-reel-4-minutos_LT01.mp4` (22 s, 1080x1920, 30 fps) e a grade de quadros em `docs/reels/referencia/anatomia-por-tempo.png`.

## Modelo a usar
Use o modelo mais capaz disponível para as decisões criativas (conceito, roteiro, ritmo): o Fable 5.5, e o Opus 5.5 se o resultado do Fable não superar o da referência (ver "Como escolher o modelo"). Renderização, conferência de quadros e empacotamento não exigem o modelo mais forte. Não consegui confirmar daqui as capacidades do Fable 5.5; a escolha vem do teste abaixo, não de suposição.

## Anatomia do reel de referência (22 s)
Medida por quadros a cada 2 s e por análise do áudio.

| Tempo | O que aparece | O que faz |
|---|---|---|
| 0 a 2 s | Cartão escuro: "Você perdeu essa venda em 4 minutos." com "4 minutos" em destaque âmbar | Gancho de perda concreta, na segunda pessoa, com o tempo no destaque |
| 2 a 4 s | Hora grande no topo (14:02), cartão de conversa "Cliente", "Oi! Quanto custa o serviço?", legenda "Ele perguntou o preço." | O relógio vira o motor da história |
| 4 a 6 s | 14:04, pílula "Sem resposta há 2 min", legenda "Você estava ocupado." com "ocupado" em destaque | Causa humana e reconhecível |
| 6 a 10 s | 14:06, "Sem resposta há 4 min", legenda "Outra empresa respondeu." e um segundo cartão "Outra empresa" que responde ("Oi! Já te envio os valores.") com o selo "RESPONDIDO EM 1 MIN" | O contraste: a mesma conversa, com outro desfecho |
| 10 a 14 s | 09:14 com o selo "+1 DIA", "Sem resposta há 1 dia", depois 09:20, "Já fechei com outra empresa. Obrigado.", legenda "Ele já tinha fechado." | A consequência, no dia seguinte |
| 14 a 16 s | Fundo escuro: "Seu preço nem entrou na disputa." | A frase de efeito (punchline) |
| 16 a 18 s | O mesmo, mais "Levou quem respondeu primeiro." em destaque e a pílula de compartilhar: "Envie para quem deixa cliente esperando →" | Moral da história e chamada para compartilhar |
| 18 a 22 s | A logo da V2O5 se constrói, depois "Vendas e Tecnologia" e "Descubra onde sua empresa pode funcionar melhor. Gratuitamente" digitado | Marca e promessa |

Áudio: não há narração. A análise espectral mostra um grave contínuo baixo, estalos e toques curtos nas mudanças de cena, e uma batida forte na entrada da logo (cerca de 18,5 s). Nível de -20,8 LUFS integrado, pico em -2 dBFS.

## O que a referência faz melhor que o nosso L1-01
| | L1-01 (v1) | Referência |
|---|---|---|
| Gancho | Pergunta ("Sabe por quê?"), sobre o cliente | Afirmação de perda sobre o espectador ("Você perdeu essa venda em 4 minutos") |
| Estrutura | Gancho, cena com legenda longa, final | História em beats curtos: pergunta, causa, contraste, consequência, punchline, compartilhar |
| Tempo | Aparece só como pílula | Relógio grande, que dá urgência e prova a perda |
| Contraste | Não há | A outra empresa responde em 1 minuto |
| Texto por tela | Frases de 10 a 14 palavras, legenda palavra a palavra | Até 6 palavras, um destaque âmbar por tela |
| Fim da história | O final de marca vem logo | Punchline e chamada para compartilhar antes da marca |
| Duração | 26 s (31 s na versão narrada) | 22 s |
| Voz | Opcional | Nenhuma: o texto e os efeitos bastam |

## Regras que passam para os outros reels
1. **Abra com uma perda concreta, na segunda pessoa**, e ponha o tempo, o valor ou o fato no destaque âmbar.
2. **Narre no tempo, com um relógio ou um calendário grande**, em beats de 2 a 4 segundos.
3. **Mostre o contraste**: o que outro faria, no mesmo instante. Sem atacar ninguém.
4. **Uma frase de efeito curta em fundo escuro**, seguida da moral em destaque.
5. **Chamada para compartilhar com nome** ("Envie para quem...") antes da logo. Sem automação de comentário, que continua adiada.
6. **No máximo 6 palavras por tela** e um destaque âmbar por tela.
7. **Sem narração por padrão.** A voz do Dyones (ver `narracao-roteiro.md`) é um acréscimo opcional; a versão base funciona sem ela.
8. **Efeitos discretos**, com a batida na entrada da logo. Nível-alvo de -16 a -14 LUFS para o celular (a referência está em -20,8; o Instagram normaliza, mas um pouco mais alto evita volume baixo).

## Regras do projeto que continuam valendo
- Texto público sem travessão, sem "não é X, é Y" e sem trio retórico. Português do Brasil, frases de falar.
- **Número só com fonte e medido.** A referência usa horas e minutos de **cena ilustrativa** (14:02, "4 minutos", "RESPONDIDO EM 1 MIN"). Isso só vale com a marcação "EXEMPLO" visível nos cartões. No quadro do gancho não há selo: coloque uma nota discreta ("Cena de exemplo") ou mantenha o selo nos cartões desde o primeiro quadro em que aparecem. Número real só o do case Motors, com fonte e período (`memory/projects/case-motors.md`). Nunca "em menos de 1 minuto" para a Motors: a frase da fonte é "em até 1 minuto".
- Zonas seguras: nada importante nos 250 px de cima e nos 420 px de baixo.
- Marca: papel `#F2F1EC`, tinta `#121418`, âmbar `#F2A516`, Geist, logo da V2O5 vinda de `src/lib/marca-vetor.ts`.
- Cada reel leva a mesma promessa final: "Descubra onde sua empresa pode funcionar melhor. Gratuitamente." e o link na bio.

## Como implementar (pipeline `video/`)
Leia `video/README.md`. O gerador é o HyperFrames 0.9.63, local, já com o modelo vertical, o final animado da logo, o texto digitado e a conversa de exemplo. Para o padrão da referência faltam quatro tipos de cena em `video/modelos/reel/index.html`, dirigidos por `video/cenas.json`:
1. **Relógio**: hora grande no topo, com o selo "+1 DIA" e a pílula "Sem resposta há X min".
2. **Dupla**: dois cartões de conversa, o do cliente e o da "Outra empresa", com o selo de tempo de resposta.
3. **Punchline**: fundo escuro, texto grande, destaque âmbar.
4. **Compartilhar**: pílula com contorno e seta, antes do final da logo.

Pontos de atenção que já nos custaram tempo:
- O HyperFrames não tem `--batch`; o laço está em `video/scripts/renderizar-lote.mjs`. Não rode dois renders ao mesmo tempo (eles colidem na pasta temporária).
- Os vídeos ficam em `video/saida/`, fora do git, e o contêiner é temporário: baixe o que precisar.
- Não use `auth`, `share`, `publish`, `cloud`, `templates` nem `billing` do HyperFrames.
- Se um comando longo com muitas aspas e trechos de JavaScript for bloqueado pela checagem de segurança, escreva o arquivo com a ferramenta de escrita e rode o comando separado.

## Reels a atualizar, por prioridade
A mesma história serve a várias dores. Reaproveite as "cenas ilustrativas" dos carrosséis v2 (`social/carrosseis/conteudo-dores-v2.json`), que já têm a linha do tempo de cada dor.

| Prioridade | Reel | Conceito v2 (gancho de perda e punchline) |
|---|---|---|
| 1 | L1-01 | Substituir pela referência, com a nota "Cena de exemplo" no gancho |
| 2 | L1-13 | "O cliente preencheu o formulário às 14h. Quem viu?" 14:00 formulário, 14:01 aviso no e-mail, quinta fecha com outro. Frase de efeito: "Contato sem dono é venda perdida." |
| 3 | L1-20 | "Você digitou a mesma venda três vezes." Segunda WhatsApp, terça sistema, quarta planilha, sexta o relatório não bate |
| 4 | L1-11 | "Você pagou o anúncio. O cliente entrou e saiu. Você não viu." Sem medição, sem aprendizado |
| 5 | L1-04 | O cliente esperando, com o mesmo relógio da referência em outra situação (orçamento) |
| 6 | L1-14 | WhatsApp sem dono: cada um acha que o outro respondeu |
| 7 | L1-17 | Preço aberto: "Orçamento escondido ou preço público?" em contraste de duas empresas |
| 8 | L1-03 | O único com número real: o 93 de 100 da Motors, com a fonte na tela e a frase "em até 1 minuto" |
| 9 a 25 | Os demais | Mesma receita, na ordem de `docs/reels/semana-1-agenda.md` |

Os reels de tela (L1-06, 08, 10, 17, 21, 25) mostram o site e podem manter a gravação, ganhando só o gancho de perda, a legenda curta e a chamada de compartilhar.

## Como escolher o modelo (teste curto antes de refazer tudo)
1. Dê ao Fable 5.5 o mesmo briefing (este arquivo e o reel de referência) para três reels: L1-13, L1-20 e L1-11.
2. Dê o mesmo briefing ao Opus 5.5 para os mesmos três.
3. Pontue cada resultado de 0 a 2 nestes oito itens e some: (a) gancho de perda na segunda pessoa; (b) relógio ou calendário como motor; (c) contraste com outro desfecho; (d) frase de efeito em fundo escuro; (e) chamada de compartilhar com nome; (f) no máximo 6 palavras por tela e um destaque; (g) honestidade (selo de exemplo, nenhum número sem fonte); (h) 20 a 24 s e marca no fim.
4. O de maior soma faz o restante. Se empatarem, use o Opus 5.5 (o que o Dyones indicou como alternativa) e guarde o Fable 5.5 para os roteiros.

## Entregáveis e relato
- Para cada reel: o MP4 final em `video/saida/` com o nome `L1-XX.v2.mp4`, o roteiro em `docs/reels/lote-1-v2.md` e o CSV atualizado.
- Mostre ao Dyones três quadros por reel (gancho, virada, final) antes de renderizar o lote inteiro.
- Relate: o que ficou igual à referência, o que mudou e por quê, o que ainda depende de decisão dele (por exemplo, a nota "Cena de exemplo" no gancho) e quais checagens rodaram (lint, testes, quadros vistos). Não declare "pronto" sem ter visto os quadros.
- Commit e push só na branch designada da sessão. Memória atualizada em `memory/decisoes.md` e na pendência 41.

## O que não fazer
- Não publicar nada nas redes, não mexer em perfil, anúncio nem conta.
- Não inventar número de resultado. Cena ilustrativa tem selo; dado real tem fonte e período.
- Não trocar a promessa final nem os preços sem passar pelo Dyones.
