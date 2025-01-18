import type { Selectable, Updateable } from "kysely";
import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";
import type { Env } from "stocks-portfolio/server/queries";

import { createKysely } from "stocks-portfolio/server/queries";

export async function updateFinancialInstrument(
  env: Env,
  {
    id,
    ...instrument
  }: Omit<Updateable<FinancialInstrument>, "id"> &
    Required<Pick<Updateable<FinancialInstrument>, "id">>,
): Promise<Selectable<FinancialInstrument> | undefined> {
  const result = await createKysely(env)
    .updateTable("financialInstrument")
    .set(instrument)
    .where("id", "=", id)
    .returning(["id", "name", "type", "code", "currency"])
    .executeTakeFirst();
  return result;
}
