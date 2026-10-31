# Handoff para o Claude no Chrome: criar a página do Facebook e alinhar LinkedIn e Instagram

31/10/2026. Cole este arquivo inteiro como instrução para o Claude no Chrome (conector de navegador), com o Dyones logado no Chrome. Tudo o que o agente precisa está aqui; os textos vêm de `docs/social/perfis.md` e `docs/social/linkedin-servicos.md` (branch `main` do repositório `85dyones/v2o5`) e as imagens, do zip `design/marca/v2o5-criativos-redes.zip`.

## Antes de começar (o Dyones faz)

1. Baixar e descompactar `v2o5-criativos-redes.zip` numa pasta fácil de achar (Downloads). As imagens são enviadas pelo seletor de arquivos do navegador; se o agente não conseguir operar o seletor, ele para e pede ao Dyones que escolha o arquivo.
2. Estar logado no Facebook (conta que vai administrar), no LinkedIn (administrador da página V2O5) e no Instagram `v2o5_consultoria`.

## Regras do agente (valem para tudo)

- **Não digitar nem pedir senha, código de verificação ou captcha.** Se aparecer login, 2FA ou captcha, parar e pedir ao Dyones que resolva.
- **Não publicar post, story, comentário nem mensagem**, não seguir, conectar, convidar ou pedir recomendação a ninguém, não aceitar termos de anúncios, não cadastrar forma de pagamento, não ativar impulsionamento.
- **Usar só os textos deste arquivo.** Não inventar número, endereço, cliente nem prazo. Texto sem travessão.
- **Confirmar antes de gravar:** em cada rede, preencher tudo, mostrar um resumo (campo, valor antigo, valor novo) e só então clicar em salvar ou criar, depois do "ok" do Dyones. Uma confirmação por rede.
- **Não apagar nada.** Se um campo antigo conflitar, só substituir pelo texto abaixo; publicações e fotos antigas ficam como estão.
- **Se um campo ou tela não existir como descrito**, não improvisar: anotar o que viu e seguir para o próximo item.

## Dados fixos

- Nome: **V2O5 Vendas e Tecnologia**
- Assinatura: **V2O5 | Eficiência comercial e operacional com tecnologia.**
- Site: **https://www.v2o5.com.br** (atenção: o LinkedIn hoje tem `v205.com.br`, com zero-cinco; está errado)
- Diagnóstico: https://www.v2o5.com.br/diagnostico
- WhatsApp: (41) 99808-9550 · E-mail: diagnostico@v2o5.com.br
- Atendimento: on-line, todo o Brasil. **Sem endereço de rua em nenhum perfil.**
- Foto do perfil (todas as redes): `0-Avatar-todas-as-redes/avatar-1080.png`

## Tarefa A: criar a página do Facebook

1. Criar uma Página (facebook.com/pages/create) com:
   - **Nome:** V2O5 Vendas e Tecnologia
   - **Categoria:** Consultoria empresarial (ou a mais próxima disponível)
   - **Nome de usuário (URL):** `v2o5vendasetecnologia`; se estiver ocupado, `v2o5consultoria`.
   - **Sobre / Descrição:** Eficiência comercial e operacional com tecnologia. A V2O5 acha o gargalo, simplifica o processo e implementa site, automação e IA. Diagnóstico gratuito de 45 minutos, on-line, em todo o Brasil.
2. **Contato:** telefone/WhatsApp (41) 99808-9550, e-mail e site acima. **Endereço:** não preencher (negócio on-line). Idioma: português (Brasil).
3. **Imagens:** foto do perfil `3-Facebook/foto-do-perfil-1080.png`; capa `3-Facebook/facebook-capa-1640x624.png`. Conferir no preview que o avatar não cobre o texto da capa.
4. **Botão de ação:** "Enviar mensagem" (WhatsApp, se a Página já permitir) ou "Saiba mais" apontando para https://www.v2o5.com.br/diagnostico.
5. **Vincular ao Instagram** `v2o5_consultoria` (Configurações da Página, contas vinculadas), se o Instagram já for conta profissional.
6. **Não** criar anúncios, não aceitar termos de formulário de leads, não convidar ninguém.
7. **Entregar:** a URL final da Página (para o `sameAs` do site) e uma captura da página pronta.

## Tarefa B: alinhar a página do LinkedIn

Página: https://www.linkedin.com/company/v2o5-consutoria/ (o endereço com "consutoria" é o real; não mudar). Em "Editar página":

