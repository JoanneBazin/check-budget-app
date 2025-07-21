import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { Home } from "@/pages/public/Home";
import { Navigate } from "react-router-dom";

export const HomeRedirect = () => {
  const { data: user, isLoading } = useSessionQuery();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/app" replace /> : <Home />;
};
