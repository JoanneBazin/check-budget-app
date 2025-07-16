import express from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validateBody";
import {
  addMonthlyBudget,
  deleteMonthlyBudget,
  getMonthlyBudget,
} from "../controllers/monthly-budgets";
import {
  budgetEntrySchema,
  expenseEntrySchema,
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
import {
  addMonthlyExpenses,
  deleteMonthlyExpense,
  updateMonthlyExpense,
} from "../controllers/monthly-expenses";

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
  validateBody(budgetEntrySchema),
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
  validateBody(budgetEntrySchema),
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

// Monthly Expenses
router.post(
  "/:id/expenses",
  requireAuth,
  checkBudgetAccess,
  validateBody(expenseEntrySchema),
  addMonthlyExpenses
);
router.put(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkBudgetAccess,
  validateBody(expenseEntrySchema),
  updateMonthlyExpense
);
router.delete(
  "/:id/expenses/:expenseId",
  requireAuth,
  checkBudgetAccess,
  deleteMonthlyExpense
);

export default router;
