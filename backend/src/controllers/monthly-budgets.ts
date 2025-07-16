import { NextFunction, Request, Response } from "express";
import { getParamsId, getUserId } from "../lib/req-helpers";
import { prisma } from "../lib/prismaClient";
import {
  isPrismaRecordNotFound,
  isPrismaUniqueConstraint,
} from "../lib/prismaErrorHelpers";
import { HttpError } from "../lib/HttpError";
import { calculateRemainingBudget } from "../services/budgetCalculations";

export const addMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const { month, year, incomes, charges } = req.body;

  const remainingBudget = calculateRemainingBudget(incomes, charges);

  try {
    const monthlyBudget = await prisma.monthlyBudget.create({
      data: {
        userId,
        month,
        year,
        remainingBudget,
        incomes: {
          create: incomes,
        },
        charges: {
          create: charges,
        },
      },
    });
    return res.status(201).json(monthlyBudget);
  } catch (error) {
    if (isPrismaUniqueConstraint(error)) {
      return next(
        new HttpError(400, "Un budget mensuel pour ce mois existe déjà")
      );
    }
    return next(error);
  }
};

export const getMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const { month, year } = req.query;

  try {
    const monthlyBudget = await prisma.monthlyBudget.findUnique({
      where: {
        userId_month_year: {
          userId,
          month: Number(month),
          year: Number(year),
        },
      },
      include: {
        incomes: true,
        charges: true,
        expenses: true,
      },
    });

    if (!monthlyBudget) {
      return next(new HttpError(404, "Budget mensuel non trouvé"));
    }

    return res.status(200).json(monthlyBudget);
  } catch (error) {
    return next(error);
  }
};

export const deleteMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  try {
    await prisma.monthlyBudget.delete({
      where: {
        id: monthlyBudgetId,
        userId,
      },
    });

    return res
      .status(200)
      .json({ message: "Budget mensuel supprimé avec succès !" });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Budget mensuel non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
