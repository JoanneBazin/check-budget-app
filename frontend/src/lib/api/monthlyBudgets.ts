import {
  AddMonthlyEntriesProps,
  UpdateMonthlyEntryProps,
} from "@/types/budgets";
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

export const addMonthlyEntries = async ({
  type,
  entries,
  budgetId,
}: AddMonthlyEntriesProps) => {
  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/${type}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(entries),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    updated:
      type === "charges"
        ? { charges: result.charges }
        : { incomes: result.incomes },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};

export const updateMonthlyEntry = async ({
  type,
  entry,
  budgetId,
}: UpdateMonthlyEntryProps) => {
  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/${type}/${entry.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: entry.name, amount: entry.amount }),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    updated:
      type === "charges"
        ? { charge: result.updatedCharge }
        : { income: result.updatedIncome },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};

export const deleteMonthlyEntry = async ({
  type,
  entry,
  budgetId,
}: UpdateMonthlyEntryProps) => {
  const response = await fetch(
    `http://localhost:4000/api/monthly-budgets/${budgetId}/${type}/${entry.id}`,
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
    updated:
      type === "charges" ? { chargeId: entry.id } : { incomeId: entry.id },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};
