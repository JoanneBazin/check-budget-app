import {
  useCurrentBudgetQuery,
  useFixedChargesQuery,
  useFixedIncomesQuery,
} from "@/hooks/queries";
import { useBudgetStore } from "@/stores/budgetStore";
import { Outlet } from "react-router-dom";
import { Bottombar, Header } from "../components";
import { Banner } from "@/components/ui";

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
