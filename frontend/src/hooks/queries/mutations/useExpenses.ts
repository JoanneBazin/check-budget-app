import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddExpensesProps,
  DeleteExpenseProps,
  UpdateExpenseProps,
} from "@/types/budgets";
import {
  addExpenses,
  deleteExpense,
  updateExpense,
} from "@/lib/api/monthlyExpenses";

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
        expenses: [...currentBudget.expenses, ...newExpenses],
        remainingBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useUpdateExpenseMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ expense, budgetId }: UpdateExpenseProps) =>
      updateExpense({ expense, budgetId }),
    onSuccess: ({ updatedExpense, remainingBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        expenses: currentBudget.expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        ),
        remainingBudget,
      };
      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient();
  const setCurrentBudget = useBudgetStore((s) => s.setCurrentBudget);
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return useMutation({
    mutationFn: ({ expenseId, budgetId }: DeleteExpenseProps) =>
      deleteExpense({ expenseId, budgetId }),
    onSuccess: ({ expenseId, remainingBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        expenses: currentBudget.expenses.filter(
          (expense) => expense.id !== expenseId
        ),
        remainingBudget,
      };
      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};
