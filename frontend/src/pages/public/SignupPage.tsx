import { SignupForm } from "@/components/forms/SignupForm";
import { BackArrow } from "@/components/ui/BackArrow";

export const SignupPage = () => {
  return (
    <div>
      <BackArrow destination="/" />
      <h1>Signup Page</h1>
      <SignupForm />
    </div>
  );
};
