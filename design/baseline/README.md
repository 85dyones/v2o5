# Linha de base do site atual

Retrato de `https://www.v2o5.com.br` em 19/10/2026, antes do redesign, com o `main` em `46c4103`. Serve para comparar: o que mudou de propósito e o que não podia ter mudado (`design/nao-pode-quebrar.md`).

| Arquivo | O que é | Como saiu |
|---|---|---|
| `DESIGN.md` | Tokens de design observados: cores, tipografia, espaçamento, raios, sombras, motion | Dembrandt 0.39.2, `--crawl 5 --design-md` |
| `dembrandt-2026-10-19.json` | A extração completa do Dembrandt, base para `--compare` | o mesmo comando, com `--save-output` |
| `dembrandt-saida.txt` | O relatório do terminal | o mesmo comando |
| `telas/` | Home e `/precos` em iPhone SE, iPhone 15 Pro Max, iPad Mini e desktop 1440, primeira dobra e página inteira | `ferramentas/telas.cjs` |
| `genjutsu-tells.md`, `genjutsu-tells.json` | Vícios de interface gerada por IA no código atual | Genjutsu, `audit.py --group tells` |
| `extracao-producao.json` | Tudo que a extração leu de produção: head, JSON-LD, eventos, WhatsApp, formulário, redirecionamentos, `robots.txt`, `sitemap.xml`, `llms.txt` | `ferramentas/extrair.cjs` |
| `jsonld.json` | O grafo JSON-LD de cada rota, como servido | recorte do arquivo acima |

## Dembrandt

Cruzou 5 páginas: `/`, `/precos`, `/sobre`, `/diagnostico` e `/criacao-de-sites`, com locale `pt-BR` e fuso de São Paulo. Para ver o que o redesign mudou:

```
dembrandt <url-do-preview> --crawl 5 --compare design/baseline/dembrandt-2026-10-19.json
```

## Telas

As medidas são as dos presets do Responsively App 2.0.0-beta.0 (`desktop-app/src/common/deviceList.ts`): iPhone SE 375 × 667 a 2x, iPhone 15 Pro Max 430 × 932 a 3x, iPad Mini 768 × 1024 a 2x, e o preset "MacBook Pro" 1440 × 900 a 2x para o desktop, com o user agent de cada um.

A captura não passou pelo Responsively. A ponte MCP da build beta em `D:\responsively-app` responde HTTP 200 com corpo vazio a qualquer chamada (inclusive `initialize`), e o app só tira a tela visível, reduzida a 1000 px. As telas saíram do Playwright (Chromium) com as mesmas medidas:

- `*-dobra.png`: a primeira tela, na densidade do aparelho;
- `*-inteira.png`: a página toda, rolada até o fim antes para carregar as seções, em 1x (acima de 16 mil px o Chromium corta a imagem).

`telas/telas.json` registra aparelho, viewport, densidade e altura da página de cada arquivo.

## Genjutsu

`AThevon/genjutsu` (`skills/_jutsu/design-audit/scripts/audit.py`, commit `1f518a7`), rodado com `python -I audit.py D:/V2O5-SITE --group tells`. Resultado: 18 checagens, 4 vícios a confrontar com a tese do redesign (mancha de gradiente borrado, painel de vidro, texto com gradiente, animação que nunca para) e o inventário de durações, curvas, cores, raios e fontes. O próprio relatório avisa: vício é evidência, não veredito.

## Ferramentas

Os scripts que geraram `extracao-producao.json`, `content/` e `design/nao-pode-quebrar.md`. Precisam do Playwright (`npm i -g playwright` já instalado nesta máquina) e de Python 3.

```
# 1. Ler o site (produção por padrão; BASE_URL aponta para o preview)
BASE_URL=https://<preview>.vercel.app NODE_PATH=<npm global>/node_modules node design/baseline/ferramentas/extrair.cjs <pasta>

# 2. Gerar content/ e a lista do que ficou fora das rotas
python design/baseline/ferramentas/gerar_conteudo.py <pasta>/extracao.json . <commit>
python design/baseline/ferramentas/residuos.py . <commit> <pasta>/extracao.json

# 3. Gerar o nao-pode-quebrar.md
python design/baseline/ferramentas/gerar_nao_pode_quebrar.py <pasta>/extracao.json . <commit>

# Telas
BASE_URL=... NODE_PATH=... node design/baseline/ferramentas/telas.cjs <pasta>
```

A extração confere antes se há GA4 ou Pixel carregando; se houver, para e pede a oposição gravada, para os acessos dela não contarem como visita.
