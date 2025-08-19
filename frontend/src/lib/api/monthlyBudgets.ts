import { updateMonthlyBudgetProps } from "@/types";
import { MonthlyBudgetForm } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";
import { CONFIG } from "@/config/constants";
import { ApiError } from "@/lib/ApiError";

export const fetchCurrentBudget = async () => {
  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets/current`,
    {
      credentials: "include",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const updateMonthlyBudgetStatus = async ({
  budgetId,
  isCurrent,
}: updateMonthlyBudgetProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets/${budgetId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isCurrent }),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const createMonthlyBudget = async (budget: MonthlyBudgetForm) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`${CONFIG.API_URL}/api/monthly-budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const getBudgetByDate = async (year: number, month: number) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets?month=${month}&year=${year}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const getBudgetById = async (budgetId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets/${budgetId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const fetchLastBudgets = async () => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets/history`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const deleteMonthlyBudget = async (budgetId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/monthly-budgets/${budgetId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};
