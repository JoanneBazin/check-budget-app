import { TotalEntriesProps } from "@/types/budgets";
import "@/styles/components/ui/TotalMonthlyEntriesDisplay.scss";

export const TotalMonthlyEntriesDisplay = ({
  data,
  total,
}: TotalEntriesProps) => {
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
