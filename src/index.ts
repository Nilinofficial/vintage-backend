import express from "express";
import { env } from "./config/env.js";
import healthRouter from "./routes/health.routes.js";
import { pool } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/connections", connectionRouter);

app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected successfully");

    app.listen(env.PORT, () => {
      console.log(`listening to PORT ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start vintage: ", error);
    process.exitCode = 1;
    await pool.end();
  }
}

void startServer();
