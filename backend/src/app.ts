import express from "express";
import authRoutes from "./routes/auth";
import fixedIncomes from "./routes/fixed-incomes";
import fixedCharges from "./routes/fixed-charges";
import monthlyBudgets from "./routes/monthly-budgets";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/fixed-incomes", fixedIncomes);
app.use("/api/fixed-charges", fixedCharges);
app.use("/api/monthly-budgets", monthlyBudgets);

app.use(errorHandler);

export default app;
