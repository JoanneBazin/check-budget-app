import { Bottombar } from "@/components/layout/Bottombar";
import { Header } from "@/components/layout/Header";
import { Banner } from "@/components/ui/Banner";
import { useCurrentBudgetQuery } from "@/hooks/queries/useCurrentBudgetQuery";
import { useFixedChargesQuery } from "@/hooks/queries/useFixedChargesQuery";
import { useFixedIncomesQuery } from "@/hooks/queries/useFixedIncomesQuery";
import { useBudgetStore } from "@/stores/budgetStore";
import { Outlet } from "react-router-dom";

export const PrivateAppLayout = () => {
  useCurrentBudgetQuery();
  useFixedChargesQuery();
  useFixedIncomesQuery();

  const isHydrated = useBudgetStore((s) => s.isBudgetHydrated);

  if (!isHydrated) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Outlet />
      </main>
      <Bottombar />
    </>
  );
};
