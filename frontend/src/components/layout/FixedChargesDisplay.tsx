import {
  useAddFixedChargesMutation,
  useDeleteFixedChargeMutation,
  useUpdateFixedChargeMutation,
} from "@/hooks/queries/mutations/useFixedCharges";
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
import { TotalDataDisplay } from "../ui/TotalDataDisplay";
import { Modal } from "../ui/Modal";
import { UpdateEntryForm } from "../forms/UpdateEntryForm";

export const FixedChargesDisplay = () => {
  const fixedCharges = useBudgetStore((s) => s.fixedCharges);
  const totalCharges = fixedCharges.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newCharges, setNewCharges] = useState<FormBudgetEntry[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);
  const [chargesError, setChargesError] = useState<Record<string, string>[]>(
    []
  );
  const [updatedError, setUpdatedError] = useState<Record<string, string>>({});

  const addFixedCharges = useAddFixedChargesMutation();
  const updateFixedCharge = useUpdateFixedChargeMutation();
  const deleteFixedCharge = useDeleteFixedChargeMutation();

  const handleAddCharges = () => {
    setChargesError([]);

    const validation = validateArrayWithSchema(budgetEntrySchema, newCharges);

    if (!validation.success) {
      setChargesError(Object.values(validation.errors));
      return;
    }

    addFixedCharges.mutate(validation.data, {
      onSuccess: () => setNewCharges([]),
    });
  };

  const handleUpdateCharge = (updatedCharge: FormBudgetEntry) => {
    setUpdatedError({});

    const validation = validateWithSchema(budgetEntrySchema, updatedCharge);

    if (!validation.success) {
      setUpdatedError(validation.errors);
      return;
    }

    updateFixedCharge.mutate(validation.data, {
      onSuccess: () => setSelectedEntry(null),
    });
  };

  const handleDeleteCharge = (deletedCharge: FormBudgetEntry) => {
    setUpdatedError({});

    deleteFixedCharge.mutate(deletedCharge.id ?? "", {
      onSuccess: () => setSelectedEntry(null),
    });
  };

  return (
    <BudgetDataCard title="Mes charges fixes">
      <DataList data={fixedCharges} setSelectedEntry={setSelectedEntry} />

      <AddEntriesForm
        initialData={newCharges}
        errors={chargesError}
        onChange={setNewCharges}
        defaultInput={false}
      />
      {newCharges.length > 0 && (
        <button onClick={handleAddCharges} className="submit-btn">
          Enregistrer
        </button>
      )}

      <TotalDataDisplay total={totalCharges} />

      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les charges`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            errors={updatedError}
            onSubmit={handleUpdateCharge}
            onDelete={handleDeleteCharge}
          />
        </Modal>
      )}
    </BudgetDataCard>
  );
};
