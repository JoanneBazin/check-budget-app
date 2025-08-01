import { useSessionQuery } from "@/hooks/queries";
import { resetAppState } from "@/lib/resetAppState";
import { useUserStore } from "@/stores/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isSuccess, error } = useSessionQuery();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (error?.message === "Unauthorized" || data === null) {
      const queryClient = useQueryClient();
      resetAppState(queryClient);
      return;
    }

    if (isSuccess && !user) {
      setUser(data);
    }
  }, [isSuccess, data, user, setUser]);

  return children;
};
