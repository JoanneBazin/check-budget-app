import { NextFunction, Request, Response } from "express";
import { getMultipleParamsIds, getParamsId } from "../lib/req-helpers";
import { HttpError } from "../lib/HttpError";
import { prisma } from "../lib/prismaClient";
import {
  isPrismaForeignKeyConstraint,
  isPrismaRecordNotFound,
} from "../lib/prismaErrorHelpers";
import { updateMonthlyBudgetRemaining } from "../services/budgetService";

export const addMonthlyCharges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const monthlyBudgetId = getParamsId(req, next);
  if (!monthlyBudgetId) return;

  const data = req.body;
  const chargesArray = Array.isArray(data) ? data : [data];

  try {
    const monthlyCharges = await Promise.all(
      chargesArray.map((charge) =>
        prisma.monthlyCharge.create({
          data: {
            ...charge,
            monthlyBudgetId,
          },
          select: {
            id: true,
            name: true,
            amount: true,
          },
        })
      )
    );

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res.status(201).json({
      charges: monthlyCharges,
      remainingBudget,
    });
  } catch (error) {
    if (isPrismaForeignKeyConstraint(error)) {
      return next(new HttpError(404, "Référence à un budget inexistant"));
    }
    return next(error);
  }
};

export const updateMonthlyCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "chargeId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, chargeId } = params;

  const { name, amount } = req.body;

  try {
    const updatedCharge = await prisma.monthlyCharge.update({
      where: {
        id: chargeId,
      },
      data: {
        name,
        amount,
      },
      select: {
        id: true,
        name: true,
        amount: true,
      },
    });

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res
      .status(200)
      .json({ updatedCharge: updatedCharge, remainingBudget });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Revenu non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};

export const deleteMonthlyCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = getMultipleParamsIds(req, ["id", "chargeId"], next);
  if (!params) return;
  const { id: monthlyBudgetId, chargeId } = params;

  try {
    await prisma.monthlyCharge.delete({
      where: {
        id: chargeId,
      },
    });

    const { remainingBudget } = await updateMonthlyBudgetRemaining(
      monthlyBudgetId
    );

    return res
      .status(200)
      .json({ message: "Charge supprimée avec succès !", remainingBudget });
  } catch (error) {
    if (isPrismaRecordNotFound(error)) {
      return next(
        new HttpError(
          404,
          "Revenu non trouvé ou vous n'avez pas les droits d'accès."
        )
      );
    }
    return next(error);
  }
};
