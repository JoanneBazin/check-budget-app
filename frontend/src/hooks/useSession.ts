import { useSessionStore } from "../store/useSessionStore";

export const useSession = () => {
  const user = useSessionStore((s) => s.user);
  const isLoading = useSessionStore((s) => s.isLoading);

  return { user, isLoading };
};
