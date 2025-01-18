import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

import { createFinancialInstrument } from "./createFinancialInstrument.js";
import { deleteFinancialInstrument } from "./deleteFinancialInstrument.js";
import { getFinancialInstrumentbyId } from "./getFinancialInstrumentById.js";
import { listFinancialInstruments } from "./listFinancialInstruments.js";

describe("delete financial instrument queries", () => {
  it("does not delete non-existent instrument", async () => {
    const sucess = await deleteFinancialInstrument(env, 999);
    expect(sucess).toBeFalsy();
  });

  it("deletes an existent instrument and does not allow double deletion", async () => {
    const inputInstrument = {
      code: "my-code",
      currency: "instrument-currency",
      name: "my financial instrument",
      type: "my-type",
    };
    const createdFinancialInstrument = await createFinancialInstrument(
      env,
      inputInstrument,
    );
    expect(createdFinancialInstrument).toBeDefined();
    if (createdFinancialInstrument !== undefined) {
      const { id } = createdFinancialInstrument;

      let success = await deleteFinancialInstrument(env, id);
      expect(success).toBeTruthy();

      success = await deleteFinancialInstrument(env, id);
      expect(success).toBeFalsy();

      const instrument = await getFinancialInstrumentbyId(env, id);
      expect(instrument).toBeUndefined();

      const instruments = await listFinancialInstruments(env);
      expect(instruments.find((item) => item.id === id)).toBeUndefined();
    }
  });
});
