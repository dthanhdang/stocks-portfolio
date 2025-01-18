import { createFactory } from "hono/factory";

type Env = {
  Bindings: {
    ASSETS: Fetcher;
    DB: D1Database;
  };
};

export const honoFactory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (_, next) => {
      await next();
    });
  },
});
