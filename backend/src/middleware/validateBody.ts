import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validateWithSchema } from "@shared/schemas";
import { HttpError } from "../lib/HttpError";

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validateWithSchema(schema, req.body);

    if (!result.success) {
      return next(
        new HttpError(
          400,
          `Erreur dans la validation des données : ${JSON.stringify(
            result.errors
          )}`
        )
      );
    }

    req.body = result.data;
    next();
  };
};
