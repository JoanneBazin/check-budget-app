import { fetchSession } from "@/lib/api/auth";
import { User } from "@shared/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";
import { resetAppState } from "@/lib/resetAppState";

export const useSessionQuery = () => {
  const { isOnline } = useOfflineStatus();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore.getState();

  const query = useQuery<User>({
    queryKey: ["session"],
    queryFn: fetchSession,
    enabled: isOnline,
    refetchOnWindowFocus: isOnline,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!isOnline) return;

    if (query.error?.message === "Unauthorized" || query.data === null) {
      resetAppState(queryClient);
      return;
    }

    if (query.isFetched && query.data && !user) {
      setUser(query.data);
    }
  }, [isOnline, query, user]);

  return query;
};
