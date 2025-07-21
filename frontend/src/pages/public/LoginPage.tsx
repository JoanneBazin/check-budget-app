import { LoginForm } from "@/components/forms/LoginForm";
import { BackArrow } from "@/components/ui/BackArrow";

export const LoginPage = () => {
  return (
    <div>
      <BackArrow destination="/" />
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};
