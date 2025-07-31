import { useBudgetStore } from "@/stores/budgetStore";
import { DateDisplayProps } from "@/types/budgets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "@/styles/components/ui/DateDisplay.scss";

export const DateDisplay = ({ weekIndex, setIndex }: DateDisplayProps) => {
  const weeks = useBudgetStore((s) => s.weeksInMonth);

  return (
    <div className="date-selector">
      <button
        onClick={() => setIndex(Math.max(weekIndex - 1, 0))}
        disabled={weekIndex === 0}
        aria-label="Afficher la semaine précédente"
        className="icon-btn"
      >
        <ChevronLeft className="icon" />
      </button>
      <span>
        du{" "}
        {new Date(weeks[weekIndex].start).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })}{" "}
        au{" "}
        {new Date(weeks[weekIndex].end).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })}
      </span>
      <button
        onClick={() => setIndex(Math.min(weekIndex + 1, weeks.length - 1))}
        disabled={weekIndex === weeks.length - 1}
        aria-label="Afficher la semaine suivante"
        className="icon-btn"
      >
        <ChevronRight className="icon" />
      </button>
    </div>
  );
};
