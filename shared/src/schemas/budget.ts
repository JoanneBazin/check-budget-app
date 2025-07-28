import { z } from "zod";

export const budgetEntrySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .nonempty("Le nom est requis")
    .max(50, "Le nom est trop long"),

  amount: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
      }
      return val;
    },
    z
      .number()
      .refine(
        (val) => !isNaN(val) && val > 0,
        "Veuillez saisir un montant positif valide"
      )
  ),
});

export const expenseEntrySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long")
    .trim(),
  amount: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.trim().replace(/\s+/g, "").replace(",", ".");
        return Math.round(Number(cleaned) * 100) / 100;
      }
      return val;
    },
    z
      .number()
      .refine(
        (val) => !isNaN(val) && val > 0,
        "Veuillez saisir un montant positif valide"
      )
  ),
  weekNumber: z.number().min(1).max(5),
  category: z
    .string()
    .min(2, "Le nom de catégorie est trop court")
    .max(20, "Le nom de catégorie est trop long")
    .trim()
    .optional(),
});

export const monthlyBudgetSchema = z.object({
  id: z.string().optional(),
  month: z
    .number()
    .min(1, "Le mois doit être compris entre 1 et 12")
    .max(12, "Le mois doit être compris entre 1 et 12"),
  year: z.number().min(2025, "L'année doit être supérieure ou égale à 2025"),
  isCurrent: z.boolean(),
  remainingBudget: z.number().optional(),
  weeklyBudget: z.number().optional(),
  numberOfWeeks: z.number().min(4).max(5),
  incomes: z.array(budgetEntrySchema).default([]),
  charges: z.array(budgetEntrySchema).default([]),
  expenses: z.array(expenseEntrySchema).default([]),
});

export const queryDateSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2025),
});

export type BudgetEntry = z.infer<typeof budgetEntrySchema>;
export type ExpenseEntry = z.infer<typeof expenseEntrySchema>;
export type MonthlyBudget = z.infer<typeof monthlyBudgetSchema>;
