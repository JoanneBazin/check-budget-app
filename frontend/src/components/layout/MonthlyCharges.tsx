import { BudgetDataCard } from "@/components/ui/BudgetDataCard";
import { TotalEntriesDisplay } from "@/components/ui/TotalEntriesDisplay";
import { MonthlyEntriesView } from "@/types/budgets";
import { BackArrow } from "../ui/BackArrow";

export const MonthlyCharges = ({ onBack, data }: MonthlyEntriesView) => {
  const totalCharges = data?.reduce((acc, entry) => acc + entry.amount, 0);
  return (
    <section>
      <BackArrow onBack={onBack} />
      <TotalEntriesDisplay data="charges" total={totalCharges} />

      <BudgetDataCard title="Charges" color="black">
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
