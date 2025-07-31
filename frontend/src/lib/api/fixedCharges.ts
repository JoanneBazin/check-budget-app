import { BudgetEntry } from "@shared/schemas";

export const addFixedCharges = async (charges: BudgetEntry[]) => {
  const response = await fetch(`http://localhost:4000/api/fixed-charges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charges),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const updateFixedCharge = async (charge: BudgetEntry) => {
  const response = await fetch(
    `http://localhost:4000/api/fixed-charges/${charge.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: charge.name, amount: charge.amount }),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteFixedCharges = async (chargeId: string) => {
  const response = await fetch(
    `http://localhost:4000/api/fixed-incomes/${chargeId}`,
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
    chargeId,
  };
};
