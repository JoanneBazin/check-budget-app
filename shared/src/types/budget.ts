export interface CurrentMonthlyBudget {
  id: string;
  month: number;
  year: number;
  isCurrent: boolean;
  remainingBudget: string;
  userId: string;
  createdAt: Date;
  incomes: MonthlyEntry[];
  charges: MonthlyEntry[];
  expenses: MonthlyExpense[];
}

export interface MonthlyEntry {
  id: string;
  name: string;
  amount: string;
  monthlyBudgetId: string;
  createdAt: Date;
}

export interface MonthlyExpense {
  id: string;
  name: string;
  amount: string;
  weekNumber: number;
  category?: string;
  monthlyBudgetId: string;
  createdAt: Date;
}

export interface LastMonthlyBudget {
  id: string;
  year: number;
  month: number;
  remainingBudget: string;
}

export interface fixedEntry {
  id: string;
  name: string;
  amount: string;
}
