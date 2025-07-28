import { TotalEntriesDisplay } from "@/components/ui/TotalEntriesDisplay";
import { MonthlyEntriesView } from "@/types/budgets";
import { BudgetDataCard } from "../ui/BudgetDataCard";
import { BackArrow } from "../ui/BackArrow";

export const MonthlyIncomes = ({ onBack, data }: MonthlyEntriesView) => {
  const totalIncomes = data?.reduce((acc, entry) => acc + entry.amount, 0);
  return (
    <section>
      <BackArrow onBack={onBack} />
      <TotalEntriesDisplay data="revenus" total={totalIncomes} />

      <BudgetDataCard title="Charges" color="primary">
        {data?.map((entry) => (
          <div key={entry.id}>
            <p>{entry.name}</p>
            <p>
              <span>€</span>
              {entry.amount}
            </p>
            <button>modifier</button>
          </div>
        ))}
      </BudgetDataCard>
    </section>
  );
};
