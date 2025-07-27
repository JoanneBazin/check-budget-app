import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntryFromDB } from "@/types/budgets";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const fetchFixedCharges = async () => {
  const response = await fetch("http://localhost:4000/api/fixed-charges", {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Charges fixes indisponibles");

  return response.json();
};

export const useFixedChargesQuery = () => {
  const setFixedCharges = useBudgetStore((s) => s.setFixedCharges);

  const query = useQuery<BudgetEntryFromDB[]>({
    queryKey: ["fixedCharges"],
    queryFn: fetchFixedCharges,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setFixedCharges(query.data);
    }
  }, [query.data, setFixedCharges]);

  return query;
};
