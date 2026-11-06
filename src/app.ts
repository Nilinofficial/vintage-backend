import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/connections", connectionRouter);
app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);

export default app;
