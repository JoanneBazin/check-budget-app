import { z } from "zod";

export const budgetEntrySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long")
    .trim(),
  amount: z.number().min(0, "Le montant doit être positif"),
});

export const budgetEntryInputSchema = z.union([
  budgetEntrySchema,
  z.array(budgetEntrySchema).min(1, "Au moins une charge est requise"),
]);

export type BudgetEntryInput = z.infer<typeof budgetEntryInputSchema>;
