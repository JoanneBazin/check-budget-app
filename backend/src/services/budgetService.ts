import { HttpError } from "../lib/HttpError";
import { prisma } from "../lib/prismaClient";
import {
  calculateRemainingBudget,
  calculateWeeklyBudget,
} from "./budgetCalculations";

export const updateMonthlyBudgetRemaining = async (monthlyBudgetId: string) => {
  const monthlyBudget = await prisma.monthlyBudget.findUnique({
    where: { id: monthlyBudgetId },
    select: {
      incomes: {
        select: {
          amount: true,
        },
      },
      charges: {
        select: {
          amount: true,
        },
      },
      expenses: {
        select: {
          amount: true,
        },
      },
    },
  });

  if (!monthlyBudget) {
    throw new HttpError(404, "Budget mensuel non trouvé");
  }

  const remainingBudget = calculateRemainingBudget(
    monthlyBudget.incomes,
    monthlyBudget.charges,
    monthlyBudget.expenses
  );

  return await prisma.monthlyBudget.update({
    where: { id: monthlyBudgetId },
    data: { remainingBudget },
    select: {
      remainingBudget: true,
    },
  });
};

export const updateWeeklyBudget = async (monthlyBudgetId: string) => {
  const monthlyBudget = await prisma.monthlyBudget.findUnique({
    where: { id: monthlyBudgetId },
    select: {
      numberOfWeeks: true,
      incomes: {
        select: {
          amount: true,
        },
      },
      charges: {
        select: {
          amount: true,
        },
      },
    },
  });

  if (!monthlyBudget) {
    throw new HttpError(404, "Budget mensuel non trouvé");
  }

  const weeklyBudget = calculateWeeklyBudget(
    calculateRemainingBudget(monthlyBudget.incomes, monthlyBudget.charges),
    monthlyBudget.numberOfWeeks
  );

  return await prisma.monthlyBudget.update({
    where: { id: monthlyBudgetId },
    data: { weeklyBudget },
    select: {
      weeklyBudget: true,
    },
  });
};
