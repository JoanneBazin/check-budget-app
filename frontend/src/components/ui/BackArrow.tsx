import { ChevronLeft } from "lucide-react";
import "@/styles/components/ui/BackArrow.scss";
import { useNavigate } from "react-router-dom";
import { BackArrowProps } from "@/types";

export const BackArrow = ({ destination, onBack }: BackArrowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (destination) {
      navigate(destination);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <button
      className="arrow-container"
      aria-label="Retour"
      onClick={handleClick}
    >
      <ChevronLeft />
    </button>
  );
};
