## Static audit

Roots: detected: src. 98 file(s) examined.

**18 checked, 0 with findings, 4 tells to confront, 0 not applicable.**

Every line below is evidence, not a verdict. A check listed as not applicable did not
run: report it as not checked, never as passed. This covers none of the items that need
a profiler, a device or a pointer.

**4 tell check(s) fired.** They are listed apart, and none of them is a
problem until it has been confronted with the validated thesis.

### Tells - confront each with the thesis before counting it

A tell is evidence that a default slipped in, not a verdict. For each one, quote the
sentence of the validated thesis that names the pattern (it is then allowed by the
thesis), or count it as a problem. A mood word such as "editorial" names nothing.

**Blurred background blob** (tell-blob)

- `src\app\globals.css:434` - `.cartao-luz::before { background: radial-gradient( 20rem circle at var(--luz-x, 30%) var(--luz-y, 0%), var(--color-ambar), rgb(242 165 22 / 0.18) 40%, transparent 70% ) }`
- `src\app\globals.css:455` - `.cartao-luz::after { background: radial-gradient( 28rem circle at var(--luz-x, 30%) var(--luz-y, 0%), rgb(242 165 22 / 0.06), transparent 60% ) }`
- `src\app\globals.css:557` - `.hero-fundo::after { background: radial-gradient(42rem 30rem at 74% 40%, rgb(242 165 22 / 0.09), transparent 70%), radial-gradient(40rem 28rem at 100% -10%, rgb(107 70 200 / 0.16), transparent 70%), r`
- `src\components\home\Automotivo.tsx:12` - `pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(242_165_22/0.12),transparent)]`
- `src\components\home\Fechamento.tsx:9` - `absolute inset-x-0 bottom-0 h-[38rem] bg-[radial-gradient(60%_70%_at_50%_100%,rgb(242_165_22/0.16),transparent)]`
- `src\components\home\Fechamento.tsx:14` - `absolute inset-0 -m-8 rounded-full bg-[radial-gradient(closest-side,rgb(242_165_22/0.22),transparent)]`
- `src\components\home\orquestrador\Orquestrador.tsx:7` - `pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[40rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(23_119_63/0.12),transparent)]`

**Glassmorphism panel** (tell-glass)

- `src\app\globals.css:523` - `-webkit-backdrop-filter: blur(16px) saturate(150%);`
- `src\app\globals.css:524` - `backdrop-filter: blur(16px) saturate(150%);`
- `src\app\globals.css:1012` - `-webkit-backdrop-filter: blur(0) saturate(100%);`
- `src\app\globals.css:1013` - `backdrop-filter: blur(0) saturate(100%);`

**Gradient-filled text** (tell-gradient-text)

- `src\app\globals.css:207` - `-webkit-background-clip: text;`
- `src\app\globals.css:208` - `background-clip: text;`
- `src\components\layout\Rodape.tsx:99` - `className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(7rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-transparent [background-clip:text] [-webkit-backgro`

**Animation that never stops** (tell-perpetual-motion)

- `src\app\globals.css:960` - `animation: digita 1.3s var(--ease-movimento) infinite;`
- `src\app\globals.css:973` - `animation: fluxo-corre 900ms linear infinite;`

### Checked, nothing found

- **Middle-dot run** - No displayed line strings two or more middle dots together. (61 file(s))
- **One intent under several button labels** - Every call to action intent found uses a single label. (61 file(s))
- **U+2014 (em dash) in displayed text** - No U+2014 (em dash) in the displayed text, as a character or as an entity. (61 file(s))
- **Three equal cards** - No three-column container holds three children with the same class list. (61 file(s))
- **Part number or section code that points to nothing** - No code like SEC-01, REF-204 or MK.I in the displayed text. (61 file(s))
- **Filler verb** - None of the listed filler verbs appears in the displayed text. (61 file(s))
- **Generic step label** - No text starts with Stage, Step, Phase or Pass followed by a number. (61 file(s))
- **Glow or neon shadow** - No shadow with zero offset and a blur of 20px or more. (62 file(s))
- **Invented build or release status** - No version stamp, sync time or build number in the displayed text. (61 file(s))
- **Weather, clock or timezone strip** - No clock, temperature or timezone strip in the displayed text. (61 file(s))
- **Numbered eyebrow or tile pagination** - No zero-padded section number and no `01 / 4` counter in the displayed text. (61 file(s))
- **Placeholder name or brand** - No John Doe, Jane Doe, Acme or lorem ipsum in the displayed text. (61 file(s))
- **Round or unsourced figure** - No 99.9%, 100%, 10,000+ or 10x style figure in the displayed text. (61 file(s))
- **Scroll cue** - No short text telling the visitor to scroll. (61 file(s))

