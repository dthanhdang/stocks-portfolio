import type { Selectable } from "kysely";
import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";
import type { Env } from "stocks-portfolio/server/queries";

import { createKysely } from "stocks-portfolio/server/queries";

export async function listFinancialInstruments(
  env: Env,
): Promise<Selectable<FinancialInstrument>[]> {
  const result = await createKysely(env)
    .selectFrom("financialInstrument")
    .select(["id", "name", "code", "type", "currency"])
    .orderBy("name")
    .execute();

  return result;
}
