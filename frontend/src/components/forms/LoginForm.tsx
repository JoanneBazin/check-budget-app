import { useLoginMutation } from "@/hooks/queries/mutations";
import { loginSchema, validateWithSchema } from "@shared/schemas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const { mutate, isPending, error } = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({});

    const validation = validateWithSchema(loginSchema, user);
    if (!validation.success) {
      setErrorMessages(validation.errors);
      return;
    }

    mutate(validation.data, { onSuccess: () => navigate("/app") });
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="email"
        />
        {errorMessages.email && (
          <p className="form-error">{errorMessages.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
        {errorMessages.password && (
          <p className="form-error">{errorMessages.password}</p>
        )}
      </div>

      <button type="submit" disabled={isPending} className="submit-btn">
        Se connecter
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
