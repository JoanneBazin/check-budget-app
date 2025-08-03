import { ChevronLeft } from "lucide-react";
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
    <button className="back-arrow" aria-label="Retour" onClick={handleClick}>
      <ChevronLeft className="back-arrow__icon" />
    </button>
  );
};
