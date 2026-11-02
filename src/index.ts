import express from "express";
import { env } from "./config/env.js";
import healthRouter from "./routes/health.routes.js";
import { pool } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
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
