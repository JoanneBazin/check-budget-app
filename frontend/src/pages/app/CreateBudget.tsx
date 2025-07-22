import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect } from "react";

export const CreateBudget = () => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  useEffect(() => {
    setPageTitle("Ajouter un budget mensuel");
  }, []);

  return <section>Nouveau budget</section>;
};
