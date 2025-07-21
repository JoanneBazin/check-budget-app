import { User } from "@shared/types/index";

export interface SessionState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