### Inventory

**durations** - 13 distinct value(s). Durations in use. A designed system has three to five. Fifteen is an accident.

- `220ms` x8 - `src\app\globals.css:240`, `src\app\globals.css:246`, `src\app\globals.css:444`, `src\app\globals.css:461`
- `900ms` x4 - `src\app\globals.css:572`, `src\app\globals.css:580`, `src\app\globals.css:973`, `src\app\globals.css:1121`
- `160ms` x2 - `src\app\globals.css:663`, `src\app\globals.css:964`
- `400ms` x1 - `src\app\globals.css:256`
- `150ms` x1 - `src\app\globals.css:313`
- `240ms` x1 - `src\app\globals.css:424`
- `700ms` x1 - `src\app\globals.css:566`
- `260ms` x1 - `src\app\globals.css:624`
- `1300ms` x1 - `src\app\globals.css:960`
- `320ms` x1 - `src\app\globals.css:968`
- `200ms` x1 - `src\app\globals.css:1103`
- `620ms` x1 - `src\components\home\diagrama\DiagramaInterativo.tsx:40`

**easings** - 3 distinct value(s). Easings in use. Same rule: a handful, named, or it is not a system.

- `linear` x29 - `src\app\cases\motors-store\page.tsx:88`, `src\app\globals.css:35`, `src\app\globals.css:36`, `src\app\globals.css:181`, `src\app\globals.css:206`
- `cubic-bezier(0.23, 1, 0.32, 1)` x1 - `src\app\globals.css:33`
- `cubic-bezier(0.645, 0.045, 0.355, 1)` x1 - `src\app\globals.css:34`

**colors** - 115 distinct value(s). Colours written as literal values or palette utilities. No verdict: each one should trace back to a token the design system or the thesis names.

- `#000` x6 - `src\app\globals.css:441`, `src\app\globals.css:442`, `src\app\globals.css:549`, `src\app\globals.css:875`, `src\components\home\Fechamento.tsx:10`
- `rgb(26_29_34/0.7)` x5 - `src\app\cases\motors-store\page.tsx:88`, `src\app\segmentos\revendas-de-veiculos\page.tsx:100`, `src\app\sobre\page.tsx:109`, `src\components\home\CaseMotors.tsx:12`, `src\components\solucoes\PaginaDeSolucao.tsx:106`
- `rgb(18_20_24/0.4)` x5 - `src\app\cases\motors-store\page.tsx:88`, `src\app\segmentos\revendas-de-veiculos\page.tsx:100`, `src\app\sobre\page.tsx:109`, `src\components\home\CaseMotors.tsx:12`, `src\components\solucoes\PaginaDeSolucao.tsx:106`
- `#121418` x3 - `src\app\globals.css:9`, `src\app\layout.tsx:23`, `src\lib\tokens.ts:15`
- `rgb(242 165 22 / 0.6)` x3 - `src\app\globals.css:270`, `src\app\globals.css:836`, `src\app\globals.css:855`
- `rgb(24 27 32)` x3 - `src\app\globals.css:833`, `src\app\globals.css:1084`, `src\components\home\diagrama\DiagramaVisao.tsx:228`
- `rgb(12_13_16/0.35)` x3 - `src\components\home\Garantias.tsx:35`, `src\components\precos\TabelaDePrecos.tsx:322`, `src\components\solucoes\PaginaDeSolucao.tsx:228`
- `#f2f1ec` x2 - `src\app\globals.css:10`, `src\lib\tokens.ts:16`
- `#2a2d34` x2 - `src\app\globals.css:11`, `src\lib\tokens.ts:17`
- `#1a1d22` x2 - `src\app\globals.css:12`, `src\lib\tokens.ts:18`
- `#a9acb4` x2 - `src\app\globals.css:13`, `src\lib\tokens.ts:19`
- `#5a5d66` x2 - `src\app\globals.css:14`, `src\lib\tokens.ts:20`

