import { Env } from "stocks-portfolio/server/queries";
import { createKysely } from "stocks-portfolio/server/queries";

export async function deleteFinancialInstrument(
  env: Env,
  id: number,
): Promise<boolean> {
  const result = await createKysely(env)
    .deleteFrom("financialInstrument")
    .where("id", "=", id)
    .returning("id")
    .executeTakeFirst()
    .then((row) => row !== undefined);

  return result;
}
