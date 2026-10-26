# Entregáveis da Motors e possibilidades para oferecer

Levantamento de 26/10/2026, feito a pedido do Dyones ("verifique tudo que foi realizado e as possibilidades, sites com motion, tudo que você pode ajudar a construir e oferecer como objeto"). Fontes: o repositório `85dyones/motors-site-oficial` (README, `docs/`, `src/`, workflows do n8n) e o site em produção (`motorsstore.com.br`, sitemap e capturas de 26/10). Regra do site: só entra em texto público o que roda em produção; o que está só no código, desligado ou no começo fica nesta lista como possibilidade.

## 1. Entregue e no ar na Motors (conferido no site e no repositório)

| Frente | O que existe | Onde se vê |
|---|---|---|
| Loja | Vitrine, estoque com filtros, ficha do veículo (galeria, preço, contato), páginas por marca e categoria, páginas de motos | `/`, `/estoque`, `/carros/...`, `/motos` |
| Páginas locais | Uma por bairro e cidade (Bacacheri, Boa Vista, Almirante Tamandaré, Colombo, Pinhais, Curitiba) | `/seminovos-bacacheri` e as outras |
| Conteúdo | 26 guias com busca e temas, assinados pelo fundador | `/guias` |
| Ferramentas interativas | Garagem Profiler (cinco perguntas até o carro certo, o perfil se forma ao vivo), simulador de financiamento com o estoque real, avaliação de compra do carro do cliente | `/carro-perfeito`, `/financiamento`, `/avaliacao` |
| Páginas institucionais | Garantia, contato, privacidade, sobre | `/garantia`, `/contato` |
| Campanha | Landing própria de campanha (Pole Position, 12 a 20/09/2026), com cores e arte do folder e CTA de campanha | `(campanha)/pole-position-2026` |
| Repasse | Área de repasse com página por carro | `/repasse/...` |
| Estoque | Sincronizado do Revenda Mais para o banco por um workflow do n8n; 132 veículos lidos em 08/10/2026 | case |
| Rastreamento | Pixel e API de Conversões, GA4 e GTM, `event_id` por lead (`TRACKING_SPEC.md`, `docs/GTM_CONFIGURACAO.md`) | case |
| Painel (`/admin`, telas A1 a A17) | Estoque, funil de leads (kanban), clientes e fornecedores, investidores, mídia paga, marketing e campanhas de SMS, consulta de placa e de documentos, guias, hubs, usuários e permissões, auditoria | privado |
| Automações n8n | Sincronizador de estoque, alertas de estagnação do funil, ciclo de vendas incompletas, atendimento (entrada e rodada) | `*.json` do repositório |

## 2. Existe no código, mas não afirmar como "no ar" sem confirmar

- **Assistente de IA no WhatsApp** (`docs/ATENDIMENTO_IA.md`: Evolution, n8n e DeepSeek, aquecimento do lead, cadências, resumo ao corretor): os workflows do repositório vêm **desligados** e o pedido é de 19/10. É a pendência 13: o site diz que o agente completa o sistema, não que roda na Motors.
- **Motors Ciclo** (garantia, revisões em rede, recompra): "implementação ainda no começo".
- **Financeiro e investidores**: há treze achados de revisão ainda não corrigidos (`docs/ACHADOS_FINANCEIRO.md`).
- **Plataforma SaaS multi-loja** (`85dyones/motors-plataforma`): em construção.

## 3. Sites com motion: o que já existe e dá para oferecer

A Motors e o site da V2O5 usam motion (os componentes estão no código da Motors; o uso de cada um em produção não foi conferido tela a tela) sem biblioteca de animação (CSS, `IntersectionObserver` e componentes próprios): `TextoCinetico`, `TextoQueAcende`, `TextoQueRola`, `Hodometro`, `NumeroQueConta`, `LogoAnimado`, `SinalDeAbertura`, `Transicao`, `VitrineTV`. Regras que mantêm o motion vendável: o LCP é o título, o motion carrega por seção e `prefers-reduced-motion` desliga tudo. Possibilidades:

- Hero com texto cinético e contador de números que conta ao entrar na tela.
- Vitrine em modo TV (loja com tela na parede) a partir do mesmo estoque.
- Landing de campanha com arte do folder, prazo e CTA, que sai do ar sozinha quando a campanha acaba.
- Logo animado, transições de página e rolagem com revelação por seção.
- Diagramas que acendem o caminho de um contato (o da home da V2O5).

## 4. Capacidades que dá para oferecer, por Sprint

| Sprint | Exemplos de composição, com base no que já foi feito |
|---|---|
| Essencial | Uma página local ou de campanha; o rastreamento ligado; um fluxo no n8n (aviso de lead parado, pedido de avaliação); integração entre duas ferramentas |
| Integrada | Site com estoque sincronizado; CRM com kanban e alertas; atendimento por WhatsApp com passagem para a equipe; guias e páginas locais para a busca; simulador ou consultoria interativa |
| Avançada | Site, painel do dono, integração com o sistema de gestão, atendimento por IA com regras de exceção, SMS e reativação, ciclo de vida do cliente, plataforma multi-loja |

## 5. "Objeto" por página de solução (pendência 24)

Cada página de solução ganharia um objeto visual próprio, como `/criacao-de-sites` ganhou as telas reais:

| Página | Objeto |
|---|---|
| Sites | Sete telas reais do site da Motors (feito em 26/10) |
| CRM com WhatsApp | O kanban de leads (`LeadsKanban`), com dados fictícios ou mascarados |
| Agente de IA | Uma conversa de exemplo, rotulada como exemplo |
| Automação | O fluxo do n8n (sincronizador de estoque), desenhado, sem credenciais |
| Rastreamento | O terminal de eventos já usado na home e no case |
| Painel do dono | O painel com números fictícios ou aprovados pela Motors |

Telas do `/admin` mostram dados de cliente e de fornecedor: só entram com a autorização da Motors e com os dados mascarados.
