import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { getParamsId, getUserId } from "../lib/req-helpers";
import { isPrismaRecordNotFound } from "../lib/prismaErrorHelpers";
import { HttpError } from "../lib/HttpError";

export const addFixedCharges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const data = req.body;
  const chargesArray = Array.isArray(data) ? data : [data];

  try {
    const fixedCharges = await Promise.all(
      chargesArray.map((charge) =>
        prisma.fixedCharge.create({
          data: {
            ...charge,
            userId,
          },
          select: {
            id: true,
            name: true,
            amount: true,
          },
        })
      )
    );

    return res.status(201).json(fixedCharges);
  } catch (error) {
    return next(error);
  }
};

export const getFixedCharges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const allFixedCharges = await prisma.fixedCharge.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        amount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(allFixedCharges);
  } catch (error) {
    return next(error);
  }
};

export const updateFixedCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const chargeId = getParamsId(req, next);
  if (!chargeId) return;

  const { name, amount } = req.body;

  try {
    const updatedFixedCharge = await prisma.fixedCharge.update({
      where: {
        id: chargeId,
        userId,
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

    return res.status(200).json(updatedFixedCharge);
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

export const deleteFixedCharge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const chargeId = getParamsId(req, next);
  if (!chargeId) return;

  try {
    await prisma.fixedCharge.delete({
      where: {
        id: chargeId,
        userId,
      },
    });

    return res.status(200).json({ message: "Charge supprimée avec succès !" });
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
