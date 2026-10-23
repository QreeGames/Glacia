import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3002", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  stellar: {
    network: process.env.STELLAR_NETWORK || "testnet",
    rpcUrl: process.env.STELLAR_RPC_URL || "https://soroban-testnet.stellar.org",
    networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015",
    contractId: process.env.GLACIA_CONTRACT_ID || "CCDANXNV2JNHTVJLTUMAPM77KQHNIYON7TKDXH3J7YYWLTH6NPRHSBK7",
    relayerSecret: process.env.RELAYER_SECRET_KEY || "",
    relayerPublic: process.env.RELAYER_PUBLIC_KEY || ""
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "60", 10)
  }
};
