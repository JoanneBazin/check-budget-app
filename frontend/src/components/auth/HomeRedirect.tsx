import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { Home } from "@/pages/public/Home";
import { Navigate } from "react-router-dom";
import { LoaderScreen } from "@/layouts/components";

export const HomeRedirect = () => {
  const { data: user, isLoading, error } = useSessionQuery();

  if (isLoading) return <LoaderScreen />;
  if (error || !user) return <Home />;

  return <Navigate to="/app" replace />;
};
