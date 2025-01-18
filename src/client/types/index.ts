import type { InferResponseType } from "hono";

import { honoClient } from "stocks-portfolio/client/rpc";

const _route = honoClient.api.v1.financial_instrument[":id"].$get;
export type FinancialInstrument = InferResponseType<typeof _route, 200>;