| Campo | Hoje | Colocar |
|---|---|---|
| Nome | V2O5 ConsutorIA (erro de grafia) | V2O5 Vendas e Tecnologia |
| Slogan (tagline) | Consultoria em IA aplicada à rotina do seu negócio… | Eficiência comercial e operacional com tecnologia. Diagnóstico gratuito de 45 minutos, on-line, para todo o Brasil. |
| Site | `v205.com.br` (errado) | https://www.v2o5.com.br |
| Setor | Tecnologia, informação e internet | manter |
| Local | Curitiba, Paraná | manter (a plataforma exige um local) |
| Logo | atual | `2-LinkedIn/logo-da-pagina-1080.png` |
| Banner | atual | `2-LinkedIn/linkedin-banner-empresa-1128x191.png` (a logo cobre o canto inferior esquerdo; é esperado) |
| Botão personalizado | — | "Fale conosco" para https://www.v2o5.com.br/diagnostico (ou o mais próximo da lista) |

**Sobre** (substituir o texto atual):
> A V2O5 ajuda pequenas e médias empresas a vender e operar com menos atrito. Começamos por um diagnóstico gratuito de 45 minutos com o fundador, achamos o gargalo e resolvemos um de cada vez: identidade e marca, presença digital, sites integrados ao CRM e ao WhatsApp, agentes de IA e automação.
>
> Cada solução tem escopo fechado e preço de referência público em v2o5.com.br/precos. O método roda em produção na Motors Store, revenda de seminovos de Curitiba. Atendimento on-line em todo o Brasil.

**Especialidades:** Branding e identidade, Presença digital local, Sites e integrações, Chatbot com IA para WhatsApp, Automação de processos, CRM com WhatsApp, Rastreamento de conversões.

### Service Page (a tela "Serviços de V2O5 Vendas e Tecnologia")

Criar os 6 serviços na ordem abaixo. Em cada um: escolher a categoria mais próxima da lista do LinkedIn, colar a descrição, o link e anexar a imagem de exemplo (`2-LinkedIn/servicos/`). Se o LinkedIn limitar o tamanho do texto, encurtar cortando frases do fim, sem tirar preço nem link. Os textos completos estão em `docs/social/linkedin-servicos.md`; resumo:

1. **Sprint de Eficiência**, link /sprint-de-eficiencia, imagem `linkedin-servico-sprint-1200x627.png`.
2. **Sites & Integrações**, /criacao-de-sites, `linkedin-servico-sites-1200x627.png`.
3. **Chatbot com IA para WhatsApp**, /agente-de-ia-para-whatsapp, `linkedin-servico-chatbot-whatsapp-1200x627.png`.
4. **Presença Digital Local**, /presenca-digital-local, `linkedin-servico-presenca-1200x627.png`.
5. **Branding & Identidade**, /branding-e-identidade, `linkedin-servico-branding-1200x627.png`.
6. **Continuidade**, /continuidade, `linkedin-servico-continuidade-1200x627.png`.

Não pedir avaliações nem recomendações. Não publicar post de apresentação (o Dyones decide).

## Tarefa C: alinhar o Instagram (@v2o5_consultoria)

Em "Editar perfil" (algumas ações só existem no aplicativo; se faltar no navegador, anotar e deixar para o celular):

- **Nome:** V2O5 | Consultoria e tecnologia
- **Nome de usuário:** manter `v2o5_consultoria`
- **Bio** (três linhas):
  ```
  Eficiência comercial e operacional com tecnologia.
  Diagnóstico gratuito de 45 minutos, on-line, em todo o Brasil.
  Agende pelo link.
  ```
- **Link:** https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=bio
- **Foto do perfil:** `1-Instagram/foto-do-perfil-1080.png`
- **Categoria** (conta profissional): Consultoria empresarial
- **Contato:** e-mail e WhatsApp acima; sem endereço.
- **Vincular à Página do Facebook** criada na Tarefa A.
- **Destaques:** as capas estão em `1-Instagram/destaques/` (Método, Soluções, Preços, Case, Diagnóstico). Só criar um destaque se já houver stories arquivados; não publicar story novo. Se não houver, deixar para a rotina semanal e avisar.
- **Publicações antigas:** só listar (título/data) as que usam o nome "ConsultorIA" ou preço antigo, para o Dyones decidir. Não arquivar nem apagar.

## Entrega do agente

Responder com:
1. URL da Página do Facebook criada.
2. Para LinkedIn e Instagram: lista "campo, antes, depois" e uma captura de cada perfil.
3. O que não foi possível (tela diferente, limite de caracteres, ação só no aplicativo).
4. Qualquer aviso da plataforma (verificação, restrição, termos pendentes).

O Dyones leva a URL do Facebook ao Claude Code, que a inclui no `sameAs` do schema (`EMPRESA.redes` em `src/conteudo/home.ts`).
