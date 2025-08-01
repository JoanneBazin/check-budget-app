import { formatDateTitle } from "@/lib/formatDateTitle";
import "@/styles/components/ui/HistoryCard.scss";
import { HistoryCardProps } from "@/types";

export const HistoryCard = ({ data, onSelect }: HistoryCardProps) => {
  const dateTitle = formatDateTitle(data.year, data.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);
  return (
    <div className="history-card">
      <p className="history-card--title">{title}</p>
      <div className="history-card--sold">
        <p>Solde</p>
        <p className="history-card--amount">
          <span>€ </span>
          {data.remainingBudget}
        </p>
      </div>
      <button onClick={() => onSelect(data.id)} className="history-card--read">
        consulter
      </button>
    </div>
  );
};
