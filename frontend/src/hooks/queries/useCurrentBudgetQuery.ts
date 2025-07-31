import { hydrateBudgetStore } from "@/lib/hydrateBudgetStore";
import { MonthlyBudget } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const fetchCurrentBudget = async () => {
  const response = await fetch(
    "http://localhost:4000/api/monthly-budgets/current",
    {
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Budget actuel indisponible");

  return response.json();
};

export const useCurrentBudgetQuery = () => {
  const query = useQuery<MonthlyBudget>({
    queryKey: ["currentBudget"],
    queryFn: fetchCurrentBudget,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      hydrateBudgetStore(query.data);
    }
  }, [query.data]);

  return query;
};
