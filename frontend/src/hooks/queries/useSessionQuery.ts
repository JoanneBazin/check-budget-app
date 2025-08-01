import { fetchSession } from "@/lib/api/auth";
import { User } from "@shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSessionQuery = (
  options?: Partial<UseQueryOptions<User | null, Error>>
) => {
  return useQuery<User | null, Error>({
    queryKey: ["session"],
    queryFn: fetchSession,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    ...options,
  });
};
