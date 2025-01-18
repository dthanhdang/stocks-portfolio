import type { FinancialInstrument } from "stocks-portfolio/server/generated/db";

import { Selectable } from "kysely";

export function convertInstrumentFromDatabase({
  ...instrument
}: Selectable<FinancialInstrument>): {
  code: string;
  currency: string;
  id: number;
  name: string;
  type: string;
} {
  return {
    ...instrument,
  };
}
