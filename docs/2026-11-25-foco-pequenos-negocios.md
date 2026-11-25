# Foco em pequenos negócios (25/11/2026)

Decisão do Dyones. A pergunta: "continuo com um produto amplo demais, creio que um escopo mais definido e o foco na digitalização de pequenos negócios possa ser um diferencial, com presença digital e a construção de sites e automações, esquecendo os sprints de eficiência [...] Colocar o negócio no mapa e melhorar a relação com clientes, como podemos tornar a V2O5 ainda mais focada? Quero retirar o foco da Motors, principalmente da parte de ads, falar do segmento automotivo com site, automação de atendimento e qualificação de leads via IA e integração de sistemas atuais". À proposta abaixo: "aprovo".

## O que foi decidido

1. **Posicionamento.** A V2O5 digitaliza pequenos negócios: faz o cliente encontrar a empresa e faz a empresa atender bem quem chega.
   - H1 da home: "Coloque seu negócio no mapa e cuide de cada cliente que chega."
   - Assinatura: "V2O5 | Digitalização para pequenos negócios." (antes, "Eficiência comercial e operacional com tecnologia", de 25/10).
2. **Público principal.** Pequeno negócio local que vende pelo WhatsApp e vive de recompra. Revenda de veículos segue como o segmento com case, sem produto próprio (17/11).
3. **Três soluções, na ordem do caminho do cliente.**
   - **Presença Digital Local** (colocar no mapa): ganha o pedido de avaliação no Google e perde a Presença Assistida (R$ 1.990 + R$ 890/mês), que era produção de conteúdo mensal. Ficam Essencial (R$ 790 + R$ 390/mês opcional) e Estruturada (R$ 1.490 + R$ 490/mês opcional).
   - **Sites & Integrações**: sem mudança (Landing Page R$ 2.900, Site Personalizado R$ 5.900, Site Conectado a partir de R$ 9.900).
   - **Atendimento com IA** (no lugar do Sprint de Eficiência): WhatsApp organizado, agente de IA que responde e qualifica, passagem para a pessoa certa, CRM simples e contato de volta com quem sumiu ou compra de novo. Dois pacotes com os preços públicos que eram do Sprint: **Atendimento Essencial, a partir de R$ 3.900**, e **Atendimento Integrado, a partir de R$ 6.900**. Sai o Sprint Avançado (a partir de R$ 12.900), que não é para pequeno negócio.
4. **Continuidade** fica com Cuidado Técnico (R$ 349/mês), Integrações Monitoradas (R$ 590/mês) e Evolução Contínua (R$ 990/mês). Sai a frente "Conteúdo e campanhas recorrentes": a mensalidade da Presença é contratada com a Presença.

Valores que deixam de ser públicos: R$ 1.990 e R$ 890/mês (Presença Assistida) e R$ 12.900 (Sprint Avançado). Entram na lista de aposentados de `tests/precos-publicos.test.ts`.

## No site

- **Rotas.**
  - O Atendimento com IA mora em `/agente-de-ia-para-whatsapp`, que já existe, está indexada e traz a busca *chatbot whatsapp*. A página vira página de solução, com os pacotes.
  - `/sprint-de-eficiencia` → 301 para `/agente-de-ia-para-whatsapp`.
  - `/rastreamento-de-conversoes` → 301 para `/criacao-de-sites`, onde fica "de onde veio cada contato".
  - `/gestao-de-trafego` passa a apontar direto para `/criacao-de-sites`, sem redirecionamento em cadeia.
  - `/crm-com-whatsapp` e `/automacao-com-ia` seguem como páginas de recurso, agora do Atendimento com IA.
- **Home.** H1, assinatura e abertura novos; sai a seção do método do Sprint e o diagrama do "Sprint Integrado"; as dores passam a ser as do pequeno negócio (não ser achado, informação errada, demora no WhatsApp, cliente que some); os dois cases com o mesmo peso, os dois como atendimento.
- **Motors Store.** O case deixa de falar de anúncio: sai o rastreamento até o anúncio (identificador de clique, Meta e Google contando a conversão, "Meta ADS" na ficha). Ficam o site ligado ao estoque, o Ney atendendo e qualificando e o lead no CRM do Revenda Mais. Os cartões, as cenas de exemplo e as ferramentas da home deixam de citar Google Ads e Meta Ads.
- **Revendas de veículos.** A página de exemplo junta as três soluções no segmento: site com estoque (Site Conectado), atendimento e qualificação com IA (Atendimento Integrado) e integração com o sistema da loja. Sem anúncio.
- **Continuidade.** Duas frentes: manutenção técnica e monitoramento. A âncora `/continuidade#conteudo-e-campanhas` sai do menu.
- **GA4.** A página do agente passa a `service_line=atendimento` (antes, `agente`), o nome da solução. A tabela de "Modificar evento" de `docs/handoff-ga4.md` fica com 15 regras: saem as do Sprint e do rastreamento, que redirecionam. Se as regras já estiverem criadas, muda um valor na do agente e apagam-se as duas.

## Fora do site, depois do merge

- `v2o5-diagnosticos`: vitrine e propostas sem Sprint e sem Presença Assistida.
- Agente do n8n: texto com as três soluções novas (rascunho; o Dyones publica).
- Skill `diagnostico-presenca`: as soluções novas.
- Kit das redes (`docs/social/`): assinatura e serviços.

## Riscos combinados

- Ticket menor: o modelo depende de entrega padronizada e da continuidade.
- A Presença Digital Local ainda não tem case; vale fechar um negócio de bairro como primeiro case (a skill `presenca-local-relacionamento` aponta para esse público).
- Projetos sob medida, como a renovação da 16ª Vara Cível, saem da vitrine e seguem por proposta.
