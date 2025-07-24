import { formatDateTitle } from "@/lib/formatDateTitle";
import { useBudgetStore } from "@/stores/budgetStore";
import { CurrentMonthlyBudget } from "@shared/types";
import { useEffect } from "react";

export const CurrentBudgetLayout = ({
  budget,
}: {
  budget: CurrentMonthlyBudget;
}) => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);

  const totalCharges = budget.charges.reduce(
    (acc, entry) => acc + parseFloat(entry.amount),
    0
  );
  const totalIncomes = budget.incomes.reduce(
    (acc, entry) => acc + parseFloat(entry.amount),
    0
  );

  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <section>
      <div>
        <p>Total budget</p>
        <p>{budget.remainingBudget}</p>
      </div>

      <div>
        <div>
          <p>Charges</p>
          <span>{totalCharges}</span>
        </div>
        <div>
          <p>Revenus</p>
          <span>{totalIncomes}</span>
        </div>
      </div>
    </section>
  );
};
