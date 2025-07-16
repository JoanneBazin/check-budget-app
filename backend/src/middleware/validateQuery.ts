import { validateWithSchema } from "@shared/schemas";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import { HttpError } from "../lib/HttpError";

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validateWithSchema(schema, req.query);

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

    next();
  };
};
