import { TotalCardProps } from "@/types";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const TotalCard = ({ title, totalData, setView }: TotalCardProps) => {
  const color = title === "charges" ? "black" : "primary";

  return (
    <div
      className={`total-card ${color}`}
      role="button"
      tabIndex={0}
      onClick={setView}
    >
      {title === "charges" ? (
        <ArrowDownLeft className="total-card__icon primary" />
      ) : (
        <ArrowUpRight className="total-card__icon" />
      )}
      <div className="total-card__text">
        <p>{title}</p>
        <span>€ {totalData}</span>
      </div>
    </div>
  );
};
