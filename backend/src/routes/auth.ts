import express from "express";
import { loginSchema, signupSchema } from "@shared/schemas";
import { requireAuth, validateBody } from "src/middleware";
import { getSession, login, logout, signup } from "src/controllers";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.get("/session", requireAuth, getSession);
router.post("/logout", requireAuth, logout);

export default router;
