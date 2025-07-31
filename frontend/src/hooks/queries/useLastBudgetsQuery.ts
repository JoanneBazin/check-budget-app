import { HistoryDataProps } from "@/types/budgets";
import { useQuery } from "@tanstack/react-query";

export const fetchLastBudgets = async () => {
  const response = await fetch(
    "http://localhost:4000/api/monthly-budgets/history",
    {
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Historique non disponible");

  return response.json();
};

export const useLastBudgetsQuery = () => {
  const query = useQuery<HistoryDataProps[]>({
    queryKey: ["history"],
    queryFn: fetchLastBudgets,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  return query;
};
