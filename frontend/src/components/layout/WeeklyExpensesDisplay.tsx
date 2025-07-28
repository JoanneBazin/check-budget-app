import { BudgetDataCard } from "../ui/BudgetDataCard";
import { useEffect, useState } from "react";
import { FormBudgetEntry, WeeklyExpensesDisplayProps } from "@/types/budgets";
import { ChevronRight } from "lucide-react";
import "@/styles/components/layout/WeeklyExpensesDisplay.scss";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import { expenseEntrySchema, validateArrayWithSchema } from "@shared/schemas";
import { useAddExpensesMutation } from "@/hooks/queries/mutations/useExpenses";
import { DateDisplay } from "../ui/DateDisplay";

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
        {weeklyExpenses.length > 0 ? (
          weeklyExpenses.map((expense, index) => (
            <div key={index} className="current-expenses">
              <div className="expense-name">
                <ChevronRight size={16} />
                <p>{expense.name}</p>
              </div>
              <div className="expense-amount">
                <p>
                  <span>€</span>
                  {expense.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-expenses-info">
            Pas encore de dépenses pour cette semaine
          </p>
        )}
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

      <div className="total-expenses">
        <p>Budget hebdomadaire</p>
        <p className="total-expenses-amount">
          <span>€</span>
          {remainingWeeklyBudget}
        </p>
      </div>
    </BudgetDataCard>
  );
};
