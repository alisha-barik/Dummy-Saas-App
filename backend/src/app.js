import express from "express";
import authRouter from "../src/routes/user.route.js";
import taskRouter from "../src/routes/task.route.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

export default app;
