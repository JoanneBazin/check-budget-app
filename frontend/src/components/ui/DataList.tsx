import { ChevronRight } from "lucide-react";
import { DataListProps } from "@/types";
import { BudgetEntry } from "@shared/schemas";

export const DataList = <T extends BudgetEntry>({
  data,
  setSelectedEntry,
  edit = true,
}: DataListProps<T>) => {
  return (
    <>
      <div className="mb-xs">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="data-item">
              <div className="data-item__name">
                <ChevronRight size={16} />
                <p>{entry.name}</p>
              </div>
              <div className="data-item__amount">
                <p className="data-item__amount__entry">
                  <span>€</span>
                  {entry.amount}
                </p>
                {setSelectedEntry && edit && (
                  <button
                    className="data-item__amount__update"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    modifier
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="empty-data-info">Pas encore de données saisies</p>
        )}
      </div>
    </>
  );
};
