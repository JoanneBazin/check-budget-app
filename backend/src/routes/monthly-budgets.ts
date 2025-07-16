import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validateBody";
import {
  addMonthlyBudget,
  deleteMonthlyBudget,
  getMonthlyBudget,
} from "../controllers/monthly-budgets";
import { monthlyBudgetSchema, queryDateSchema } from "@shared/schemas";
import { validateQuery } from "../middleware/validateQuery";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  validateBody(monthlyBudgetSchema),
  addMonthlyBudget
);
router.get("/", requireAuth, validateQuery(queryDateSchema), getMonthlyBudget);
router.delete("/:id", requireAuth, deleteMonthlyBudget);

export default router;
