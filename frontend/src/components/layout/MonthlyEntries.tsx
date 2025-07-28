import { BudgetDataCard } from "@/components/ui/BudgetDataCard";
import { TotalEntriesDisplay } from "@/components/ui/TotalEntriesDisplay";
import { FormBudgetEntry, MonthlyEntriesView } from "@/types/budgets";
import { BackArrow } from "../ui/BackArrow";
import "@/styles/components/layout/MonthlyEntries.scss";
import { DataList } from "../ui/DataList";
import { useState } from "react";
import { AddEntriesForm } from "../forms/AddEntriesForm";
import { budgetEntrySchema, validateArrayWithSchema } from "@shared/schemas";
import { useAddMonthlyEntriesMutation } from "@/hooks/queries/mutations/useMonthlyBudgets";

export const MonthlyEntries = ({
  type,
  onBack,
  data,
  dateTitle,
  budgetId,
}: MonthlyEntriesView) => {
  const totalData = data?.reduce((acc, entry) => acc + entry.amount, 0);
  const title = type.charAt(0).toUpperCase() + type.slice(1) + " " + dateTitle;

  const [newEntries, setNewEntries] = useState<FormBudgetEntry[]>([]);
  const [entriesError, setEntriesError] = useState<Record<string, string>[]>(
    []
  );
  const { mutate, isPending, error } = useAddMonthlyEntriesMutation();

  const handleSubmit = () => {
    setEntriesError([]);

    const validation = validateArrayWithSchema(budgetEntrySchema, newEntries);

    if (!validation.success) {
      setEntriesError(Object.values(validation.errors));
      return;
    }

    mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entries: validation.data ?? [],
        budgetId,
      },
      { onSuccess: () => setNewEntries([]) }
    );
  };

  return (
    <section>
      <BackArrow onBack={onBack} />
      <TotalEntriesDisplay data={type} total={totalData} />

      <div className="monthly-entries-container">
        <BudgetDataCard title={title} color="black">
          <DataList data={data} />

          <AddEntriesForm
            initialData={newEntries}
            errors={entriesError}
            onChange={setNewEntries}
            defaultInput={false}
          />
          {newEntries.length > 0 && (
            <button onClick={handleSubmit} className="submit-btn">
              Enregistrer
            </button>
          )}
        </BudgetDataCard>
      </div>
    </section>
  );
};
