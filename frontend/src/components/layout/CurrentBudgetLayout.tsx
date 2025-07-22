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

  useEffect(() => {
    setPageTitle(title);
  }, []);

  return <div>CurrentBudgetLayout</div>;
};
