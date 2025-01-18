import React, { ComponentProps } from "react";
import { FinancialInstrumentsList } from "stocks-portfolio/client/components/financial_instruments_list";

type ListFinancialInstrumentsPageProps = ComponentProps<
  typeof FinancialInstrumentsList
>;

export function ListFinancialInstrumentsPage(
  props: ListFinancialInstrumentsPageProps,
): React.JSX.Element {
  return <FinancialInstrumentsList {...props} />;
}
