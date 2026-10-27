# Portfólio no site: arquitetura, regras e aceite (27/10/2026)

Equivale ao `CLAUDE_SITE_IMPLEMENTATION.md` do handoff de 27/10. A oferta, os preços e os escopos moram em `memory/context/oferta.md`; aqui fica como o site os mostra. Auditoria de partida: `docs/2026-10-27-auditoria-do-portfolio.md`.

## 1. Fontes no código
| O quê | Arquivo |
|---|---|
| Branding, Presença, Sites e continuidade (pacotes, preços, escopos, regras) | `src/conteudo/ofertas.ts` |
| Sprint (níveis, método em seis passos, condições) | `src/conteudo/sprint.ts` |
| Formatação em real | `BRL` em `src/conteudo/precos.ts` (o cardápio de 15/10 saiu do código; o registro está em `oferta.md`, "Histórico") |
| Páginas, títulos e descrições | `src/conteudo/paginas.ts` |
| Navegação | `NAVEGACAO` em `src/conteudo/home.ts` |

Todo "R$" que o visitante, o Google, os assistentes de IA ou o agente do n8n leem sai dessas fontes. `tests/precos-publicos.test.ts` recusa qualquer outro valor.

## 2. Rotas
| Rota | Papel |
|---|---|
| `/` | o que a V2O5 faz, as quatro soluções em `#solucoes`, como começar, o método, a prova e o fecho |
| `/branding-e-identidade` | três pacotes de Branding |
| `/presenca-digital-local` | três pacotes de Presença, com a mensalidade opcional de cada um |
| `/criacao-de-sites` | Sites & Integrações (mantém o endereço pela busca "criação de site") |
| `/sprint-de-eficiencia` | os três Sprints, o método, as condições e os recursos que um Sprint costuma usar |
| `/continuidade` | as três frentes (`#manutencao-tecnica`, `#conteudo-e-campanhas`, `#monitoramento-e-otimizacao`) e os três planos com limites |
| `/precos` | resumo das quatro soluções e da continuidade, com todos os pacotes numa lista curta; `#titulo-sprint` pousa no Sprint |
| `/segmentos/revendas-de-veiculos` | Site Automotivo Integrado e Operação com IA |
| `/agente-de-ia-para-whatsapp`, `/crm-com-whatsapp`, `/automacao-com-ia`, `/rastreamento-de-conversoes` | recursos do Sprint, sem preço, fora do menu, ligados a partir do Sprint e do rodapé |

Nenhuma rota saiu. Âncoras que outros lugares usam e continuam valendo: `/#solucoes` (404, redirecionamento de `/gestao-de-trafego`, vitrine), `/precos#titulo-sprint` (vitrine, schema, links antigos), `#perguntas`.

## 3. Navegação
Soluções (as quatro e Revendas de veículos), Continuidade (as três frentes), Preços, Case e Sobre, mais o botão do diagnóstico. No desktop, cada grupo abre um `<details>` nativo, que funciona sem JavaScript; um componente cliente pequeno fecha o painel com Esc, com clique fora e ao seguir um link. No celular, os grupos aparecem em lista no menu atual. Rodapé: Soluções (as quatro e a Continuidade), Recursos (as quatro páginas de recurso) e Empresa.

## 4. Regras de implementação
- Preço público só de `ofertas.ts` e `sprint.ts`. Preço fixo aparece como "R$ 2.400"; o de topo, como "a partir de R$ 7.900"; mensalidade com "/mês".
- Cada pacote diz para quem é, o que inclui e o que fica de fora. Nenhum escopo ilimitado.
- O CTA principal de todas as páginas continua sendo o diagnóstico gratuito (`/diagnostico`, formulário ligado ao n8n). O formulário não mudou.
- Sem promessa de resultado, ROI ou percentual. Número do case só como `memory/projects/case-motors.md` publica.
- Texto público pelo humanizer: sem travessão, sem "não é X, é Y", sem tríades de efeito.
- Performance: o H1 de cada página é o LCP; seções abaixo da dobra adiadas como no resto do site; nenhuma dependência nova.
- JSON-LD: cada página de solução publica `Service` com `OfferCatalog` dos pacotes; `/precos` publica o catálogo inteiro; `/continuidade` os três planos com `unitCode: MON`.

## 5. Critérios de aceite
- As quatro soluções visíveis e coerentes na home, no menu, em `/precos` e em cada página.
- A continuidade apresentada como opcional, com limites escritos.
- Nenhum preço em conflito entre home, páginas, `/precos`, `llms.txt`, schema, vitrine, diagnósticos e agente do n8n.
- O Start Digital reposicionado como Presença Digital Local; o Sprint com o método de seis passos.
- CTAs com destino real; formulário, WhatsApp e páginas relevantes funcionando.
- Desktop (1440 px) e celular (390 px) conferidos por captura.
- Testes, lint e build verdes; evidências no PR.
- Preview da Vercel com checklist; nada em produção sem autorização do Dyones.

## 6. Fora do site, no mesmo dia da publicação
- **Vitrine** (`subdominios/diagnostico/index.html`, copiada para `85dyones/v2o5-diagnosticos`): as quatro soluções e a continuidade, com os mesmos preços de entrada.
- **Diagnósticos de clientes** (pastas de `v2o5-diagnosticos`): o bloco de investimento passa à tabela nova (decisão de 27/10).
- **Agente do n8n**: o nó `Montar pedido` de "V2O5 · Agente de IA" ganha a regra nova de preço (`docs/n8n/agente-da-v2o5.json`). O conhecimento dele é o `/llms.txt`, que muda sozinho com o site.
- **Skill `diagnostico-presenca`** (pendência 34): em `sistema/config/agency.yaml`, `tabela_precos.sinal: "Quatro soluções"`; em `referencias/intake.md`, item 13, os caminhos passam a ser pacotes de `/precos` (por exemplo, Presença Estruturada com a mensalidade dela, Site Personalizado com o Cuidado Técnico, Sprint Integrado), com `valor` e `sufixo` copiados da página ("R$ 490" + "/mês"). Não há mais preço promocional na tabela. `tools/proposta.py check` continua valendo, porque `/precos` lista todos os pacotes com o preço exato.
