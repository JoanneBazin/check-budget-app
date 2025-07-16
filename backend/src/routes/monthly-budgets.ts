import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validateBody";
import {
  addMonthlyBudget,
  deleteMonthlyBudget,
  getMonthlyBudget,
} from "../controllers/monthly-budgets";
import {
  budgetEntryInputSchema,
  budgetEntrySchema,
  monthlyBudgetSchema,
  queryDateSchema,
} from "@shared/schemas";
import { validateQuery } from "../middleware/validateQuery";
import {
  addMonthlyIncomes,
  deleteMonthlyIncome,
  updateMonthlyIncome,
} from "../controllers/monthly-incomes";
import { checkBudgetAccess } from "../middleware/checkBudgetAccess";
import {
  addMonthlyCharges,
  deleteMonthlyCharge,
  updateMonthlyCharge,
} from "../controllers/monthly-charges";

const router = express.Router();

// Monthly Budget general routes
router.post(
  "/",
  requireAuth,
  validateBody(monthlyBudgetSchema),
  addMonthlyBudget
);
router.get("/", requireAuth, validateQuery(queryDateSchema), getMonthlyBudget);
router.delete("/:id", requireAuth, deleteMonthlyBudget);

// Monthly incomes
router.post(
  "/:id/incomes",
  requireAuth,
  checkBudgetAccess,
  validateBody(budgetEntryInputSchema),
  addMonthlyIncomes
);
router.put(
  "/:id/incomes/:incomeId",
  requireAuth,
  checkBudgetAccess,
  validateBody(budgetEntrySchema),
  updateMonthlyIncome
);
router.delete(
  "/:id/incomes/:incomeId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyIncome
);

// Monthly charges
router.post(
  "/:id/charges",
  requireAuth,
  checkBudgetAccess,
  validateBody(budgetEntryInputSchema),
  addMonthlyCharges
);
router.put(
  "/:id/charges/:chargeId",
  requireAuth,
  checkBudgetAccess,
  validateBody(budgetEntrySchema),
  updateMonthlyCharge
);
router.delete(
  "/:id/charges/:chargeId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyCharge
);

export default router;
