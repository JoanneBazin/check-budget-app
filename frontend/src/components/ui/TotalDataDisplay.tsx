import { TotalDataDisplayProps } from "@/types/budgets";
import "@/styles/components/ui/TotalDataDisplay.scss";

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
