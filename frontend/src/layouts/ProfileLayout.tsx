import { Header } from "@/components/layout/Header";
import { BackArrow } from "@/components/ui/BackArrow";
import { Banner } from "@/components/ui/Banner";
import { useFixedChargesQuery } from "@/hooks/queries/useFixedChargesQuery";
import { useFixedIncomesQuery } from "@/hooks/queries/useFixedIncomesQuery";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  useFixedChargesQuery();
  useFixedIncomesQuery();

  return (
    <>
      <BackArrow destination="/app" />
      <Header />

      <main>
        <Banner />
        <Outlet />
      </main>
    </>
  );
};
