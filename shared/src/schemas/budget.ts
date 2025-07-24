import { z } from "zod";

export const budgetEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Le nom est requis")
    .max(50, "Le nom est trop long"),

  amount: z.coerce.number().min(0.01, "Le montant doit être positif"),
});

export const expenseEntrySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long")
    .trim(),
  amount: z.coerce.number().min(0, "Le montant doit être positif"),
  weekNumber: z.coerce.number().min(1).max(5),
  category: z
    .string()
    .min(2, "Le nom de catégorie est trop court")
    .max(20, "Le nom de catégorie est trop long")
    .trim()
    .optional(),
});

export const monthlyBudgetSchema = z.object({
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  remainingBudget: z.coerce.number().optional(),
  incomes: z.array(budgetEntrySchema).optional(),
  charges: z.array(budgetEntrySchema).optional(),
  expenses: z.array(expenseEntrySchema).optional(),
});

export const frontBudgetEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Le nom est requis")
    .max(50, "Le nom est trop long"),

  amount: z
    .string()
    .min(1, "Le montant est requis")
    .transform((val) => {
      const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
      return parseFloat(cleaned);
    })
    .refine(
      (val) => !isNaN(val) && val > 0,
      "Veuillez saisir un montant positif valide"
    ),
});

export const frontBudgetSchema = z.object({
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  remainingBudget: z.number().optional(),
  incomes: z.array(frontBudgetEntrySchema).optional(),
  charges: z.array(frontBudgetEntrySchema).optional(),
});

export const queryDateSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2025),
});

export type BudgetEntry = z.infer<typeof budgetEntrySchema>;
export type MonthlyBudget = z.infer<typeof monthlyBudgetSchema>;
