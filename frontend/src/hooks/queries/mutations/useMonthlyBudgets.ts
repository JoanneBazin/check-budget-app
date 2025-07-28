import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyBudget } from "@shared/schemas";
import { createMonthlyBudget } from "@/lib/api/monthlyBudgets";
import { getWeeksInMonth } from "@/lib/getWeeksInMonth";

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
