import { SignupForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";

export const SignupPage = () => {
  return (
    <div>
      <BackArrow destination="/" />
      <h1>Signup Page</h1>
      <SignupForm />
    </div>
  );
};
