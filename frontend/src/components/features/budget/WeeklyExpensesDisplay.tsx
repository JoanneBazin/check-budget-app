import { useEffect, useState } from "react";
import {
  createExpenseEntrySchema,
  ExpenseEntry,
  expenseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddExpensesMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from "@/hooks/queries/mutations";
import {
  BudgetDataCard,
  DataList,
  DateDisplay,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  NewBudgetEntry,
  UpdatedExpenseEntry,
  WeeklyExpensesDisplayProps,
} from "@/types";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<NewBudgetEntry[]>([]);
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
      createExpenseEntrySchema,
      newWeeklyExpenses
    );
    if (!validation.success) {
      setExpensesError(Object.values(validation.errors));
      return;
    }

    addExpenses.mutate(
      { expenses: validation.data, budgetId },
      { onSuccess: () => setNewExpenses([]) }
    );
  };

  const handleUpdateExpense = (updatedExpense: UpdatedExpenseEntry) => {
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
      { expenseId: deletedExpense.id, budgetId },
      { onSuccess: () => setSelectedEntry(null) }
    );
  };

  return (
    <BudgetDataCard title="Dépenses">
      <DateDisplay weekIndex={weekIndex} setIndex={setWeekIndex} />

      {edit ? (
        <div>
          <DataList
            data={weeklyExpenses}
            setSelectedEntry={setSelectedEntry}
            emptyMessage="Aucune dépense cette semaine"
          />
          <AddEntriesForm
            initialData={newExpenses}
            errors={expensesError}
            onChange={setNewExpenses}
            defaultInput={false}
          />
          {newExpenses.length > 0 && (
            <button
              onClick={handleAddExpenses}
              className="submit-btn"
              disabled={addExpenses.isPending}
            >
              Enregistrer
            </button>
          )}
        </div>
      ) : (
        <DataList
          data={weeklyExpenses}
          emptyMessage="Aucune dépense cette semaine"
          edit={false}
        />
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
