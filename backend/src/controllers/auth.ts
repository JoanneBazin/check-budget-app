import { createSession, hashPassword, verifyPassword } from "../lib/auth";
import { HttpError } from "../lib/HttpError";
import { prisma } from "../lib/prismaClient";
import { LoginBody, SignupBody } from "@shared/types";
import { NextFunction, Request, Response } from "express";
import { isPrismaUniqueConstraint } from "../lib/prismaErrorHelpers";

export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const sessionToken = await createSession(user.id);

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    if (isPrismaUniqueConstraint(error)) {
      return next(new HttpError(400, "Email déjà utilisé"));
    }
    return next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await verifyPassword(password, user.password))) {
      return next(new HttpError(401, "Email ou mot de passe incorrect"));
    }

    const sessionToken = await createSession(user.id);

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    return next(error);
  }
};

export const getSession = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) return next(new HttpError(401, "Unauthorized"));
  return res.status(200).json(user);
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies.session;
    if (sessionId) {
      await prisma.session
        .delete({
          where: { id: sessionId },
        })
        .catch(() => {});

      res.clearCookie("session");
      res.json({ message: "Déconnexion réussie" });
    }
  } catch (error) {
    return next(error);
  }
};
