import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
