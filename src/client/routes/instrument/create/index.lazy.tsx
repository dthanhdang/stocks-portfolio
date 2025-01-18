import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateFinancialInstrumentPage } from "stocks-portfolio/client/pages/create_financial_instrument";
import { useCreateFinancialInstrumentMutation } from "stocks-portfolio/client/tanstack/query/mutations";

export const Route = createLazyFileRoute("/instrument/create/")({
  component: PageWrapper,
});

function PageWrapper(): React.JSX.Element {
  const handleValidate = useCreateFinancialInstrumentMutation().mutate;

  return <CreateFinancialInstrumentPage onValidate={handleValidate} />;
}
