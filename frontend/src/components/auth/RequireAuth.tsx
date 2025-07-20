import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export const RequireAuth = () => {
  const { user, isLoading } = useSession();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" />;
};
