import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { useUserStore } from "@/stores/userStore";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderScreen } from "@/layouts/components";

export const RequireAuth = () => {
  const user = useUserStore((s) => s.user);
  const { isLoading, error } = useSessionQuery({ enabled: !user });

  if (isLoading) return <LoaderScreen />;
  if (error || !user) return <Navigate to="/" replace />;

  return <Outlet />;
};
