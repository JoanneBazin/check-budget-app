import "@/styles/components/ui/TotalDataDisplay.scss";
import { TotalDataDisplayProps } from "@/types";

export const TotalDataDisplay = ({
  total,
  title = "Total",
}: TotalDataDisplayProps) => {
  return (
    <div className="total-data">
      <p>{title}</p>
      <p className="total-data-amount">
        <span>€</span>
        {total}
      </p>
    </div>
  );
};
