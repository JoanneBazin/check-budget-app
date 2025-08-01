import { Check, X } from "lucide-react";
import { useState } from "react";
import "@/styles/components/forms/UpdateEntryForm.scss";
import { UpdateEntryFormProps } from "@/types";
import { BudgetEntry } from "@shared/schemas";

export const UpdateEntryForm = <T extends BudgetEntry>({
  initialData,
  errors,
  onSubmit,
  onDelete,
}: UpdateEntryFormProps<T>) => {
  const [updatedEntry, setUpdatedEntry] = useState<T>(initialData);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <form>
      <div className="inputs-container">
        <div>
          <input
            type="text"
            placeholder="Nom"
            name="name"
            className="name-input"
            value={updatedEntry.name}
            onChange={(e) =>
              setUpdatedEntry({ ...updatedEntry, name: e.target.value })
            }
          />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
        </div>
        <div className="amount-content">
          <div className="amount-container">
            <span className="currency-symbol">€</span>
            <input
              type="number"
              placeholder="Montant"
              name="amount"
              className="amount-input"
              value={updatedEntry.amount}
              onChange={(e) =>
                setUpdatedEntry({ ...updatedEntry, amount: e.target.value })
              }
            />
            <button
              type="button"
              className="delete-btn"
              onClick={() => setConfirmDelete(true)}
              aria-label="Supprimer cette ligne"
            >
              x
            </button>
          </div>
          {errors.amount ? (
            <p className="form-error">Montant invalide</p>
          ) : null}
        </div>
      </div>
      {confirmDelete && (
        <div className="delete-container">
          <p>Supprimer cette entrée ?</p>
          <button
            type="button"
            onClick={() => onDelete(updatedEntry)}
            className="btn valid"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="btn cancel"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => onSubmit(updatedEntry)}
        className="submit-btn"
      >
        Modifier
      </button>
    </form>
  );
};