**radii** - 15 distinct value(s). Corner radii in use. No verdict: compare the spread with the radius scale the design system declares.

- `rounded-full` x57 - `src\app\diagnostico\page.tsx:39`, `src\app\sobre\page.tsx:61`, `src\app\sobre\page.tsx:122`, `src\components\home\Automotivo.tsx:14`, `src\components\home\Automotivo.tsx:39`
- `rounded-2xl` x14 - `src\app\sobre\page.tsx:89`, `src\app\sobre\page.tsx:95`, `src\components\diagnostico\Formulario.tsx:203`, `src\components\home\diagrama\DiagramaVisao.tsx:73`, `src\components\home\orquestrador\OrquestradorVisao.tsx:147`
- `rounded-xl` x14 - `src\components\diagnostico\Formulario.tsx:260`, `src\components\home\Automotivo.tsx:49`, `src\components\home\HeroMolecula.tsx:189`, `src\components\home\orquestrador\OrquestradorVisao.tsx:124`, `src\components\home\Vinhetas.tsx:111`
- `rounded-lg` x10 - `src\components\home\orquestrador\OrquestradorVisao.tsx:125`, `src\components\home\Vinhetas.tsx:164`, `src\components\home\Vinhetas.tsx:207`, `src\components\home\Vinhetas.tsx:213`, `src\components\home\Vinhetas.tsx:268`
- `999px` x8 - `src\app\globals.css:229`, `src\app\globals.css:326`, `src\app\globals.css:350`, `src\app\globals.css:703`, `src\app\globals.css:750`
- `rounded-br-md` x4 - `src\components\home\orquestrador\OrquestradorVisao.tsx:148`, `src\components\home\Vinhetas.tsx:72`, `src\components\home\Vinhetas.tsx:80`, `src\components\home\Vinhetas.tsx:519`
- `rounded-md` x4 - `src\components\home\Vinhetas.tsx:172`, `src\components\home\Vinhetas.tsx:407`, `src\components\home\Vinhetas.tsx:501`, `src\components\layout\Topo.tsx:12`
- `inherit` x2 - `src\app\globals.css:432`, `src\app\globals.css:454`
- `rounded-bl-md` x2 - `src\components\home\orquestrador\OrquestradorVisao.tsx:148`, `src\components\home\Vinhetas.tsx:73`
- `1.25rem` x1 - `src\app\globals.css:378`
- `0.875rem` x1 - `src\app\globals.css:391`
- `1.125rem` x1 - `src\app\globals.css:401`

**fonts** - 7 distinct value(s). Font families named in the code. No verdict: each one should be a family the thesis names, for the reason it gives.

- `font-mono` x5 - `src\components\home\HeroMolecula.tsx:189`, `src\components\home\TerminalDeEventos.tsx:49`, `src\components\home\TerminalDeEventos.tsx:53`, `src\components\home\Vinhetas.tsx:241`, `src\components\solucoes\OQueRegistramos.tsx:50`
- `var(--font-mono)` x2 - `src\app\globals.css:186`, `src\app\globals.css:195`
- `var(--font-geist-sans)` x1 - `src\app\globals.css:30`
- `geist mono` x1 - `src\app\globals.css:31`
- `geist mono reserva` x1 - `src\app\globals.css:47`
- `geist mono reserva consolas` x1 - `src\app\globals.css:56`
- `var(--font-sans)` x1 - `src\app\globals.css:78`

