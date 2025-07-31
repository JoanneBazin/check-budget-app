import { BudgetEntry, ExpenseEntry, MonthlyBudget } from "@shared/schemas";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: MonthlyBudget | null;
  weeksInMonth: WeekProps[];
  fixedIncomes: BudgetEntry[];
  fixedCharges: BudgetEntry[];
  lastBudgets: LastMonthlyBudget[];
  isBudgetHydrated: boolean;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: MonthlyBudget | null) => void;
  setWeeksInMonth: (weeks: WeekProps[]) => void;
  setLastBudgets: (budgets: LastMonthlyBudget[]) => void;
  setFixedCharges: (charges: BudgetEntry[]) => void;
  setFixedIncomes: (incomes: BudgetEntry[]) => void;
  setIsBudgetHydrated: (val: boolean) => void;
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

export interface UpdateEntryFormProps<T extends BudgetEntry> {
  initialData: T;
  errors: Record<string, string>;
  onSubmit: (entry: T) => void;
  onDelete: (entry: T) => void;
}

// Expenses display

export interface WeekProps {
  start: Date;
  end: Date;
}

export interface WeeklyExpensesDisplayProps {
  budgetId: string;
  weeklyBudget: number;
  expenses: ExpenseEntry[];
}

export interface AddExpensesProps {
  budgetId: string;
  expenses: ExpenseEntry[];
}
export interface AddMonthlyEntriesProps {
  type: "charges" | "incomes";
  budgetId: string;
  entries: BudgetEntry[];
}
export interface UpdateMonthlyEntryProps {
  type: "charges" | "incomes";
  budgetId: string;
  entry: BudgetEntry;
}
export interface DeleteMonthlyEntryProps {
  type: "charges" | "incomes";
  budgetId: string;
  entryId: string;
}

export interface CreateBudgetMutation {
  budget: MonthlyBudget;
  weeksInMonth: WeekProps[];
}

export interface TotalEntriesProps {
  data: string;
  total: number;
}

export interface DateDisplayProps {
  weekIndex: number;
  setIndex: (index: number) => void;
}

export interface MonthlyEntriesView {
  type: string;
  onBack: () => void;
  data: BudgetEntry[];
  dateTitle: string;
  budgetId: string;
}

export interface BackArrowProps {
  destination?: string;
  onBack?: () => void;
}

export interface DataListProps<T extends BudgetEntry> {
  data: T[];
  setSelectedEntry: (entry: T) => void;
}

export interface TotalDataDisplayProps {
  total: number;
  title?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface UpdateExpenseProps {
  expense: ExpenseEntry;
  budgetId: string;
}
export interface DeleteExpenseProps {
  expenseId: string;
  budgetId: string;
}
