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

## O que falta
- Gravar as telas (Playwright) dos reels de demonstração L1-06 a L1-10 e L1-16, e animar os reels de motion (a cena do meio hoje é só texto).
- Aprovar o visual do modelo com o Dyones (papel, tinta e âmbar da marca).
