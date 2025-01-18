import {
  numericalIdSchema,
  vValidator,
} from "@meow-meow-dev/server-utilities/validation";
import { convertInstrumentFromDatabase } from "stocks-portfolio/server/conversions";
import {
  createFinancialInstrument,
  deleteFinancialInstrument,
  getFinancialInstrumentbyId,
  listFinancialInstruments,
  updateFinancialInstrument,
} from "stocks-portfolio/server/queries/financial_instrument";
import * as v from "valibot";

import { honoFactory } from "./honoFactory.js";

const financialInstrumentSchema = v.strictObject({
  code: v.string(),
  currency: v.string(),
  id: v.number(),
  name: v.string(),

  type: v.string(),
});

export const financialInstrumentRoute = honoFactory
  .createApp()
  .get("/", async (c) => {
    const rows = await listFinancialInstruments(c.env);

    const results = rows.map((instrument) =>
      convertInstrumentFromDatabase(instrument),
    );

    return c.json(results);
  })

  .get(
    "/:id",
    vValidator(
      "param",
      v.strictObject({
        id: numericalIdSchema,
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      console.log(id);
      const row = await getFinancialInstrumentbyId(c.env, id);

      if (row === undefined) return c.text("Not found", 404);
      return c.json(convertInstrumentFromDatabase(row), 200);
    },
  )

  .post(
    "/",
    vValidator("json", v.omit(financialInstrumentSchema, ["id"])),
    async (c) => {
      const instrument = c.req.valid("json");

      const createdInstrument = await createFinancialInstrument(
        c.env,
        instrument,
      );

      if (createdInstrument === undefined) {
        return c.text("Internal Server Error", 500);
      }

      return c.json(convertInstrumentFromDatabase(createdInstrument), 200);
    },
  )

  .put(
    "/:id",
    vValidator(
      "param",
      v.strictObject({
        id: numericalIdSchema,
      }),
    ),
    vValidator("json", financialInstrumentSchema),
    async (c) => {
      const { id: pathId } = c.req.valid("param");
      const { id, ...instrument } = c.req.valid("json");
      if (pathId !== id) return c.text("Bad request", 400);

      const updatedInstrument = await updateFinancialInstrument(c.env, {
        ...instrument,
        id: pathId,
      });

      return updatedInstrument
        ? c.json(convertInstrumentFromDatabase(updatedInstrument), 200)
        : c.text("Not found", 404);
    },
  )

  .delete(
    "/:id",
    vValidator(
      "param",
      v.strictObject({
        id: numericalIdSchema,
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const success = await deleteFinancialInstrument(c.env, id);

      return success ? c.text("OK", 200) : c.text("Not found", 404);
    },
  );
