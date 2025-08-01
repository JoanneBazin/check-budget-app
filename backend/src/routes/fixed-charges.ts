import express from "express";
import { budgetEntrySchema } from "@shared/schemas";
import { requireAuth, validateBody } from "src/middleware";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "src/controllers";

const router = express.Router();

router.get("/", requireAuth, getFixedCharges);
router.post("/", requireAuth, validateBody(budgetEntrySchema), addFixedCharges);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntrySchema),
  updateFixedCharge
);
router.delete("/:id", requireAuth, deleteFixedCharge);

export default router;
