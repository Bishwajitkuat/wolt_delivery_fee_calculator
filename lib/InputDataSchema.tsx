import { z } from "zod";

// declaring the schema for the user inputs
export const InputDataSchema = z.object({
  cartValue: z.coerce.number().min(1, "Please insert a number"),
  distance: z.coerce.number().min(1, "Please insert a number"),
  itemNumber: z.coerce.number().min(1, "Please insert a number"),
  date: z.string().min(1, "Please select a valid date"),
  time: z.string().min(1, "Please select a valid time"),
});

// getting type from z schema
export type InputDataType = z.infer<typeof InputDataSchema>;

export type FeeCalculatorInputType = {
  cartValue: number;
  distance: number;
  itemNumber: number;
  dateTime: Date;
};
