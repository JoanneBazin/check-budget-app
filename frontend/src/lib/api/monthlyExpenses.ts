import { AddExpensesProps } from "@/types/budgets";

export const addExpenses = async ({ expenses, budgetId }: AddExpensesProps) => {
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
