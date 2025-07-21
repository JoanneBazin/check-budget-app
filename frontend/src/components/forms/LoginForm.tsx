import { useLoginMutation } from "@/hooks/queries/mutations/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, error } = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password }, { onSuccess: () => navigate("/app") });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit" disabled={isPending}>
        Login
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
