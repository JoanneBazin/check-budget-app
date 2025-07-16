import { z } from "zod";

export const budgetEntrySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long")
    .trim(),
  amount: z.coerce.number().min(0, "Le montant doit être positif"),
});

export const budgetEntryInputSchema = z.union([
  budgetEntrySchema,
  z.array(budgetEntrySchema).min(1, "Au moins une charge est requise"),
]);

export const monthlyBudgetSchema = z.object({
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  remainingBudget: z.number().optional(),
  incomes: z.array(budgetEntrySchema).optional(),
  charges: z.array(budgetEntrySchema).optional(),
});

export const queryDateSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2025),
});

export type BudgetEntryInput = z.infer<typeof budgetEntryInputSchema>;
export type BudgetEntry = z.infer<typeof budgetEntrySchema>;
