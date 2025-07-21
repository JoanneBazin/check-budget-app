import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isSuccess } = useSessionQuery();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (isSuccess && !user) {
      setUser(data);
    }
  }, [isSuccess, data, user, setUser]);

  return children;
};
