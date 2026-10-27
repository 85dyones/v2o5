# Perfis e buscadores: roteiro para a V2O5 existir como marca

Roteiro de 27/10/2026. Decisões do Dyones: o Search Console e o Planejador de Palavras-chave serão criados com a conta `v2o5consultoria@gmail.com`; LinkedIn e Instagram/Facebook existem, mas estão desatualizados e sem gestão; o Perfil de Empresa no Google será criado; o case V2O5 fica de fora por ora.

**O que eu faço e o que depende de você.** Eu não consigo entrar em contas Google, LinkedIn, Instagram ou Facebook a partir daqui (não há conector de navegador nesta sessão, e senha ou código de verificação nunca passam por mim). O que eu entrego é o roteiro, os textos prontos e o código do site já preparado para receber a verificação e os endereços. Quem clica é você, ou uma sessão sua com o conector do Chrome ligado, seguindo os passos abaixo.

## 0. Como a V2O5 se apresenta nos buscadores (análise do site, 27/10/2026)

O Dyones apontou que a V2O5 é cada vez menos uma consultoria de TI. O site confirma. Contando os textos públicos (home, sobre, preços, diagnóstico e as páginas de capacidade): **gargalo** aparece 69 vezes, **processo** 41, **eficiência** 24, **operação** 23, **automação** 20, **tecnologia** 28; **consultoria** aparece 3 vezes e **TI** e **agência** nenhuma. O que o site vende é achar o gargalo de uma operação comercial ou administrativa, simplificar o processo e implementar a solução (automação, IA, integração, site, rastreamento, CRM, marca) dentro de um Sprint, com o resultado medido. A assinatura da marca já diz isso: "Eficiência comercial e operacional com tecnologia."

Duas armadilhas de classificação:

- **"Consultoria de TI"** pega só o meio (a tecnologia) e atrai quem procura suporte, infraestrutura e help desk.
- **"Agência de marketing"** (volume alto na planilha do Planejador) atrai quem procura anúncio e post, e a V2O5 não se apresenta como agência.

**O descritor único**, a repetir em todos os perfis, é a assinatura do site: **eficiência comercial e operacional com tecnologia**. A categoria (que é uma lista fixa de cada plataforma) só classifica; quem explica é a descrição. A classificação mais próxima é a de **consultoria de negócios e gestão**, que também combina com o termo `consultoria empresarial` (100 a 1 mil buscas por mês em Curitiba, sem página hoje) da planilha. O nome antigo "V2O5 ConsultorIA" continua como `alternateName` no schema, para quem ainda procura por ele (o Instagram e o e-mail do Google ainda o usam).

## 1. Search Console (primeiro, porque dá o critério 1 dos guias)

Conta: `v2o5consultoria@gmail.com`.

1. Abrir o Search Console e adicionar a propriedade do tipo **Domínio**, `v2o5.com.br`. Ela cobre `www`, o apex e os subdomínios de uma vez.
2. Verificar por **DNS**: o Google mostra um registro `TXT`. Criar no painel DNS da Hostinger (a zona de `v2o5.com.br` fica lá). Não mexer nos registros A, MX, SPF, DKIM e DMARC existentes.
3. Alternativa sem mexer no DNS: propriedade do tipo **Prefixo de URL** `https://www.v2o5.com.br/`, verificação por **tag HTML**. O código já aceita: pôr o conteúdo da tag na variável `GOOGLE_SITE_VERIFICATION` na Vercel (produção) e publicar de novo.
4. Em **Sitemaps**, enviar `https://www.v2o5.com.br/sitemap.xml`.
5. Em **Inspeção de URL**, pedir indexação da home, `/precos`, `/sobre`, `/diagnostico`, `/cases/motors-store` e das cinco páginas de solução.
6. Dar acesso de **proprietário** também ao e-mail pessoal do Dyones, para não depender de uma conta só.

## 2. Bing Webmaster Tools

1. Entrar com a mesma conta e usar **Importar do Google Search Console**: traz o site e o sitemap sem verificar de novo.
2. Se preferir verificar à parte: variável `BING_SITE_VERIFICATION` com o conteúdo da tag `msvalidate.01`.
3. Depois, gerar a chave do **IndexNow** e me passar o nome do arquivo (a chave em si é pública); eu ligo o envio de URLs novas.

## 3. Planejador de Palavras-chave

1. Entrar no Google Ads com a mesma conta e criar a conta no **Modo especialista**, sem campanha, para não ter gasto.
2. Usar **Planejador de palavras-chave > Descobrir novas palavras-chave** com os termos da fila (seção 6 do `plano-de-conteudo.md`). O volume aparece em faixas enquanto não houver gasto.
3. Me mandar o CSV ou a captura: com isso o critério 1 (pergunta real) de cada guia fica verificado.

## 4. Perfil de Empresa no Google

Tipo: **empresa de área de serviço**, com o endereço oculto (a sede é residencial, em Almirante Tamandaré, PR). O assistente do Google decide o que mostra, e o alcance no Maps tende a ser regional; a marca aparece na busca pelo nome de qualquer forma.

