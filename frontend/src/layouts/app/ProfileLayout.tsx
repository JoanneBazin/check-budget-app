import { BackArrow, Banner } from "@/components/ui";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

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
