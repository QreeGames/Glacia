import type { Guardian, DefenseSquad, MatchResult } from "../types";
import { CHAMPIONS_ROSTER, MOCK_SQUADS } from "../data/mockData";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3002/api";

export async function fetchGuardians(): Promise<Guardian[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/guardians`);
    if (res.ok) {
      const data = await res.json();
      return data.guardians;
    }
  } catch {
    // Fallback to local roster if backend offline
  }
  return CHAMPIONS_ROSTER;
}

export async function fetchDefenseSquads(): Promise<DefenseSquad[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/squads`);
    if (res.ok) {
      const data = await res.json();
      return data.squads;
    }
  } catch {
    // Fallback
  }
  return MOCK_SQUADS;
}

export async function submitChallenge(
  attackerAddress: string,
  defenderAddress: string,
  attackerSquad: Guardian[]
): Promise<MatchResult> {
  try {
    const res = await fetch(`${BACKEND_URL}/battle/challenge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attacker: attackerAddress,
        defender: defenderAddress,
        attackerSquad
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.match;
    }
  } catch {
    // Fallback offline simulator
  }

  // Fallback match calculation
  return {
    id: `local_match_${Date.now()}`,
    winner: attackerAddress,
    attacker: attackerAddress,
    defender: defenderAddress,
    turnsElapsed: 4,
    attackerSurvivors: attackerSquad.length,
    defenderSurvivors: 0,
    logs: [
      { turn: 1, phase: "INIT", message: "Engaging target defense..." },
      { turn: 2, phase: "ATTACK", message: "Attacker unleashed elemental blast!" },
      { turn: 3, phase: "VICTORY", message: "Defender eradicated. Challenger triumphs!" }
    ],
    attackerFinalSquad: attackerSquad,
    defenderFinalSquad: []
  };
}
