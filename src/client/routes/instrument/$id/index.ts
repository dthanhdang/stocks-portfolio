import { createFileRoute } from "@tanstack/react-router";
import { getFinancialInstrumentByIdQuery } from "stocks-portfolio/client/tanstack/query/queries";

export const Route = createFileRoute("/instrument/$id/")({
  loader: async ({ context: { queryClient }, params }) => {
    const query = getFinancialInstrumentByIdQuery(Number.parseInt(params.id));
    const instrument = await queryClient.ensureQueryData(query);

    return { crumb: instrument.name, query, title: instrument.name };
  },
});
