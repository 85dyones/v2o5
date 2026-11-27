# Os 3 posts fixos: carrosséis para Instagram, Facebook e LinkedIn (versão 3, 25/11/2026)

**O que são.** Três carrosséis de 7 slides que apresentam a V2O5, a forma de trabalhar e a prova.

**Versão 3 (25/11/2026).** Refeitos no foco em pequenos negócios (`docs/2026-11-25-foco-pequenos-negocios.md`, handoff `docs/reels/handoff-foco-pequenos-negocios.md`):
- três soluções: Presença, Sites e Atendimento com IA;
- os quatro passos de `/sobre`;
- o case Motors sem anúncio;
- a promessa "Descubra onde seu negócio perde cliente. Gratuitamente.", igual ao título do `/diagnostico`.

A versão 2, de 18/11, com o Sprint de Eficiência e "o gargalo da sua empresa", não é publicada.

**Fontes.** O texto sai do site: `src/conteudo/ofertas.ts`, `src/conteudo/sobre.ts` e `src/conteudo/case.ts`. Número só com fonte e período.

**Como gerar.** `SO=o-que-fazemos-v2,como-atuamos-v2,case-motors-v2 node social/carrosseis/gerar.mjs`, a partir de `social/carrosseis/conteudo-fixos-v2.json`. A saída fica fora do git, em `social/carrosseis/saida/`.

**Como entregar.** O pacote de entrega renomeia os arquivos para os nomes abaixo.

| Fixo | Carrossel | Arquivos | Papel |
|---|---|---|---|
| 1 | O que fazemos | `fixo-1-o-que-fazemos-01.png` a `-07.png` e `fixo-1-o-que-fazemos.pdf` | Para quem é, as três soluções (ser encontrado, ter o seu site, cuidar de quem chega) com preço de entrada, como começa |
| 2 | Como trabalhamos | `fixo-2-como-trabalhamos-01.png` a `-07.png` e `fixo-2-como-trabalhamos.pdf` | O diagnóstico, o combinado, os quatro passos, os limites e as três soluções |
| 3 | Case Motors Store | `fixo-3-case-motors-01.png` a `-07.png` e `fixo-3-case-motors.pdf` | A prova: 93 de 100 conversas com a primeira resposta em até 1 minuto, o que foi montado (site, agente, CRM) e o que dá para levar |

## Formatos

A chamada final muda por rede, porque cada uma tem um lugar diferente para o link. O pacote vem em três pastas.

- **Instagram (`instagram/`):**
  - 7 imagens PNG 1080x1350 (4:5), na ordem numerada. A chamada é "Link na bio".
  - Publicar como carrossel e fixar os três no perfil (o Instagram permite até 3 fixados).
- **Facebook (`facebook/`):**
  - As mesmas 7 imagens, com a chamada "Peça pelo link na legenda". O link clicável vai na legenda.
  - Publicação com várias fotos na página, e fixar na página.
- **LinkedIn (`linkedin/`):**
  - O carrossel do LinkedIn é o **documento em PDF**: 7 páginas com texto selecionável.
  - A chamada mostra `v2o5.com.br/diagnostico`. O link clicável vai no primeiro comentário, com UTM de LinkedIn.

## Quando publicar (decisão de 26/11)

Dyones, 26/11: "vou soltar os 3 fixos hoje". A agenda completa, com as legendas de cada rede, está em `docs/reels/semana-1-agenda.md`; a semana de reels e carrosséis começa na sexta 27/11 às 09:00.

| Quando | Instagram e Facebook | LinkedIn |
|---|---|---|
| Quinta 26/11 (hoje) | Fixo 1, depois o fixo 2, depois o fixo 3 | Fixo 1 (PDF), junto com o Instagram |
| Sexta 27/11, 10:00 | | Fixo 3 (PDF) |
| Terça 01/12, 10:00 | | Fixo 2 (PDF) |

Depois do terceiro, fixe os três no Instagram na ordem fixo 3, fixo 2 e fixo 1, e confira a grade. No Facebook, fixe o fixo 1 no topo da página. O link da bio de hoje é `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=bio&utm_campaign=posts-fixos&utm_content=fixos`.

