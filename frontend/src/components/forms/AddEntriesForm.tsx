import { EntriesFormProps, Entry } from "@/types/budgets";
import { useState } from "react";
import "@/styles/components/forms/AddEntriesForm.scss";

export const AddEntriesForm = ({ initialData, onChange }: EntriesFormProps) => {
  const [entries, setEntries] = useState<Entry[]>(initialData || []);

  const handleUpdate = (index: number, field: keyof Entry, value: string) => {
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
    const updatedEntries = entries.filter(
      (entry, index) => index !== entryIndex
    );
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  return (
    <form>
      {entries.map((entry, index) => (
        <div key={index} className="inputs-container">
          <input
            type="text"
            placeholder="Nom"
            name="name"
            className="name-input"
            value={entry.name}
            onChange={(e) => handleUpdate(index, "name", e.target.value)}
          />
          <div className="amount-container">
            <span className="currency-symbol">€</span>
            <input
              type="number"
              placeholder="Montant"
              name="amount"
              className="amount-input"
              value={entry.amount}
              onChange={(e) => handleUpdate(index, "amount", e.target.value)}
            />
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeEntry(index)}
              aria-label="Supprimer cette ligne"
            >
              x
            </button>
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
