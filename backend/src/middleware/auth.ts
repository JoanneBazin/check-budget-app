import { Request, Response, NextFunction } from "express";
import { HttpError, validateSession } from "../lib";

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
