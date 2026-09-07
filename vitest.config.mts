import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Só funções puras são testadas. Componente de marketing não entra: o que
 * eles fazem é layout, e teste de layout envelhece mais rápido que o layout.
 *
 * O alvo é a lógica cujo próprio comentário documenta uma armadilha — que é
 * a definição de algo que merecia teste.
 */
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
