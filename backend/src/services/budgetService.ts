import { HttpError } from "../lib/HttpError";
import { prisma } from "../lib/prismaClient";
import { calculateRemainingBudget } from "./budgetCalculations";

export const updateMonthlyBudgetRemaining = async (monthlyBudgetId: string) => {
  const monthlyBudget = await prisma.monthlyBudget.findUnique({
    where: { id: monthlyBudgetId },
    include: {
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

  const remainingBudget = calculateRemainingBudget(
    monthlyBudget.incomes,
    monthlyBudget.charges
  );

  return await prisma.monthlyBudget.update({
    where: { id: monthlyBudgetId },
    data: { remainingBudget },
  });
};
