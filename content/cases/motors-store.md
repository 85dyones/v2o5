---
rota: "/cases/motors-store"
url: "https://www.v2o5.com.br/cases/motors-store"
status: 200
title: "Case Motors Store | V2O5 Vendas e Tecnologia"
description: "O que a V2O5 montou para a Motors Store, revenda de seminovos em Curitiba, e os números do sistema rodando, lidos no banco de dados da loja."
canonical: "https://www.v2o5.com.br/cases/motors-store"
robots: null
h1: "Motors Store: o sistema inteiro numa revenda de seminovos."
extraido_em: "2026-11-27T12:45:09.800Z"
fonte: "build local da branch claude/kind-tesla-eefroe em 27/11/2026 (revisão de português do site), antes da publicação"
---
<!-- Texto do <main>, na ordem do DOM de produção. Topo e rodapé: content/_comum.md. -->
# Motors Store: o sistema inteiro numa revenda de seminovos.

A V2O5 montou para a Motors Store, em Curitiba, o site de estoque, o agente de IA no WhatsApp, a entrega do lead ao CRM e as automações.

Revenda de seminovos em Curitiba/PR.

[motorsstore.com.br](https://motorsstore.com.br)

Cliente

Motors Store, revenda de seminovos em Curitiba

Entrega

site de estoque, agente de IA, guias, painel, integração com o CRM e automações

Fonte

banco de dados da Motors, lido em 17/11/2026

Antes: diagnosticado

## O que travava a Motors Store.

O que a loja tinha de problema antes do projeto, na ordem do caminho do cliente: da busca ao atendimento.

- A loja aparecia pouco no Google e nas respostas das IAs.
- A presença digital era fraca.
- O design do site era ruim.
- O site era lento.
- Chegava pouco contato pronto para comprar.
- O retorno a quem chamava não seguia uma rotina.

Depois: implementado

## O que a V2O5 montou.

Todas ligadas pela mesma base de dados: o que entra por uma peça aparece nas outras.

![Vitrine do site da Motors Store no celular: veículo em destaque, preço e a busca por marca e modelo.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvitrine.2s6-vxquanhzs.webp&w=3840&q=75)

motorsstore.com.br, capturado em 19/10/2026

![Página de estoque do site da Motors Store no celular: título, ordenação, busca e o primeiro veículo da lista.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Festoque.3-jymr6pppbhf.webp&w=3840&q=75)

motorsstore.com.br/estoque, capturado em 19/10/2026

![Ficha de um veículo no site da Motors Store no celular: galeria de fotos, modelo, ano, preço e os botões de contato.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fveiculo.0m3bnf55vhsfs.webp&w=3840&q=75)

motorsstore.com.br/carros/volkswagen/t-cross, capturado em 19/10/2026

![Página de guias do site da Motors Store no celular: busca por dúvida, a contagem de guias publicados e o guia em destaque sobre a perícia cautelar.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fguias.1jfu70mj0lz1d.webp&w=3840&q=75)

motorsstore.com.br/guias, capturado em 26/10/2026

![Ferramenta Garagem Profiler no site da Motors Store no celular: cinco perguntas até o carro certo, com o perfil se formando ao vivo.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fperfil.2p6d_m9_-87h5.webp&w=3840&q=75)

motorsstore.com.br/carro-perfeito, capturado em 26/10/2026

![Página local do bairro Bacacheri no site da Motors Store no celular: endereço da loja, quantidade de veículos à venda e o resumo da seleção.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbairro.1eahgzdb_0x5z.webp&w=3840&q=75)

motorsstore.com.br/seminovos-bacacheri, capturado em 26/10/2026

![Página de financiamento do site da Motors Store no celular: explicação, resumo da seleção e o simulador de parcela com o estoque real.](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffinanciamento.2q6jd1_nbkg_t.webp&w=3840&q=75)

motorsstore.com.br/financiamento, capturado em 26/10/2026

Sites e presença

### Site de estoque em Next.js

Vitrine, ficha de veículo, páginas por marca e modelo e seis páginas locais escritas à mão. O estoque entra sozinho do Revenda Mais.

SEO e busca por IA

### 26 guias com método próprio

Hub de conteúdo assinado pelo fundador da V2O5, com dados estruturados por página, llms.txt e IndexNow, para o Google e as IAs encontrarem cada guia.

Atendimento com IA

### O Ney, agente da loja no WhatsApp

Agente de IA feito para a Motors: responde com o estoque real, qualifica pela régua da loja e passa o cliente à equipe na hora certa.

Integrações entre sistemas

### Lead qualificado no CRM do Revenda Mais

Na passagem, o lead vai ao CRM do Revenda Mais com a origem do contato, o carro de interesse e a qualificação do Ney, e o CRM distribui ao vendedor.

CRM com WhatsApp

### Painel da loja

A mesa do Ney: quem está com o agente, quem já foi ao CRM e quem precisa do dono, junto do estoque e das consultas de placa.

Automação de tarefas

### Rotinas no n8n

Sincronização do estoque com o Revenda Mais, entrada das conversas do WhatsApp pela Evolution API, rodada do atendimento a cada 15 minutos e alerta de falha de integração.

Conteúdo com IA

### Descritivo de veículo com IA

Gerador de descritivo com modelo de linguagem, validado contra invenção de dado: o texto só sai com o que a ficha confirma.

Medido

## Os números do sistema.

leads no funil de 05/09 a 17/11: 131 pelos formulários do site e 106 pelo WhatsApp direto

237

leads do site ligados ao veículo que motivou o contato

113

de 131

guias publicados, assinados pelo fundador da V2O5

26

veículos no estoque sincronizado com o Revenda Mais, 60 já marcados como vendidos

148

Banco de dados da Motors Store, lido em 17/11/2026. Leads contados de 05/09 a 17/11/2026.

Atendimento com IA

## O Ney qualifica, o Revenda Mais distribui.

O Ney é o agente de IA da Motors Store no WhatsApp, feito sob medida para a loja. Ele conversa com quem chega pelo site ou direto pelo WhatsApp, e só passa o cliente à equipe quando a conversa está pronta para o vendedor.

01

### Responde com o estoque real

Lê o estoque que o Revenda Mais sincroniza, com o link de cada carro, e manda as fotos aos poucos: primeiro de fora, o interior se o cliente quiser.

02

### Preenche a ficha e soma o aquecimento

Carro, forma de pagamento, entrada, troca, prazo e visita. Uma régua de pesos dá a nota de 0 a 100 e mostra o motivo de cada ponto.

03

### Passa na hora certa

Quando o cliente marca a visita, chega à simulação do financiamento, pede uma condição que só o vendedor dá ou pede para falar com uma pessoa.

04

### Entrega no CRM do Revenda Mais

O lead vai ao CRM com a origem do contato, o carro de interesse e a qualificação do Ney, e o CRM escolhe o vendedor. Se o CRM recusar, o envio tenta de novo e o dono é avisado.

05

### Retoma sem atropelar a equipe

Quem parou de responder recebe uma retomada no tempo certo. Quem já está com um vendedor fica com ele, e a mensagem nova vai para a loja.

lead no CRM do Revenda Mais

exemplo

VISITA MARCADA, qualificado pelo Ney

Aquecimento

82/100, quer visitar a loja

Visita marcada

sábado, às 10h

Procura

Compass Longitude 2021

Pagamento

financiado, com entrada

Troca

Gol 2015

Origem

Site da Loja

Resumo da conversa

o que o cliente pediu, em poucas linhas

Formato do lead que chega ao CRM; os valores são ilustrativos.

clientes atendidos pelo Ney no WhatsApp desde 21/10

125

primeiras mensagens respondidas pelo Ney em até um minuto, com mediana de 38 segundos

93

de 100

leads qualificados pelo Ney entregues ao CRM do Revenda Mais desde 04/11

37

Banco de dados da Motors Store, lido em 17/11/2026. Conversas de 21/10 a 17/11/2026; envios ao CRM de 04/11 a 17/11/2026.

## Com o que foi feito

- Next.js
- Vercel
- Supabase
- n8n
- Evolution API
- Revenda Mais (estoque e CRM)

Quem assina os 26 guias da Motors Store é o fundador da V2O5, [Dyones Oliveira](/sobre). É ele quem conduz o diagnóstico gratuito.

## Quer o mesmo atendimento no seu negócio?

Não precisa ser revenda. Em qualquer loja ou serviço que vende pelo WhatsApp, o agente responde na hora com as suas informações e passa cada cliente para a pessoa certa, com o resumo da conversa. O diagnóstico é gratuito: 45 minutos com o fundador para ver onde o seu negócio perde cliente.

[Pedir diagnóstico gratuito](/diagnostico)

[Ver os preços](/precos)

r 18 <!-- texto em SVG; decorativo, aria-hidden -->

r 24 <!-- texto em SVG; decorativo, aria-hidden -->

r 20 <!-- texto em SVG; decorativo, aria-hidden -->

r 18 <!-- texto em SVG; decorativo, aria-hidden -->

V · 6,8 <!-- texto em SVG; decorativo, aria-hidden -->

O · 4,8 <!-- texto em SVG; decorativo, aria-hidden -->

<!-- rótulos de acessibilidade (aria-label) desta rota, fora topo e rodapé:
- "Case" (section)
- "Motors Store" (svg role=img)
-->
