import app from "./src/app.js";
import { config } from "./src/config/index.js";

const server = app.listen(config.port, () => {
  console.log(`❄️⚔️ Glacia Backend Relayer listening on port ${config.port} [${config.nodeEnv}]`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => process.exit(0));
});

export default server;
