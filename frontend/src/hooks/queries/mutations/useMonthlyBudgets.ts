import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyBudget } from "@shared/schemas";
import {
  addMonthlyEntries,
  createMonthlyBudget,
  deleteMonthlyEntry,
  updateMonthlyEntry,
} from "@/lib/api/monthlyBudgets";
import { getWeeksInMonth } from "@/lib/getWeeksInMonth";
import {
  AddMonthlyEntriesProps,
  UpdateMonthlyEntryProps,
} from "@/types/budgets";

export const useCreateBudgetMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const setCurrentWeeks = useBudgetStore((s) => s.setWeeksInMonth);

  return useMutation({
    mutationFn: (budget: MonthlyBudget) => createMonthlyBudget(budget),
    onSuccess: (budget) => {
      if (budget.isCurrent) {
        setCurrentBudget(budget);
        setCurrentWeeks(getWeeksInMonth(budget.year, budget.month));
      }
      queryClient.setQueryData(["currentBudget"], budget);
    },
  });
};

export const useAddMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ type, entries, budgetId }: AddMonthlyEntriesProps) =>
      addMonthlyEntries({ type, entries, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.charges
          ? [...currentBudget.charges, ...updated.charges]
          : [...currentBudget.charges],
        incomes: updated.incomes
          ? [...currentBudget.incomes, ...updated.incomes]
          : [...currentBudget.incomes],
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useUpdateMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ type, entry, budgetId }: UpdateMonthlyEntryProps) =>
      updateMonthlyEntry({ type, entry, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.charge
          ? [...currentBudget.charges, updated.charge]
          : [...currentBudget.charges],
        incomes: updated.income
          ? [...currentBudget.incomes, updated.income]
          : [...currentBudget.incomes],
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useDeleteMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ type, entry, budgetId }: UpdateMonthlyEntryProps) =>
      deleteMonthlyEntry({ type, entry, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.chargeId
          ? currentBudget.charges.filter(
              (entry) => entry.id !== updated.chargeId
            )
          : [...currentBudget.charges],
        incomes: updated.incomeId
          ? currentBudget.incomes.filter(
              (entry) => entry.id !== updated.incomeId
            )
          : [...currentBudget.incomes],
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};
