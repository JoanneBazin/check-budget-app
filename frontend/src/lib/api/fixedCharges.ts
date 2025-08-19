import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";
import { CONFIG } from "@/config/constants";
import { ApiError } from "@/lib/ApiError";

export const fetchFixedCharges = async () => {
  const response = await fetch(`${CONFIG.API_URL}/api/fixed-charges`, {
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

export const addFixedCharges = async (charges: BudgetEntryForm[]) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`${CONFIG.API_URL}/api/fixed-charges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charges),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const updateFixedCharge = async (charge: BudgetEntry) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");
  const response = await fetch(
    `${CONFIG.API_URL}/api/fixed-charges/${charge.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(charge),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || response.statusText);
  }

  return response.json();
};

export const deleteFixedCharges = async (chargeId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `${CONFIG.API_URL}/api/fixed-charges/${chargeId}`,
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
    chargeId,
  };
};
