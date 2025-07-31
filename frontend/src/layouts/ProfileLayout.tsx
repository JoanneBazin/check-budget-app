import { Header } from "@/components/layout/Header";
import { BackArrow } from "@/components/ui/BackArrow";
import { Banner } from "@/components/ui/Banner";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
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
