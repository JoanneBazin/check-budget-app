import { Bottombar } from "@/components/layout/Bottombar";
import { Header } from "@/components/layout/Header";
import { Banner } from "@/components/ui/Banner";
import { useCurrentBudgetQuery } from "@/hooks/queries/useCurrentBudgetQuery";
import { Outlet } from "react-router-dom";

export const PrivateAppLayout = () => {
  useCurrentBudgetQuery();
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
