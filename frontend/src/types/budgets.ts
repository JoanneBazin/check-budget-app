import {
  CurrentMonthlyBudget,
  fixedEntry,
  LastMonthlyBudget,
} from "@shared/types";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: CurrentMonthlyBudget | null;
  fixedIncomes: fixedEntry[] | null;
  fixedCharges: fixedEntry[] | null;
  lastBudgets: LastMonthlyBudget[] | null;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: CurrentMonthlyBudget | null) => void;
  setLastBudgets: (budgets: LastMonthlyBudget[]) => void;
  setFixedCharges: (charges: fixedEntry[]) => void;
  setFixedIncomes: (incomes: fixedEntry[]) => void;
  reset: () => void;
}

export interface Entry {
  name: string;
  amount: string;
}

export interface EntriesFormProps {
  initialData?: Entry[];
  errors: string[];
  onChange: (entries: Entry[]) => void;
}
