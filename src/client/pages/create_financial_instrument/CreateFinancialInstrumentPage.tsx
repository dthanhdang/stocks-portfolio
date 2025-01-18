import React, { ComponentProps } from "react";
import { FinancialInstrumentEditor } from "stocks-portfolio/client/components/financial_instrument_editor";

type CreateFinancialInstrumentPageProps = Pick<
  ComponentProps<typeof FinancialInstrumentEditor>,
  "onValidate"
>;

export function CreateFinancialInstrumentPage(
  props: CreateFinancialInstrumentPageProps,
): React.JSX.Element {
  return <FinancialInstrumentEditor {...props} />;
}
