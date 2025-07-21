import { useSignupMutation } from "@/hooks/queries/mutations/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { mutate, isPending, error } = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(user, { onSuccess: () => navigate("/app") });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <input
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button type="submit" disabled={isPending}>
        Signup
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
