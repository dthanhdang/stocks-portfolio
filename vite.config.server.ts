import type { UserConfig } from "vite";

import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const isDev = mode === "development";
  let devServerPlugin;
  if (isDev) {
    devServerPlugin = devServer({
      adapter: cloudflareAdapter,
      entry: "src/server/index.ts",
    });
  }

  return {
    cacheDir: ".vite/server",
    plugins: [
      build({
        entry: ["src/server/index.ts"],
      }),
      devServerPlugin,
    ],
    server: {
      port: 3000,
    },
  };
});
