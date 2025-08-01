import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import "@/styles/pages/History.scss";
import { getBudgetByDate } from "@/lib/api/monthlyBudgets";
import { Search } from "lucide-react";
import { LastBudgetLayout } from "@/components/features/history/LastBudgetLayout";
import { useLastBudgetsQuery } from "@/hooks/queries";
import { HistoryCard, MonthYearPicker } from "@/components/ui";
import { LastMonthlyBudget } from "@/types";

export const History = () => {
  const { data: lastBudgets, isPending, error } = useLastBudgetsQuery();
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [searchedBudget, setSearchedBudget] =
    useState<LastMonthlyBudget | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle("Historique des budgets mensuels");
  }, []);

  const handleDateChange = async (month: number, year: number) => {
    try {
      setIsLoading(true);
      setSearchError(null);
      setSearchedBudget(null);
      const data = await getBudgetByDate(year, month);
      setSearchedBudget(data);
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : "Erreur lors de la recherche"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedBudget)
    return (
      <LastBudgetLayout
        budgetId={selectedBudget}
        onBack={() => setSelectedBudget(null)}
      />
    );

  return (
    <section>
      <div className="date-picker-container">
        <p>Rechercher par mois</p>
        <MonthYearPicker onChange={handleDateChange} defaultInput={false} />
      </div>

      {searchError && (
        <div className="search-error">
          <Search size={18} />
          <p className="search-error--text">{searchError}</p>
        </div>
      )}

      {searchedBudget && (
        <div className="selected-budget-card">
          <HistoryCard data={searchedBudget} onSelect={setSelectedBudget} />
        </div>
      )}

      {isPending && <div>Loading...</div>}
      {error && <div>{error.message}</div>}

      <div className="history-container">
        {lastBudgets &&
          lastBudgets.map((budget) => (
            <HistoryCard
              key={budget.id}
              data={budget}
              onSelect={setSelectedBudget}
            />
          ))}
      </div>
    </section>
  );
};
