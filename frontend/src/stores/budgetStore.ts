import { BudgetStore } from "@/types/budgets";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      pageTitle: "Gérer mes budgets",
      currentBudget: null,
      lastBudgets: [],
      fixedCharges: [],
      fixedIncomes: [],
      setPageTitle: (title) => set({ pageTitle: title }),
      setCurrentBudget: (budget) => set({ currentBudget: budget }),
      setLastBudgets: (budgets) => set({ lastBudgets: budgets }),
      setFixedCharges: (charges) => set({ fixedCharges: charges }),
      setFixedIncomes: (incomes) => set({ fixedIncomes: incomes }),
      reset: () =>
        set({
          pageTitle: "Gérer mes budgets",
          currentBudget: null,
          lastBudgets: [],
          fixedCharges: [],
          fixedIncomes: [],
        }),
    }),
    {
      name: "budget-storage",
      partialize: (state) => ({
        currentBudget: state.currentBudget,
        lastBudgets: state.lastBudgets,
        fixedCharges: state.fixedCharges,
        fixedIncomes: state.fixedIncomes,
      }),
    }
  )
);
