import { CombatEngine } from "../services/combatEngine.js";
import { stellarRelayer } from "../services/stellarRelayer.js";
import { GUARDIANS, INITIAL_DEFENSE_SQUADS } from "../data/guardians.js";

// In-memory persistent state (synced with Soroban storage)
const activeDefenseSquads = [...INITIAL_DEFENSE_SQUADS];
const battleHistory = [];

export const getGuardians = (req, res) => {
  res.json({
    success: true,
    guardians: GUARDIANS
  });
};

export const getDefenseSquads = (req, res) => {
  res.json({
    success: true,
    squads: activeDefenseSquads
  });
};

export const deployDefenseSquad = (req, res) => {
  const { player, playerName, guardianIds, positions } = req.body;
  if (!player || !guardianIds || !guardianIds.length) {
    return res.status(400).json({ success: false, error: "Missing squad configuration" });
  }

  const guardians = guardianIds.map((id, index) => {
    const base = GUARDIANS.find(g => g.id === id);
    return {
      ...base,
      position: positions ? positions[index] || index : index
    };
  });

  const existingIdx = activeDefenseSquads.findIndex(s => s.player === player);
  const newSquad = {
    id: `squad_${Date.now()}`,
    player,
    playerName: playerName || `Guardian ${player.slice(0, 6)}`,
    rating: 1200,
    wins: 0,
    losses: 0,
    guardians,
    registeredAt: Date.now()
  };

  if (existingIdx >= 0) {
    activeDefenseSquads[existingIdx] = {
      ...activeDefenseSquads[existingIdx],
      ...newSquad,
      wins: activeDefenseSquads[existingIdx].wins,
      losses: activeDefenseSquads[existingIdx].losses
    };
  } else {
    activeDefenseSquads.unshift(newSquad);
  }

  res.json({
    success: true,
    message: "Defense squad registered on-chain",
    squad: newSquad
  });
};

export const executeChallenge = async (req, res) => {
  try {
    const { attacker, defender, attackerSquad } = req.body;

    if (!attacker || !defender || !attackerSquad || !attackerSquad.length) {
      return res.status(400).json({ success: false, error: "Missing challenge parameters" });
    }

    const defenderSquadObj = activeDefenseSquads.find(s => s.player === defender) || activeDefenseSquads[0];
    
    // Run deterministic combat engine
    const combatOutcome = CombatEngine.simulate(
      attackerSquad,
      defenderSquadObj.guardians,
      attacker,
      defender
    );

    // Update win / loss records
    if (combatOutcome.winner === defender) {
      defenderSquadObj.wins += 1;
    } else {
      defenderSquadObj.losses += 1;
    }

    // Submit / sponsor relay receipt
    const relayReceipt = await stellarRelayer.relayBattleResult(combatOutcome);

    const matchRecord = {
      id: `match_${Date.now()}`,
      ...combatOutcome,
      receipt: relayReceipt
    };

    battleHistory.unshift(matchRecord);
    if (battleHistory.length > 50) battleHistory.pop();

    res.json({
      success: true,
      match: matchRecord
    });
  } catch (error) {
    console.error("Challenge error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBattleHistory = (req, res) => {
  res.json({
    success: true,
    history: battleHistory
  });
};
