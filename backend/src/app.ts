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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/fixed-incomes", fixedIncomes);
app.use("/api/fixed-charges", fixedCharges);
app.use("/api/monthly-budgets", monthlyBudgets);

app.use(errorHandler);

export default app;
