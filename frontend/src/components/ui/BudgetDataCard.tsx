import "@/styles/components/ui/BudgetDataCard.scss";
import { BudgetDataCardProps } from "@/types";
export const BudgetDataCard = ({
  title,
  children,
  color = "white",
}: BudgetDataCardProps) => {
  return (
    <article className="data-card">
      <div className={`data-card-title ${color}`}>
        <p>{title}</p>
      </div>
      <div className="data-card-content">{children}</div>
    </article>
  );
};
