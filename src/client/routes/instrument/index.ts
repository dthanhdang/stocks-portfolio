import { createFileRoute } from "@tanstack/react-router";
import { listFinancialInstrumentsQuery } from "stocks-portfolio/client/tanstack/query/queries";

export const Route = createFileRoute("/instrument/")({
  loader: async ({ context: { queryClient } }) => {
    const query = listFinancialInstrumentsQuery();
    await queryClient.ensureQueryData(query);

    return { crumb: "Instruments", query, title: "Instruments" };
  },
});
