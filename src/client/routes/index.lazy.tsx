import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  FinancialInstrumentEditor,
  FinancialInstrumentEditorFormData,
} from "stocks-portfolio/client/components/financial_instrument_editor";

function handleValidate(instrument: FinancialInstrumentEditorFormData): void {
  console.log(instrument);
}

export const Route = createLazyFileRoute("/")({
  component: (): React.JSX.Element => (
    <FinancialInstrumentEditor onValidate={handleValidate} />
  ),
});
