import { CurrentBudgetLayout } from "@/components/layout/CurrentBudgetLayout";
import { useCurrentBudgetQuery } from "@/hooks/queries/useCurrentBudgetQuery";
import { useBudgetStore } from "@/stores/budgetStore";

export const Dashboard = () => {
  const { isLoading } = useCurrentBudgetQuery();
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  if (isLoading) return <div>Loading...</div>;

  return currentBudget ? (
    <CurrentBudgetLayout budget={currentBudget} />
  ) : (
    <section>Il faut ajouter un budget Caroline</section>
  );
};
