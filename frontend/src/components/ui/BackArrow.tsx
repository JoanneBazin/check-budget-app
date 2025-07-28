import { ChevronLeft } from "lucide-react";
import "@/styles/components/ui/BackArrow.scss";
import { useNavigate } from "react-router-dom";
import { BackArrowProps } from "@/types/budgets";

export const BackArrow = ({ destination, onBack }: BackArrowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Click");

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
