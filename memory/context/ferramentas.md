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
| hostinger (1.2.0) | MCP remoto `https://mcp.hostinger.com` (DNS, e-mail, domínios, hospedagem, VPS) e 7 skills de deploy. Login por OAuth no navegador na primeira chamada: até o Dyones autorizar, as ferramentas não respondem. Serve para os alias de e-mail (pendência 9) e para a troca do DNS (`docs/checagem-antes-do-dns.md`) |

## Já disponíveis
Skills: humanizer (texto público), searchfit-seo (schema, on-page, auditoria), marketing, artifact-design (canvas). MCPs: Supabase, Vercel, GitHub. Chromium em `/opt/pw-browsers` (não rodar `playwright install`).

## Canvas de marca
https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3 (tipo Design, privado). Quadros: B, A, C1, C2, comparações, C1a/b/c, cores, tipografia, aplicações. Logo atual subido como asset `/_blob/e084497a543a24bf8ac0eb879b0a566a`.
