import { BudgetEntry } from "@shared/schemas";

export interface MonthYearPickerProps {
  onChange: (month: number, year: number) => void;
  defaultInput?: boolean;
}

export interface NewBudgetEntry {
  id?: string;
  name: string;
  amount: number | string;
}

export interface UpdatedBudgetEntry {
  id: string;
  name: string;
  amount: number | string;
}

export interface UpdatedExpenseEntry {
  id: string;
  name: string;
  amount: number | string;
  weekNumber: number;
  category?: string;
}

export interface AddEntriesFormProps {
  initialData?: NewBudgetEntry[];
  errors: Record<string, string>[];
  onChange: (entries: NewBudgetEntry[]) => void;
  defaultInput?: boolean;
}

export interface UpdateEntryFormProps<T extends BudgetEntry> {
  initialData: T;
  validationErrors: Record<string, string>;
  genericError: string | null;
  onSubmit: (entry: T) => void;
  onDelete: (entry: T) => void;
}
