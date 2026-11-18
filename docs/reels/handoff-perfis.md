# Handoff: alinhar os perfis das redes (17/11/2026)

Para o agente que vai executar. Contexto: a V2O5 prepara 30 dias de posts e reels em Instagram, Facebook e LinkedIn (`docs/reels/cronograma.md`). Os perfis já existem, mas o `docs/social/perfis.md` (31/10) foi escrito antes e é um kit de textos, não uma lista de execução. Este arquivo é a lista de execução. O texto de cada campo continua em `docs/social/perfis.md`; aqui ficam as ordens e as conferências.

Prazo desejado: sexta 20/11/2026. O primeiro post sai sábado 21/11.

## Antes de começar
1. Leia `CLAUDE.md` (regras do projeto), `docs/social/perfis.md` inteiro e `docs/reels/cronograma.md`.
2. Branch: nova, `claude/...`, a partir do `main`; PR contra `main`; push só nela.
3. Regras de texto: português do Brasil, sem travessão, sem "não é X, é Y", sem tríades de efeito; nome fixo "V2O5 Vendas e Tecnologia"; assinatura "V2O5 | Eficiência comercial e operacional com tecnologia."; preço só do que está em `src/conteudo/ofertas.ts` e `sprint.ts`; número de resultado só com fonte e período.

## O que o agente não faz sem o Dyones
- Publicar post ou mudar nome de usuário dos perfis (o `@v2o5_consultoria` e o endereço `v2o5-consutoria` do LinkedIn são o `sameAs` do site; trocá-los exige mudar o schema junto).
- Aceitar termos, cadastrar cartão, conectar anúncio ou alterar permissão de conta.
- Pôr no perfil número de seguidores, depoimento ou resultado.
- Se uma tela pedir login, código ou confirmação do dono, parar e pedir ao Dyones.

## Passo 0: estado de hoje
Para cada rede, registre em uma linha o que está no ar (nome, tagline ou bio, site, foto, capa, categoria, botão). O `perfis.md` diz que o Facebook "não existe" e o LinkedIn estava com o domínio errado (v205.com.br); o Dyones disse que os perfis já foram criados. Confirme e atualize a tabela "O que está errado hoje" do `perfis.md` com a data. A página do Instagram ficou ilegível por consulta pública em 31/10: o agente precisa de acesso logado.

## Checklist por rede (texto exato em `perfis.md`)

### Instagram (@v2o5_consultoria)
- [ ] Conta profissional, categoria "Consultoria empresarial".
- [ ] Nome pesquisável "V2O5 | Consultoria e tecnologia" e a bio do `perfis.md`.
- [ ] Link: `https://www.v2o5.com.br/diagnostico?utm_source=instagram&utm_medium=bio` (o link da bio carrega UTM de `bio`; os do reel vêm do `scripts/utm-reels.mjs`).
- [ ] Foto `design/marca/bloco-1080.png`; cinco destaques com as capas de `design/marca/redes/instagram-destaque-*.png` (Método, Soluções, Preços, Case, Diagnóstico).
- [ ] Botão de contato por WhatsApp e vínculo à página do Facebook.
- [ ] Arquivar publicações que usem "ConsultorIA" ou preço antigo; não apagar o que não conflita.
- [ ] Conferir no app se a opção "Teste" (reel de teste) aparece e anotar o número de seguidores (hoje, 7).

### Facebook (página)
- [ ] Nome "V2O5 Vendas e Tecnologia", categoria "Consultoria empresarial", descrição do `perfis.md`.
- [ ] Contato: WhatsApp, e-mail diagnostico@v2o5.com.br e site; sem endereço (negócio on-line).
- [ ] Foto `bloco-1080.png`; capa `design/marca/redes/facebook-capa-1640x624.png`.
- [ ] Botão de ação "Enviar mensagem" pelo WhatsApp (ou "Agendar" para /diagnostico).
- [ ] Vincular ao Instagram; anotar a URL da página.

### LinkedIn (página da empresa e perfil do Dyones)
- [ ] Corrigir nome ("V2O5 Vendas e Tecnologia"), tagline, site `https://www.v2o5.com.br`, setor, botão e "Sobre" do `perfis.md`; remover v205.com.br.
- [ ] Logo `bloco-1080.png`; banner `design/marca/redes/linkedin-banner-empresa-1128x191.png`.
- [ ] Perfil do Dyones (Dyones Oliveira): cargo "Fundador, V2O5 Vendas e Tecnologia", empresa atual ligada à página, banner `linkedin-banner-pessoal-1584x396.png`. A foto dele ainda falta (pendências 1 e 11): deixar anotado, não improvisar.
- [ ] Manter o endereço `v2o5-consutoria`.

### Perfil da Empresa no Google
Só leitura nesta rodada: conferir se a descrição ainda diz "de Curitiba" e se a verificação está pendente. Alterações pedem o "pode" do Dyones (ver `perfis.md`).

## Depois que as URLs existirem
1. Em `src/conteudo/home.ts` (bloco "Perfis oficiais", perto da linha 974) acrescentar a URL do Facebook; `src/lib/schema.ts` lê de `EMPRESA.redes` para o `sameAs`. Instagram e LinkedIn só mudam se o endereço mudou.
2. Rodar `npm run lint`, `npm test` e `npm run build`; só então abrir o PR. Se algum teste falhar, dizer qual, sem desligá-lo.
3. Atualizar `memory/pendencias.md` (itens 37 e 38) e o `perfis.md`; escrever em `memory/decisoes.md` o que foi decidido.

## O que devolver ao Dyones
Uma lista curta: por rede, o que foi feito e o que ficou pendente com o motivo; as URLs finais; o número de seguidores de cada rede; se o botão Teste aparece; o link do PR. Nada de "feito" sem conferir no perfil.
