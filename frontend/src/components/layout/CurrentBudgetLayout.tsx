import { formatDateTitle } from "@/lib/formatDateTitle";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import "@/styles/components/layout/CurrentBudgetLayout.scss";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { WeeklyExpensesDisplay } from "./WeeklyExpensesDisplay";
import { MonthlyBudget } from "@shared/schemas";
import { TotalEntriesDisplay } from "../ui/TotalEntriesDisplay";
import { MonthlyCharges } from "./MonthlyCharges";
import { MonthlyIncomes } from "./MonthlyIncomes";

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
      <MonthlyCharges onBack={() => setView("app")} data={budget.charges} />
    );
  if (view === "incomes")
    return (
      <MonthlyIncomes onBack={() => setView("app")} data={budget.incomes} />
    );

  return (
    <section>
      <TotalEntriesDisplay data="budget" total={budget.remainingBudget ?? 0} />

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
        budgetId={budget.id ?? ""}
        weeklyBudget={budget.weeklyBudget ?? 0}
        expenses={budget.expenses}
      />
    </section>
  );
};
