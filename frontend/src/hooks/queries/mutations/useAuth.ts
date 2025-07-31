import { login, logout, signup } from "@/lib/api/auth";
import { resetAppState } from "@/lib/resetAppState";
import { useUserStore } from "@/stores/userStore";
import { LoginInput, SignupInput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore.getState();

  return useMutation({
    mutationFn: ({ email, password }: LoginInput) => login({ email, password }),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["session"], user);
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore.getState();

  return useMutation({
    mutationFn: ({ name, email, password }: SignupInput) =>
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
