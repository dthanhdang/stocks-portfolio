import type { ComponentProps } from "react";

import React from "react";
import { FinancialInstrumentEditor } from "stocks-portfolio/client/components/financial_instrument_editor";
import { FinancialInstrument } from "stocks-portfolio/client/types";

type EditFinancialInstrumentPageProps = Pick<
  ComponentProps<typeof FinancialInstrumentEditor>,
  "onValidate"
> & { instrument: FinancialInstrument };

export function EditFinancialInstrumentPage(
  props: EditFinancialInstrumentPageProps,
): React.JSX.Element {
  const {
    instrument: { id, ...instrument },
  } = props;
  return (
    <FinancialInstrumentEditor {...props} initialValues={instrument} key={id} />
  );
}
