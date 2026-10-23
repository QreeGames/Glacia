import express from "express";
import {
  getGuardians,
  getDefenseSquads,
  deployDefenseSquad,
  executeChallenge,
  getBattleHistory
} from "../controllers/battleController.js";
import { stellarRelayer } from "../services/stellarRelayer.js";

const router = express.Router();

router.get("/guardians", getGuardians);
router.get("/squads", getDefenseSquads);
router.post("/squads/deploy", deployDefenseSquad);
router.post("/battle/challenge", executeChallenge);
router.get("/battle/history", getBattleHistory);

router.get("/stellar/status", async (req, res) => {
  const status = await stellarRelayer.verifyContractStatus();
  res.json({ success: true, ...status });
});

export default router;
