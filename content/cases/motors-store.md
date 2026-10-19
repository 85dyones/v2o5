---
rota: "/cases/motors-store"
url: "https://www.v2o5.com.br/cases/motors-store"
status: 200
title: "Case Motors Store | V2O5 Vendas e Tecnologia"
description: "O que a V2O5 montou para a Motors Store, revenda de seminovos em Curitiba, e os números do sistema rodando, lidos no banco de dados da loja."
canonical: "https://www.v2o5.com.br/cases/motors-store"
robots: null
h1: "Motors Store: o sistema inteiro numa revenda de seminovos."
extraido_em: "2026-10-19T00:26:22.723Z"
fonte: "produção (www.v2o5.com.br), main em 46c4103"
---
<!-- Texto do <main>, na ordem do DOM de produção. Topo e rodapé: content/_comum.md. -->
Case

# Motors Store: o sistema inteiro numa revenda de seminovos.

A V2O5 montou para a Motors Store, em Curitiba, o site de estoque, os guias, o rastreamento até a venda, o painel e as automações.

Revenda de seminovos em Curitiba/PR.

[motorsstore.com.br](https://motorsstore.com.br)

Cliente

Motors Store, revenda de seminovos em Curitiba

Entrega

site de estoque, guias, rastreamento, painel e automações

Fonte

banco de dados da Motors, lido em 08/10/2026

## O que a V2O5 montou.

Cada peça é uma linha do cardápio da V2O5, ligada às outras pela mesma base de dados.

<!-- 19/10 (Dyones): telas reais do site da Motors, capturadas no celular; no celular só a primeira aparece -->
[imagem] motorsstore.com.br, capturado em 19/10/2026
[imagem] motorsstore.com.br/estoque, capturado em 19/10/2026
[imagem] motorsstore.com.br/carros/volkswagen/t-cross, capturado em 19/10/2026

Sites e presença

### Site de estoque em Next.js

Vitrine, ficha de veículo, páginas por marca e modelo e seis páginas locais escritas à mão. O estoque entra sozinho do Revenda Mais.

SEO e busca por IA

### 26 guias com método próprio

Hub de conteúdo assinado pelo fundador da V2O5, com dados estruturados por página, llms.txt e IndexNow, para o Google e as IAs encontrarem cada guia.

Rastreamento até a venda

### Cada lead com a origem

Camada de dados versionada e testada; Meta Pixel com API de Conversões deduplicada por event_id; GA4 e GTM; UTM e click IDs gravados no lead.

CRM e sistemas sob medida

### Painel da loja

Funil de leads, estoque, clientes, investidores e mídia paga num painel só.

Automação de processos

### Rotinas no n8n

Sincronização do estoque com o Revenda Mais, vendas incompletas e alertas de estagnação do funil, com WhatsApp pela Evolution API e atribuição no Chatwoot.

Integrações entre sistemas

### Descritivo de veículo com IA

Gerador de descritivo com modelo de linguagem, validado contra invenção de dado: o texto só sai com o que a ficha confirma.

## Os números do sistema.

leads no funil em cinco semanas: 44 pelos formulários do site e 12 pelo WhatsApp direto, via Chatwoot

56

leads do site com o identificador que impede a Meta de contar a mesma conversão duas vezes

42

de 44

leads do site ligados ao veículo que motivou o contato

37

de 44

leads do site com gclid ou fbclid: o anúncio exato que trouxe a pessoa

26

de 44

guias publicados, assinados pelo fundador da V2O5

26

veículos no estoque sincronizado com o Revenda Mais, 46 já marcados como vendidos

132

Banco de dados da Motors Store, lido em 08/10/2026. Leads contados de 05/09 a 08/10/2026.

## Como a venda fica rastreável.

Cada lead do site sai com um identificador que o navegador e o servidor compartilham. A Meta e o Google recebem a mesma conversão pelos dois caminhos e contam uma vez só. O lead chega ao painel com a origem, o anúncio e o carro, e quando vira venda a verba sabe de onde veio.

Formato real dos eventos; os valores são ilustrativos.

eventos do sistema

exemplo

03:00:12

estoque.sync

fonte=revenda-mais

alterados=3

14:32:07

lead.recebido

origem=google/cpc

gclid=sim

14:32:07

meta.capi.Lead

event_id=Lead.3f9c2a7e

status=200

14:32:08

ga4.generate_lead

event_id=Lead.3f9c2a7e

status=204

14:32:08

n8n.novo_lead

aviso=equipe

canal=whatsapp

## Com o que foi feito

- Next.js
- Vercel
- Supabase
- n8n
- Evolution API
- Chatwoot
- Meta Pixel e API de Conversões
- GA4 e GTM
- Revenda Mais

Quem assina os 26 guias da Motors Store é o fundador da V2O5, [Dyones Oliveira](/sobre). É ele quem conduz o diagnóstico gratuito.

## Quer o mesmo sistema na sua revenda?

O pacote automotivo da V2O5 é este sistema, com preço publicado. O diagnóstico gratuito diz por onde começar.

[Pedir diagnóstico gratuito](/diagnostico)

[Ver o pacote automotivo](/precos)

<!-- rótulos de acessibilidade (aria-label) desta rota, fora topo e rodapé:
- "Motors Store" (svg role=img)
-->
