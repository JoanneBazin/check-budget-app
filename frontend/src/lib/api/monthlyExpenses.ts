import {
  AddExpensesProps,
  DeleteExpenseProps,
  UpdateExpenseProps,
} from "@/types";
import { getCurrentOnlineStatus } from "../network";

export const addExpenses = async ({ expenses, budgetId }: AddExpensesProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/expenses`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expenses),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const updateExpense = async ({
  expense,
  budgetId,
}: UpdateExpenseProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/expenses/${expense.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expense),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteExpense = async ({
  expenseId,
  budgetId,
}: DeleteExpenseProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/expenses/${expenseId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    expenseId,
    remainingBudget: result.remainingBudget,
  };
};
