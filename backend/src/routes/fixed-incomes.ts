import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  addFixedIncomes,
  deleteFixedIncome,
  getFixedIncomes,
  updateFixedIncome,
} from "../controllers/fixed-incomes";
import { validateBody } from "../middleware/validateBody";
import { budgetEntryInputSchema } from "@shared/schemas";

const router = express.Router();

router.get("/", requireAuth, getFixedIncomes);
router.post(
  "/",
  requireAuth,
  validateBody(budgetEntryInputSchema),
  addFixedIncomes
);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntryInputSchema),
  updateFixedIncome
);
router.delete("/:id", requireAuth, deleteFixedIncome);

export default router;
