# Plano: 100 reels de teste para a V2O5 (17/11/2026)

Origem: PDF "100 reels de teste com o Claude" (fabiano.app, regras do Instagram "conferidas em 15/11/2026"). Este plano adapta o framework à V2O5 e respeita as regras do projeto (número só com fonte e medido, texto sem travessão e sem "não é X, é Y", marca e preços de `src/conteudo/`).

## 1. O que o documento propõe

100 reels em 30 dias, em 4 lotes (25 + 25 + 25 + 25). Cada reel testa uma coisa só e sai como **reel de teste** do Instagram, que mostra o vídeo primeiro a quem ainda não segue o perfil. Os números de cada lote voltam para o Claude e decidem o lote seguinte.

| Etapa | O que faz | Ferramenta |
|---|---|---|
| Conta | Confere se o perfil pode postar reel de teste | Instagram |
| Cérebro | Projeto no claude.ai com `ficha-do-produto.md`, `aprendizados.md` e `planilha-reels.csv` | Claude Projects |
| Conteúdo | 25 ganchos em 5 ângulos, depois 25 roteiros | Prompts 1 a 4 |
| Volume | 1 dia de produção por semana, 5 dias só postando | Câmera, tela, HyperFrames |
| Leitura | 24 h depois, insights do reel para a planilha | Prompt 6 |
| Repetição | 3 vencedores viram variações, uma mudança por vez | Prompt 5 |
| Conversa | Link na bio com UTM por lote, funil em planilha | GA4, prompts 7 e 8 |

A divisão dos 100: 50 testes novos (25, 10, 10, 5) e 50 variações de vencedores (0, 15, 15, 20).

## 2. Análise: o que serve, o que não serve

**Serve como está**
- A lógica de lote com leitura e repetição: baixo custo, aprende rápido e deixa o aprendizado no repositório, o mesmo método do projeto.
- Prompt 1 (regras do Projeto): "nada de número ou prova que não esteja na ficha, escreva [PROVA QUE FALTA]" é a nossa regra de número com fonte.
- Prompt 8 e o checklist da landing: já temos a landing (`/diagnostico`) e o formulário.
- Reel de teste não pesa no resto do perfil (segundo a Central de Ajuda citada no PDF), então o risco de queimar o perfil é baixo.

**Precisa de adaptação**
- **Funil de venda barata vs. venda consultiva.** O exemplo do PDF (lead a 20%, venda a 5%, ticket R$ 100) vale para produto simples. A V2O5 vende a partir de R$ 790 a R$ 9.900 depois de um diagnóstico de 45 min. O funil aqui é: view, clique, lead (formulário ou WhatsApp), diagnóstico feito, proposta, fechamento. Os números do exemplo não entram em lugar nenhum.
- **CTA "comente TESTE que eu te mando o link".** Depende de "Gestão de comentários e Direct", que ainda espera a revisão do app da Meta (pendência 21). Até lá o CTA é só o link na bio.
- **Câmera no celular.** Falta a foto do Dyones e ele escolhe se aparece (pendências 1 e 11). Os formatos de tela do produto e motion cobrem o lote 1 sem rosto.
- **Venda como linha final.** Nosso último dado confiável é "diagnóstico agendado", que o CRM já registra com a origem.

**Riscos e pontos a conferir antes de confiar**
- As regras do Instagram, os preços do Claude e a data "15/11/2026" vêm do PDF. Conferir no app e na Central de Ajuda antes do dia 1 (o botão **Teste** precisa aparecer antes do compartilhar).
- **A conta pode não qualificar.** Conta profissional precisa de pelo menos 200 seguidores segundo o PDF. O @v2o5_consultoria está parado e não consegui ler o perfil (o Instagram bloqueia a consulta pública). Este é o primeiro bloqueio possível.
- **HyperFrames** é um plugin de terceiro, instalado de um marketplace do GitHub (`heygen-com/hyperframes`). Ler o código e as permissões antes de instalar, rodar em pasta isolada, e só então usar.
- **Material do cliente.** Tela do admin e conversas da Motors só com autorização da loja e dados mascarados (pendências 24 e 31). Os números do case 16ª Vara Cível seguem fora até a autorização (pendência 40).
- **Escala.** 100 reels em 30 dias é muito para uma operação com o fundador como gargalo. O plano abaixo trata o lote 1 como portão: só segue para os lotes 2 a 4 se ele rodar sem travar o resto do trabalho.

