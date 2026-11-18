# Os 3 posts fixos: carrosséis para Instagram, Facebook e LinkedIn (versão 2, 18/11/2026)

Três carrosséis de 7 slides que apresentam a V2O5, os serviços e a forma de trabalhar, na versão otimizada de 18/11 (capa com gancho, "para quem é", resultado antes do pacote, combinado cedo, case aberto pelo número). Texto tirado do site (`src/conteudo/ofertas.ts`, `sprint.ts`, `content/home.md` e o case Motors); número só com fonte e período; a frase do tempo de resposta fica "em até 1 minuto", como na fonte. A versão 1 foi substituída. Gerados por `node social/carrosseis/gerar.mjs` a partir de `social/carrosseis/conteudo-fixos-v2.json` (saída fora do git, em `social/carrosseis/saida/`).

| Fixo | Carrossel | Arquivos | Papel |
|---|---|---|---|
| 1 | O que fazemos | `fixo-1-o-que-fazemos-01.png` a `-07.png` e `fixo-1-o-que-fazemos.pdf` | Quem somos, para quem é, as três frentes com resultado e preço de entrada, como começa |
| 2 | Como trabalhamos | `fixo-2-como-trabalhamos-01.png` a `-07.png` e `fixo-2-como-trabalhamos.pdf` | O diagnóstico, o combinado, os seis passos, os limites e as três soluções |
| 3 | Case Motors Store | `fixo-3-case-motors-01.png` a `-07.png` e `fixo-3-case-motors.pdf` | A prova: 93 de 100 conversas com a primeira resposta em até 1 minuto, mediana de 38 segundos, e o que dá para levar |

## Formatos
A chamada final muda por rede, porque cada uma tem um lugar diferente para o link. O pacote vem em três pastas.
- **Instagram (`instagram/`):** 7 imagens PNG 1080x1350 (4:5), na ordem numerada. A chamada é "Link na bio". Publicar como carrossel e fixar os três no perfil (o Instagram permite até 3 fixados). Conferir na grade a ordem em que ficam; se sair invertida, desafixar e fixar de novo.
- **Facebook (`facebook/`):** as mesmas 7 imagens, com a chamada "Peça pelo link na legenda" (o link clicável vai na legenda). Publicação com várias fotos na página, e fixar na página.
- **LinkedIn (`linkedin/`):** o carrossel do LinkedIn é o **documento em PDF**: cada página vira uma lâmina que se passa para o lado. O PDF tem 7 páginas, texto selecionável, e a chamada mostra o endereço `v2o5.com.br/diagnostico` em vez de "link na bio". O link clicável vai no primeiro comentário, com UTM de LinkedIn.

## Quando publicar
Quinta 26/11 o fixo 3, sexta 27/11 o fixo 2 e sábado 28/11 o fixo 1; domingo 29/11, fixar os três e trocar o link da bio. Assim ficam na grade do perfil na ordem 1, 2, 3 quando a semana de 01/12 começar. A ordem de fixação (qual aparece primeiro) é uma aposta sem dado: 1 "O que fazemos", depois o case e depois o método; o dado dos primeiros dias diz se muda.

## Fixo 1: O que fazemos

**Instagram (legenda)**
```
Quanto custa resolver o gargalo da sua empresa? Aqui o preço aparece.

A V2O5 é uma consultoria on-line para pequenas e médias empresas, em todo o Brasil. São três frentes, com escopo fechado e preço de entrada público: Presença Digital Local, Sites & Integrações e Sprint de Eficiência. Tudo começa por um diagnóstico gratuito de 45 minutos, sem compromisso de contratação.

Descubra onde sua empresa pode funcionar melhor. Gratuitamente.
Link na bio.

#v2o5 #consultoriaempresarial #pequenasempresas #presencadigital #sitesprofissionais #automacao
```
**Facebook (legenda)**
```
Quanto custa resolver o gargalo da sua empresa? Aqui o preço aparece.

A V2O5 é uma consultoria on-line para pequenas e médias empresas, em todo o Brasil. Três frentes, com escopo fechado e preço de referência público: Presença Digital Local (a partir de R$ 790), Sites & Integrações (a partir de R$ 2.900) e Sprint de Eficiência (a partir de R$ 3.900). Tudo começa por um diagnóstico gratuito de 45 minutos, sem compromisso de contratação.

Descubra onde sua empresa pode funcionar melhor. Gratuitamente: https://www.v2o5.com.br/diagnostico?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-1
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-1-o-que-fazemos.pdf`; título do documento: "V2O5: o que fazemos")**
```
Quanto custa resolver o gargalo da sua empresa? Aqui o preço aparece.

A V2O5 é uma consultoria on-line que ajuda pequenas e médias empresas a vender e operar com menos atrito. Três frentes, cada uma com escopo fechado e preço de referência público: Presença Digital Local (a partir de R$ 790), Sites & Integrações (a partir de R$ 2.900) e Sprint de Eficiência (a partir de R$ 3.900). Depois do projeto, a continuidade é opcional, a partir de R$ 349 por mês.

Tudo começa por um diagnóstico gratuito de 45 minutos. Descubra onde sua empresa pode funcionar melhor. Gratuitamente.

Link no primeiro comentário.

#PequenasEmpresas #Automação #Consultoria
```
Primeiro comentário: `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-1`

