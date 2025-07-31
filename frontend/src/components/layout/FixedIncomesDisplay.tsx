import {
  useAddFixedIncomesMutation,
  useDeleteFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
} from "@/hooks/queries/mutations/useFixedIncomes";
import { useBudgetStore } from "@/stores/budgetStore";
import { FormBudgetEntry } from "@/types/budgets";
import {
  BudgetEntry,
  budgetEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";
import { BudgetDataCard } from "../ui/BudgetDataCard";
import { DataList } from "../ui/DataList";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import { Modal } from "../ui/Modal";
import { UpdateEntryForm } from "../forms/UpdateEntryForm";
import { TotalDataDisplay } from "../ui/TotalDataDisplay";

export const FixedIncomesDisplay = () => {
  const fixedIncomes = useBudgetStore((s) => s.fixedIncomes);
  const totalIncomes = fixedIncomes.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newIncomes, setNewIncomes] = useState<FormBudgetEntry[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);
  const [incomesError, setIncomesError] = useState<Record<string, string>[]>(
    []
  );
  const [updatedError, setUpdatedError] = useState<Record<string, string>>({});

  const addFixedIncomes = useAddFixedIncomesMutation();
  const updateFixedIncome = useUpdateFixedIncomeMutation();
  const deleteFixedIncome = useDeleteFixedIncomeMutation();

  const handleAddIncomes = () => {
    setIncomesError([]);

    const validation = validateArrayWithSchema(budgetEntrySchema, newIncomes);

    if (!validation.success) {
      setIncomesError(Object.values(validation.errors));
      return;
    }

    addFixedIncomes.mutate(validation.data, {
      onSuccess: () => setNewIncomes([]),
    });
  };

  const handleUpdateIncome = (updatedIncome: FormBudgetEntry) => {
    setUpdatedError({});

    const validation = validateWithSchema(budgetEntrySchema, updatedIncome);

    if (!validation.success) {
      setUpdatedError(validation.errors);
      return;
    }

    updateFixedIncome.mutate(validation.data, {
      onSuccess: () => setSelectedEntry(null),
    });
  };

  const handleDeleteIncome = (deletedIncome: FormBudgetEntry) => {
    setUpdatedError({});

    deleteFixedIncome.mutate(deletedIncome.id ?? "", {
      onSuccess: () => setSelectedEntry(null),
    });
  };

  return (
    <BudgetDataCard title="Mes revenus fixes">
      <DataList data={fixedIncomes} setSelectedEntry={setSelectedEntry} />

      <AddEntriesForm
        initialData={newIncomes}
        errors={incomesError}
        onChange={setNewIncomes}
        defaultInput={false}
      />
      {newIncomes.length > 0 && (
        <button onClick={handleAddIncomes} className="submit-btn">
          Enregistrer
        </button>
      )}

      <TotalDataDisplay total={totalIncomes} />

      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les revenus`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            errors={updatedError}
            onSubmit={handleUpdateIncome}
            onDelete={handleDeleteIncome}
          />
        </Modal>
      )}
    </BudgetDataCard>
  );
};
