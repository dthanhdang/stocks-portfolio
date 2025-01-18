import * as v from "valibot";

export const formDataSchema = v.strictObject({
  code: v.pipe(
    v.string("Code is required"),
    v.maxLength(10, "Code must be alphanumeric and up to 10 characters"),
    v.minLength(1, "Code is required"),
  ),
  currency: v.pipe(
    v.string("Currency is required"),
    v.maxLength(3, "Currency must be a valid 3-letter code"),
    v.minLength(1, "Currency is required"),
  ),
  name: v.pipe(
    v.string("Name is required"),
    v.minLength(1, "Name is required"),
  ),
  type: v.string("Type is required"),
});

export type FinancialInstrumentEditorFormData = v.InferOutput<
  typeof formDataSchema
>;