| Campo | Texto sugerido |
|---|---|
| Nome | V2O5 Vendas e Tecnologia |
| Categoria principal | A de **consultoria de negócios ou de gestão** que o Google oferecer (buscar "consultor" no assistente e conferir os nomes exatos em português; a lista tem mais de quatro mil categorias e muda). Não usar "consultoria de TI" nem "agência de marketing" |
| Categorias secundárias | No máximo duas ou três, só se o assistente as oferecer e descreverem de fato o que fazemos: por exemplo, empresa de desenvolvimento de software e consultor de marketing. O Google desaconselha encher de categorias |
| Área de atendimento | Curitiba e região metropolitana, e atendimento remoto para todo o Brasil na descrição |
| Site | `https://www.v2o5.com.br/?utm_source=google&utm_medium=organic&utm_campaign=perfil-empresa` |
| Telefone | O WhatsApp do site (o mesmo do rodapé) |
| Horário | Atendimento com hora marcada |

Descrição (até 750 caracteres):

> A V2O5 Vendas e Tecnologia ajuda empresas a achar o gargalo da operação, simplificar o processo e implementar tecnologia, automação e IA para reduzir atrito e medir o resultado. O trabalho começa por um diagnóstico gratuito de 45 minutos e segue em Sprints de Eficiência, projetos fechados para um gargalo de cada vez. Entre os projetos estão site integrado ao sistema da loja, agente de IA no WhatsApp, CRM, automação e rastreamento da venda até o anúncio. Atendimento remoto para todo o Brasil.

Serviços para cadastrar: Diagnóstico de Gargalo (gratuito), Sprint Essencial, Sprint Integrada, Sprint Avançada. Sem preço no perfil (o valor sai em proposta). A verificação do Google (vídeo, telefone ou e-mail, conforme ele oferecer) é feita por quem controla a conta.

## 5. LinkedIn (página da empresa)

Objetivo: voltar a existir com o posicionamento novo.

- **Nome:** V2O5 Vendas e Tecnologia.
- **Setor (o campo de indústria do LinkedIn):** consultoria de gestão ("Business Consulting and Services" no menu em inglês); evitar "Serviços e consultoria de TI".
- **Slogan (até 120 caracteres):** Eficiência comercial e operacional com tecnologia.
- **Sobre:** "Eu acho o gargalo da sua operação, simplifico o processo e implemento tecnologia, automação e IA para reduzir atrito e medir o resultado. Começo por um diagnóstico gratuito de 45 minutos. Projetos em Sprints de Eficiência, com preço fechado em proposta." (a página é pessoal desde o `/sobre`; se preferir voz de empresa, trocar "eu" por "a V2O5")
- **Especialidades:** automação de processos, agente de IA para WhatsApp, CRM, rastreamento de conversões, sites com SEO.
- **Botão:** "Fale conosco" para `https://www.v2o5.com.br/diagnostico?utm_source=linkedin&utm_medium=social&utm_campaign=pagina`.
- **Imagens:** logo C1d e capa na direção B do site (papel, rota na margem); o canvas de marca tem as geometrias.
- **Perfil do fundador:** título "Fundador da V2O5 | Eficiência comercial e operacional com tecnologia", link do `/sobre` em destaque e experiência da V2O5 atualizada.

## 6. Instagram e Facebook

- **Categoria do Instagram:** a de consultor ou consultoria de negócios, e não de tecnologia ou de marketing. **Nome de usuário:** `v2o5_consultoria` vem do nome antigo; quando for retomar a gestão, vale trocar por algo ligado ao nome atual (por exemplo `v2o5vendasetecnologia`, se estiver livre) e me passar o endereço novo para o `sameAs`.
- **Bio do Instagram (até 150 caracteres):** "Eficiência comercial e operacional com tecnologia. Diagnóstico gratuito de 45 min. Automação, IA e CRM para a sua operação."
- **Link da bio:** `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=social&utm_campaign=bio`.
- **Facebook, "Sobre":** a mesma descrição do Perfil de Empresa; categoria "Serviços de tecnologia da informação" ou a mais próxima; botão "Enviar mensagem" no WhatsApp.
- **Ligar as duas contas** (Meta Accounts Center) e conferir se o Instagram é conta profissional.
- **Gestão (o ponto que mais pesa):** perfil sem rotina é pior que perfil vazio. Proposta mínima, que cabe numa pessoa: **uma publicação por semana por rede**, derivada de cada guia ou nota (um guia vira um post de LinkedIn, um carrossel de Instagram e uma publicação de Facebook). É o mesmo serviço de "conteúdo e gestão de redes" que a V2O5 vende, aplicado em casa, e dá matéria para a fase do blog.

## 7. O que eu faço no site quando você me passar os endereços

1. Colocar as URLs em `src/conteudo/perfis.ts`: elas entram sozinhas no `sameAs` da organização (o teste confere que só URL `https` confirmada entra).
2. Ligar os ícones do rodapé e da página Sobre, se você quiser.
3. Registrar o endereço do Perfil de Empresa para o pedido de avaliação a cada projeto entregue.
4. Ligar o IndexNow quando a chave existir.

Fora do site: o crédito "Desenvolvido por V2O5" no rodapé da Motors é no repositório da Motors, que eu só leio daqui; precisa de uma sessão com acesso de escrita a ele.
