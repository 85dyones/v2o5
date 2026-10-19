---
name: "V2O5 Vendas e Tecnologia"
description: "Sistema visual do redesign 2026: base clara em papel, escala tipográfica de razão 1,25, ritmo de espaçamento em 4 px e curvas de movimento de entrada e de abertura."
colors:
  fundo: "#F2F1EC"
  fundo-cartao: "#FAF9F5"
  fundo-alternado: "#E8E6DF"
  texto: "#121418"
  texto-secundario: "#5A5D66"
  linha: "#D6D4CC"
  linha-campo: "#7A7972"
  acao: "#F2A516"
  acao-borda: "#8A5600"
  acao-texto: "#8A5600"
  etapa-atracao: "#6B46C8"
  etapa-atendimento: "#17773F"
  etapa-crm: "#2457C5"
  faixa-escura: "#121418"
  faixa-escura-texto: "#F2F1EC"
  faixa-escura-secundario: "#A9ACB4"
  erro: "#B3261E"
typography:
  marca:
    fontFamily: "Geist"
    fontSize: "clamp(4.0625rem, 2.698rem + 5.822vw, 7.9375rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  numero:
    fontFamily: "Geist"
    fontSize: "clamp(3.25rem, 2.172rem + 4.601vw, 6.3125rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
  titulo-1:
    fontFamily: "Geist"
    fontSize: "clamp(2.625rem, 1.767rem + 3.662vw, 5.0625rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
  titulo-2:
    fontFamily: "Geist"
    fontSize: "clamp(2.0625rem, 1.644rem + 1.784vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  destaque:
    fontFamily: "Geist"
    fontSize: "clamp(1.6875rem, 1.357rem + 1.408vw, 2.625rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  titulo-3:
    fontFamily: "Geist"
    fontSize: "clamp(1.6875rem, 1.555rem + 0.5634vw, 2.0625rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  titulo-cartao:
    fontFamily: "Geist"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  guia:
    fontFamily: "Geist"
    fontSize: "clamp(1.0625rem, 0.9745rem + 0.3756vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.45
  corpo:
    fontFamily: "Geist"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  legenda:
    fontFamily: "Geist"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  rotulo:
    fontFamily: "Geist Mono"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
    textTransform: "uppercase"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  secao: "clamp(4rem, 3.296rem + 3.005vw, 6rem)"
  titulo-conteudo: "clamp(2rem, 1.648rem + 1.502vw, 3rem)"
  grade: "clamp(1.5rem, 1.324rem + 0.7512vw, 2rem)"
motion:
  curva-saida: "cubic-bezier(0.22, 1, 0.36, 1)"
  curva-abre: "cubic-bezier(0.625, 0.05, 0, 1)"
  curva-percurso: "cubic-bezier(0.65, 0, 0.35, 1)"
  curva-padrao: "ease"
  duracao-curta: "200ms"
  duracao-media: "350ms"
  duracao-abre: "500ms"
  duracao-revela: "900ms"
---

# DESIGN.md · V2O5 Vendas e Tecnologia

Sistema visual do redesign 2026 (branch `redesign-2026`), decidido em 19/10/2026. Cobre paleta, escala tipográfica, ritmo de espaçamento e movimento. Não cobre layout, componentes, raios e sombras: esses saem do texto de `content/` e das regras de `design/nao-pode-quebrar.md`, página por página.

## De onde vem cada coisa

Três referências passaram pelo Dembrandt em 19/10/2026 (saídas completas em `design/referencias/dembrandt/`):

