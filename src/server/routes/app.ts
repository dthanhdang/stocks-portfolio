import { cors } from "hono/cors";

import { financialInstrumentRoute } from "./financialInstrumentRoute.js";
import { honoFactory } from "./honoFactory.js";

export const app = honoFactory
  .createApp()
  .use(
    "/api/v1/*",
    cors({
      credentials: true,
      origin: import.meta.env.VITE_CLIENT_URL,
    }),
  )
  // ... add routes
  .route("/api/v1/financial_instrument", financialInstrumentRoute)
  .get("*", (c) => c.env.ASSETS.fetch(c.req.raw));

export type AppType = typeof app;
