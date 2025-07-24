import { useBudgetStore } from "@/stores/budgetStore";
import { useUserStore } from "@/stores/userStore";
import "@/styles/components/ui/Banner.scss";

export const Banner = () => {
  const pageTitle = useBudgetStore((s) => s.pageTitle);
  const user = useUserStore((s) => s.user);

  const avatarLetter = user?.name.split("")[0];

  return (
    <div className="banner-container">
      <div className="avatar">
        <p>{avatarLetter}</p>
      </div>
      <div>
        <p className="user-name">{user?.name}</p>
        <h1 className="title">{pageTitle}</h1>
      </div>
    </div>
  );
};
