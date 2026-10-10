import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Ambiente `node` por padrão (molde da Motors): a maior parte dos testes lê
 * fonte e faz conta. Quem precisa de DOM declara no arquivo, com
 * `// @vitest-environment jsdom` na primeira linha.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    testTimeout: 15000,
  },
});
