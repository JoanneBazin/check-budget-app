import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { Navigate, Outlet } from "react-router-dom";

export const RequireGuest = () => {
  const { data: user, isLoading } = useSessionQuery();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/app" replace /> : <Outlet />;
};
