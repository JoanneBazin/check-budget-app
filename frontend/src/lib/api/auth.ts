import { LoginBody, SignupBody, User } from "@shared/types";

export const login = async ({ email, password }: LoginBody): Promise<User> => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const signup = async ({
  name,
  email,
  password,
}: SignupBody): Promise<User> => {
  const response = await fetch("http://localhost:4000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de l'inscription");
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  const response = await fetch("http://localhost:4000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la déconnexion");
  }
};
