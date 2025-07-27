import { formatDateTitle } from "@/lib/formatDateTitle";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect } from "react";
import "@/styles/components/layout/CurrentBudgetLayout.scss";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { WeeklyExpensesDisplay } from "./WeeklyExpensesDisplay";
import { MonthlyBudget } from "@shared/schemas";

export const CurrentBudgetLayout = ({ budget }: { budget: MonthlyBudget }) => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);

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

  return (
    <section>
      <div>
        <p>Total budget</p>
        <p className="total-budget">
          <span>€</span>
          {budget.remainingBudget}
        </p>
      </div>

      <div className="total-entries-container">
        <div className="total-entries charges">
          <ArrowDownLeft className="icon" />
          <div className="total-entries-text">
            <p>Charges</p>
            <span>€ {totalCharges}</span>
          </div>
        </div>
        <div className="total-entries incomes">
          <ArrowUpRight className="icon" />
          <div className="total-entries-text">
            <p>Apports</p>
            <span>€ {totalIncomes}</span>
          </div>
        </div>
      </div>

      <WeeklyExpensesDisplay
        year={budget.year}
        month={budget.month}
        budgetId={budget.id}
        expenses={budget.expenses}
      />
    </section>
  );
};
