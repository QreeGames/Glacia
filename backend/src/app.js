import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "./routes/api.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { config } from "./config/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

// Apply rate limiter to /api
app.use("/api", apiLimiter);

// Health Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Glacia Battle Engine Relayer",
    version: "1.0.0",
    network: config.stellar.network,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled API Error:", err);
  res.status(500).json({
    success: false,
    error: config.nodeEnv === "production" ? "Internal server error" : err.message
  });
});

export default app;
