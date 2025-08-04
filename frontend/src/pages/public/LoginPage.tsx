import { LoginForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";

export const LoginPage = () => {
  return (
    <main className="app-container">
      <BackArrow destination="/" />
      <h1 className="my-xl">Connexion</h1>
      <LoginForm />
    </main>
  );
};
