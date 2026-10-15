# Ferramentas e habilidades

## Plugins (instalados em 09/10 no ambiente de nuvem, escopo usuário)
O contêiner é temporário: numa sessão nova, confira com `claude plugin list` e reinstale se faltar.
```
claude plugin install frontend-design@anthropic-plugin-directory
claude plugin install audit-suite@anthropic-plugin-directory
claude plugin install perf-profiler-lighthouse-and-core-web-vitals@anthropic-plugin-directory
claude plugin install parallax-threejs@anthropic-plugin-directory
claude plugin install axe-accessibility@anthropic-plugin-directory
# 15/10: marketplace oficial (não vem configurado no contêiner)
claude plugin marketplace add anthropics/claude-plugins-official
claude plugin install hostinger@claude-plugins-official
```
Plugins carregam na sessão seguinte à instalação. Sem recarregar, leia o `SKILL.md` direto em `~/.claude/plugins/cache/anthropic-plugin-directory/<plugin>/<versão>/skills/<skill>/SKILL.md`.

| Plugin | Usar para |
|---|---|
| frontend-design | Direção e execução de UI sem cara de template |
| audit-suite | `web-animation-design`, `emil-design-engineering`, `make-interfaces-feel-better`, `vercel-react-best-practices`, auditorias de perf/a11y/design |
| perf-profiler | Lighthouse e Core Web Vitals explicados |
| parallax-threejs | Depuração de WebGL e regressão visual (MCPs de Chrome DevTools e Playwright) |
| axe-accessibility | Habilidades de a11y; o scanner MCP exige conta Deque (não temos). Alternativa: `@axe-core/playwright` |
| hostinger (1.2.0) | MCP remoto `https://mcp.hostinger.com` e 7 skills de deploy. Só entra por OAuth no navegador, que a nuvem não abre, e não usa o token: para a API, ver "Hostinger por token" abaixo. No catálogo do claude.ai há o "Hostinger Connector" (1.3.0): ativado lá, sincroniza em toda sessão |

## Hostinger por token (15/10)
O Dyones pôs `HOSTINGER_API_TOKEN` no ambiente da nuvem. Variável nova só chega a uma sessão aberta quando a VM dela reinicia (depois de ociosa); sessão nova já recebe. Quem usa o token é o `.mcp.json` da raiz: servidor oficial `hostinger-api-mcp` (npm, da Hostinger), fixado na 3.0.0, com 421 operações (DNS, e-mail, domínios, hospedagem, VPS) atrás de três ferramentas: `search`, `execute` e `multi-execute`. Testado em 15/10 no Node 22: sobe e lista as ferramentas; a chamada autenticada ainda não foi feita. A nuvem só carrega o `.mcp.json` em sessão com um repositório. Sem o MCP, a mesma API responde por curl: `https://developers.hostinger.com/api/...` com `Authorization: Bearer $HOSTINGER_API_TOKEN` (zona: `/api/dns/v1/zones/v2o5.com.br`). Serve para os alias de e-mail (pendência 9) e para a troca do DNS (`docs/checagem-antes-do-dns.md`).

## Já disponíveis
Skills: humanizer (texto público), searchfit-seo (schema, on-page, auditoria), marketing, artifact-design (canvas). MCPs: Supabase, Vercel, GitHub. Chromium em `/opt/pw-browsers` (não rodar `playwright install`).

## Canvas de marca
https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3 (tipo Design, privado). Quadros: B, A, C1, C2, comparações, C1a/b/c, cores, tipografia, aplicações. Logo atual subido como asset `/_blob/e084497a543a24bf8ac0eb879b0a566a`.
