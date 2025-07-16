import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  addFixedCharges,
  deleteFixedCharge,
  getFixedCharges,
  updateFixedCharge,
} from "../controllers/fixed-charges";
import { validateBody } from "../middleware/validateBody";
import { budgetEntrySchema } from "@shared/schemas";

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
