import { useBudgetStore } from "@/stores/budgetStore";
import { getWeeksInMonth } from "./getWeeksInMonth";
import { MonthlyBudget } from "@shared/schemas";

export const hydrateBudgetStore = (budget: MonthlyBudget) => {
  const { setCurrentBudget, setWeeksInMonth, setIsBudgetHydrated } =
    useBudgetStore.getState();

  setCurrentBudget(budget);
  setWeeksInMonth(getWeeksInMonth(budget.year, budget.month));
  setIsBudgetHydrated(true);
};
