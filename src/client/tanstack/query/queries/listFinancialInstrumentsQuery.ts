import type { UseSuspenseQueryOptions } from "@tanstack/react-query";
import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { listFinancialInstruments } from "stocks-portfolio/client/rpc";

export function listFinancialInstrumentsQuery(): UseSuspenseQueryOptions<
  FinancialInstrument[]
> {
  return {
    queryFn: listFinancialInstruments,
    queryKey: ["INSTRUMENT"],
  } as const;
}
