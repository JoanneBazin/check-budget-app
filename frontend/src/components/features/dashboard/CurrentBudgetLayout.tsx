import { formatDateTitle } from "@/lib/formatDateTitle";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import { MonthlyEntries } from "../budget/MonthlyEntries";
import { TotalMonthlyEntriesDisplay } from "@/components/ui";
import { WeeklyExpensesDisplay } from "../budget/WeeklyExpensesDisplay";
import { MonthlyBudget } from "@shared/schemas";
import { TotalCard } from "@/components/ui/TotalCard";
import { MonthlyBudgetOptions } from "../budget/MonthlyBudgetOptions";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

type View = "app" | "charges" | "incomes";

export const CurrentBudgetLayout = ({ budget }: { budget: MonthlyBudget }) => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);
  const [view, setView] = useState<View>("app");
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const totalCharges = budget.charges.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const totalIncomes = budget.incomes.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );

  useEffect(() => {
    setPageTitle(title);
  }, []);

  if (view === "charges")
    return (
      <MonthlyEntries
        type="charges"
        onBack={() => setView("app")}
        data={budget.charges}
        dateTitle={dateTitle}
        budgetId={budget.id}
      />
    );
  if (view === "incomes")
    return (
      <MonthlyEntries
        type="revenus"
        onBack={() => setView("app")}
        data={budget.incomes}
        dateTitle={dateTitle}
        budgetId={budget.id}
      />
    );

  return (
    <section>
      <div className="flex-between">
        <TotalMonthlyEntriesDisplay
          type="budget"
          total={budget.remainingBudget}
        />
        <MonthlyBudgetOptions
          isCurrent={true}
          budgetId={budget.id}
          onError={() =>
            setBudgetError(
              "Une erreur est survenue lors de la mise à jour du budget"
            )
          }
        />
      </div>

      {budgetError && <ErrorMessage message={budgetError} />}

      <div className="flex-between my-xl">
        <TotalCard
          title="charges"
          totalData={totalCharges}
          setView={() => setView("charges")}
        />
        <TotalCard
          title="revenus"
          totalData={totalIncomes}
          setView={() => setView("incomes")}
        />
      </div>

      <WeeklyExpensesDisplay
        budgetId={budget.id}
        weeklyBudget={budget.weeklyBudget}
        expenses={budget.expenses}
      />
    </section>
  );
};
