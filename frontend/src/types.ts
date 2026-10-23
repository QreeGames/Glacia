export type ElementType = "Frost" | "Flame" | "Void" | "Prism";

export interface Guardian {
  id: number;
  name: string;
  title: string;
  element: ElementType;
  elementCode: number; // 0: Frost, 1: Flame, 2: Void, 3: Prism
  tier: "Common" | "Rare" | "Epic" | "Legendary";
  role: "Tank" | "Mage" | "Bruiser" | "Assassin" | "Support / Striker" | "Scout";
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  position: number; // 0 to 15 grid
  lore: string;
  ability: string;
  icon: string;
}

export interface DefenseSquad {
  id: string;
  player: string;
  playerName: string;
  rating: number;
  wins: number;
  losses: number;
  guardians: Guardian[];
  registeredAt: number;
}

export interface CombatLogItem {
  turn: number;
  phase: "INIT" | "ATTACK" | "DEFENSE" | "ELIMINATION" | "VICTORY";
  actor?: string;
  actorElement?: number;
  target?: string;
  targetElement?: number;
  damage?: number;
  isAdvantage?: boolean;
  targetRemainingHp?: number;
  winner?: string;
  message: string;
}

export interface MatchResult {
  id: string;
  winner: string;
  attacker: string;
  defender: string;
  turnsElapsed: number;
  attackerSurvivors: number;
  defenderSurvivors: number;
  logs: CombatLogItem[];
  attackerFinalSquad: Guardian[];
  defenderFinalSquad: Guardian[];
  receipt?: {
    status: string;
    transactionHash: string;
    ledger: number;
  };
}
