import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import { createMonthlyBudgetSchema, validateWithSchema } from "@shared/schemas";
import { extractArrayErrors } from "@/lib/extractArrayErrors";
import { useNavigate } from "react-router-dom";
import { getWeeksInMonth } from "@/lib/getWeeksInMonth";
import { useCreateBudgetMutation } from "@/hooks/queries/mutations";
import { BudgetDataCard, MonthYearPicker } from "@/components/ui";
import { AddEntriesForm } from "@/components/forms";
import { NewBudgetEntry } from "@/types";

export const CreateBudget = () => {
  const charges = useBudgetStore((s) => s.fixedCharges);
  const incomes = useBudgetStore((s) => s.fixedIncomes);
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const [monthlyCharges, setMonthlyCharges] =
    useState<NewBudgetEntry[]>(charges);
  const [monthlyIncomes, setMonthlyIncomes] =
    useState<NewBudgetEntry[]>(incomes);
  const [isCurrent, setIsCurrent] = useState(true);
  const [incomesErrors, setIncomesErrors] = useState<Record<string, string>[]>(
    []
  );
  const [chargesErrors, setChargesErrors] = useState<Record<string, string>[]>(
    []
  );
  const { mutate, isPending, error: requestError } = useCreateBudgetMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Ajouter un budget mensuel");
  }, []);

  const handleDateChange = (month: number, year: number) => {
    setMonth(month);
    setYear(year);
  };

  const handleSubmit = () => {
    setIncomesErrors([]);
    setChargesErrors([]);

    if (!year || !month) return;

    const newBudget = {
      month,
      year,
      isCurrent,
      incomes: monthlyIncomes,
      charges: monthlyCharges,
      numberOfWeeks: getWeeksInMonth(year, month).length,
    };

    const validation = validateWithSchema(createMonthlyBudgetSchema, newBudget);
    if (!validation.success) {
      setIncomesErrors(extractArrayErrors(validation.errors, "incomes"));
      setChargesErrors(extractArrayErrors(validation.errors, "charges"));

      return;
    }

    mutate(validation.data, {
      onSuccess: () => navigate("/app"),
    });
  };

  return (
    <section className="create-section">
      <div className="create-section__title">
        <h2>Budget pour le mois de</h2>
        <MonthYearPicker onChange={handleDateChange} />
      </div>
      {requestError && <p className="form-error">{requestError.message}</p>}
      <BudgetDataCard title="Revenus">
        <AddEntriesForm
          initialData={monthlyIncomes}
          errors={incomesErrors}
          onChange={setMonthlyIncomes}
        />
      </BudgetDataCard>
      <BudgetDataCard title="Charges">
        <AddEntriesForm
          initialData={monthlyCharges}
          errors={chargesErrors}
          onChange={setMonthlyCharges}
        />
      </BudgetDataCard>

      <div className="create-section__checkbox">
        <label className="create-section__checkbox__label">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
          />
          Définir comme budget actif
        </label>
        <span className="create-section__checkbox__span">
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
