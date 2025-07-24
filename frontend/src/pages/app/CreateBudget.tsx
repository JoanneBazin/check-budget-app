import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import "@/styles/pages/CreateBudget.scss";
import { BudgetDataCard } from "@/components/ui/BudgetDataCard";
import { AddEntriesForm } from "@/components/forms/AddEntriesForm";
import { useFixedChargesQuery } from "@/hooks/queries/useFixedChargesQuery";
import { useFixedIncomesQuery } from "@/hooks/queries/useFixedIncomesQuery";
import { Entry } from "@/types/budgets";

export const CreateBudget = () => {
  const {
    data: charges,
    isLoading: chargesLoading,
    error: chargesError,
  } = useFixedChargesQuery();
  const {
    data: incomes,
    isLoading: incomesLoading,
    error: incomesError,
  } = useFixedIncomesQuery();
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const initialCharges = charges?.map(({ id, ...rest }) => rest);
  const initialIncomes = incomes?.map(({ id, ...rest }) => rest);
  const [monthlyCharges, setMonthlyCharges] = useState<Entry[]>([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState<Entry[]>([]);
  const [isCurrent, setIsCurrent] = useState(true);

  useEffect(() => {
    setPageTitle("Ajouter un budget mensuel");
  }, []);

  if (chargesLoading || incomesLoading) return <div>Loading</div>;
  if (chargesError || incomesError) return <div>Erreur data</div>;

  const handleDateChange = (month: number, year: number) => {
    setMonth(month);
    setYear(year);
  };

  const handleSubmit = () => {
    const newBudget = {
      month,
      year,
      isCurrent,
      incomes: monthlyIncomes,
      charges: monthlyCharges,
    };
    console.log(newBudget);
  };

  return (
    <section>
      <div className="create-title">
        <h2>Budget pour le mois de</h2>
        <MonthYearPicker onChange={handleDateChange} />
      </div>
      <BudgetDataCard title="Revenus">
        <AddEntriesForm
          initialData={initialIncomes}
          onChange={setMonthlyIncomes}
        />
      </BudgetDataCard>
      <BudgetDataCard title="Charges">
        <AddEntriesForm
          initialData={initialCharges}
          onChange={setMonthlyCharges}
        />
      </BudgetDataCard>
      <input type="checkbox" name="current" id="current" />

      <button onClick={handleSubmit}>Valider</button>
    </section>
  );
};
