import { validateSession } from "../lib/auth";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";
import { HttpError } from "../lib/HttpError";

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
    return next(new HttpError(401, "Unauthorized"));
  }

  const result = await validateSession(sessionId);

  if (!result) {
    res.clearCookie("session");
    return next(new HttpError(401, "Session invalide"));
  }

  req.user = result.user;
  req.session = result.session;
  next();
}
