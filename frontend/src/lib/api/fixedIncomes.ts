import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";
import { CONFIG } from "@/config/constants";
import { ApiError } from "@/lib/ApiError";

export const fetchFixedIncomes = async () => {
  const response = await fetch(`${CONFIG.API_URL}/api/fixed-incomes`, {
    credentials: "include",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const addFixedIncomes = async (incomes: BudgetEntryForm[]) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`${CONFIG.API_URL}/api/fixed-incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(incomes),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const updateFixedIncome = async (income: BudgetEntry) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/fixed-incomes/${income.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(income),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const deleteFixedIncomes = async (incomeId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/fixed-incomes/${incomeId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return {
    incomeId,
  };
};
