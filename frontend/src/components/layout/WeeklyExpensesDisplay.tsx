import { BudgetDataCard } from "../ui/BudgetDataCard";
import { useEffect, useState } from "react";
import { FormBudgetEntry, WeeklyExpensesDisplayProps } from "@/types/budgets";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import { expenseEntrySchema, validateArrayWithSchema } from "@shared/schemas";
import { useAddExpensesMutation } from "@/hooks/queries/mutations/useExpenses";
import { DateDisplay } from "../ui/DateDisplay";
import { DataList } from "@/components/ui/DataList";
import { TotalDataDisplay } from "../ui/TotalDataDisplay";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<FormBudgetEntry[]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const currentWeekNumber = weekIndex + 1;
  const weeklyExpenses = expenses.filter(
    (expense) => expense.weekNumber === currentWeekNumber
  );
  const remainingWeeklyBudget =
    weeklyBudget - weeklyExpenses.reduce((acc, entry) => acc + entry.amount, 0);

  const [expensesError, setExpensesError] = useState<Record<string, string>[]>(
    []
  );
  const { mutate, isPending, error } = useAddExpensesMutation();

  useEffect(() => {
    setNewExpenses([]);
  }, [weekIndex]);

  const handleSubmit = () => {
    setExpensesError([]);

    const newWeeklyExpenses = newExpenses.map((exp) => ({
      ...exp,
      weekNumber: currentWeekNumber,
    }));

    const validation = validateArrayWithSchema(
      expenseEntrySchema,
      newWeeklyExpenses
    );
    if (!validation.success) {
      setExpensesError(Object.values(validation.errors));
      return;
    }

    mutate(
      { expenses: validation.data ?? [], budgetId },
      { onSuccess: () => setNewExpenses([]) }
    );
  };

  return (
    <BudgetDataCard title="Dépenses">
      <DateDisplay weekIndex={weekIndex} setIndex={setWeekIndex} />

      <div>
        <DataList data={weeklyExpenses} />
        <AddEntriesForm
          initialData={newExpenses}
          errors={expensesError}
          onChange={setNewExpenses}
          defaultInput={false}
        />
        {newExpenses.length > 0 && (
          <button onClick={handleSubmit} className="submit-btn">
            Enregistrer
          </button>
        )}
      </div>

      <TotalDataDisplay
        total={remainingWeeklyBudget}
        title="Budget hebdomadaire"
      />
    </BudgetDataCard>
  );
};
