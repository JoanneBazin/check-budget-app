import { formatDateTitle } from "@/lib/formatDateTitle";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { MonthlyEntries } from "../budget/MonthlyEntries";
import { TotalMonthlyEntriesDisplay } from "@/components/ui";
import { WeeklyExpensesDisplay } from "../budget/WeeklyExpensesDisplay";
import { MonthlyBudget } from "@shared/schemas";

type View = "app" | "charges" | "incomes";

export const CurrentBudgetLayout = ({ budget }: { budget: MonthlyBudget }) => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);
  const [view, setView] = useState<View>("app");

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
      <TotalMonthlyEntriesDisplay
        type="budget"
        total={budget.remainingBudget}
      />

      <div className="total-entries-container">
        <div
          className="total-entries charges"
          role="button"
          tabIndex={0}
          onClick={() => setView("charges")}
        >
          <ArrowDownLeft className="icon" />
          <div className="total-entries-text">
            <p>Charges</p>
            <span>€ {totalCharges}</span>
          </div>
        </div>
        <div
          className="total-entries incomes"
          role="button"
          tabIndex={0}
          onClick={() => setView("incomes")}
        >
          <ArrowUpRight className="icon" />
          <div className="total-entries-text">
            <p>Apports</p>
            <span>€ {totalIncomes}</span>
          </div>
        </div>
      </div>

      <WeeklyExpensesDisplay
        budgetId={budget.id}
        weeklyBudget={budget.weeklyBudget}
        expenses={budget.expenses}
      />
    </section>
  );
};
