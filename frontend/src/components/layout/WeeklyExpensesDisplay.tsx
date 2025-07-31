import { BudgetDataCard } from "../ui/BudgetDataCard";
import { useEffect, useState } from "react";
import { FormBudgetEntry, WeeklyExpensesDisplayProps } from "@/types/budgets";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import {
  ExpenseEntry,
  expenseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddExpensesMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from "@/hooks/queries/mutations/useExpenses";
import { DateDisplay } from "../ui/DateDisplay";
import { DataList } from "@/components/ui/DataList";
import { TotalDataDisplay } from "../ui/TotalDataDisplay";
import { Modal } from "../ui/Modal";
import { UpdateEntryForm } from "../forms/UpdateEntryForm";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<FormBudgetEntry[]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const currentWeekNumber = weekIndex + 1;
  const weeklyExpenses = expenses.filter(
    (expense) => expense.weekNumber === currentWeekNumber
  );
  const remainingWeeklyBudget =
    weeklyBudget - weeklyExpenses.reduce((acc, entry) => acc + entry.amount, 0);

  const [selectedEntry, setSelectedEntry] = useState<ExpenseEntry | null>(null);
  const [expensesError, setExpensesError] = useState<Record<string, string>[]>(
    []
  );
  const [updatedError, setUpdatedError] = useState<Record<string, string>>({});
  const addExpenses = useAddExpensesMutation();
  const updateExpense = useUpdateExpenseMutation();
  const deleteExpense = useDeleteExpenseMutation();

  useEffect(() => {
    setNewExpenses([]);
  }, [weekIndex]);

  const handleAddExpenses = () => {
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

    addExpenses.mutate(
      { expenses: validation.data ?? [], budgetId },
      { onSuccess: () => setNewExpenses([]) }
    );
  };

  const handleUpdateExpense = (updatedExpense: ExpenseEntry) => {
    setUpdatedError({});

    const validation = validateWithSchema(expenseEntrySchema, updatedExpense);

    if (!validation.success) {
      setUpdatedError(validation.errors);
      return;
    }

    updateExpense.mutate(
      { expense: validation.data, budgetId },
      { onSuccess: () => setSelectedEntry(null) }
    );
  };

  const handleDeleteExpense = (deletedExpense: ExpenseEntry) => {
    setUpdatedError({});

    deleteExpense.mutate(
      { expenseId: deletedExpense.id ?? "", budgetId },
      { onSuccess: () => setSelectedEntry(null) }
    );
  };

  return (
    <BudgetDataCard title="Dépenses">
      <DateDisplay weekIndex={weekIndex} setIndex={setWeekIndex} />

      {edit ? (
        <div>
          <DataList data={weeklyExpenses} setSelectedEntry={setSelectedEntry} />
          <AddEntriesForm
            initialData={newExpenses}
            errors={expensesError}
            onChange={setNewExpenses}
            defaultInput={false}
          />
          {newExpenses.length > 0 && (
            <button onClick={handleAddExpenses} className="submit-btn">
              Enregistrer
            </button>
          )}
        </div>
      ) : (
        <DataList data={weeklyExpenses} edit={false} />
      )}

      <TotalDataDisplay
        total={remainingWeeklyBudget}
        title="Budget hebdomadaire"
      />
      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les dépenses`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            errors={updatedError}
            onSubmit={handleUpdateExpense}
            onDelete={handleDeleteExpense}
          />
        </Modal>
      )}
    </BudgetDataCard>
  );
};
