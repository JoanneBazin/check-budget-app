import { ExpenseEntry, MonthlyBudget } from "@shared/schemas";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: MonthlyBudget | null;
  fixedIncomes: BudgetEntryFromDB[] | null;
  fixedCharges: BudgetEntryFromDB[] | null;
  lastBudgets: LastMonthlyBudget[] | null;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: MonthlyBudget | null) => void;
  setLastBudgets: (budgets: LastMonthlyBudget[]) => void;
  setFixedCharges: (charges: BudgetEntryFromDB[]) => void;
  setFixedIncomes: (incomes: BudgetEntryFromDB[]) => void;
  reset: () => void;
}

export interface BudgetEntryFromDB {
  id: string;
  name: string;
  amount: number;
}

export interface LastMonthlyBudget {
  id: string;
  year: number;
  month: number;
  remainingBudget: number;
}

// Budget forms

export interface FormBudgetEntry {
  id?: string;
  name: string;
  amount: number | string;
}

export interface EntriesFormProps {
  initialData?: FormBudgetEntry[];
  errors: Record<string, string>[];
  onChange: (entries: FormBudgetEntry[]) => void;
  defaultInput?: boolean;
}

// Expenses display

export interface WeekProps {
  start: Date;
  end: Date;
}

export interface WeeklyExpensesDisplayProps {
  year: number;
  month: number;
  budgetId: string;
  expenses: ExpenseEntry[];
}

export interface AddExpensesProps {
  budgetId: string;
  expenses: ExpenseEntry[];
}
