import { SignupForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";

export const SignupPage = () => {
  return (
    <main>
      <BackArrow destination="/" />
      <h1 className="my-xl">Inscription</h1>
      <SignupForm />
    </main>
  );
};
