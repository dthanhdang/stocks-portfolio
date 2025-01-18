import type { Updateable } from "kysely";
import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";

import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

import { createFinancialInstrument } from "./createFinancialInstrument.js";
import { getFinancialInstrumentbyId } from "./getFinancialInstrumentById.js";
import { listFinancialInstruments } from "./listFinancialInstruments.js";
import { updateFinancialInstrument } from "./updateFinancialInstrument.js";

async function testListFinancialInstrument(
  id: number,
  expectedInstrument: Updateable<FinancialInstrument>,
): Promise<void> {
  const instruments = await listFinancialInstruments(env);
  expect(instruments.length).toBeGreaterThan(0);

  const instrument = instruments.find((item) => item.id === id);
  expect(instrument).toBeDefined();
  if (instrument) {
    expect(instrument).toMatchObject({ ...expectedInstrument, id });
  }
}

describe("creates and updates financial instrument queries", () => {
  it("returns an created and updated instrument", async () => {
    const newInstrument = {
      code: "new-code",
      currency: "new-currency",
      name: "new instrument",
      type: "new-type",
    };

    const createdInstrument = await createFinancialInstrument(
      env,
      newInstrument,
    );

    if (createdInstrument) {
      expect(createdInstrument).toEqual({
        ...newInstrument,
        id: createdInstrument.id,
      });
    } else {
      expect.fail();
    }

    const inputInstrument: Omit<Updateable<FinancialInstrument>, "id"> & {
      id: number; // include the id property here in inputInstrument as it is required in the updateFinancialInstrument function
    } = {
      code: "updated-code",
      currency: "updated-currency",
      id: 1,
      name: "updated instrument",
      type: "updated-type",
    };
    const updatedInstrument = await updateFinancialInstrument(env, {
      ...inputInstrument,
    });

    expect(updatedInstrument).toBeDefined();
    if (updatedInstrument) {
      const { ...updatedValues } = updatedInstrument;
      const { id } = updatedInstrument;
      expect(updatedValues).toEqual(inputInstrument);
      await testListFinancialInstrument(id, inputInstrument);

      const fetchedInstrument = await getFinancialInstrumentbyId(env, id);
      expect(fetchedInstrument).toBeDefined();
      if (fetchedInstrument) {
        expect(fetchedInstrument).toMatchObject({ ...inputInstrument, id });
      }
    }
  });
});
