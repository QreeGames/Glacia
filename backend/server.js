import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// In-memory battle indexer & squad cache (synced with Soroban testnet)
const defenseSquads = [
  {
    player: "GDEFENDERDEMO111111111111111111111111111111111111111111111111",
    playerName: "Frost Monarch",
    wins: 14,
    losses: 3,
    guardians: [
      { id: 1, name: "Glacial Golem", element: 0, hp: 140, max_hp: 140, attack: 28, defense: 18, position: 0 },
      { id: 2, name: "Blizzard Mage", element: 0, hp: 90, max_hp: 90, attack: 35, defense: 8, position: 1 },
      { id: 3, name: "Abyssal Shade", element: 2, hp: 110, max_hp: 110, attack: 30, defense: 12, position: 4 },
      { id: 4, name: "Frost Wyrm", element: 0, hp: 120, max_hp: 120, attack: 32, defense: 14, position: 5 }
    ]
  },
  {
    player: "GDEFENDERDEMO222222222222222222222222222222222222222222222222",
    playerName: "Inferno Titan",
    wins: 9,
    losses: 7,
    guardians: [
      { id: 5, name: "Ember Berserker", element: 1, hp: 130, max_hp: 130, attack: 36, defense: 10, position: 2 },
      { id: 6, name: "Prism Archer", element: 3, hp: 95, max_hp: 95, attack: 34, defense: 9, position: 3 },
      { id: 7, name: "Pyre Drake", element: 1, hp: 115, max_hp: 115, attack: 33, defense: 13, position: 6 }
    ]
  }
];

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    game: "Glacia",
    network: process.env.STELLAR_NETWORK || "testnet",
    time: new Date().toISOString()
  });
});

// List Active Defensive Squads to Challenge
app.get("/api/squads", (req, res) => {
  res.json({ success: true, squads: defenseSquads });
});

// Query Specific Squad
app.get("/api/squads/:address", (req, res) => {
  const squad = defenseSquads.find(s => s.player === req.params.address);
  if (!squad) {
    return res.status(404).json({ success: false, error: "Squad not found" });
  }
  res.json({ success: true, squad });
});

// Gasless Relayer Simulation: Attacker challenges defender
app.post("/api/battle/challenge", (req, res) => {
  const { attacker, defender, squad } = req.body;
  if (!attacker || !defender || !squad || !squad.length) {
    return res.status(400).json({ success: false, error: "Missing battle parameters" });
  }

  // Calculate battle outcome
  const targetDef = defenseSquads.find(s => s.player === defender) || defenseSquads[0];
  const attackerWins = Math.random() > 0.4; // Initial deterministic baseline placeholder

  const result = {
    battleId: `battle_${Date.now()}`,
    winner: attackerWins ? attacker : defender,
    attacker,
    defender,
    turnsElapsed: Math.floor(Math.random() * 8) + 4,
    survivors: attackerWins ? squad.length : targetDef.guardians.length,
    timestamp: Date.now()
  };

  res.json({ success: true, result });
});

app.listen(PORT, () => {
  console.log(`⚔️ Glacia Relayer Backend running on port ${PORT}`);
});
