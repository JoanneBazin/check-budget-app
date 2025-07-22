import { useBudgetStore } from "@/stores/budgetStore";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export const Profile = () => {
  const user = useUserStore((s) => s.user);
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  useEffect(() => {
    if (user) {
      setPageTitle(user?.email);
    }
  }, []);
  return <div>Profile</div>;
};
