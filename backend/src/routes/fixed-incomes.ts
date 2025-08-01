import express from "express";
import { budgetEntrySchema } from "@shared/schemas";
import { requireAuth, validateBody } from "src/middleware";
import {
  addFixedIncomes,
  deleteFixedIncome,
  getFixedIncomes,
  updateFixedIncome,
} from "src/controllers";

const router = express.Router();

router.get("/", requireAuth, getFixedIncomes);
router.post("/", requireAuth, validateBody(budgetEntrySchema), addFixedIncomes);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedIncome
);
router.delete("/:id", requireAuth, deleteFixedIncome);

export default router;
