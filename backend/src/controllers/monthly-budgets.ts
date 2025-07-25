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

  const { month, year, isCurrent, incomes, charges } = req.body;

  const remainingBudget = calculateRemainingBudget(incomes, charges);

  try {
    const monthlyBudget = await prisma.$transaction(
      async (tx): Promise<any> => {
        const newBudget = await tx.monthlyBudget.create({
          data: {
            userId,
            month,
            year,
            isCurrent,
            remainingBudget,
            incomes: {
              create: incomes,
            },
            charges: {
              create: charges,
            },
          },
          include: {
            incomes: true,
            charges: true,
            expenses: true,
          },
        });

        if (isCurrent) {
          await tx.monthlyBudget.updateMany({
            where: {
              userId,
              id: { not: newBudget.id },
            },
            data: { isCurrent: false },
          });
        }

        return newBudget;
      }
    );

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

export const getCurrentMonthlyBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const currentMonthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId,
        isCurrent: true,
      },
      include: {
        incomes: true,
        charges: true,
        expenses: true,
      },
    });

    if (!currentMonthlyBudget) {
      return next(new HttpError(404, "Budget mensuel actif non trouvé"));
    }

    return res.status(200).json(currentMonthlyBudget);
  } catch (error) {
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

export const getLastBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const history = await prisma.monthlyBudget.findMany({
      where: {
        userId,
        isCurrent: false,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        year: true,
        month: true,
        remainingBudget: true,
      },
    });

    if (!history) {
      return next(new HttpError(404, "Ancien budgets mensuels non trouvés"));
    }

    return res.status(200).json(history);
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
