import { useSignupMutation } from "@/hooks/queries/mutations/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema, validateWithSchema } from "@shared/schemas/index";

export const SignupForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const { mutate, isPending, error } = useSignupMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({});

    const validation = validateWithSchema(signupSchema, user);
    if (!validation.success) {
      setErrorMessages(validation.errors);
      return;
    }

    mutate(user, { onSuccess: () => navigate("/app") });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="name"
          name="name"
          value={user.name}
          onChange={(e) => handleChange(e)}
          placeholder="name"
        />
        {errorMessages.name && (
          <p className="form-error">{errorMessages.name}</p>
        )}
      </div>

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
        S'inscrire
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
