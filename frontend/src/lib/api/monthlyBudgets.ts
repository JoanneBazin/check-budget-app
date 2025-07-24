import { MonthlyBudget } from "@shared/schemas";

export const createMonthlyBudget = async (budget: MonthlyBudget) => {
  const response = await fetch("http://localhost:4000/api/monthly-budgets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};
