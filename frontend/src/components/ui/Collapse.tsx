import { useState } from "react";
import "@/styles/components/ui/Collapse.scss";
import { ChevronDownIcon } from "lucide-react";
import { CollapseProps } from "@/types";

export const Collapse = ({ data, title, color }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`collapse-container ${color}`}>
      <div className="collapse-title">
        <p>{title}</p>
        <button
          aria-label={`Voir les ${title}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDownIcon />
        </button>
      </div>

      {isOpen && (
        <div>
          {data.map((entry) => (
            <div key={entry.id} className="entries-container">
              <p>{entry.name}</p>
              <p className={`amount ${color}`}>
                <span>€</span>
                {entry.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
