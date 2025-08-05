import { Check, X } from "lucide-react";
import { useState } from "react";
import { UpdateEntryFormProps } from "@/types";
import { BudgetEntry } from "@shared/schemas";
import { ErrorMessage } from "../ui/ErrorMessage";

export const UpdateEntryForm = <T extends BudgetEntry>({
  initialData,
  validationErrors,
  genericError,
  onSubmit,
  onDelete,
}: UpdateEntryFormProps<T>) => {
  const [updatedEntry, setUpdatedEntry] = useState<T>(initialData);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <form>
      {genericError && <ErrorMessage message={genericError} />}
      <div className="input-item">
        <div>
          <input
            type="text"
            placeholder="Nom"
            name="name"
            value={updatedEntry.name}
            onChange={(e) =>
              setUpdatedEntry({ ...updatedEntry, name: e.target.value })
            }
          />
          {validationErrors.name ? (
            <p className="form-error">{validationErrors.name}</p>
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
                value={updatedEntry.amount}
                onChange={(e) =>
                  setUpdatedEntry({ ...updatedEntry, amount: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="delete-btn"
              onClick={() => setConfirmDelete(true)}
              aria-label="Supprimer cette ligne"
            >
              x
            </button>
          </div>
          {validationErrors.amount ? (
            <p className="form-error">Montant invalide</p>
          ) : null}
        </div>
      </div>

      {confirmDelete && (
        <div className="delete-item">
          <p>Supprimer cette entrée ?</p>
          <button
            type="button"
            onClick={() => onDelete(updatedEntry)}
            className="delete-item__button valid"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="delete-item__button cancel"
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
