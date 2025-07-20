import { useSessionStore } from "@/store/useSessionStore";
import { useEffect } from "react";

export const SessionLoader = () => {
  const setUser = useSessionStore((s) => s.setUser);
  const setIsLoading = useSessionStore((s) => s.setIsLoading);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/session", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Session invalide");

        const user = await response.json();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [setUser, setIsLoading]);

  return null;
};