## 3. O que já existe no repositório e ajuda

- `/diagnostico` com formulário, que grava no lead o primeiro toque: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, clique ID, referrer e entrada (`src/lib/origem.ts`, `src/lib/leads.ts`). O `utm_content` do reel chega junto com o lead.
- Atendimento com origem marcada no Chatwoot e agente de IA (`docs/n8n/`).
- Kit de perfil e criativos de Instagram prontos (`docs/social/perfis.md`, `design/marca/redes/`): avatar, destaques, modelo de post e de story.
- Prova pública: case Motors (`memory/projects/case-motors.md`, números lidos do banco, com período) e preços (`src/conteudo/ofertas.ts`, `sprint.ts`).
- Páginas de solução, para o texto da promessa e dos ganchos.

## 4. Plano

### Fase 0. Preparação (dias 1 e 2, antes do primeiro reel)

Bloqueios, na ordem:
1. **Conta do Instagram** (Dyones): profissional, pública, Status da conta sem restrição, mínimo de seguidores atendido, botão Teste visível. Se faltar seguidor, decisão: juntar os 200 por rede própria (clientes, WhatsApp, LinkedIn) ou ir de reel comum e usar o plano só como método de produção e leitura.
2. **GA4** (pendência 16, Dyones): criar a propriedade, pôr `NEXT_PUBLIC_GA4_ID` na Vercel, marcar `generate_lead` como evento-chave. Sem isso não existe coluna "cliques UTM" confiável.
3. **Conferir o caminho do `utm_content`** até o lead no Supabase, no n8n e no Chatwoot (conta 1, caixa 12). Teste do dia 2: abrir a landing com UTM de outra conta e concluir o formulário (o item "caminho inteiro" do checklist).
4. **Promessa única** (Dyones decide, recomendação abaixo). Título da landing e roteiros usam a mesma frase.

Entregas minhas (no repositório, pasta `docs/reels/`):
- `ficha-do-produto.md`: rascunho montado a partir do site e da memória, em vez de entrevista do zero, com [CONFERIR] onde faltar prova. O Dyones só corrige.
- `prompts/`: os 10 prompts do PDF já adaptados (funil consultivo, regras do projeto, CTA só com link na bio, ângulos da V2O5). Os mesmos textos vão para o Projeto no claude.ai.
- `planilha-reels.csv` e a planilha de funil (modelo do PDF, com as linhas diagnóstico feito, proposta e fechamento no lugar de venda).
- `aprendizados.md` vazio com a data de partida.
- Gerador de links UTM com padrão fixo: `utm_source=instagram`, `utm_medium=reel-teste`, `utm_campaign=100-reels`, `utm_content=L1-07` (lote e número).
- Checklist da landing marcado contra `/diagnostico` (8 pontos, mais PageSpeed no celular), com a lista de ajustes de texto que o prompt 8 sugerir.

### Fase 1. Lote 1: 25 testes novos (semana 1, dias 3 a 9)

Cinco ângulos de cinco ganchos, proposta inicial (o Claude gera e o Dyones aprova no prompt 3):

| Ângulo | Exemplo de abordagem |
|---|---|
| Dor do dia a dia | O lead que esfria porque ninguém respondeu no WhatsApp |
| Demonstração em menos de 10 s | Tela do agente respondendo, site gravando o lead no CRM |
| Erro comum | Site no ar sem rastreamento, anúncio sem saber o que virou venda |
| Contra o jeito antigo | Planilha e WhatsApp manual versus fluxo conectado |
| Bastidor | Como um diagnóstico de 45 minutos achou o gargalo (sem identificar cliente) |

