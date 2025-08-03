import { useEffect, useState } from "react";
import { AddEntriesFormProps, NewBudgetEntry } from "@/types";

export const AddEntriesForm = ({
  initialData,
  errors,
  onChange,
  defaultInput = true,
}: AddEntriesFormProps) => {
  const [entries, setEntries] = useState<NewBudgetEntry[]>(initialData || []);

  useEffect(() => {
    setEntries(initialData || []);
  }, [initialData]);

  useEffect(() => {
    if (entries.length < 1 && defaultInput) addEntry();
  }, []);

  const handleUpdate = (
    index: number,
    field: keyof NewBudgetEntry,
    value: string
  ) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index
        ? {
            ...entry,
            [field]: value,
          }
        : entry
    );
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  const addEntry = () => {
    const updatedEntries = [...entries, { name: "", amount: "" }];
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  const removeEntry = (entryIndex: number) => {
    const updatedEntries = entries.filter((_, index) => index !== entryIndex);
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  return (
    <form>
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="input-item">
            <div>
              <input
                type="text"
                placeholder="Nom"
                name="name"
                className="name-input"
                value={entry.name}
                onChange={(e) => handleUpdate(index, "name", e.target.value)}
              />
              {errors.length > 0 && errors[index].name ? (
                <p className="form-error">{errors[index].name}</p>
              ) : null}
            </div>

            <div className="input-item__right">
              <div className="input-item__right__amount">
                <div className="flex-center">
                  <span className="mr-xxs">€</span>
                  <input
                    type="number"
                    placeholder="Montant"
                    name="amount"
                    value={entry.amount}
                    onChange={(e) =>
                      handleUpdate(index, "amount", e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeEntry(index)}
                  aria-label="Supprimer cette ligne"
                >
                  x
                </button>
              </div>
              {errors.length > 0 && errors[index].amount ? (
                <p className="form-error">Montant invalide</p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEntry}
        className="add-btn"
        aria-label="Ajouter une ligne"
      >
        +
      </button>
    </form>
  );
};
