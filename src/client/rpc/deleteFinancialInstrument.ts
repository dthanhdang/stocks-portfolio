import { handleError } from "./handleError.js";
import { honoClient } from "./honoClient.js";

export async function deleteFinancialInstrument(id: number): Promise<void> {
  try {
    await honoClient.api.v1.financial_instrument[":id"].$delete({
      param: { id: id.toString() },
    });
  } catch (error) {
    handleError(error, "Error while deleting");
  }
}
