import { env } from "./config/env.js";
import { pool } from "./config/database.js";
import { createServer } from "node:http";
import app from "./app.js";
import { initializeSocket } from "./sockets/index.js";

const httpServer = createServer(app);
initializeSocket(httpServer);

async function startServer(): Promise<void> {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected successfully");

    httpServer.listen(env.PORT, () => {
      console.log(`listening to PORT ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start vintage: ", error);
    process.exitCode = 1;
    await pool.end();
  }
}

void startServer();
