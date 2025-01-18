import type { Insertable } from "kysely";
import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";

import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

import { createFinancialInstrument } from "./createFinancialInstrument.js";
import { getFinancialInstrumentbyId } from "./getFinancialInstrumentById.js";
import { listFinancialInstruments } from "./listFinancialInstruments.js";

async function testGetFinancialInstrument(
  id: number,
  expectedInstrument: Insertable<FinancialInstrument>,
): Promise<void> {
  const instrument = await getFinancialInstrumentbyId(env, id);
  expect(instrument).toBeDefined();

  if (instrument) {
    expect(instrument).toEqual({ ...expectedInstrument, id });
  }
}

async function testListFinancialInstrument(
  id: number,
  expectedInstrument: Insertable<FinancialInstrument>,
): Promise<void> {
  const instruments = await listFinancialInstruments(env);
  expect(instruments.length).toBeGreaterThan(0);

  const instrument = instruments.find((item) => item.id === id);
  expect(instrument).toBeDefined();
  if (instrument) {
    expect(instrument).toEqual({ ...expectedInstrument, id });
  }
}

describe("get financial instrument queries", () => {
  it("does not return non-existent instruments", async () => {
    const instrument = await getFinancialInstrumentbyId(env, 999);
    expect(instrument).toBeUndefined();
  });

  it("returns an existent instrument", async () => {
    const inputInstrument: Insertable<FinancialInstrument> = {
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
      await Promise.all([
        testGetFinancialInstrument(id, inputInstrument),
        testListFinancialInstrument(id, inputInstrument),
      ]);
    }
  });
});
