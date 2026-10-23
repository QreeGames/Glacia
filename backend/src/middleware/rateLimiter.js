import rateLimit from "express-rate-limit";
import { config } from "../config/index.js";

export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many battle requests from this IP, please wait a minute."
  }
});
