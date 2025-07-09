import { createSession, hashPassword, verifyPassword } from "../lib/auth";
import { prisma } from "../lib/prismaClient";
import { LoginBody, SignupBody } from "../types";
import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response
) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
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
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};
