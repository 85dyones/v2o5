# Raiz de diagnostico.v2o5.com.br

Os arquivos fixos da raiz do subdomínio dos diagnósticos de presença:

| Arquivo | O que é |
|---|---|
| `index.html` | A vitrine: o que o diagnóstico verifica (37 verificações em quatro etapas), como mede, o que o cliente recebe, a solução da V2O5 para cada etapa, as quatro soluções com a continuidade, o case Motors Store e o pedido de diagnóstico. |
| `404.html` | Link de diagnóstico incompleto ou errado: pede o link certo no WhatsApp e leva à vitrine. |
| `og.jpg` | A imagem de prévia da raiz (1200×630) no WhatsApp e nas redes, gerada de `og.html`. Também é a reserva dos diagnósticos: o `vercel.json` de lá serve `/og.jpg` quando a pasta de um cliente não tem a dela. |

Cada diagnóstico continua na pasta própria (`<cliente>-<código>/`), criada pela skill `diagnostico-presenca` (`tools/publicar_site.py`). A skill só cria `index.html` e `404.html` na raiz quando eles não existem, então estas versões não são sobrescritas.

## Onde publica

Repositório `85dyones/v2o5-diagnosticos` (privado), na raiz, ligado ao projeto `v2o5-diagnosticos` da Vercel. A Vercel publica sozinha em cerca de um minuto depois do push. O `vercel.json` de lá já manda `X-Robots-Tag: noindex, nofollow` em tudo.

## Como atualizar

1. Editar aqui, nesta pasta.
2. `npx vitest run tests/subdominio-diagnostico.test.ts`
3. Mudou a imagem de prévia: editar `og.html` e gerar `og.jpg` com `npx -y playwright@1.56.1 screenshot --viewport-size=1200,630 --wait-for-timeout=800 subdominios/diagnostico/og.html subdominios/diagnostico/og.jpg` (precisa do Chromium do Playwright).
4. Copiar `index.html`, `404.html` e `og.jpg` para a raiz do repositório `v2o5-diagnosticos`, commit e push.
5. Abrir https://diagnostico.v2o5.com.br/ e um endereço qualquer inexistente para ver o 404. Para a prévia: escrever o link numa conversa do WhatsApp sem enviar; a imagem aparece em até 10 segundos (o WhatsApp guarda a prévia por aparelho, então um link já enviado antes pode seguir sem imagem).

O teste falha quando o site muda e esta página fica para trás: preço e conteúdo dos planos (`src/conteudo/precos.ts`), números e fonte do case (`CASE` em `src/conteudo/home.ts`), frases dos cartões de solução (`LINHAS`), WhatsApp e dados da empresa (`EMPRESA`), rotas do site (`src/conteudo/paginas.ts`) e a marca das mensagens prontas que o n8n reconhece. Mudou o cardápio, muda aqui e republica.

## Regras

- Sem cidade e sem contato pessoal escrito (nome do Dyones, número, e-mail) nas duas páginas (Dyones, 16/10): o contato é pelos botões de WhatsApp e do site. O rodapé fica com nome, razão social e CNPJ.
- Fora do Google (`noindex`), como os diagnósticos. Quem procura a V2O5 na busca cai no site; esta página é para quem recebeu um link.
- Sem GA4 e sem Pixel: todo link para o site leva `utm_source=diagnostico.v2o5.com.br`, e a origem é gravada quando a pessoa chega lá.
- WhatsApp da vitrine com "site da V2O5" na mensagem pronta; o do 404 com "Dyones. Vi o diagnóstico da". As duas marcam o lead no fluxo da origem do n8n (`docs/n8n/`).
- A lista das 37 verificações segue `config/coverage.yaml` da skill (identidade 4, ser encontrada 13 com a comparação com concorrentes, causar boa impressão 10 com o aplicativo opcional, ser contatada 4, medir e proteger 6). Mudou lá, muda aqui.
- Visual da direção B do redesign 2026 (`.bunshin/direction.md`, `design/DESIGN.md`; tokens e componentes de `src/app/globals.css` copiados à mão): papel, grade de 12 colunas em fio claro, a rota na margem com uma parada por título, raio zero, sem sombra nem brilho, botão principal em dois blocos, marca-texto só em preço e prazo, e uma única faixa escura (o fecho). HTML estático sem dependência e sem JavaScript; o título é o LCP. Sem animação (Dyones, 16/10: a molécula animada "ficou muito amador"): no hero, no fecho e em `og.html` vai a construção do símbolo, parada (grade, os quatro círculos da nuvem de `src/lib/construcao.ts`, cotas em mono e o símbolo C1d de `src/lib/marca-vetor.ts` por cima, como `src/components/marca/Construcao.tsx`), clara no hero e na prévia, escura no fecho; o movimento fica só no site principal. Mudou o logo ou a construção, muda aqui e em `og.html`; o teste cobra o vetor.
- Imagem de prévia nova: trocar o `?v=` do `og:image` no `index.html`, para as redes que guardam a imagem pelo endereço buscarem a nova.
