# Handoff: reels e carrosséis no foco em pequenos negócios (25/11/2026)

**Para quem:** a sessão que implementa os reels e os carrosséis, no [PR #52](https://github.com/85dyones/v2o5/pull/52) (branch `claude/affectionate-albattani-iihs6y`).

**De onde vem:**
- A decisão do Dyones de 25/11 (`docs/2026-11-25-foco-pequenos-negocios.md`), que está no ar desde o PR #58.
- O pedido dele: "crie um handoff para nossa implementação ajustar o conteúdo de reels e carrosseis pras redes sociais, de acordo com o novo posicionamento".

**O que este handoff não faz:**
- Não muda o método do PR #52. Lotes, leitura, UTM, padrão v2 dos vídeos e gerador dos carrosséis continuam iguais.
- Muda o que os vídeos e as lâminas **dizem**.

## Execução (25/11/2026, mesma sessão)

O Dyones respondeu às quatro decisões: D1, "quero o melhor para este novo posicionamento"; D2, "altere para o posicionamento atual"; D3, "perfeito, fazemos isso"; D4, "combinado". Feito na branch `claude/kind-tesla-eefroe`, que trouxe o PR #52 por merge (o PR #52 pode ser fechado depois do merge desta):
- Promessa "Descubra onde seu negócio perde cliente. Gratuitamente." no `/diagnostico` (título, sobretítulo "Diagnóstico gratuito", passos, formulário sem "Rever a marca"), no fecho das páginas, nos CTAs dos cases e na vitrine (PR #13 de `v2o5-diagnosticos`). Mensagem automática ao lead no n8n: rascunho `72b8cf62` do fluxo "V2O5 · Lead do diagnóstico", a publicar com o merge.
- Fixos 1, 2 e 3 refeitos (`docs/social/posts-fixos.md`), para 27, 28 e 29/11.
- Os 25 reels no texto novo (`video/v2.json`, `video/cenas.json`, `docs/reels/lote-1.csv`, `docs/reels/lote-1-v2.md`), com L1-09 (Google), L1-12 (avaliação) e L1-23 (recompra) novos; telas regravadas; lote renderizado como `L1-XX-v3.mp4`.
- Carrosséis de dor (D1 a D10, com `dor-site-sem-whatsapp`, `dor-recompra` e `dor-avaliacoes` novos), "Atendimento com IA, por dentro" no lugar do Sprint, agenda da semana 1 regerada (L1-09 e L1-12 entram no sábado de Presença; L1-04 e L1-24 vão para 08/12).
- Ficha do produto, prompts, calendário, cronograma e notas de histórico nos arquivos antigos.

## 0. Antes de tudo: o que está marcado para sair

1. **Os três carrosséis fixos estavam marcados para 26, 27 e 28/11** (`docs/reels/calendario-misto.md`, `docs/social/posts-fixos.md`). Os fixos 1 e 2 vendem o Sprint de Eficiência e "o gargalo da sua empresa", e se apresentam como "consultoria on-line para pequenas e médias empresas". **Não publicar como estão.** O fixo 3 (case Motors) precisa de ajuste menor (seção 4).
2. **Perguntar ao Dyones o que da sequência de fundação (21 a 26/11) já foi ao ar.** Post publicado que fale de Sprint, gargalo, tráfego, Branding ou Presença Assistida é arquivado, sem apagar (regra de `docs/social/perfis.md`).
3. **Nova data dos fixos (recomendação):** um dia depois, na mesma ordem.
   - Sexta 27/11: fixo 3.
   - Sábado 28/11: fixo 2.
   - Domingo 29/11: fixo 1, e fixar os três.
   - O lote 1 segue em 01/12. Se os fixos novos não estiverem aprovados até sábado, o lote 1 começa sem eles. Fixo atrasado é melhor que fixo errado no topo do perfil.

## 1. O que mudou em 25/11 (o resumo que o texto precisa refletir)

| Assunto | Antes (o que está no PR #52) | Agora (fonte) |
|---|---|---|
| Quem é a V2O5 | "consultoria on-line que ajuda pequenas e médias empresas a vender e operar com menos atrito" | "A V2O5 digitaliza pequenos negócios": coloca o negócio no mapa e cuida de cada cliente que chega (`CLAUDE.md`, decisão de 25/11) |
| Para quem | dono ou gestor de PME, qualquer segmento | negócio local que vende pelo WhatsApp e vive de recompra; revenda de veículos é exemplo e case, não o público |
| Título do site | "Do problema ao resultado, pelo caminho mais simples." | "Coloque seu negócio no mapa e cuide de cada cliente que chega." |
| Assinatura | "V2O5 \| Eficiência comercial e operacional com tecnologia." | "V2O5 \| Digitalização para pequenos negócios." |
| Soluções | Presença, Sites e **Sprint de Eficiência** (a partir de R$ 3.900, Avançado R$ 12.900) | Presença Digital Local, Sites & Integrações e **Atendimento com IA** (Essencial a partir de R$ 3.900, Integrado a partir de R$ 6.900), com a Continuidade opcional |
| Presença | Essencial, Estruturada e **Assistida** (R$ 1.990 + R$ 890/mês) | Essencial (R$ 790 + R$ 390/mês opcional) e Estruturada (R$ 1.490 + R$ 490/mês opcional). A Essencial ganhou o **pedido de avaliação no Google** (link direto e mensagem pronta para quem comprou) |
| Diagnóstico | "acha o gargalo", "Diagnóstico de Gargalo" | 45 minutos com o fundador. A pergunta do método em `/sobre` é "O que pesa mais hoje: ser achado, responder ou fazer o cliente voltar?" |
| Como um projeto anda | seis passos, "do processo real à próxima decisão" | quatro passos: Diagnóstico, Proposta, Implantação e Acompanhamento (`src/conteudo/sobre.ts`, `metodo`) |
| Motors | site, agente, rastreamento até o anúncio, Meta e Google contando a conversão | sem anúncio: site ligado ao estoque, o Ney atendendo e qualificando, lead no CRM do Revenda Mais (`src/conteudo/case.ts`) |
| Rotas | `/sprint-de-eficiencia`, `/rastreamento-de-conversoes` | 301 para `/agente-de-ia-para-whatsapp` e `/criacao-de-sites`. Nenhum post aponta para as rotas antigas |

**Valores que nunca mais aparecem:** R$ 1.990, R$ 890/mês e R$ 12.900. Todo "R$" sai de `src/conteudo/ofertas.ts`. O `sprint.ts` não existe mais no `main`.

**Vocabulário.** O dono de pequeno negócio fala "cliente", "conversa", "WhatsApp", "Google", "avaliação", "voltar a comprar". Saem do texto público:
- gargalo, eficiência, operação, processo, funil, fluxo, Sprint;
- rastreamento, anúncio, origem com UTM;
- "lead" (troque por cliente ou contato);
- "CRM" (troque por lista de clientes; só fica onde o exemplo é a Motors).

## 2. Decisões do Dyones antes de produzir (com recomendação)

**D1. Promessa única dos reels e do `/diagnostico`.**
- A frase de 17/11, "Descubra onde sua empresa pode funcionar melhor. Gratuitamente.", é do posicionamento de eficiência.
- **Recomendo a troca mínima, na voz dele: "Descubra onde seu negócio perde cliente. Gratuitamente."** Ela cobre as duas metades: quem não acha o negócio e quem é mal atendido.
- O resto da página:
  - subtítulo: "Em 45 minutos, vemos como o cliente acha o seu negócio e como ele é atendido, e recomendamos por onde começar.";
  - botão "Pedir diagnóstico gratuito" e microtexto "Sem custo e sem compromisso de contratação.", como estão.
- Alternativa: manter a frase de 17/11 trocando só "sua empresa" por "seu negócio".
- A frase escolhida vai, palavra por palavra, para:
  - o título do `/diagnostico`;
  - o `CTA_IG` de `social/carrosseis/agenda-semana1.py`;
  - o `default` do CTA em `video/modelos/reel/index.html`;
  - a ficha do produto;
  - as legendas.

**D2. Sobretítulo do `/diagnostico`.** O `main` ainda diz "Diagnóstico de Gargalo, gratuito" e "Em 45 minutos, qual gargalo atacar primeiro." Recomendo "Diagnóstico gratuito", com o título de D1, no mesmo PR #52, que já mexe nessa página.

**D3. Reels que saem.** Recomendo trocar três reels do lote 1 (L1-09, L1-12 e L1-23, seção 3). Assim os 25 passam a ter o "colocar no mapa", que hoje não aparece em nenhum reel.

**D4. Datas dos fixos.** As do item 0.3.

## 3. Reels do lote 1 (`video/v2.json`, padrão v2)

**Mecânica:**
- Os textos ficam em `video/v2.json` (`hook`, `beats`, `punch`, `compartilhar`).
- As cenas ficam em `video/cenas.json`, e as capas em `video/capas.json`.
- A legenda de cada rede fica em `docs/reels/lote-1-agenda.csv`.
- Nada foi publicado ainda (o lote 1 sai em 01/12). Por isso o reel trocado **reaproveita o código** (L1-09 etc.) e o `utm_content` continua valendo.
- Os textos abaixo são proposta. Antes de renderizar, passam pelo humanizer e pela aprovação do Dyones.

| Reel | Hoje | Ação | O que muda (proposta) |
|---|---|---|---|
| L1-01 | Pediu o preço às 14h02 | manter | nada |
| L1-02 | "Você investe em mais anúncio." | ajustar | Sem anúncio. Gancho: "Você posta todo dia. / [Quem chamou foi respondido?]". Beats com "chamando" no lugar de "chegando". Frase: "Atrair sem responder / é [perder o cliente]." Compartilhar: "Envie para quem posta e não dá conta do WhatsApp" |
| L1-03 | 93 de 100 da Motors | manter | Número e período iguais aos de `case.ts` (93 de 100, mediana de 38 segundos, 21/10 a 17/11/2026) |
| L1-04 | Seu cliente esperou | manter | nada |
| L1-05 | Conversas sem resposta | manter | Conferir a frase "Problema que aparece dá para resolver" (tom de processo). Se trocar: "Conversa que você vê / [dá para responder]." |
| L1-06 | Pedido de diagnóstico, de onde veio? | ajustar | Tirar "pedido de teste" e a tela do formulário da V2O5. Gancho: "Chegou um cliente novo. / [Como ele te achou?]". Beats: Google, Instagram, indicação, a origem anotada na lista de clientes. Frase: "Saber como te acharam / é saber onde [aparecer mais]." Cena "caminho" |
| L1-07 | O agente acolhe, o consultor fecha | ajustar | Frase: "O agente atende. / [Sua equipe] fecha." Manter a regra de passagem humanizada (pendência 41h da branch) |
| L1-08 | O dado chega ao CRM | ajustar | Beats sem "CRM" e sem "Sites e Integrações" como rótulo: "O contato chega [no WhatsApp da equipe]." Frase: "Formulário que chega à equipe / é cliente [com dono]." Compartilhar: "Envie para quem tem site e não sabe quem preencheu" |
| L1-09 | Qual link trouxe esse cliente (UTM) | **trocar** | **Novo, Presença.** Gancho: "Pesquise o nome do seu negócio. / [O horário está certo?]". Beats: o cliente pesquisa num sábado, o horário mostra [fechado], a foto é de [anos atrás], ele vai [no concorrente]. Frase: "Informação errada no Google / é cliente [na porta errada]." Cena de exemplo, com negócio fictício e sem logo do Google |
| L1-10 | O que acontece nos 45 minutos | manter | Conferir os beats contra o D1 |
| L1-11 | Site sem medição | ajustar | Gancho: "Seu site está no ar. / [O cliente acha o seu WhatsApp?]". Frase: "Site que não leva ao WhatsApp / é [vitrine fechada]." |
| L1-12 | De qual anúncio veio o cliente | **trocar** | **Novo, Presença.** Gancho: "Quem comprou e gostou / [avaliou você no Google?]". Beats: cliente satisfeito [não avalia sozinho], ninguém [pediu], um link e uma [mensagem pronta]. Frase: "Avaliação que ninguém pede / [não chega]." Liga ao item novo da Presença Essencial |
| L1-13 | Formulário, quem viu? | manter | nada |
| L1-14 | Todo mundo pode responder | manter | nada |
| L1-15 | Site novo, problema era outro | ajustar | Frase: "Antes de trocar o site, / veja se o cliente [te acha]." |
| L1-16 | Planilha e WhatsApp manual | manter | Conferir "venda parada" (pode ficar) |
| L1-17 | Preço público | ajustar | Beat do Sprint vira "Atendimento com IA: a partir de [R$ 3.900]." Valores de `ofertas.ts`. A cena `L1-17` de `cenas.json` (itens "Presença digital, Site integrado, Sprint de eficiência") vira Presença, Sites e Atendimento com IA |
| L1-18 | CRM é um caderno? | ajustar | Gancho: "Sua lista de clientes / [ainda é um caderno?]". Abre o assunto da recompra |
| L1-19 | Mesma pergunta de novo | manter | nada |
| L1-20 | Digitou a venda três vezes | manter | Liga ao Atendimento Integrado (integração com o sistema que a empresa já usa) |
| L1-21 | 45 minutos para achar o que trava a venda | ajustar | Gancho: "45 minutos para ver / onde seu negócio [perde cliente]." Beats sem "gargalo": "Ele vê o que [pesa mais]: ser achado, responder ou fazer o cliente voltar." Frase: "Um ponto, / [uma recomendação]." |
| L1-22 | O que a V2O5 olha numa empresa | ajustar | Gancho: "O que a V2O5 olha primeiro / [num pequeno negócio]." Beats: como o cliente [te acha], quem [responde], para onde vai o [contato], quem [volta a comprar]. Compartilhar sem "funil" |
| L1-23 | Mapear a empresa inteira? | **trocar** | **Novo, recompra.** Gancho: "Ele comprou em março. / [Alguém chamou de novo?]". Beats: comprou e [gostou], ninguém [lembrou dele], o concorrente [lembrou]. Frase: "Cliente que ninguém chama / [compra de outro]." Só fala de contato de volta com consentimento e dentro das regras do WhatsApp; nada de mensagem em massa. Cena `L1-23` de `cenas.json` ("EXEMPLO · gargalos") refeita |
| L1-24 | Por onde começar? | manter | Beat "o [impacto] desse ponto" pode ficar. Conferir contra o D1 |
| L1-25 | Em 45 minutos, por onde começar | ajustar | Beats sem "gargalos" e sem "como sua empresa funciona": "Vemos como o cliente [te acha] e como é [atendido]." |

**Equilíbrio do lote depois da troca:**
- Colocar no mapa: L1-09, L1-12, L1-15 e L1-06.
- Atendimento: o grosso do lote.
- Recompra: L1-18 e L1-23.
- Site: L1-08, L1-11 e L1-13.
- Diagnóstico: L1-10, L1-21, L1-22, L1-24 e L1-25.

Os cinco ângulos do plano (dor, demonstração, erro comum, contra o jeito antigo, bastidor) continuam. A leitura de 06/12 compara os ângulos sem mudança de regra.

**Também no vídeo:**
- O `default` do CTA final em `video/modelos/reel/index.html` usa a promessa de D1.
- O final animado com "Vendas e Tecnologia" fica.
- Renderizar só os reels alterados, primeiro em rascunho (`--draft --so ...`). O Dyones aprova, e só então sai a versão final (`video/README.md`).
- A trilha de cada reel trocado sai de `docs/reels/musica-por-reel.md`, no mesmo rodízio.

## 4. Carrosséis (`social/carrosseis/`, gerador `gerar.mjs`)

**Fixos** (`conteudo-fixos-v2.json` e as legendas de `docs/social/posts-fixos.md`):
- **Fixo 1, O que fazemos:**
  - Capa nova: "Quanto custa colocar seu negócio no mapa? Aqui o preço aparece."
  - "Para quem é": o negócio local que vende pelo WhatsApp.
  - Três frentes, cada uma na cor da etapa: Presença em verde (R$ 790), Sites em azul (R$ 2.900) e Atendimento com IA em âmbar (a partir de R$ 3.900, Integrado a partir de R$ 6.900). Depois, a Continuidade opcional (R$ 349/mês).
  - Chamada com a promessa de D1.
  - Legendas: "A V2O5 digitaliza pequenos negócios", no lugar de "consultoria on-line para pequenas e médias empresas".
- **Fixo 2, Como trabalhamos:**
  - Os quatro passos de `sobre.ts`, no lugar dos seis.
  - O diagnóstico olha como o cliente acha o negócio (Google, redes, site) e como é atendido no WhatsApp, no lugar de "presença, atendimento, operação e funil".
  - Fica o "o que o diagnóstico não inclui".
  - A lâmina "Três soluções" com os nomes novos.
- **Fixo 3, Case Motors:**
  - Capa igual (93 de 100).
  - Em "O que a V2O5 montou", tirar rastreamento e qualquer menção a anúncio, Meta ou Google Ads.
  - Números só os de `src/conteudo/case.ts`, com o período: 237 leads de 05/09 a 17/11, 113 de 131 ligados ao veículo, 148 veículos sincronizados, 125 clientes atendidos pelo Ney desde 21/10, 93 de 100 com mediana de 38 segundos, 37 leads qualificados entregues ao CRM desde 04/11.
  - **Saem da ficha e das lâminas** "129 de 131 com `event_id`" e "103 de 131 com UTM", que eram números de rastreamento de anúncio.
  - "O que dá para levar": responder rápido, passar para a pessoa certa, o contato registrado. Fala de pequeno negócio, não de revenda.

**Dores** (`conteudo-dores-v2.json` e o banco D1 a D9 de `docs/reels/calendario-misto.md`):
- `dor-lead-esfria` (D7) e `dor-sistemas-separados` (D8): a lâmina de solução passa de Sprint de Eficiência para **Atendimento com IA**. A cor da capa continua âmbar, que agora é a etapa do Atendimento. Nas escalas, "gargalo claro" e "fluxo precisa ser redesenhado" viram frases do dono. Por exemplo: "Você perde cliente na espera." e "Vale organizar o WhatsApp e pôr um agente para responder."
- `dor-site-sem-medicao` (D5): a capa "Você investe no anúncio. Sabe quem clicou e o que viu?" sai. Vira o D5 do calendário: "O seu site está no ar. As cinco perguntas que ele deveria responder." (horário, endereço, preço, como chamar no WhatsApp, prova). A solução continua Sites & Integrações.
- `dor-formulario`, `dor-google` e `dor-perfil-parado`: manter. Conferir que nenhuma lâmina cita a Assistida ou "rotina de conteúdo" fora da mensalidade da Estruturada.
- **D9** ("Cinco sinais de que um processo da sua empresa pede um Sprint") sai. Entram dois, no mesmo molde do autoteste:
  - **D9, "Quem comprou uma vez e não voltou"**: solução Atendimento com IA, contato de volta só com consentimento;
  - **D10, "Quantas avaliações você pediu este mês?"**: solução Presença Digital Local, pedido de avaliação.
- O banco passa a ter Presença em D1 a D3 e D10, Sites em D4 a D6 e Atendimento em D7 a D9.

**"Por dentro"** (`conteudo-semana1.json`):
- `sprint-por-dentro` vira **`atendimento-por-dentro`**: "Atendimento com IA, por dentro." Usar `resolve`, `recebe`, os dois pacotes, `fora` e `regras` da oferta `ATENDIMENTO` em `ofertas.ts`. A regra "IA e mensagens pelo valor do provedor" vai numa lâmina de limites.
- `presenca-por-dentro`: sem a Assistida e com o pedido de avaliação.
- `diagnostico-diferencial`: "Um gargalo priorizado e um próximo passo." vira "O ponto que mais pesa e um próximo passo."

**Entradas antigas.** Recomendo apagar dos JSON as entradas que saíram:
- `sprint-por-dentro`;
- as versões v1 de `o-que-fazemos`, `como-atuamos` e `case-motors` em `conteudo.json`.

O motivo: `gerar.mjs` junta os quatro arquivos e continuaria gerando PNG com Sprint. O histórico fica no git.

## 5. Legendas, agendas e documentos da branch

- **Legendas:**
  - Refazer as de `docs/reels/lote-1-agenda.csv`, de onde `agenda-semana1.py` gera `semana-1-agenda.md` e `.csv`.
  - Trocar o `CTA_IG` (D1).
  - Rodar o script de novo; não editar o `.md` gerado à mão.
- **Hashtags:**
  - A regra de `docs/social/rotina.md` é **até 5**, e as agendas usam 6.
  - Saem: #consultoriaempresarial, #gestaoempresarial, #eficiencia, #pme, #rastreamento, #leads, #gestaodenegocios, #automacaodeprocessos, #produtividade e #diagnosticoempresarial.
  - Entram, conforme o tema: #pequenosnegocios, #negociolocal, #comerciolocal, #whatsappbusiness, #googlemeunegocio, #atendimentoaocliente.
- **LinkedIn:** a mesma troca, no tom de negócio. O perfil e a página seguem `docs/social/perfis.md` do `main`, revisto em 25/11. O `docs/reels/handoff-perfis.md` da branch ainda cita `sprint.ts`, "Consultoria e tecnologia" e "Consultoria empresarial": alinhar a ele.
- **Documentos da branch:**
  - `docs/reels/ficha-do-produto.md`: produto em uma frase, público, dores, oferta, provas sem os números de rastreamento, assinatura nova. A 16ª Vara Cível entra com nome e sem número, como em `rotina.md`, até o Dyones liberar os números do case para as redes.
  - `docs/reels/prompts.md`: ângulos e regras.
  - `docs/reels/calendario-misto.md`: datas dos fixos e banco D1 a D10.
  - `docs/reels/cronograma.md`: a sequência de fundação ainda lista o Sprint.
  - `docs/reels/lote-1-v2.md`: gerado de `video/v2.json`, por `video/scripts/roteiros-v2.py`.
  - `docs/2026-11-17-plano-100-reels-de-teste.md`: é registro da análise. Basta uma nota no topo dizendo que o portfólio mudou em 25/11 e apontando para este handoff.

## 6. Trazer o `main` para a branch (antes de editar)

A branch saiu do `main` de 17/11 (PR #50). Ela não tem nada de 25/11.

- **Como trazer:**
  - Fazer `git merge origin/main` na branch, sem rebase e sem force-push.
  - O PR #52 é de outra sessão, aberto desde 17/11.
- **Conflitos esperados:**
  - **`src/conteudo/diagnostico.ts` e `content/diagnostico.md`:** a branch troca o título e o `main` não. Resolver já com D1 e D2. O `content/` é texto travado: regerar pelo extrator de `design/baseline/ferramentas/` (o mesmo dos PRs #58 e #59), não à mão.
  - **`src/components/diagnostico/Formulario.tsx`:** o microtexto da branch.
  - **`memory/pendencias.md`:** os dois lados criaram uma **pendência 41**. No `main` ela é o foco em pequenos negócios; na branch, os 100 reels. A dos reels vira **42**, com as letras (a) a (h) e as referências "41h" renumeradas.
  - **`memory/decisoes.md`:** as entradas de 18/11 e 24/11 da branch entram na ordem de data, com as de 25/11 do `main`.
- **Depois do merge:**
  - Rodar `npm run lint`, `npx tsc --noEmit` e `npx vitest run`. O `main` tem 368 testes, com `tests/precos-publicos.test.ts` e os testes de conteúdo.
  - O build da Vercel no preview tem que passar antes de pedir o merge.

## 7. Regras que não mudam

- Número só com fonte e período. Do case Motors, só os de `case.ts`. Nada de resultado prometido ("aumente suas vendas").
- Cenário ilustrativo leva a nota "Cena de exemplo", com negócio fictício e sem marca de terceiros (logo do Google, telas copiadas).
- Texto pelo humanizer: sem travessão, sem "não é X, é Y", sem tríade de efeito.
- Contato de volta só com consentimento e dentro das regras do WhatsApp. O agente responde só com o que a empresa aprovou e chama uma pessoa quando não sabe.
- O nome do modelo de IA não aparece em texto público.
- Nada é publicado sozinho: o Dyones aprova cada peça, e publicar é com ele.

## 8. Ordem e critério de pronto

1. Item 0: segurar os fixos e perguntar o que já saiu.
2. Item 6: trazer o `main` e resolver os conflitos; a suíte passa.
3. Decisões D1 a D4 com o Dyones (proposta concreta; ele decide rápido).
4. Fixos: texto, PNG e PDF (`node social/carrosseis/gerar.mjs`) e aprovação. Prazo: sexta 27/11 de manhã.
5. Reels: `video/v2.json`, cenas e capas; rascunho dos alterados; aprovação; versão final.
6. Carrosséis de dor e "por dentro"; agendas regeradas.
7. Documentos da branch e memória (pendência 42).

**Pronto quando:**
- Esta busca só acha menção histórica (decisões, handoffs, notas de "antes de 25/11"), cada uma justificada no PR:
  ```bash
  git grep -nE "Sprint|gargalo|Efici[eê]ncia comercial|pequenas e m[eé]dias|an[uú]ncio|rastreamento|Assistida|1\.990|12\.900|R\$ ?890|sprint\.ts|funcionar melhor" -- docs/reels social video docs/social/posts-fixos.md
  ```
- O título do `/diagnostico` e o CTA dos reels e carrosséis são a mesma frase.
- Os vídeos e as lâminas alterados foram vistos pelo Dyones.
- O lint, os testes e o build passam.
