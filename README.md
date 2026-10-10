# v2o5

Site novo da V2O5 Vendas e Tecnologia.

- Contexto rápido do projeto: `CLAUDE.md`
- Memória detalhada: `memory/` (decisões, pendências, marca, oferta, SEO, infra, motion, case Motors)
- Plano completo: `docs/2026-10-08-plano-novo-site.md`
- Próxima etapa: `docs/HANDOFF.md`

## Rodar

```
npm install
npm run dev      # http://localhost:3000
npm test         # Vitest
npm run lint
npm run build
```

Código em `src/` (Next.js 16, React 19, Tailwind 4). Textos e números da home em `src/conteudo/home.ts`; cores em `src/lib/tokens.ts`; geometria do logo em `src/lib/marca.ts`.
