# Texto do site: a fonte da verdade do redesign

O texto de cada rota de `https://www.v2o5.com.br`, como estava no ar em 19/10/2026 (`main` em `46c4103`). O redesign muda a forma; estas palavras ficam. Mudança de texto é decisão à parte, feita aqui primeiro e depois no código.

Nenhuma palavra foi digitada à mão. O texto saiu do DOM de produção por script (`design/baseline/ferramentas/extrair.cjs` e `gerar_conteudo.py`), e os estados que só aparecem com interação foram capturados clicando ou copiados dos literais do código, com o arquivo indicado.

## Arquivos

| Arquivo | Rota |
|---|---|
| `_comum.md` | topo, rodapé, link "Pular para o conteúdo", botão fixo do WhatsApp e aviso de medição (iguais em todas as rotas) |
| `home.md` | `/`, com as 3 abas da demonstração e as 7 peças do diagrama |
| `agente-de-ia-para-whatsapp.md`, `automacao-com-ia.md`, `criacao-de-sites.md`, `crm-com-whatsapp.md`, `rastreamento-de-conversoes.md` | as páginas de solução |
| `gestao-de-trafego.md`, `guias.md` | as duas provisórias |
| `segmentos/revendas-de-veiculos.md` | hub automotivo |
| `cases/motors-store.md` | case |
| `precos.md`, `sobre.md`, `privacidade.md` | |
| `diagnostico.md` | `/diagnostico`, com os campos do segmento automotivo e as mensagens do formulário |
| `diagnostico/recebido.md` | depois do envio |
| `nao-encontrada.md` | a página 404 |
| `llms.txt.md` | `/llms.txt`, como servido |
| `_fora-das-rotas.md` | literais do código que nenhuma rota mostrava (estados raros, dados que só vão para o JSON-LD) |

## Como ler

- O `frontmatter` de cada arquivo traz rota, URL, status, `<title>`, `meta description`, canonical, `robots` e H1, como servidos.
- O corpo é o `<main>` na ordem do DOM. A ordem visual pode ser outra em alguns blocos (nos números do case, por exemplo, o DOM traz o rótulo antes do número).
- Links aparecem como `[texto](destino)`; títulos com `#` no nível do HTML (`h1` a `h4`); listas, opções de `select` e tabelas como no HTML.
- Tudo que é anotação está em comentário HTML (`<!-- ... -->`), que não aparece no Markdown renderizado. As anotações dizem quando um texto é decorativo (`aria-hidden`, como as vinhetas de interface da home), oculto no desktop, só para leitor de tela, o destino de um cartão inteiro clicável, o `placeholder` de um campo e os `aria-label` da rota.
- O texto decorativo das vinhetas (conversas, cards de CRM, nomes de carros de exemplo) também é conteúdo escrito e está aqui; se o redesign trocar a ilustração, decide o que fazer com ele.

## Conferir depois do redesign

Rodar a extração contra o preview (`BASE_URL`, ver `design/baseline/README.md`), gerar esta pasta de novo e fazer `git diff content/`. Diferença de palavra que não foi decidida é regressão.
