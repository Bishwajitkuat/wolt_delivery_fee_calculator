import { z } from "zod";

// declaring the schema for the user inputs
export const InputDataSchema = z.object({
  cartValue: z.coerce.number().min(1),
  distance: z.coerce.number().min(1),
  itemNumber: z.coerce.number().min(1),
  dateTime: z.coerce.date(),
});

// getting type from z schema
export type InputDataType = z.infer<typeof InputDataSchema>;
