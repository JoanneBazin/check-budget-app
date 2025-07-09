import { validateSession } from "../lib/auth";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: string;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.cookies.session;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const result = await validateSession(sessionId);

  if (!result) {
    res.clearCookie("session");
    return res.status(401).json({ error: "Invalid session" });
  }

  req.user = result.user;
  req.session = result.session;
  next();
}
