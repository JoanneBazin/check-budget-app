import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddExpensesProps } from "@/types/budgets";
import { addExpenses } from "@/lib/api/monthlyExpenses";

export const useAddExpensesMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddExpensesProps) =>
      addExpenses({ expenses, budgetId }),
    onSuccess: ({ expenses: newExpenses, remainingBudget }) => {
      if (!currentBudget) return;
      const updatedBudget = {
        ...currentBudget,
        expenses: [...currentBudget?.expenses, ...newExpenses],
        remainingBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};
