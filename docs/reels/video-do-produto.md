# Vídeo do produto a partir de repositório git (17/11/2026)

Resposta curta: sim. O vídeo pode ser gerado por código, versionado em git, e a V2O5 tem material para isso sem usar dado de cliente. Fica para a segunda etapa, depois do lote 1 sem Motors; este arquivo registra a abordagem.

## O que dá para gerar sem dado de cliente
O próprio site novo (este repositório) é o produto que se mostra: a home, o `/diagnostico`, as páginas de solução e `/precos`. O formulário do diagnóstico enviando um lead de teste e chegando no CRM é uma demonstração real, com dado fictício.

## Duas ferramentas
| Ferramenta | Para quê | Observação |
|---|---|---|
| **Playwright** (já instalado nesta máquina) | Gravar a tela do site rodando (`npm run dev` ou o preview da Vercel), com cursor e cliques roteirizados | Gera o vídeo bruto em webm. Edição por ffmpeg (instalado) |
| **HyperFrames** (Apache 2.0) | Montar o reel final em HTML e CSS: texto do gancho, enquadramento 1080x1920, trilha de tempo | Renderiza em Chrome headless e FFmpeg; Node 22 (a máquina tem 22.23) |

HyperFrames é um plugin de terceiro. A página do projeto cita, conferida em 17/11: licença Apache 2.0, instalação por `npx hyperframes init` ou pelo marketplace do Claude Code, GSAP carregado por CDN no exemplo, e envio de vídeos a um serviço de hospedagem só nos comandos `auth login` e `share`. O que o PDF cita como "variáveis" e `--batch` **não apareceu** na página que li; a primeira tarefa é provar isso num repositório de teste. Antes de instalar: ler o `SECURITY.md`, rodar numa pasta isolada, fixar a versão e não usar `auth` nem `share`.

## Onde fica
Recomendação: **um repositório novo, `v2o5-reels`**, separado do site. Motivos: dependências e binários pesados não pesam no repositório do site; a saída de vídeo não entra no git (só roteiros, modelo e JSON do lote); o repositório do site continua com o contrato `design/nao-pode-quebrar.md`.

Estrutura sugerida:
```
v2o5-reels/
  README.md          como gerar o lote
  roteiros/lote-1.csv   (saída do prompt 4)
  modelos/reel-vertical/   (HyperFrames: gancho, prova, print, cta)
  gravacoes/         (Playwright: scripts que gravam a tela do site)
  lote-1.json        (uma linha por roteiro)
  saida/             (ignorada no git)
```
Fluxo: Playwright grava a tela do site → HyperFrames compõe texto, enquadramento e cta → `--batch` renderiza o lote → o Dyones posta o arquivo pela biblioteca de áudio do Instagram.

## O que preciso para criar o repositório
Este ambiente só enxerga `85dyones/v2o5` e `85dyones/v2o5-diagnosticos`. Para criar o `v2o5-reels`, o Dyones cria o repositório vazio (privado) e eu o adiciono à sessão. Alternativa sem repositório novo: pasta `video/` dentro do `v2o5`, com `saida/` ignorada.

## Segunda etapa, Motors
Gravar a tela do Ney e do painel da Motors só com autorização da loja e dado mascarado (pendência 24 e 31). Os números do case já estão autorizados; as telas, não.
