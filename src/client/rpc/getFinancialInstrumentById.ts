import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { handleError } from "./handleError.js";
import { honoClient } from "./honoClient.js";

export async function getFinancialInstrumentById(
  id: number,
): Promise<FinancialInstrument> {
  try {
    const response = await honoClient.api.v1.financial_instrument[":id"].$get({
      param: { id: id.toString() },
    });

    return await response.json();
  } catch (error) {
    handleError(error, "Error while loading");
  }
}
