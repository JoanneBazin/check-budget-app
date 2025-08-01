import express from "express";
import {
  budgetEntrySchema,
  expenseEntrySchema,
  monthlyBudgetSchema,
  queryDateSchema,
} from "@shared/schemas";
import {
  checkBudgetAccess,
  requireAuth,
  validateBody,
  validateQuery,
} from "src/middleware";
import {
  addMonthlyBudget,
  addMonthlyCharges,
  addMonthlyExpenses,
  addMonthlyIncomes,
  deleteMonthlyBudget,
  deleteMonthlyCharge,
  deleteMonthlyExpense,
  deleteMonthlyIncome,
  getCurrentMonthlyBudget,
  getLastBudgets,
  getMonthlyBudget,
  getMonthlyBudgetById,
  updateMonthlyCharge,
  updateMonthlyExpense,
  updateMonthlyIncome,
} from "src/controllers";

const router = express.Router();

// Monthly Budget general routes
router.post(
  "/",
  requireAuth,
  validateBody(monthlyBudgetSchema),
  addMonthlyBudget
);
router.get("/", requireAuth, validateQuery(queryDateSchema), getMonthlyBudget);
router.get("/current", requireAuth, getCurrentMonthlyBudget);
router.get("/history", requireAuth, getLastBudgets);
router.get("/:id", requireAuth, getMonthlyBudgetById);
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
