import { useSessionQuery } from "@/hooks/queries/useSessionQuery";
import "@/styles/components/ui/Banner.scss";

export const Banner = ({ title }: { title: string }) => {
  const { data: user } = useSessionQuery();
  const avatarLetter = user?.name.split("")[0];

  return (
    <div className="banner-container">
      <div className="avatar">
        <p>{avatarLetter}</p>
      </div>
      <div>
        <p className="user-name">{user?.name}</p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
};