Publicação antiga que fale de Sprint, gargalo, tráfego, Branding ou Presença Assistida é arquivada, não apagada (`docs/social/perfis.md`).

## Fixo 1: O que fazemos

**Instagram (legenda)**
```
Quanto custa colocar seu negócio no mapa? Aqui o preço aparece.

A V2O5 digitaliza pequenos negócios que vendem pelo WhatsApp. Coloca o negócio no Google com a informação certa, faz um site que leva o cliente até a conversa e organiza o atendimento com um agente de IA que responde na hora. Cada solução tem escopo fechado e preço de entrada público, e tudo começa por um diagnóstico gratuito de 45 minutos.

Descubra onde seu negócio perde cliente. Gratuitamente.
Link na bio.

#pequenosnegocios #negociolocal #whatsappbusiness #googlemeunegocio #v2o5
```
**Facebook (legenda)**
```
Quanto custa colocar seu negócio no mapa? Aqui o preço aparece.

A V2O5 digitaliza pequenos negócios que vendem pelo WhatsApp. Atende on-line, em todo o Brasil. Três soluções, com escopo fechado e preço de referência público: Presença Digital Local (a partir de R$ 790), Sites & Integrações (a partir de R$ 2.900) e Atendimento com IA (a partir de R$ 3.900). Tudo começa por um diagnóstico gratuito de 45 minutos, sem compromisso de contratação.

Descubra onde seu negócio perde cliente. Gratuitamente.
Peça pelo link: https://www.v2o5.com.br/diagnostico?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-1
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-1-o-que-fazemos.pdf`; título do documento: "V2O5: o que fazemos")**
```
Quanto custa colocar seu negócio no mapa? Aqui o preço aparece.

A V2O5 digitaliza pequenos negócios: faz o cliente encontrar a empresa e faz a empresa atender bem quem chega. Três soluções, cada uma com escopo fechado e preço de referência público: Presença Digital Local (a partir de R$ 790), Sites & Integrações (a partir de R$ 2.900) e Atendimento com IA (a partir de R$ 3.900). Depois do projeto, a continuidade é opcional, a partir de R$ 349 por mês.

Tudo começa por um diagnóstico gratuito de 45 minutos. Descubra onde seu negócio perde cliente. Gratuitamente.

Link no primeiro comentário.

#PequenosNegócios #Atendimento #WhatsApp
```
Primeiro comentário: `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-1`

## Fixo 2: Como trabalhamos

**Instagram (legenda)**
```
Pedir o diagnóstico não obriga você a nada. Veja o que vem depois.

São 45 minutos com o fundador, gratuitos e sem compromisso. A gente vê como o cliente acha o seu negócio e como ele é atendido no WhatsApp. O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado e nenhuma solução que obrigue a seguinte. Um projeto anda em quatro passos, do diagnóstico ao acompanhamento.

Descubra onde seu negócio perde cliente. Gratuitamente.
Link na bio.

#pequenosnegocios #negociolocal #atendimentoaocliente #whatsappbusiness #v2o5
```
**Facebook (legenda)**
```
Pedir o diagnóstico não obriga você a nada. Veja o que vem depois.

São 45 minutos com o fundador, gratuitos e sem compromisso. A gente vê como o cliente acha o seu negócio e como ele é atendido no WhatsApp. O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado e nenhuma solução que obrigue a seguinte.

Descubra onde seu negócio perde cliente. Gratuitamente.
Peça pelo link: https://www.v2o5.com.br/diagnostico?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-2
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-2-como-trabalhamos.pdf`; título do documento: "V2O5: como trabalhamos")**
```
Pedir o diagnóstico não obriga você a nada. Veja o que vem depois.

Primeiro, 45 minutos gratuitos com o fundador. A pergunta é o que pesa mais hoje no negócio: ser achado, responder ou fazer o cliente voltar. O diagnóstico não inclui implantação nem acompanhamento de resultados. Se fizer sentido seguir, a proposta vem por escrito, com escopo, prazo e investimento; se não fizer, a conversa termina ali.

O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado, nenhuma solução que obrigue a seguinte e nenhuma promessa de percentual de resultado. Um projeto anda em quatro passos: diagnóstico, proposta, implantação e acompanhamento.

Descubra onde seu negócio perde cliente. Gratuitamente.
Link do diagnóstico gratuito no primeiro comentário.

#PequenosNegócios #Atendimento #Diagnóstico
```
Primeiro comentário: `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-2`

