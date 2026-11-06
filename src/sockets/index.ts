import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import * as cookie from "cookie";
import jwt from "jsonwebtoken";

let ioInstance: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Authentication required"));
    }

    const cookies = cookie.parseCookie(cookieHeader);
    const token = cookies.accessToken;

    if (!token) {
      return next(new Error("Access token missing"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded === "string" || typeof decoded.sub !== "string") {
        return next(new Error("Invalid token payload"));
      }

      socket.data.userId = decoded.sub;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    socket.join(`user:${userId}`);
  });

  ioInstance = io;
  return io;
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO has not been initialized");
  }

  return ioInstance;
};
