import { NextFunction, Request, Response } from "express";
import { getUserId } from "../lib/req-helpers";
import { prisma } from "../lib/prismaClient";
import { HttpError } from "../lib/HttpError";

export const checkBudgetAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const monthlyBudgetId = req.params.id;
  if (!monthlyBudgetId) return;

  try {
    const budget = await prisma.monthlyBudget.findUnique({
      where: { id: monthlyBudgetId },
      select: { userId: true },
    });
    if (!budget || budget.userId !== userId) {
      return next(new HttpError(403, "Accès interdit à ce budget"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};
