import { create } from "zustand";
import { SessionState } from "../types/session";

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
