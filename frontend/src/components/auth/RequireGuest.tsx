import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderScreen } from "@/layouts/components";

export const RequireGuest = () => {
  const { data: user, isLoading } = useSessionQuery();

  if (isLoading) return <LoaderScreen />;

  return user ? <Navigate to="/app" replace /> : <Outlet />;
};
