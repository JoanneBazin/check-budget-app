export const budgetEntrySelect = {
  id: true,
  name: true,
  amount: true,
};

export const expenseEntrySelect = {
  id: true,
  name: true,
  amount: true,
  weekNumber: true,
};

export const monthlyBudgetSelect = {
  id: true,
  month: true,
  year: true,
  isCurrent: true,
  remainingBudget: true,
  incomes: {
    select: {
      ...budgetEntrySelect,
    },
  },
  charges: {
    select: {
      ...budgetEntrySelect,
    },
  },
  expenses: {
    select: {
      ...expenseEntrySelect,
    },
  },
};
