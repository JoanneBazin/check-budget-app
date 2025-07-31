import { useBudgetStore } from "@/stores/budgetStore";
import { MonthlyBudget } from "@shared/schemas";
import { getWeeksInMonth } from "./getWeeksInMonth";

export const hydrateBudgetStore = (budget: MonthlyBudget) => {
  const { setCurrentBudget, setWeeksInMonth, setIsBudgetHydrated } =
    useBudgetStore.getState();

  setCurrentBudget(budget);
  setWeeksInMonth(getWeeksInMonth(budget.year, budget.month));
  setIsBudgetHydrated(true);
};
