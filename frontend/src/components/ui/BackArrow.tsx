import { ChevronLeft } from "lucide-react";
import "@/styles/components/ui/BackArrow.scss";
import { Link } from "react-router-dom";

export const BackArrow = ({ destination }: { destination: string }) => {
  return (
    <Link to={destination} aria-label="Retourner à la page précécente">
      <div className="arrow-container">
        <ChevronLeft />
      </div>
    </Link>
  );
};