## Fixo 3: Case Motors Store

**Instagram (legenda)**
```
93 de 100 conversas com a primeira resposta em até 1 minuto. A mediana é de 38 segundos.

É o que o agente de IA da Motors Store, revenda de seminovos em Curitiba, registrou no WhatsApp entre 21/10 e 17/11/2026 (conversas lidas no banco de dados da loja). A V2O5 montou o site de estoque ligado ao sistema da loja, o agente que atende e preenche a ficha, a passagem do cliente ao CRM e as automações.

São contagens do sistema, sem número de venda, e a resposta humana não é medida. O resultado é o da Motors; o que cabe no seu negócio, o diagnóstico mostra. O case completo está em v2o5.com.br/cases/motors-store.

Descubra onde seu negócio perde cliente. Gratuitamente.
Link na bio.

#atendimentoaocliente #whatsappbusiness #inteligenciaartificial #pequenosnegocios #v2o5
```
**Facebook (legenda)**
```
93 de 100 conversas com a primeira resposta em até 1 minuto, mediana de 38 segundos: o que o agente de IA da Motors Store registrou no WhatsApp entre 21/10 e 17/11/2026. A V2O5 montou o site de estoque ligado ao sistema da loja, o agente que atende e preenche a ficha, a passagem do cliente ao CRM e as automações.

São contagens lidas no banco de dados da loja, sem número de venda, e a resposta humana não é medida. O resultado é o da Motors. Case completo: https://www.v2o5.com.br/cases/motors-store?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3

Descubra onde seu negócio perde cliente. Gratuitamente.
Peça pelo link: https://www.v2o5.com.br/diagnostico?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-3-case-motors.pdf`; título do documento: "V2O5: case Motors Store")**
```
93 de 100 conversas com a primeira resposta em até 1 minuto, mediana de 38 segundos. É o que o agente de IA da Motors Store, revenda de seminovos em Curitiba, registrou no WhatsApp entre 21/10 e 17/11/2026.

A V2O5 montou o site de estoque ligado ao Revenda Mais, o agente que atende e preenche a ficha, a passagem do cliente pronto ao CRM e as automações, na mesma base de dados. O banco da loja mostra 237 contatos de 05/09 a 17/11/2026 e, desde 21/10, 125 clientes atendidos pelo agente; desde 04/11, 37 contatos qualificados entregues ao CRM.

Os números são contagens lidas no banco de dados da loja em 17/11/2026. Não incluem vendas, a resposta humana não é medida e o resultado é o da Motors.

Descubra onde seu negócio perde cliente. Gratuitamente.
Diagnóstico e case completo no primeiro comentário.

#Atendimento #WhatsAppBusiness #InteligênciaArtificial
```
Primeiro comentário, nesta ordem: `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3` e `https://www.v2o5.com.br/cases/motors-store?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3`

## Conferências antes de publicar
- **Preços:** os dos slides saem de `src/conteudo/ofertas.ts`. Se mudarem, atualizar `social/carrosseis/conteudo-fixos-v2.json` e gerar de novo.
- **Números do fixo 3:** vêm de `src/conteudo/case.ts` e de `memory/projects/case-motors.md` (leitura de 17/11/2026).
  - A frase é "em até 1 minuto", igual à fonte e ao site.
  - Saíram os números de rastreamento de anúncio (identificador de clique e UTM). Ficam os do site e do estoque (237 e 113 de 131) e os do Ney (125 e 37).
  - Se o case for atualizado, repetir a leitura antes de republicar.
- **Autorização:** o nome, o logo e os números da Motors têm autorização desde 08/10/2026.
- **Hashtags:** até 5 por post, como pede `docs/social/rotina.md`.
- **Texto alternativo:** o Instagram aceita descrição por imagem; a dica é colar o texto do slide.
