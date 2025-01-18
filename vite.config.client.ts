import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  cacheDir: ".vite/client",
  plugins: [viteReact(), TanStackRouterVite()],
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "/api"),
        target: "http://localhost:3000",
      },
    },
  },
});
