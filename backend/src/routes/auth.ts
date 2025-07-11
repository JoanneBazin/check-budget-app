import express from "express";
import { login, logout, signup } from "../controllers/auth";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validateBody";
import { loginSchema, signupSchema } from "@shared/schemas";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", requireAuth, logout);

export default router;
