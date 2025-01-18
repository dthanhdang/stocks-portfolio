declare module "cloudflare:test" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProvidedEnv extends Env {
    DB: D1Database;
    TEST_MIGRATIONS: D1Migration[];
  }
}
