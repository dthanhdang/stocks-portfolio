import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ListFinancialInstrumentsPage } from "stocks-portfolio/client/pages/list_financial_instruments";
import { useDeleteFinancialInstrumentMutation } from "stocks-portfolio/client/tanstack/query/mutations";

export const Route = createLazyFileRoute("/instrument/")({
  component: PageWrapper,
});

function PageWrapper(): React.JSX.Element {
  const handleDelete = useDeleteFinancialInstrumentMutation().mutate;
  const { query } = Route.useLoaderData();

  const { data } = useSuspenseQuery(query);

  return (
    <ListFinancialInstrumentsPage instruments={data} onDelete={handleDelete} />
  );
}