Produção em um dia (dia 3): 25 roteiros e os vídeos em lote. Formato dominante: tela do produto e motion (HyperFrames, 1080x1920, 30 fps). Dias 4 a 8: 5 reels por dia, cada um como reel de teste, nunca o mesmo arquivo duas vezes. Dia 9: leitura (prompt 6) e escolha dos 3 vencedores.

Portão do lote 1: houve ao menos um clique UTM por algum reel? Se zero cliques em 25 reels, o problema está no CTA ou na bio. Corrigir isso antes do lote 2.

### Fase 2. Lote 2 (semana 2, dias 10 a 16)
15 variações dos 3 vencedores e 10 testes novos. Compartilhar com todos os vencedores com bom resultado (3 colunas no top 5). Atualizar o `aprendizados.md`.

### Fase 3. Lote 3 (semana 3, dias 17 a 23)
Mesma divisão. No dia 23, revisar a landing usando o gancho do melhor reel (prompt 8) e republicar o texto. Aqui já são 75 reels de dado.

### Fase 4. Lote 4 e fechamento (semana 4, dias 24 a 30)
20 variações e 5 testes novos. Dia 30: diagnóstico do funil (prompt 7) e fechamento do mês (prompt 10). Saída: os 10 melhores reels, os 2 ângulos que viram base do mês seguinte e o plano dos próximos 30 dias.

## 5. Como medimos

Uma linha por reel em `planilha-reels.csv`, lida 24 horas depois do post: visualizações, visualizadores, tempo médio, novos seguidores, curtidas, comentários, compartilhamentos (insights do Instagram); cliques UTM (GA4); leads (Supabase, por `utm_content`); diagnósticos feitos (CRM). Retenção é tempo médio dividido pela duração. Comparação sempre contra nossos próprios números, nunca contra média de mercado.

Regra de texto público: nenhum número de resultado em roteiro sem fonte na ficha e sem período. O que ainda não foi medido não vira promessa.

## 6. Automação, só depois do lote 1

Se o ritmo se mostrar sustentável: workflow no n8n que lê os insights pela API oficial do Instagram e preenche a planilha, e agendamento de reel de teste pela API (`trial_params`, até 100 posts por 24 h segundo o PDF). Exige o app da Meta revisado (mesma revisão da pendência 21). Não entra antes do portão do lote 1.

## 7. Decisões do Dyones (com recomendação)

1. **Promessa única dos reels e da landing.** Recomendo uma frase curta ligada ao diagnóstico gratuito e ao H1 vigente do site, para o reel levar direto ao `/diagnostico`. Quero o texto aprovado por você antes do prompt 3.
2. **Aparecer em vídeo?** Recomendo lote 1 sem rosto (tela e motion) e 5 dos 25 com você falando, para o dado dizer se vale.
3. **Escopo.** Recomendo começar só com o lote 1 (25 reels) e decidir os outros três depois do portão, em vez de assumir os 100 já.
4. **Conta.** Preciso saber quantos seguidores o perfil tem hoje e se a opção Teste aparece. Define se o plano começa dia 1 ou depois de um mês de crescimento.

## 8. Ordem de execução sugerida

1. Você confere a conta (Fase 0, item 1) e responde as decisões 1 a 4.
2. Eu gero `docs/reels/` (ficha, prompts, planilhas, links UTM, checklist da landing) numa branch `claude/...` com PR.
3. Você liga o GA4 na Vercel; eu testo o caminho do `utm_content` ponta a ponta.
4. Montamos o Projeto "Reels V2O5" no claude.ai com os arquivos.
5. Dia 3: roteiros e produção do lote 1.
