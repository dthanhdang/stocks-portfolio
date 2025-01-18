import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { handleError } from "./handleError.js";
import { honoClient } from "./honoClient.js";

export async function listFinancialInstruments(): Promise<
  FinancialInstrument[]
> {
  try {
    const response = await honoClient.api.v1.financial_instrument.$get();

    return await response.json();
  } catch (error) {
    handleError(error, "Error while loading");
  }
}
