import { useEffect, useState } from "react";
import { getBudgetById } from "@/lib/api/monthlyBudgets";
import { formatDateTitle } from "@/lib/formatDateTitle";
import {
  BackArrow,
  Collapse,
  TotalMonthlyEntriesDisplay,
} from "@/components/ui";
import { WeeklyExpensesDisplay } from "../budget/WeeklyExpensesDisplay";
import { LastBudgetLayoutProps } from "@/types";
import { MonthlyBudget } from "@shared/schemas";

export const LastBudgetLayout = ({
  budgetId,
  onBack,
}: LastBudgetLayoutProps) => {
  const [budget, setBudget] = useState<MonthlyBudget>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastBudget = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getBudgetById(budgetId);
        setBudget(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Erreur lors de la récupération des données"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastBudget();
  }, [budgetId]);

  return (
    <section>
      <BackArrow onBack={onBack} />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {budget ? (
        <>
          <TotalMonthlyEntriesDisplay
            type={formatDateTitle(budget.year, budget.month)}
            total={budget.remainingBudget ?? 0}
          />

          <div className="flex-start gap-sm my-md">
            <Collapse data={budget.charges} title="Charges" color="black" />
            <Collapse data={budget.incomes} title="Revenus" color="primary" />
          </div>

          <WeeklyExpensesDisplay
            budgetId={budget.id}
            weeklyBudget={budget.weeklyBudget}
            expenses={budget.expenses}
            edit={false}
          />
        </>
      ) : null}
    </section>
  );
};
