import express from "express";

import helmet from "helmet";

import cors from "cors";

import { config } from "./config/env.js";

import { requestLogger } from "./middleware/requestLogger.js";

import { errorHandler } from "./middleware/errorHandler.js";

import { notFoundHandler } from "./middleware/notFound.js";

import { isDatabaseConnected } from "./config/database.js";

import { apiRoutes } from "./routes/index.js";

const createApp = () => {
  const app = express();

  app.use(helmet());

  // CORS Configuration

  const allowedOrigins = config.CORS_ORIGIN.split(",");

app.use(
  cors({

    origin: "http://localhost:5173",

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Request-Id"
    ],

  })
);

  app.use(
    express.json({
      limit: "10mb",
    }),
  );

  app.use(
    express.urlencoded({
      extended: true,

      limit: "10mb",
    }),
  );

  // Request Logger

  app.use(requestLogger);

  // Health Check

  app.get(
    "/health",

    (_req, res) => {
      res.status(200).json({
        status: "healthy",

        uptime: process.uptime(),

        timestamp: new Date().toISOString(),
      });
    },
  );

  // Readiness Check

  app.get(
    "/ready",

    (_req, res) => {
      const dbStatus = isDatabaseConnected();

      if (!dbStatus) {
        return res.status(503).json({
          status: "unready",

          database: "disconnected",
        });
      }

      return res.status(200).json({
        status: "ready",

        database: "connected",
      });
    },
  );

  // API Routes

  app.use(
    "/api/v1",

    apiRoutes,
  );

  // 404 Handler

  app.use(notFoundHandler);

  // Global Error Handler

  app.use(errorHandler);

  return app;
};

export const app = createApp();
