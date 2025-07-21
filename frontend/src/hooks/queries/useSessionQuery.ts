import { User } from "@shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const fetchSession = async () => {
  const response = await fetch("http://localhost:4000/api/auth/session", {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Session invalide");

  return response.json();
};

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