| Papel | Referência | O que foi medido |
|---|---|---|
| A, escala tipográfica e espaçamento | [ITSUA](https://itsua.com/) | 58 estilos de texto, 20 valores de espaçamento frequentes, 4 breakpoints |
| B, curvas de movimento | [Joshgrafik](https://www.joshgrafik.com/) | 10 durações, 5 curvas, contexto de cada transição |
| Conferência | [Checkpoint Research](https://www.checkpointresearch.ca/) | 43 estilos de texto e o espaçamento, para conferir a escala num site de consultoria |

Regras do pedido: nenhuma paleta, fonte ou layout vem das referências. A paleta sai das cores da marca (`memory/context/marca.md`, `src/lib/tokens.ts`); as fontes continuam Geist e Geist Mono. Das referências vêm só proporções, ritmos e curvas, e cada um traz abaixo o valor medido e o que mudou.

Base escolhida pelo Dyones em 19/10/2026: **clara, com o papel como fundo**. Isso troca a direção escura de 09/10 (registro em `memory/decisoes.md`).

## Cores

Nenhuma referência. Tudo parte da tabela da marca; o que muda é o papel de cada cor, porque a base passa de escura para clara. Contrastes medidos pela fórmula do WCAG 2 (`design/ferramentas/contraste.py`).

| Token | Hex | Uso | Contraste medido | Origem e o que mudou |
|---|---|---|---|---|
| `fundo` | #F2F1EC | fundo da página | (base) | `papel` da marca. Era a cor do texto sobre a tinta; a marca já o previa para "seções de leitura" e agora ele é o fundo inteiro. |
| `fundo-cartao` | #FAF9F5 | cartões, formulário, tabelas | texto 17,50:1; secundário 6,24:1; âmbar-texto 5,84:1 | Novo, derivado do papel, um tom mais claro. Separa o cartão do fundo sem sombra. |
| `fundo-alternado` | #E8E6DF | seção alternada, para ritmo entre seções | texto 14,76:1; secundário 5,27:1; âmbar-texto 4,93:1 | Novo, derivado do papel, um tom mais escuro. Substitui a troca entre tinta e papel, que era o ritmo da direção escura. |
| `texto` | #121418 | texto, títulos, ícones | 16,30:1 sobre o fundo | `tinta` da marca. Era o fundo; vira o texto. |
| `texto-secundario` | #5A5D66 | texto de apoio, legendas, a parte "apagada" dos títulos | 5,82:1 sobre o fundo | `secundário (claro)` da marca, sem mudança. |
| `linha` | #D6D4CC | separadores e fios da grade | 1,31:1 (decorativa) | `régua` da marca. Só decoração: nunca é a única borda de um controle. |
| `linha-campo` | #7A7972 | borda de campo de formulário, caixa de seleção, controle | 3,86:1 sobre o fundo; 4,15:1 sobre o cartão | Novo. O WCAG pede 3:1 para a borda de controles, e a régua não chega lá. |
| `acao` | #F2A516 | preenchimento do botão principal, ponto âmbar do logo | texto sobre ele 8,93:1; contra o fundo 1,83:1 | `âmbar V⁵⁺` da marca, que continua sendo a cor da ação. Sobre a tinta ele brilhava sozinho; sobre o papel some (1,83:1), por isso o botão ganha a `acao-borda`. Nunca é texto sobre o claro. |
| `acao-borda` | #8A5600 | borda de 1 px do botão âmbar | 5,44:1 contra o fundo | `âmbar texto` da marca, num papel novo: desenhar a borda do botão. |
| `acao-texto` | #8A5600 | link, o "IA" da assinatura, contorno de foco (2 px) | 5,44:1 sobre o fundo; 5,84:1 sobre o cartão | `âmbar texto` da marca, sem mudança de valor. |
| `etapa-atracao` | #6B46C8 | etapa site e atração em diagramas e etiquetas | 5,57:1 como texto sobre o fundo e com o papel por cima | `violeta V²⁺` da marca. Na base escura precisava da versão `-claro` para texto; sobre o papel o valor original serve para texto e traço. |
| `etapa-atendimento` | #17773F | etapa atendimento com IA | 4,96:1 | `verde V³⁺` da marca. Passa no AA com folga pequena: em texto, só a partir do tamanho da `legenda`. |
| `etapa-crm` | #2457C5 | etapa CRM | 5,72:1 | `azul V⁴⁺` da marca, como o violeta. |
| `faixa-escura` | #121418 | rodapé e no máximo uma seção por página | papel 16,30:1; âmbar 8,93:1; secundário 8,12:1 | `tinta` com `papel`, `âmbar` e `secundário (escuro)`. A direção escura de 09/10 sobrevive como faixa de contraste, não como fundo do site. As cores `-claro` das etapas ficam só aqui. |
| `erro` | #B3261E | mensagem de erro de formulário | 5,78:1 sobre o fundo; 6,20:1 sobre o cartão | Novo e fora da marca, funcional. Substitui o `rgb(255 150 130)` do formulário atual, que só funcionava sobre o escuro. |

Regras que continuam: violeta, verde e azul aparecem só em diagramas e etiquetas, na ordem das etapas (atração, atendimento, CRM, venda em âmbar). Âmbar é ação e sinal, não decoração. Sem degradê no texto e sem mancha de luz borrada no fundo (vícios marcados pelo Genjutsu na linha de base).

Para aplicar: `src/lib/tokens.ts`, o `@theme` de `src/app/globals.css` e os pares de `tests/contraste.test.ts` mudam juntos, como hoje.

## Tipografia

Famílias: **Geist** (títulos 600, texto 400) e **Geist Mono** (rótulos). Nenhuma das referências usa Geist: a ITSUA usa Space Grotesk e Berkeley Mono, o Joshgrafik usa Suisse Intl, a Checkpoint usa Unbounded, JetBrains Mono e Doto. Pela regra do pedido, nenhuma entra; a escala muda, a fonte não.

### A escala

**Origem (A, ITSUA).** Os tamanhos medidos formam uma escala de terça maior, razão 1,25: corpo 16 px, depois 20, 24, 30, 40, 60, 72, 96, 120 e 150 px (cada par vizinho se divide em 1,2 a 1,25). A Checkpoint, medida para conferir, segue a mesma razão: 15,9, 19,9, 31,9, 39,8, 79,7 e 99,6 px. Dois sites de serviço com tipografia forte chegaram à mesma proporção, por isso ela fica.

**O que mudou.**
- Base 17 px no lugar de 16. É o corpo atual da V2O5: o português tem palavras mais longas e quem lê é o dono, quase sempre no celular. Os passos viram 13,6 · 17 · 21,2 · 26,6 · 33,2 · 41,5 · 51,9 · 64,8 · 81,1 · 101,3 · 126,7 px, arredondados para o pixel inteiro.
- Topo da escala dois passos abaixo. A ITSUA abre com 150 px porque o título dela tem três palavras; o H1 da V2O5 tem 60 caracteres ("Coloque sua empresa no mapa e multiplique a operação com IA.") e é o LCP. Vai até 81 px.
- Tamanho fluido entre 375 e 1440 px de largura com `clamp()`, no lugar dos saltos por breakpoint.
- Peso 600 nos títulos, não o 500 da ITSUA: é o peso da marca desde 09/10, com o espaçamento fechado já calibrado.
- Entrelinha nunca abaixo de 1. A ITSUA usa 0,94 nos títulos grandes; em português o til e a cedilha de uma linha batem na de cima.

| Token | 375 → 1440 px | Peso | Entrelinha | Espacejamento | Uso | Medido na ITSUA |
|---|---|---|---|---|---|---|
| `marca` | 65 → 127 | 600 | 0,9 | -0,05em | "V2O5" grande no rodapé | 150 px, 500, 1,0, -0,06em (título de abertura). A entrelinha 0,9 vale só aqui, porque "V2O5" não tem acento. |
| `numero` | 52 → 101 | 600 | 1 | -0,045em | números do case, sempre com a fonte | 96 px, 500, 0,95, -0,035em (título de seção). Algarismos tabulares. Na V2O5 atual (`.numero-grande`) eles vão de 52 a 80 px com texto em degradê, vício que o Genjutsu marcou: ficam maiores e em cor sólida. |
| `titulo-1` | 42 → 81 | 600 | 1 | -0,045em | H1 de cada página | 80 a 88 px, 500, 1,0, -0,03 a -0,06em. O espacejamento -0,045em é o do H1 atual da V2O5, mantido. |
| `titulo-2` | 33 → 52 | 600 | 1,05 | -0,04em | título de seção | 72 px, 500, 1,0, -0,03em. Dois passos abaixo dos 72 da ITSUA: os títulos de seção da V2O5 são frases inteiras, com a continuação em `texto-secundario`, e o texto não muda (`content/`). |
| `destaque` | 27 → 42 | 500 | 1,15 | -0,03em | frase de tese, citação de depoimento, primeira frase de uma seção | 40 px, 500, 1,0, -0,06em, e 30 px, 500, 1,3 (os textos grandes da ITSUA). Fica no 500 para não competir com os títulos. |
| `titulo-3` | 27 → 33 | 600 | 1,1 | -0,025em | título de bloco dentro da seção | 30 px, 500, 1,1, -0,015em |
| `titulo-cartao` | 21 | 600 | 1,2 | -0,02em | título de cartão, pergunta das perguntas frequentes | 19,7 e 23,8 px, 500, 1,05, -0,03em (títulos de cartão). A V2O5 atual usa 20 px; sobe um ponto para cair na escala. |
| `guia` | 17 → 21 | 400 | 1,45 | 0 | texto de abertura logo abaixo do título | 20 px, 400, 1,45, sem mudança de entrelinha |
| `corpo` | 17 | 400 | 1,6 | 0 | texto corrido | 16 px, 400, 1,5. Mais um pixel e entrelinha 1,6, a do site atual, pelo motivo da base 17. |
| `legenda` | 14 | 400 | 1,5 | 0 | legenda, fonte de número, nota de rodapé | 14 px, 400, 1,6, e 13 px, 400, 1,5 |
| `rotulo` | 12 | 500 (mono) | 1,4 | +0,08em, caixa alta | rótulo que informa ("exemplo", "demonstração", nome da seção) | 11 a 13 px em mono, +0,02em. Sobe de 11 (atual) para 12 por legibilidade no celular; o espacejamento +0,08em é a regra da marca e fica, contra os +0,02em da ITSUA. Os rótulos de 8 a 9 px que a ITSUA espalha pela grade não entram. |

## Espaçamento

**Origem (A, ITSUA).** Tirando os valores fracionários de elementos escalados (2,14, 6,43 e 17,15 px, de cartões inclinados), os espaçamentos mais usados são 6, 10, 12, 16, 18, 20, 24, 32, 64 e 72 px: quase todos múltiplos de 4, com salto de 32 para 64. Os maiores, 64 e 72 px, separam blocos grandes. A Checkpoint trabalha em múltiplos de 19,92 px (19,92, 39,84, 99,6 e 199,2 px) e separa seções com cerca de 100 px.

**O que mudou.**
- Unidade de 4 px, sem os 6, 10, 18 e 20 da ITSUA, que saem da grade. Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Passo novo de 48 px entre 32 e 64: a ITSUA salta direto, e a V2O5 precisa de um intervalo para o espaço entre o título da seção e o conteúdo.
- Seção com 64 px no celular, como a ITSUA, e 96 px no desktop, entre os 72 da ITSUA e os 100 da Checkpoint: as seções da V2O5 levam mais texto e títulos de duas frases e pedem mais respiro. O site atual usa de 80 a 96 px no celular e de 112 a 144 px no desktop; fica mais compacto no desktop.
- Breakpoints sem mudança: a ITSUA quebra em 640 e 768 px, os mesmos `sm` e `md` do Tailwind que o site já usa.

| Token | Valor | Uso | Medido na ITSUA |
|---|---|---|---|
| `1`, `2` | 4, 8 px | ícone e texto, rótulo e título | 6 px (110 usos), arredondado para a grade |
| `3` | 12 px | padding vertical do botão, espaço entre itens de lista | 12 px (118 usos); o botão medido tem padding de 12 × 18 px |
| `4` | 16 px | entre parágrafos, padding de campo | 16 px (102 usos) |
| `6` | 24 px | padding interno de cartão | 24 px (51 usos) |
| `8` | 32 px | entre cartões no desktop | 32 px (43 usos) |
| `12` | 48 px | título da seção ao conteúdo, no desktop | não existe na ITSUA (passo novo) |
| `16` | 64 px | seção no celular | 64 px (19 usos) |
| `24` | 96 px | seção no desktop | 72 px (13 usos) na ITSUA; 99,6 px na Checkpoint |
| `secao` | 64 → 96 px | padding vertical de cada seção | combinação dos dois acima |
| `titulo-conteudo` | 32 → 48 px | do título da seção ao primeiro bloco | |
| `grade` | 24 → 32 px | espaço entre cartões e colunas | |

O botão fica com 12 × 20 px de padding (os 18 px da ITSUA arredondados para a grade) e altura mínima de 48 px, a área de toque que o site já usa.

## Movimento

**Origem (B, Joshgrafik).** O Dembrandt achou 10 durações e 5 curvas, com uso definido por contexto:

| Contexto no Joshgrafik | Duração | Curva | O que anima |
|---|---|---|---|
| links | 0,25 a 0,4 s | `cubic-bezier(0.22, 1, 0.36, 1)` | padding, fundo, cor, `background-size` |
| botões | 0,25 a 0,35 s | `ease` | cor, gap, `transform`, opacidade |
| mídia | 0,9 a 1,1 s | `cubic-bezier(0.22, 1, 0.36, 1)` | `transform`, opacidade |
| cartões e sanfona | 0,6 s | `cubic-bezier(0.625, 0.05, 0, 1)` | `transform`, `grid-template-rows` |
| título de abertura (`mask-up`) | 1,1 s | `cubic-bezier(0.22, 1, 0.36, 1)` | máscara subindo |
| rolo (`reel-spin`) | 0,8 s, contínuo | `linear` | rotação |

Contagem das curvas: (0.22, 1, 0.36, 1) em 124 transições, (0.625, 0.05, 0, 1) em 85, `ease` em 62, `linear` em 23 e (0.65, 0, 0.35, 1) em 4.

### Curvas

| Token | Valor | Uso na V2O5 | Origem e o que mudou |
|---|---|---|---|
| `curva-saida` | `cubic-bezier(0.22, 1, 0.36, 1)` | bloco ou imagem entrando ao rolar, sublinhado de link, seta do botão | A curva de links, mídia e abertura do Joshgrafik, sem mudança. Substitui a `--ease-saida` atual (0.23, 1, 0.32, 1), da mesma família e com diferença invisível: fica um valor só, o medido. |
| `curva-abre` | `cubic-bezier(0.625, 0.05, 0, 1)` | pergunta frequente abrindo, troca de aba da demonstração, painel do diagrama | A curva de cartões e sanfona do Joshgrafik: começa devagar e termina decidida, o que dá peso a "abrir". Mudou a duração (abaixo). |
| `curva-percurso` | `cubic-bezier(0.65, 0, 0.35, 1)` | o pulso que percorre o diagrama de uma peça a outra | A quinta curva do Joshgrafik (4 usos), simétrica, para movimento de um ponto a outro. Substitui a `--ease-movimento` atual (0.645, 0.045, 0.355, 1), praticamente igual. Nunca em repetição infinita. |
| `curva-padrao` | `ease` | troca de cor em botão e link | A curva dos botões do Joshgrafik, sem mudança. |

### Durações

Quatro, no lugar das 13 que o Genjutsu contou no código atual (um sistema desenhado tem de três a cinco).

| Token | Valor | Uso | Origem e o que mudou |
|---|---|---|---|
| `duracao-curta` | 200 ms | cor, borda, sublinhado | Links do Joshgrafik a partir de 250 ms. Desce para 200 ms: troca de cor não precisa de mais, e o menu e o rodapé têm muitos links. |
| `duracao-media` | 350 ms | seta do botão, botão pressionado, cartão em foco | Botões do Joshgrafik entre 250 e 350 ms e links até 400 ms; fica o valor do meio que mais aparece nos dois. |
| `duracao-abre` | 500 ms | pergunta, aba, painel | Cartões e sanfona do Joshgrafik em 600 ms. Desce para 500 ms: o dono abre a pergunta para ler a resposta na hora, e com o começo lento da `curva-abre` 600 ms pesa quando se abre várias seguidas. |
| `duracao-revela` | 900 ms | bloco ou imagem entrando ao rolar, uma vez por bloco | Mídia do Joshgrafik entre 900 ms e 1,1 s. Fica o menor valor. |

### O que não entra do Joshgrafik

- **A máscara do título de abertura** (`mask-up`, 1,1 s). O H1 é o LCP e a promessa de performance do site: ele aparece pronto, sem animação.
- **A rotação contínua em `linear`** (`reel-spin`). Sem animação infinita: o Genjutsu marcou "animação que nunca para" na linha de base, e o digitando e o fluxo do terminal atual também saem.
- **Animar `padding` em link.** Muda o layout a cada passagem do mouse. Na V2O5 anima só `transform`, opacidade, cor e `background-size`; a exceção é `grid-template-rows` na sanfona, que é o próprio abrir.

### Da V2O5, sem referência

- A mola em `linear()` (`--ease-mola`), que hoje devolve o ímã dos botões e a luz do cursor. O Joshgrafik não tem equivalente e as duas peças eram da direção escura. Fica fora do sistema; volta só se um componente novo pedir, com justificativa.
- **Menos movimento desliga tudo.** Com `prefers-reduced-motion: reduce`, as quatro durações vão a zero e nada entra deslocado. Regra do projeto, travada em `tests/movimento.test.tsx`.
- **Movimento carrega por seção.** Nenhuma biblioteca de animação no carregamento inicial; cada seção traz o seu movimento quando chega perto da tela.

## Fora deste arquivo

- Layout, grade de colunas, componentes, raio e sombra. As referências mostram ideias de estrutura (`design/referencias/README.md`), mas a regra deste pedido foi não copiar layout. Cada página se monta com o texto de `content/` e os contratos de `design/nao-pode-quebrar.md`.
- Hero, diagrama e demonstração da home: mudam de pele com a base clara e de curva com este arquivo, e a forma deles se decide no redesign da home.
