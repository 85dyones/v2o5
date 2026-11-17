# Vídeos dos reels da V2O5

Gera os reels (1080x1920, 30 fps) do lote a partir de `docs/reels/lote-N.csv`. Isolado do site: tem `package.json` e dependências próprias, e nada daqui entra no build da Vercel. Pode virar o repositório `v2o5-reels` quando fizer sentido.

## Uso
```bash
cd video
npm ci --ignore-scripts
npm run preparar                                   # copia GSAP e a fonte Geist para o modelo (sem CDN)
npm run rascunho                                   # os 25 em qualidade draft, em saida/
node scripts/renderizar-lote.mjs ../docs/reels/lote-1.csv --draft --so L1-01,L1-03
node scripts/renderizar-lote.mjs ../docs/reels/lote-1.csv --print L1-06=gravacoes/l1-06.png   # com imagem de tela
npm run lote                                       # qualidade final (delivery)
```
O vídeo sai sem música: o áudio é escolhido na biblioteca do Instagram na hora de postar.

## Como funciona
- `modelos/reel/index.html` é o modelo, com as variáveis `gancho`, `prova` (o texto da tela), `print` (imagem de tela, opcional) e `cta`. Fica fora das faixas de cima (250 px) e de baixo (420 px), onde a interface do Instagram cobre.
- O HyperFrames 0.9.63 aceita `--variables`, mas **não tem `--batch`** (o PDF do framework está errado nesse ponto). O laço está em `scripts/renderizar-lote.mjs`.
- A duração de cada reel vem da coluna `duracao_s` do CSV (calculada a 2,5 palavras por segundo); o modelo escala o tempo das três cenas.

## Segurança do HyperFrames (conferido em 17/11/2026)
- Versão fixa em 0.9.63, licença Apache 2.0, instalada com `--ignore-scripts`; o pacote não declara script de instalação.
- Telemetria desligada (`npx hyperframes telemetry disable`).
- Não usar `auth`, `share`, `publish`, `cloud`, `templates` (HyperFrames Pro) nem `billing`: enviam material a serviços do fornecedor.
- O `init` cria arquivos `AGENTS.md` e `CLAUDE.md` com instruções do fornecedor; foram removidos do modelo. Não restaurar.
- GSAP 3.15.0 e a fonte Geist ficam locais (não carrega nada de CDN no render).

## Final animado e cenas
O modelo tem um final animado de 5,5 s (o texto sob o logo é digitado, com cursor âmbar) com o símbolo da V2O5 (nuvem desenhada, rede, átomo âmbar, "V2O5", "Vendas e Tecnologia" e a chamada com o botão "Link na bio"), lido de `src/lib/marca-vetor.ts`. O som do final (subida suave, batida, toque do átomo e saída, sem música) é sintetizado pelo `renderizar-lote.mjs` com o ffmpeg e juntado ao vídeo; `--sem-som` desliga. Nível alvo: perto de -15 LUFS, pico em -3 dBFS.
Cenas do meio: `--cena L1-01=conversa` usa a conversa de exemplo com legendas do corpo (sem locução); sem a opção, a cena é texto com imagem de tela. Qualidade final: sem `--draft`.

## Ritmo de leitura
Gancho e chamada final são digitados com pausa dramática no fim de cada frase (0,7 s no gancho, 0,3 s na chamada); no gancho a frase seguinte desce para outra linha ("Seu cliente pediu preço e sumiu." / "Sabe por quê?"). As legendas do corpo entram palavra por palavra, com a palavra da vez em âmbar. O gancho fica na tela até 4,2 s.

## Telas dos reels
`gravacoes/gravar-telas.mjs` captura as telas do site (Playwright, dados fictícios, nada é enviado) em `gravacoes/telas/` (fora do git). `gravacoes/ficha-exemplo.html` é um cartão de exemplo, com selo "EXEMPLO", para o L1-06. Com o site no ar (`npm run build && npx next start -p 3100`, na raiz): `SITE=http://localhost:3100 node gravacoes/gravar-telas.mjs`. Mapa tela por reel: L1-06 `ficha-exemplo`, L1-08 `formulario-completo`, L1-10 `diagnostico-passos`, L1-17 `precos-valores`, L1-21 `diagnostico-topo`, L1-25 `formulario-parcial`.

## O que falta
- Animar os reels de motion (a cena do meio hoje é só texto) e gravar vídeo, não só imagem, das telas.
- L1-07 (conversa de exemplo do agente) e L1-09 (link com etiqueta) pedem animação própria, sem tela do site.
- Aprovar o visual do modelo com o Dyones (papel, tinta e âmbar da marca).
