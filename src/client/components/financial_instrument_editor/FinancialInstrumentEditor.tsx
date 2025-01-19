import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import React from "react";

import {
  type FinancialInstrumentEditorFormData,
  formDataSchema,
} from "./FinancialInstrumentEditorFormData.js";

// Default initial values based on FinancialInstrumentEditorFormData
const defaultInitialValues: FinancialInstrumentEditorFormData = {
  code: "AMZN",
  currency: "USD",
  name: "Amazon",
  type: "Stock",
};

// Set props for the component
type FinancialInstrumentEditorProps = {
  initialValues?: FinancialInstrumentEditorFormData;
  onValidate: (data: FinancialInstrumentEditorFormData) => void;
};

export function FinancialInstrumentEditor({
  initialValues,
  onValidate,
}: FinancialInstrumentEditorProps): React.JSX.Element {
  const form = useForm<FinancialInstrumentEditorFormData>({
    initialValues: initialValues ?? defaultInitialValues,
    validate: valibotResolver(formDataSchema),
  });

  /*function handleValidate(data: FinancialInstrumentEditorFormData): void {
    onValidate(data);
  }*/

  const handleValidate = form.onSubmit(onValidate);

  return (
    <form onSubmit={handleValidate}>
      <Stack className="gap-5">
        <TextInput {...form.getInputProps("code")} label="Code :" />
        <TextInput {...form.getInputProps("name")} label="Name :" />

        <Select
          {...form.getInputProps("type")}
          data={[
            "Stock",
            "Bond",
            "ETF",
            "Index Fund",
            "Private Equity",
            "Crypto",
          ]}
          label="Type"
          placeholder="Select type"
        />

        <Select
          {...form.getInputProps("currency")}
          data={["EUR", "USD", "GBP", "JPY", "HKD"]}
          label="Currency"
          placeholder="Select currency"
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
