import { FixedChargesDisplay } from "@/components/layout/FixedChargesDisplay";
import { FixedIncomesDisplay } from "@/components/layout/FixedIncomesDisplay";
import { useBudgetStore } from "@/stores/budgetStore";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export const Profile = () => {
  const user = useUserStore((s) => s.user);
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  const fixedIncomes = useBudgetStore((s) => s.fixedIncomes);

  useEffect(() => {
    if (user) {
      setPageTitle(user?.email);
    }
  }, []);

  return (
    <section>
      <FixedIncomesDisplay />
      <FixedChargesDisplay />
    </section>
  );
};
