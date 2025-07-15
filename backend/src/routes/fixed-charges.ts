import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "../controllers/fixed-charges";
import { validateBody } from "../middleware/validateBody";
import { budgetEntryInputSchema } from "@shared/schemas";

const router = express.Router();

router.get("/", requireAuth, getFixedCharges);
router.post(
  "/",
  requireAuth,
  validateBody(budgetEntryInputSchema),
  addFixedCharges
);
router.put(
  "/:id",
  requireAuth,
  validateBody(budgetEntryInputSchema),
  updateFixedCharge
);
router.delete("/:id", requireAuth, deleteFixedCharge);

export default router;
