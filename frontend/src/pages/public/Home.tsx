import { LoginForm } from "@/components/forms/LoginForm";
import { SignupForm } from "@/components/forms/SignupForm";

export const Home = () => {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <LoginForm />
      <SignupForm />
    </div>
  );
};
