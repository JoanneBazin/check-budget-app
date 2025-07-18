import { NextFunction, Request, Response } from "express";
import { getMultipleParamsIds, getParamsId } from "../lib/req-helpers";
import { prisma } from "../lib/prismaClient";
import {
  isPrismaForeignKeyConstraint,
  isPrismaRecordNotFound,
} from "../lib/prismaErrorHelpers";
import { HttpError } from "../lib/HttpError";
import { updateMonthlyBudgetRemaining } from "../services/budgetService";

export const addMonthlyExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  const data = req.body;
  const expensesArray = Array.isArray(data) ? data : [data];

  try {
    const monthlyExpenses = await Promise.all(
      expensesArray.map((expense) =>
        prisma.weeklyExpense.create({
          data: {
            ...expense,
            monthlyBudgetId,
          },
          select: {
            id: true,
            name: true,
            amount: true,
            weekNumber: true,
          },
        })
      )
    );

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res.status(201).json({ expenses: monthlyExpenses, remainingBudget });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(new HttpError(404, "Référence à un budget inexistant"));
    }
    return next(error);
  }
};

export const updateMonthlyExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, expenseId } = params;

  const { name, amount, weekNumber } = req.body;

  try {
    const updatedExpense = await prisma.weeklyExpense.update({
      where: {
        id: expenseId,
      },
      data: {
        name,
        amount,
        weekNumber,
      },
      select: {
        id: true,
        name: true,
        amount: true,
        weekNumber: true,
      },
    });

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res
      .status(200)
      .json({ updatedExpense: updatedExpense, remainingBudget });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};

export const deleteMonthlyExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "expenseId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, expenseId } = params;

  try {
    await prisma.weeklyExpense.delete({
      where: {
        id: expenseId,
      },
    });

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res
      .status(200)
      .json({ message: "Dépense supprimée avec succès !", remainingBudget });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Dépense non trouvée ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
