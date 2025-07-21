import { Bottombar } from "@/components/layout/Bottombar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export const PrivateAppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Bottombar />
    </>
  );
};
