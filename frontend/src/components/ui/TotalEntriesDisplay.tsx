import { TotalEntriesProps } from "@/types/budgets";
import "@/styles/components/ui/TotalEntriesDisplay.scss";

export const TotalEntriesDisplay = ({ data, total }: TotalEntriesProps) => {
  return (
    <div>
      <p>Total {data}</p>
      <p className="total-budget">
        <span>€</span>
        {total.toFixed(2)}
      </p>
    </div>
  );
};
