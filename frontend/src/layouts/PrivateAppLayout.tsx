import { Outlet } from "react-router-dom";

export const PrivateAppLayout = () => {
  return (
    <>
      <div>Header à faire</div>
      <main>
        <Outlet />
      </main>
      <div>Bottombar à faire</div>
    </>
  );
};
