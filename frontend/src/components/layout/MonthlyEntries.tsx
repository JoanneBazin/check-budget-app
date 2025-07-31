import { BudgetDataCard } from "@/components/ui/BudgetDataCard";
import { TotalMonthlyEntriesDisplay } from "@/components/ui/TotalMonthlyEntriesDisplay";
import { FormBudgetEntry, MonthlyEntriesView } from "@/types/budgets";
import { BackArrow } from "../ui/BackArrow";
import "@/styles/components/layout/MonthlyEntries.scss";
import { DataList } from "../ui/DataList";
import { useState } from "react";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import {
  BudgetEntry,
  budgetEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddMonthlyEntriesMutation,
  useDeleteMonthlyEntriesMutation,
  useUpdateMonthlyEntriesMutation,
} from "@/hooks/queries/mutations/useMonthlyBudgets";
import { Modal } from "../ui/Modal";
import { UpdateEntryForm } from "../forms/UpdateEntryForm";

export const MonthlyEntries = ({
  type,
  onBack,
  data,
  dateTitle,
  budgetId,
}: MonthlyEntriesView) => {
  const totalData = data?.reduce((acc, entry) => acc + entry.amount, 0);
  const title = type.charAt(0).toUpperCase() + type.slice(1) + " " + dateTitle;

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);
  const [newEntries, setNewEntries] = useState<FormBudgetEntry[]>([]);
  const [entriesError, setEntriesError] = useState<Record<string, string>[]>(
    []
  );
  const [updatedError, setUpdatedError] = useState<Record<string, string>>({});
  const addMonthlyEntries = useAddMonthlyEntriesMutation();
  const updateMonthlyEntry = useUpdateMonthlyEntriesMutation();
  const deleteMonthlyEntry = useDeleteMonthlyEntriesMutation();

  const handleAddEntries = () => {
    setEntriesError([]);

    const validation = validateArrayWithSchema(budgetEntrySchema, newEntries);

    if (!validation.success) {
      setEntriesError(Object.values(validation.errors));
      return;
    }

    addMonthlyEntries.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entries: validation.data ?? [],
        budgetId,
      },
      { onSuccess: () => setNewEntries([]) }
    );
  };

  const handleUpdateEntry = (updatedEntry: FormBudgetEntry) => {
    setUpdatedError({});

    const validation = validateWithSchema(budgetEntrySchema, updatedEntry);

    if (!validation.success) {
      setUpdatedError(validation.errors);
      return;
    }

    updateMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entry: validation.data ?? {},
        budgetId,
      },
      { onSuccess: () => setSelectedEntry(null) }
    );
  };

  const handleDeleteEntry = (deletedEntry: FormBudgetEntry) => {
    setUpdatedError({});

    deleteMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entryId: deletedEntry.id ?? "",
        budgetId,
      },
      { onSuccess: () => setSelectedEntry(null) }
    );
  };

  return (
    <section>
      <BackArrow onBack={onBack} />
      <TotalMonthlyEntriesDisplay data={type} total={totalData} />

      <div className="monthly-entries-container">
        <BudgetDataCard title={title} color="black">
          <DataList data={data} setSelectedEntry={setSelectedEntry} />

          <AddEntriesForm
            initialData={newEntries}
            errors={entriesError}
            onChange={setNewEntries}
            defaultInput={false}
          />
          {newEntries.length > 0 && (
            <button onClick={handleAddEntries} className="submit-btn">
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
            errors={updatedError}
            onSubmit={handleUpdateEntry}
            onDelete={handleDeleteEntry}
          />
        </Modal>
      )}
    </section>
  );
};
