import { LoginForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";

export const LoginPage = () => {
  return (
    <div>
      <BackArrow destination="/" />
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};
