import { LastBudgetLayoutProps } from "@/types/budgets";
import { BackArrow } from "../ui/BackArrow";
import { useEffect, useState } from "react";
import { MonthlyBudget } from "@shared/schemas";
import { getBudgetById } from "@/lib/api/monthlyBudgets";
import "@/styles/components/layout/LastBudgetLayout.scss";
import { TotalMonthlyEntriesDisplay } from "../ui/TotalMonthlyEntriesDisplay";
import { formatDateTitle } from "@/lib/formatDateTitle";
import { DataList } from "../ui/DataList";
import { BudgetDataCard } from "../ui/BudgetDataCard";
import { WeeklyExpensesDisplay } from "./WeeklyExpensesDisplay";
import { Collapse } from "../ui/Collapse";

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
            data={formatDateTitle(budget.year, budget.month)}
            total={budget.remainingBudget ?? 0}
          />

          <div className="monthly-entries-collapses">
            <Collapse data={budget.charges} title="Charges" color="black" />
            <Collapse data={budget.incomes} title="Revenus" color="primary" />
          </div>

          <WeeklyExpensesDisplay
            budgetId={budget.id ?? ""}
            weeklyBudget={budget.weeklyBudget ?? 0}
            expenses={budget.expenses}
            edit={false}
          />
        </>
      ) : null}
    </section>
  );
};
