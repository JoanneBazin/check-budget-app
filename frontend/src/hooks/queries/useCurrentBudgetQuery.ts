import { useBudgetStore } from "@/stores/budgetStore";
import { CurrentMonthlyBudget } from "@shared/types";
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
  const setCurrentMonthlyBudget = useBudgetStore((s) => s.setCurrentBudget);

  const query = useQuery<CurrentMonthlyBudget>({
    queryKey: ["currentBudget"],
    queryFn: fetchCurrentBudget,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setCurrentMonthlyBudget(query.data);
    }
  }, [query.data, setCurrentMonthlyBudget]);

  return query;
};
