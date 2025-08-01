import { ExpenseEntry, ExpenseEntryForm } from "@shared/schemas";

export interface WeeklyExpensesDisplayProps {
  budgetId: string;
  weeklyBudget: number;
  expenses: ExpenseEntry[];
  edit?: boolean;
}

export interface AddExpensesProps {
  budgetId: string;
  expenses: ExpenseEntryForm[];
}

export interface UpdateExpenseProps {
  expense: ExpenseEntry;
  budgetId: string;
}
export interface DeleteExpenseProps {
  expenseId: string;
  budgetId: string;
}