## Fixo 2: Como trabalhamos

**Instagram (legenda)**
```
O que acontece depois que você pede um diagnóstico?

São 45 minutos com o fundador, gratuitos e sem compromisso. O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado e nenhuma solução que obrigue a seguinte. O método tem seis passos, do processo real à próxima decisão.

Descubra onde sua empresa pode funcionar melhor. Gratuitamente.
Link na bio.

#v2o5 #gestaoempresarial #processos #eficiencia #consultoria #pme
```
**Facebook (legenda)**
```
O que acontece depois que você pede um diagnóstico?

São 45 minutos com o fundador, gratuitos e sem compromisso. O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado e nenhuma solução que obrigue a seguinte. O método tem seis passos, do processo real à próxima decisão.

Descubra onde sua empresa pode funcionar melhor. Gratuitamente: https://www.v2o5.com.br/diagnostico?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-2
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-2-como-trabalhamos.pdf`; título do documento: "V2O5: como trabalhamos")**
```
O que acontece depois que você pede um diagnóstico?

Primeiro, 45 minutos gratuitos com o fundador: olhamos presença, atendimento, operação e funil com os números da empresa. O diagnóstico não inclui mapeamento completo, implementação nem acompanhamento. Se houver um bom caso, a proposta vem por escrito, com escopo, prazo e investimento; se não houver, a conversa termina ali.

O combinado vale antes de qualquer projeto: escopo fechado, preço de referência público, nenhum escopo ilimitado, nenhuma solução obriga a seguinte e nenhuma promessa de percentual de resultado. O método tem seis passos: mapear o processo real, simplificar antes de automatizar, escolher a intervenção proporcional, implementar, comparar antes e depois e decidir o próximo passo.

Link no primeiro comentário.

#Processos #Eficiência #PequenasEmpresas
```
Primeiro comentário: `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-2`

## Fixo 3: Case Motors Store

**Instagram (legenda)**
```
93 de 100 conversas com a primeira resposta em até 1 minuto. A mediana é de 38 segundos.

É o que o agente de IA da Motors Store, revenda de seminovos em Curitiba, registrou no WhatsApp entre 21/10 e 17/11/2026 (conversas lidas no banco de dados da loja). A V2O5 montou o site de estoque, o agente, o rastreamento até a venda, o painel e as automações.

São contagens do sistema, não vendas, e a resposta humana não é medida. O resultado é o da Motors; o que cabe na sua empresa o diagnóstico mostra.

Descubra onde sua empresa pode funcionar melhor. Gratuitamente.
Case completo: v2o5.com.br/cases/motors-store (link na bio).

#v2o5 #automacao #inteligenciaartificial #crm #whatsappbusiness #seminovos
```
**Facebook (legenda)**
```
93 de 100 conversas com a primeira resposta em até 1 minuto, mediana de 38 segundos: o que o agente de IA da Motors Store registrou no WhatsApp entre 21/10 e 17/11/2026. A V2O5 montou o site de estoque, o agente, o rastreamento até a venda, o painel e as automações.

São contagens lidas no banco de dados da loja, não vendas, e a resposta humana não é medida. O resultado é o da Motors. Case completo: https://www.v2o5.com.br/cases/motors-store?utm_source=facebook&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3
```
**LinkedIn (texto do post, com o PDF `linkedin/fixo-3-case-motors.pdf`; título do documento: "V2O5: case Motors Store")**
```
93 de 100 conversas com a primeira resposta em até 1 minuto, mediana de 38 segundos. É o agente de IA da Motors Store, revenda de seminovos em Curitiba, no WhatsApp, entre 21/10 e 17/11/2026.

A Motors tinha gargalos de visibilidade, de leads qualificados e de acompanhamento comercial. A V2O5 montou o site de estoque, o agente, o rastreamento até a venda, o painel e as automações, ligados pela mesma base de dados. O banco da loja mostra 237 leads no funil desde 05/09/2026 e, desde 21/10/2026, 125 clientes atendidos pelo agente.

Os números são contagens lidas no banco de dados da loja em 17/11/2026. Não são números de venda, a resposta humana não é medida e o resultado é o da Motors. O diagnóstico mostra o que cabe em outra empresa.

Case completo no primeiro comentário.

#Automação #CRM #WhatsAppBusiness
```
Primeiro comentário: `https://www.v2o5.com.br/cases/motors-store?utm_source=linkedin&utm_medium=post-fixo&utm_campaign=posts-fixos&utm_content=fixo-3`

## Conferências antes de publicar
- Os preços dos slides saem de `ofertas.ts` e `sprint.ts`; se mudarem, atualizar `social/carrosseis/conteudo-fixos-v2.json` e gerar de novo.
- Os números do fixo 3 vêm de `memory/projects/case-motors.md` (leitura de 17/11/2026) e de `src/conteudo/case.ts`. A frase é "em até 1 minuto", igual à fonte e ao site. Se o case for atualizado, repetir a leitura antes de republicar.
- O nome, o logo e os números da Motors têm autorização desde 08/10/2026.
- Texto alternativo: o Instagram aceita descrição por imagem; a dica é colar o texto do slide.
