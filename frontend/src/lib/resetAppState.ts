import { useBudgetStore } from "@/stores/budgetStore";
import { useUserStore } from "@/stores/userStore";
import { QueryClient } from "@tanstack/react-query";

export const resetAppState = (queryClient: QueryClient) => {
  useUserStore.getState().setUser(null);
  useBudgetStore.getState().reset();

  queryClient.removeQueries();
};
