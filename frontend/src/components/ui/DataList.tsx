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
      <div>
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="current-data">
              <div className="entry-name">
                <ChevronRight size={16} />
                <p>{entry.name}</p>
              </div>
              <div className="amount">
                <p className="amount-entry">
                  <span>€</span>
                  {entry.amount}
                </p>
                {setSelectedEntry && edit && (
                  <button
                    className="amount-update"
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
