import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ListFinancialInstrumentsPage } from "stocks-portfolio/client/pages/list_financial_instruments";

export const Route = createLazyFileRoute("/instrument/")({
  component: PageWrapper,
});

const handleDelete = (): void => {
  /*do nothing*/
};

function PageWrapper(): React.JSX.Element {
  const { query } = Route.useLoaderData();

  const { data } = useSuspenseQuery(query);

  return (
    <ListFinancialInstrumentsPage instruments={data} onDelete={handleDelete} />
  );
}
