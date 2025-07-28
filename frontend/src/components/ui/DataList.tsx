import { DataListProps } from "@/types/budgets";
import { ChevronRight } from "lucide-react";
import "@/styles/components/ui/DataList.scss";

export const DataList = ({ data }: DataListProps) => {
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
                <button className="amount-update">modifier</button>
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
