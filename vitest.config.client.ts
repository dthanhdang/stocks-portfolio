import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [viteReact()],
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    include: ["./src/client/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./src/client/test/setup.ts"],
  },
});
