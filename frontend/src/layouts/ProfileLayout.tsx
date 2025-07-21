import { Header } from "@/components/layout/Header";
import { BackArrow } from "@/components/ui/BackArrow";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <>
      <BackArrow destination="/app" />
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};
