import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect } from "react";

export const History = () => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  useEffect(() => {
    setPageTitle("Historique des budgets mensuels");
  }, []);
  return <section>Historique </section>;
};
