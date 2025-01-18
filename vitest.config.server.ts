import {
  defineWorkersProject,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

export default defineWorkersProject(async () => {
  const migrationsPath = path.join(import.meta.dirname, "migrations");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    test: {
      coverage: {
        include: ["./src/server/**/*.ts"],
        provider: "istanbul",
      },
      env: {
        VITEST: "true",
      },
      include: ["./src/server/**/*.test.ts"],
      poolOptions: {
        workers: {
          main: "./src/server/index.ts",
          miniflare: {
            bindings: {
              CLIENT_URL: "http://localhost:5173",
              TEST_MIGRATIONS: migrations,
            },
          },
          singleWorker: true,
          wrangler: {
            configPath: "./wrangler.toml",
          },
        },
      },
      setupFiles: ["src/server/test/applyMigrations.ts"],
    },
  };
});
