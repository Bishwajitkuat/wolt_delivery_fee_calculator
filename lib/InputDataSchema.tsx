import { z } from "zod";

// declaring the schema for the user inputs
export const InputDataSchema = z.object({
  cartValue: z.coerce.number(),
  distance: z.coerce.number(),
  itemNumber: z.coerce.number(),
  dateTime: z.date(),
});

// getting type from z schema
export type InputDataType = z.infer<typeof InputDataSchema>;
