import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { getParamsId, getUserId } from "../lib/req-helpers";

export const addFixedIncomes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const data = req.body;
  const incomesArray = Array.isArray(data) ? data : [data];

  try {
    const fixedIncomes = await Promise.all(
      incomesArray.map((income) =>
        prisma.fixedIncome.create({
          data: {
            ...income,
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

    return res.status(201).json(fixedIncomes);
  } catch (error) {
    return next(error);
  }
};

export const getFixedIncomes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  try {
    const allFixedIncomes = await prisma.fixedIncome.findMany({
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

    return res.status(200).json(allFixedIncomes);
  } catch (error) {
    return next(error);
  }
};

export const updateFixedIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const incomeId = getParamsId(req, next);
  if (!incomeId) return;

  const { name, amount } = req.body;

  try {
    const updatedFixedIncome = await prisma.fixedIncome.update({
      where: {
        id: incomeId,
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

    return res.status(200).json(updatedFixedIncome);
  } catch (error) {
    return next(error);
  }
};

export const deleteFixedIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req, next);
  if (!userId) return;

  const incomeId = getParamsId(req, next);
  if (!incomeId) return;

  try {
    await prisma.fixedIncome.delete({
      where: {
        id: incomeId,
        userId,
      },
    });

    return res.status(200).json({ message: "Revenu supprimé avec succès !" });
  } catch (error) {
    return next(error);
  }
};
