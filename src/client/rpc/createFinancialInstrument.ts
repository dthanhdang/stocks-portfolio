import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { FinancialInstrumentEditorFormData } from "stocks-portfolio/client/components/financial_instrument_editor";

import { handleError } from "./handleError.js";
import { honoClient } from "./honoClient.js";

export async function createFinancialInstrument(
  formData: FinancialInstrumentEditorFormData,
): Promise<FinancialInstrument> {
  try {
    const response = await honoClient.api.v1.financial_instrument.$post({
      json: formData,
    });

    return await response.json();
  } catch (error) {
    handleError(error, "Error while loading");
    throw error;
  }
}
