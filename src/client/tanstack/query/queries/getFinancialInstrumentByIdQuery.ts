import type { UseSuspenseQueryOptions } from "@tanstack/react-query";

import { getFinancialInstrumentById } from "stocks-portfolio/client/rpc";

export function getFinancialInstrumentByIdQuery(
  id: number,
): UseSuspenseQueryOptions<
  Awaited<ReturnType<typeof getFinancialInstrumentById>>
> {
  return {
    queryFn: () => getFinancialInstrumentById(id),
    queryKey: ["INSTRUMENT", id.toString()],
  } as const;
}
