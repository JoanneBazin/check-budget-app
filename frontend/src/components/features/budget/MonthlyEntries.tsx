import { useState } from "react";
import {
  BudgetEntry,
  budgetEntrySchema,
  createBudgetEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddMonthlyEntriesMutation,
  useDeleteMonthlyEntriesMutation,
  useUpdateMonthlyEntriesMutation,
} from "@/hooks/queries/mutations";
import {
  BackArrow,
  BudgetDataCard,
  DataList,
  Modal,
  TotalMonthlyEntriesDisplay,
} from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  MonthlyEntriesView,
  NewBudgetEntry,
  UpdatedBudgetEntry,
} from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export const MonthlyEntries = ({
  type,
  onBack,
  data,
  dateTitle,
  budgetId,
}: MonthlyEntriesView) => {
  const totalData = data.reduce((acc, entry) => acc + entry.amount, 0);
  const title = type.charAt(0).toUpperCase() + type.slice(1) + " " + dateTitle;

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);
  const [newEntries, setNewEntries] = useState<NewBudgetEntry[]>([]);

  const addMonthlyEntries = useAddMonthlyEntriesMutation();
  const updateMonthlyEntry = useUpdateMonthlyEntriesMutation();
  const deleteMonthlyEntry = useDeleteMonthlyEntriesMutation();

  const [validationError, setValidationError] = useState<
    Record<string, string>[]
  >([]);
  const [updateValidationError, setUpdateValidationError] = useState<
    Record<string, string>
  >({});
  const genericAddError = addMonthlyEntries.isError;
  const [genericUpdateError, setGenericUpdateError] = useState<string | null>(
    null
  );
  const [genericDeleteError, setGenericDeleteError] = useState<string | null>(
    null
  );

  const handleAddEntries = () => {
    setValidationError([]);

    const validation = validateArrayWithSchema(
      createBudgetEntrySchema,
      newEntries
    );

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addMonthlyEntries.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entries: validation.data,
        budgetId,
      },
      { onSuccess: () => setNewEntries([]) }
    );
  };

  const handleUpdateEntry = (updatedEntry: UpdatedBudgetEntry) => {
    setUpdateValidationError({});
    setGenericUpdateError(null);

    const validation = validateWithSchema(budgetEntrySchema, updatedEntry);

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entry: validation.data,
        budgetId,
      },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericUpdateError(
            "Une erreur est survenue lors de la mise à jour"
          ),
      }
    );
  };

  const handleDeleteEntry = (deletedEntry: BudgetEntry) => {
    setUpdateValidationError({});
    setGenericDeleteError(null);

    deleteMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entryId: deletedEntry.id,
        budgetId,
      },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericDeleteError(
            "Une erreur est survenue lors de la suppression"
          ),
      }
    );
  };

  return (
    <section>
      <BackArrow onBack={onBack} />
      <TotalMonthlyEntriesDisplay type={type} total={totalData} />

      {genericAddError && (
        <ErrorMessage message="Une erreur interne est survenue" />
      )}

      <div className="my-2xl">
        <BudgetDataCard title={title} color="black">
          <DataList
            data={data}
            setSelectedEntry={setSelectedEntry}
            emptyMessage={
              type === "charges"
                ? "Aucune charge déclarée"
                : "Aucun revenu déclaré"
            }
          />

          <AddEntriesForm
            initialData={newEntries}
            errors={validationError}
            onChange={setNewEntries}
            defaultInput={false}
          />
          {newEntries.length > 0 && (
            <button
              onClick={handleAddEntries}
              className="submit-btn"
              disabled={addMonthlyEntries.isPending}
            >
              Enregistrer
            </button>
          )}
        </BudgetDataCard>
      </div>

      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les ${type}`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            validationErrors={updateValidationError}
            genericError={genericUpdateError || genericDeleteError}
            onSubmit={handleUpdateEntry}
            onDelete={handleDeleteEntry}
          />
        </Modal>
      )}
    </section>
  );
};
