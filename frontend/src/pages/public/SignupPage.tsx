import { SignupForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";

export const SignupPage = () => {
  return (
    <main className="app-container">
      <BackArrow destination="/" />
      <h1 className="my-xl">Inscription</h1>
      <SignupForm />
    </main>
  );
};
