import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntryFromDB } from "@/types/budgets";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const fetchFixedIncomes = async () => {
  const response = await fetch("http://localhost:4000/api/fixed-incomes", {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Revenus fixes indisponibles");

  return response.json();
};

export const useFixedIncomesQuery = () => {
  const setFixedIncomes = useBudgetStore((s) => s.setFixedIncomes);

  const query = useQuery<BudgetEntryFromDB[]>({
    queryKey: ["fixedIncomes"],
    queryFn: fetchFixedIncomes,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setFixedIncomes(query.data);
    }
  }, [query.data, setFixedIncomes]);

  return query;
};
