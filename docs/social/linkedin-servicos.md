# LinkedIn: Service Page da V2O5 (31/10/2026)

A Service Page lista o que a empresa vende, com descrição e exemplos de trabalho. Todo preço vem de `src/conteudo/ofertas.ts` e `sprint.ts` (travado por `tests/precos-publicos.test.ts`) e é "preço de referência", como no site. Antes de colar, confira no LinkedIn o limite de caracteres de cada campo e escolha, na lista do LinkedIn, a categoria mais próxima de cada serviço.

Imagens de exemplo (1200 x 627) em `design/marca/redes/`, uma por serviço. As capturas da Motors Store são de 26/10/2026, com a autorização do case.

## Serviços, na ordem sugerida

### 1. Sprint de Eficiência
- **Categoria sugerida:** consultoria de processos / gestão de operações
- **Descrição:** Quando um processo trava a operação (retrabalho, contato perdido, sistemas que não conversam), o Sprint resolve um gargalo por vez. A V2O5 faz o diagnóstico, implanta a solução e compara os indicadores antes e depois. Três níveis: Essencial (1 a 2 semanas, um gargalo delimitado, R$ 3.900), Integrado (2 a 4 semanas, um fluxo entre sistemas, R$ 6.900) e Avançado (escopo sob medida, a partir de R$ 12.900). Preços de referência; o valor fechado sai em proposta.
- **Link:** https://www.v2o5.com.br/sprint-de-eficiencia
- **Exemplo:** `linkedin-servico-sprint-1200x627.png`

### 2. Sites & Integrações
- **Categoria sugerida:** desenvolvimento web
- **Descrição:** Site próprio, rápido e medido, ligado ao CRM, ao estoque ou ao sistema de gestão quando o escopo pede. Landing Page (R$ 2.900), Site Personalizado (R$ 5.900) e Site Conectado (a partir de R$ 9.900). Para revendas de veículos há o Site Automotivo Integrado, a partir de R$ 11.900, o mesmo método que roda na Motors Store.
- **Link:** https://www.v2o5.com.br/criacao-de-sites
- **Exemplo:** `linkedin-servico-sites-1200x627.png` (capturas da Motors Store)

### 3. Chatbot com IA para WhatsApp
- **Categoria sugerida:** automação / atendimento ao cliente
- **Descrição:** Um agente de IA no WhatsApp que responde na hora com as informações do negócio, qualifica o contato, agenda e chama a equipe quando a conversa pede uma pessoa. Entra num Sprint de Eficiência, com escopo e preço fechados em proposta.
- **Link:** https://www.v2o5.com.br/agente-de-ia-para-whatsapp
- **Exemplo:** `linkedin-servico-chatbot-whatsapp-1200x627.png`

### 4. Presença Digital Local
- **Categoria sugerida:** marketing digital
- **Descrição:** Para quem o cliente procura e encontra informação errada, perfil parado ou nenhum jeito fácil de chamar. Organizamos o perfil no Google, as redes e o WhatsApp, com modelos de conteúdo e, se quiser, a rotina mensal. Presença Essencial (R$ 790; mensalidade opcional de R$ 390), Estruturada (R$ 1.490; R$ 490/mês) e Assistida (R$ 1.990; R$ 890/mês).
- **Link:** https://www.v2o5.com.br/presenca-digital-local
- **Exemplo:** `linkedin-servico-presenca-1200x627.png`

### 5. Branding & Identidade
- **Categoria sugerida:** branding / design de identidade
- **Descrição:** Para a empresa percebida abaixo do que entrega ou com uma marca diferente em cada canal. Identidade visual com regras de uso e, nos pacotes maiores, posicionamento e comunicação. Identidade Essencial (R$ 2.400), Marca em Uso (R$ 4.900) e Reposicionamento (a partir de R$ 7.900).
- **Link:** https://www.v2o5.com.br/branding-e-identidade
- **Exemplo:** `linkedin-servico-branding-1200x627.png`

### 6. Continuidade (opcional)
- **Categoria sugerida:** suporte e manutenção de TI
- **Descrição:** Depois da entrega, planos opcionais para manter e evoluir o que foi entregue, com limites escritos: Cuidado Técnico (R$ 349/mês), Integrações Monitoradas (R$ 590/mês) e Evolução Contínua (R$ 990/mês). Nenhuma solução obriga a contratar outra.
- **Link:** https://www.v2o5.com.br/continuidade
- **Exemplo:** `linkedin-servico-continuidade-1200x627.png`

## Cuidados

- **Nenhum resultado prometido.** A Service Page não diz "aumente suas vendas": o que se mede é combinado antes, com linha de base (regra do site).
- **Case Motors:** só os números de `memory/projects/case-motors.md`, com período, se for citar. Esta página não os usa.
- **Avaliações e recomendações:** LinkedIn permite pedir a clientes; só de clientes reais e autorizados.
- **Atualização:** se um preço mudar em `ofertas.ts`, regere os cartões (`node design/ferramentas/gerar-redes.mjs`) e troque a descrição aqui.
