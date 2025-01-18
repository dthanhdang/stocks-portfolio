import type { AppType } from "stocks-portfolio/server/routes";

import { hc } from "hono/client";

import { HTTPError } from "./HTTPError.js";

export const honoClient = hc<AppType>(import.meta.env.VITE_API_URL, {
  fetch: (request: RequestInfo | URL, init?: RequestInit) =>
    fetch(request, {
      ...init,
    }).then((response) => {
      if (response.ok) return response;
      else throw new HTTPError(response);
    }),
});
