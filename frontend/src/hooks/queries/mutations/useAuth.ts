import { login, logout, signup } from "@/lib/api/auth";
import { resetAppState } from "@/lib/resetAppState";
import { useUserStore } from "@/stores/userStore";
import { LoginBody, SignupBody } from "@shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({ email, password }: LoginBody) => login({ email, password }),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["session"], user);
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({ name, email, password }: SignupBody) =>
      signup({ name, email, password }),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["session"], user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      resetAppState(queryClient);
    },
  });
};
