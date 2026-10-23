export type ElementType = "frost" | "flame" | "void" | "prism";

export interface Guardian {
  id: number;
  name: string;
  element: ElementType;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  position: number;
  icon: string;
}

export interface DefenseSquad {
  player: string;
  playerName: string;
  wins: number;
  losses: number;
  guardians: Guardian[];
}
