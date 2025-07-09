import express from "express";
import { login, logout, signup } from "../controllers/auth";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", requireAuth, logout);

export default router;
