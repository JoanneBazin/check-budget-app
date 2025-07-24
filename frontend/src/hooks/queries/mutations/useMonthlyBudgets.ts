import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyBudget } from "@shared/schemas";
import { createMonthlyBudget } from "@/lib/api/monthlyBudgets";

export const useCreateBudgetMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);

  return useMutation({
    mutationFn: (budget: MonthlyBudget) => createMonthlyBudget(budget),
    onSuccess: (budget) => {
      if (budget.isCurrent) {
        setCurrentBudget(budget);
      }
      queryClient.setQueryData(["currentBudget"], budget);
    },
  });
};
