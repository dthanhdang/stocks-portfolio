import type { Insertable, Selectable } from "kysely";
import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";
import type { Env } from "stocks-portfolio/server/queries";

import { createKysely } from "stocks-portfolio/server/queries";

export async function createFinancialInstrument(
  env: Env,
  instrument: Insertable<FinancialInstrument>,
): Promise<Selectable<FinancialInstrument> | undefined> {
  const result = await createKysely(env)
    .insertInto("financialInstrument")
    .values(instrument)
    .returning(["id", "name", "type", "code", "currency"])
    .executeTakeFirst();

  return result;
}
