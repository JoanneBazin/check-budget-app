import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";

export const fetchFixedIncomes = async () => {
  const response = await fetch("http://localhost:4000/api/fixed-incomes", {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Revenus fixes indisponibles");

  return response.json();
};

export const addFixedIncomes = async (incomes: BudgetEntryForm[]) => {
  const response = await fetch(`http://localhost:4000/api/fixed-incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(incomes),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const updateFixedIncome = async (income: BudgetEntry) => {
  const response = await fetch(
    `http://localhost:4000/api/fixed-incomes/${income.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(income),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};
export const deleteFixedIncomes = async (incomeId: string) => {
  const response = await fetch(
    `http://localhost:4000/api/fixed-incomes/${incomeId}`,
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
    incomeId,
  };
};
