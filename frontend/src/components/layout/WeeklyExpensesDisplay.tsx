import { getWeeksInMonth } from "@/lib/getWeeksInMonth";
import { BudgetDataCard } from "../ui/BudgetDataCard";
import { useEffect, useState } from "react";
import { FormBudgetEntry, WeeklyExpensesDisplayProps } from "@/types/budgets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "@/styles/components/layout/WeeklyExpensesDisplay.scss";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import { expenseEntrySchema, validateArrayWithSchema } from "@shared/schemas";
import { useAddExpensesMutation } from "@/hooks/queries/mutations/useExpenses";

export const WeeklyExpensesDisplay = ({
  year,
  month,
  budgetId,
  expenses,
}: WeeklyExpensesDisplayProps) => {
  const weeks = getWeeksInMonth(year, month);
  const [newExpenses, setNewExpenses] = useState<FormBudgetEntry[]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const currentWeekNumber = weekIndex + 1;
  const weeklyExpenses = expenses.filter(
    (expense) => expense.weekNumber === currentWeekNumber
  );

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
      <div className="date-selector">
        <button
          onClick={() => setWeekIndex((i) => Math.max(i - 1, 0))}
          disabled={weekIndex === 0}
          aria-label="Afficher la semaine précédente"
          className="icon-btn"
        >
          <ChevronLeft className="icon" />
        </button>
        <span>
          du{" "}
          {weeks[weekIndex].start.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })}{" "}
          au{" "}
          {weeks[weekIndex].end.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })}
        </span>
        <button
          onClick={() => setWeekIndex((i) => Math.min(i + 1, weeks.length - 1))}
          disabled={weekIndex === weeks.length - 1}
          aria-label="Afficher la semaine suivante"
          className="icon-btn"
        >
          <ChevronRight className="icon" />
        </button>
      </div>

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
        </p>
      </div>
    </BudgetDataCard>
  );
};
