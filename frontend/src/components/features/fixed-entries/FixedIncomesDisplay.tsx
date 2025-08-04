import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  DataList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import {
  useAddFixedIncomesMutation,
  useDeleteFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
} from "@/hooks/queries/mutations";
import { useBudgetStore } from "@/stores/budgetStore";
import { NewBudgetEntry, UpdatedBudgetEntry } from "@/types";
import {
  BudgetEntry,
  budgetEntrySchema,
  createBudgetEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const FixedIncomesDisplay = () => {
  const fixedIncomes = useBudgetStore((s) => s.fixedIncomes);
  const totalIncomes = fixedIncomes.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newIncomes, setNewIncomes] = useState<NewBudgetEntry[]>([]);

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

    const validation = validateArrayWithSchema(
      createBudgetEntrySchema,
      newIncomes
    );

    if (!validation.success) {
      setIncomesError(Object.values(validation.errors));
      return;
    }

    addFixedIncomes.mutate(validation.data, {
      onSuccess: () => setNewIncomes([]),
    });
  };

  const handleUpdateIncome = (updatedIncome: UpdatedBudgetEntry) => {
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

  const handleDeleteIncome = (deletedIncome: BudgetEntry) => {
    setUpdatedError({});

    deleteFixedIncome.mutate(deletedIncome.id, {
      onSuccess: () => setSelectedEntry(null),
    });
  };

  return (
    <BudgetDataCard title="Mes revenus fixes">
      <DataList
        data={fixedIncomes}
        setSelectedEntry={setSelectedEntry}
        emptyMessage="Aucun revenu fixe déclaré"
      />

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
