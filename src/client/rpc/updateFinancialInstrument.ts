import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { handleError } from "./handleError.js";
import { honoClient } from "./honoClient.js";

export async function updateFinancialInstrument(
  financialInstrument: FinancialInstrument,
): Promise<void> {
  try {
    const { id } = financialInstrument;
    await honoClient.api.v1.financial_instrument[":id"].$put({
      json: { ...financialInstrument, id },
      param: { id: id.toString() },
    });
  } catch (error) {
    handleError(error, "Error while updating");
  }
}
