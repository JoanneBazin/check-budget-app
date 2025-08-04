import { fetchCurrentBudget } from "@/lib/api/monthlyBudgets";
import { hydrateBudgetStore } from "@/lib/hydrateBudgetStore";
import { useBudgetStore } from "@/stores/budgetStore";
import { MonthlyBudget } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCurrentBudgetQuery = () => {
  const query = useQuery<MonthlyBudget>({
    queryKey: ["currentBudget"],
    queryFn: fetchCurrentBudget,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.isFetched) {
      const { setIsBudgetHydrated } = useBudgetStore.getState();
      if (query.data) {
        hydrateBudgetStore(query.data);
      }
      setIsBudgetHydrated(true);
    }
  }, [query.data]);

  return query;
};
