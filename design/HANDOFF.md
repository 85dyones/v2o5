# Handoff do redesign 2026

## Estado em 19/10/2026, fim da sessão na nuvem (bunshin do Genjutsu)

Branch **`redesign-2026-km7atp`** (PR #24, rascunho, contra `redesign-2026`). A direção B foi aprovada pelo Dyones (mapa de linhas: a rota das etapas desce pela margem da página até o botão do fecho; acabamento de ficha técnica). Home aprovada; as 11 rotas (`/precos`, `/sobre`, `/cases/motors-store`, o hub, as cinco soluções, `/gestao-de-trafego`, `/diagnostico` e `/diagnostico/recebido`) redesenhadas por clones e revisadas em duas rodadas. O revisor de acabamento deu "ship" na rodada 1; a rodada 2 fechou os três P2 dele e duas regras do diretor de arte (marca-texto só no que decide, formulário mais alto no celular).

- Conferido no fim: `next build`, `tsc`, `vitest` (314), `eslint` limpos; nenhum travessão em `src`; as 13 telas em 390x664, 390x844, 1280x720 e 1440x900 com 200, sem transbordo e sem erro de console.
- Conferido antes do merge (19/10): `extrair.cjs` contra o build local comparado com `extracao-producao.json`. As únicas diferenças são as decididas: `theme-color` e `color-scheme`, o 307 de `/gestao-de-trafego`, e no JSON-LD de `/precos` a URL dos quatro itens de tráfego. As mensagens de WhatsApp e os e-mails são todos iguais. axe (WCAG 2.1 AA e boas práticas) nas 13 telas em 390 e 1440 px: limpo, menos a marca decorativa do rodapé, que já tem `aria-hidden` e é falso positivo. Teclado: foco âmbar na faixa escura; o envio vazio leva o foco ao nome e o erro dos objetivos leva o foco aos objetivos. Ainda não conferido: leitor de tela de verdade (VoiceOver ou TalkBack).
- Mudanças de contrato decididas pelo Dyones: célula "Na informática · Desde 1992" em `/sobre` (em `content/sobre.md`); `cta_click` com `data-local` `trafego`, `modulos`, `servicos` nas linhas do cardápio de `/precos`.
- Depois do fecho, ainda em 19/10 (respostas do Dyones): capturas reais da Motors no case, no hub e em `/criacao-de-sites`; `/gestao-de-trafego` em 307 para `/precos#titulo-trafego`; faixa dos três planos na primeira tela de `/precos`; botão fixo de WhatsApp escondido enquanto o botão principal da abertura aparece; Painel do dono com uma descrição só.
- Em aberto com o Dyones: pendência 24 de `memory/pendencias.md` (retrato do fundador, objeto próprio por página de solução, rodapé e fecho).
- Material de trabalho (fora do git): `.bunshin/` (contrato da direção, revisões, capturas por rodada, relatório em `.bunshin/report.md`).

---

Atualizado em 19/10/2026, ao fim da primeira sessão do redesign (Claude Code no Windows, `D:\V2O5-SITE`). Leia isto antes de continuar em outra máquina ou numa sessão na nuvem.

## Onde está

Tudo está no GitHub, na branch **`redesign-2026`** de `85dyones/v2o5`, que saiu do `main` em `46c4103`. Nada físico precisa ir de um computador para outro.

| Commit | O que entrou |
|---|---|
| `d29794c` | Linha de base: `design/baseline/`, `content/`, `design/nao-pode-quebrar.md` |
| `f08a870` | Referências: duas listas de 6 sites com captura |
| `d6e993b` | Referências revisadas: os sete que ficaram e a tabela das lacunas |
| `f686597` | `design/DESIGN.md` (base clara) e o registro da troca de direção na memória |
| `477a081` | Testes e lint passando no checkout do Windows (sessão paralela) |
| `2ae6cf4` | O sistema do DESIGN.md aplicado em `src/lib/tokens.ts`, `globals.css` e testes (sessão paralela) |

O `main` e o site no ar não mudaram. Nenhum PR foi aberto.

## O que foi feito

1. **Linha de base do site no ar** (`design/baseline/`, com `README.md`): tokens do Dembrandt (`--crawl 5 --design-md`), 16 telas da home e de `/precos` em quatro aparelhos, a auditoria de vícios do Genjutsu (`audit.py --group tells`) e a extração completa de produção (`extracao-producao.json`, `jsonld.json`). A ponte MCP do Responsively beta não funcionou (responde vazio); as telas saíram do Playwright com os presets do Responsively.
2. **Texto travado** em `content/`: o texto de cada rota tirado do DOM de produção, sem redigitar, com os estados que só aparecem com clique. É a fonte da verdade: o redesign não muda palavra sem decisão.
3. **O que não pode quebrar** em `design/nao-pode-quebrar.md`: rotas, title e description, JSON-LD, eventos (`data-evento`, `event_id`, Meta CAPI, GA4), o formulário de `/diagnostico` e o link de WhatsApp (toda mensagem pronta precisa ter "site da V2O5", senão o n8n não marca o lead).
4. **Referências** em `design/referencias/`: lista A (Checkpoint Research, Sincro, Heco Partners) e lista B (ITSUA, Indisea, Joshgrafik, Love and Money), com capturas, recortes de prova, a tabela de lacunas e o Dembrandt de ITSUA, Joshgrafik e Checkpoint.
5. **Sistema visual** em `design/DESIGN.md`: base clara com o papel de fundo, escala tipográfica de razão 1,25 a partir de 17 px (da ITSUA), espaçamento em 4 px com seção de 64 a 96 px, curvas e quatro durações do Joshgrafik, paleta só com cores da marca e contraste medido par a par. Cada decisão diz de onde veio e o que mudou.
6. **Tokens aplicados** (`2ae6cf4`, sessão paralela): paleta, escala, espaçamento e movimento no código; as classes de cor dos componentes foram renomeadas para o site seguir legível no claro; saíram as duas animações sem fim. Pelo relatório da sessão, `npm test` (324 testes), lint e build passam e nenhum texto das 16 rotas ficou abaixo do AA. **Não conferido de novo nesta sessão**: rode `npm test`, `npm run lint` e `npm run build` antes de seguir.

## Decisões do Dyones nesta sessão

Registradas em `memory/decisoes.md` (19/10/2026):

- Base clara, papel como fundo. Troca a direção escura de 09/10; a tinta fica para o rodapé e no máximo uma faixa por página.
- Referências que passem confiança de consultoria, não de SaaS; fora as landing pages escuras de startup de IA.
- Descartados Outsource Consultants, Fox Valuations, Vuna Partners, Kohen Avocats e Dawn L. Saunders.
- A = ITSUA (escala e espaçamento), B = Joshgrafik (movimento), Checkpoint para conferência.

## O que falta, em ordem

1. **Revisar o resultado dos tokens.** Rodar o site (`npm run dev`) e ver como ficou a base clara antes do redesenho das páginas. O commit `2ae6cf4` mexeu em muitos componentes só para manter a legibilidade.
2. **Decidir `theme-color` e `color-scheme`** em `src/app/layout.tsx`: ainda estão `#121418` e `dark`, o que pinta de escuro a barra do navegador no celular e os controles nativos. A sessão paralela deixou para o Dyones (pendência 23 em `memory/pendencias.md`).
3. **Redesenhar a home com o método `paint` do Genjutsu.** Pedido do Dyones em 19/10, ainda não começado (só o `SKILL.md` foi lido). O comando `/genjutsu:paint` não está instalado; o método está no clone do Genjutsu (`skills/paint/SKILL.md`, commit `1f518a7` de `AThevon/genjutsu`). O que o pedido já responde:
   - Ler `content/home.md` (texto travado, não reescrever), `design/DESIGN.md` e `design/referencias/`.
   - Modo do `paint`: **redesign** do visual, mantendo o texto e a estrutura de conversão.
   - Mostrar a tese visual e a tese de interação como **página renderizada** antes de implementar, e esperar o sim do Dyones para as duas.
   - Evitar, além do catálogo de vícios do Genjutsu: rótulo acima de cada título, seções numeradas, maquete de interface em todo cartão, grade de cartões iguais e bloco de terminal.
   - Na prática: a fase 3 do `paint` (sistema de design) já está feita no `design/DESIGN.md`, que faz o papel do `MASTER.md`. Começar pela fase 1 (varredura da stack, uma linha com a leitura do pedido, brainstorm com uma pergunta por vez) e ir para a fase 2 (as duas teses na página renderizada).
4. Depois da home, as outras páginas, uma por vez, cada uma conferida contra `design/nao-pode-quebrar.md` (seção 7) e com o `content/` regenerado sem diferença de palavra.
5. Abrir o PR de `redesign-2026` contra `main` só quando o redesign estiver conferido; a Vercel publica o preview por branch.

## Como continuar

### Numa sessão na nuvem

Esta sessão pode seguir na nuvem com a conversa junto ("Continuar na nuvem" no Claude Code). A sessão da nuvem parte da branch `redesign-2026` como está no GitHub e abre de qualquer computador em claude.ai/code. O que ela não terá por padrão:

- o MCP do Awwwards e o MCP do Dembrandt (o CLI roda com `npx dembrandt`);
- o clone do Genjutsu: `git clone https://github.com/AThevon/genjutsu.git` numa pasta fora do repositório, e ler `skills/paint/SKILL.md`;
- o Responsively App;
- o Chromium do Playwright, se a imagem não trouxer: `npx playwright install chromium`.

Para o passo 3 (página renderizada com as teses) basta o que a nuvem tem; os MCPs só fazem falta para buscar referências novas.

### Em outro computador, local

```
git clone https://github.com/85dyones/v2o5.git
cd v2o5
git checkout redesign-2026
npm install
npm run dev
```

Ferramentas usadas aqui, se precisar delas lá: `npm i -g dembrandt playwright` e `npx playwright install chromium`; `claude mcp add awwwards -- npx -y awwwards-mcp`; o clone do Genjutsu como acima; Python 3 para os scripts (sem bibliotecas extras). A memória automática do Claude Code desta máquina (`~/.claude/projects/D--V2O5-SITE/memory/`) guarda só caminhos locais e não faz falta: o contexto do projeto está no `CLAUDE.md`, em `memory/` e nesta pasta `design/`.

## Scripts

- `design/baseline/ferramentas/`: extração de produção, telas, geração do `content/`, lista do que ficou fora das rotas e geração do `nao-pode-quebrar.md`. Rodam contra o preview com `BASE_URL` (instruções no `README.md` da linha de base).
- `design/ferramentas/contraste.py`: contraste WCAG de pares de cor (`python contraste.py "#121418 #F2F1EC tinta/papel" ...`), o que mediu a tabela de cores do DESIGN.md.
- `design/ferramentas/escala.py`: a escala de razão 1,25 e os `clamp()` entre 375 e 1440 px do DESIGN.md.
