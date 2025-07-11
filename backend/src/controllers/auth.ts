import { createSession, hashPassword, verifyPassword } from "../lib/auth";
import { HttpError } from "../lib/HttpError";
import { prisma } from "../lib/prismaClient";
import { LoginBody, SignupBody } from "@shared/types";
import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return next(new HttpError(400, "Email déjà utilisé"));
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const sessionToken = await createSession(user.id);

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
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
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return next(error);
  }
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
