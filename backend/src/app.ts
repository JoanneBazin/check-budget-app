import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.status(200).json({ message: "Appli setup and running !" });
  next();
});

export default app;
