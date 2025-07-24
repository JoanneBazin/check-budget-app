import { CurrentBudgetLayout } from "@/components/layout/CurrentBudgetLayout";
import { useCurrentBudgetQuery } from "@/hooks/queries/useCurrentBudgetQuery";
import { useBudgetStore } from "@/stores/budgetStore";
import { Link } from "react-router-dom";
import "@/styles/pages/Dashboard.scss";

export const Dashboard = () => {
  const { isLoading } = useCurrentBudgetQuery();
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  if (isLoading) return <div>Loading...</div>;
  console.log(currentBudget);
  return currentBudget ? (
    <CurrentBudgetLayout budget={currentBudget} />
  ) : (
    <section>
      <div className="add-container">
        <Link to="/app/create" className="add-btn">
          +
        </Link>
        <p className="add-text">Commencer un nouveau mois</p>
      </div>

      <div className="add-container">
        <Link to="/profile" className="add-btn">
          +
        </Link>
        <p className="add-text">Mes revenus et charges fixes</p>
      </div>
    </section>
  );
};
