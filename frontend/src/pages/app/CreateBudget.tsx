import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import "@/styles/pages/CreateBudget.scss";
import { BudgetDataCard } from "@/components/ui/BudgetDataCard";
import { AddEntriesForm } from "@/components/forms/AddEntriesForm";
import { useFixedChargesQuery } from "@/hooks/queries/useFixedChargesQuery";
import { useFixedIncomesQuery } from "@/hooks/queries/useFixedIncomesQuery";
import { Entry } from "@/types/budgets";
import { frontBudgetSchema, validateWithSchema } from "@shared/schemas";
import { extractArrayErrors } from "@/lib/extractArrayErrors";
import { useCreateBudgetMutation } from "@/hooks/queries/mutations/useMonthlyBudgets";
import { useNavigate } from "react-router-dom";

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
  const [incomesErrors, setIncomesErrors] = useState<string[]>([]);
  const [chargesErrors, setChargesErrors] = useState<string[]>([]);
  const { mutate, isPending, error: requestError } = useCreateBudgetMutation();
  const navigate = useNavigate();

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
    setIncomesErrors([]);
    setChargesErrors([]);

    const newBudget = {
      month,
      year,
      isCurrent,
      incomes: monthlyIncomes,
      charges: monthlyCharges,
    };

    const validation = validateWithSchema(frontBudgetSchema, newBudget);
    if (!validation.success) {
      setIncomesErrors(extractArrayErrors(validation.errors, "incomes"));
      setChargesErrors(extractArrayErrors(validation.errors, "charges"));
      return;
    }

    mutate(validation.data, { onSuccess: () => navigate("/app") });
  };

  return (
    <section className="create-section">
      <div className="create-title">
        <h2>Budget pour le mois de</h2>
        <MonthYearPicker onChange={handleDateChange} />
      </div>
      {requestError && <p className="form-error">{requestError.message}</p>}
      <BudgetDataCard title="Revenus">
        <AddEntriesForm
          initialData={initialIncomes}
          errors={incomesErrors}
          onChange={setMonthlyIncomes}
        />
      </BudgetDataCard>
      <BudgetDataCard title="Charges">
        <AddEntriesForm
          initialData={initialCharges}
          errors={chargesErrors}
          onChange={setMonthlyCharges}
        />
      </BudgetDataCard>

      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
          />
          Définir comme budget actif
        </label>
        <span className="checkbox-span">
          Ce budget sera disponible directement sur votre dashboard
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="submit-btn"
        disabled={isPending}
      >
        Valider
      </button>
    </section>
  );
};
