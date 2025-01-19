import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { FinancialInstrumentEditorFormData } from "stocks-portfolio/client/components/financial_instrument_editor";
import { EditFinancialInstrumentPage } from "stocks-portfolio/client/pages/edit_financial_instrument";
import { useUpdateFinancialInstrumentMutation } from "stocks-portfolio/client/tanstack/query/mutations";

export const Route = createLazyFileRoute("/instrument/$id/")({
  component: PageWrapper,
});

function PageWrapper(): React.JSX.Element {
  const params = Route.useParams();
  const id = params.id;
  const mutation = useUpdateFinancialInstrumentMutation();
  const handleValidate = (formData: FinancialInstrumentEditorFormData): void =>
    mutation.mutate({
      ...formData,
      id: Number.parseInt(id),
    });
  const { query } = Route.useLoaderData();

  const { data } = useSuspenseQuery(query);

  return (
    <EditFinancialInstrumentPage
      instrument={data}
      onValidate={handleValidate}
    />
  );
}
