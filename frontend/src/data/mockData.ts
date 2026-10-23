import type { Guardian, DefenseSquad } from "../types";

export const CHAMPIONS_ROSTER: Guardian[] = [
  {
    id: 1,
    name: "Glacial Golem",
    title: "The Frozen Bulwark",
    element: "Frost",
    elementCode: 0,
    tier: "Common",
    role: "Tank",
    hp: 160,
    maxHp: 160,
    attack: 26,
    defense: 22,
    speed: 10,
    position: 0,
    lore: "Carved from the bedrock of the Permafrost Caldera, its icy shell deflects crushing blows.",
    ability: "Absolute Zero (Reduces incoming physical damage by 20%)",
    icon: "🛡️"
  },
  {
    id: 2,
    name: "Blizzard Sorceress",
    title: "Herald of the Mist",
    element: "Frost",
    elementCode: 0,
    tier: "Rare",
    role: "Mage",
    hp: 95,
    maxHp: 95,
    attack: 42,
    defense: 10,
    speed: 18,
    position: 1,
    lore: "Channels the freezing winds of the northern steppes into concentrated lances of hail.",
    ability: "Glacial Cascade (Deals +15 bonus damage to burning foes)",
    icon: "❄️"
  },
  {
    id: 3,
    name: "Pyre Drake",
    title: "Cinder Sovereign",
    element: "Flame",
    elementCode: 1,
    tier: "Epic",
    role: "Bruiser",
    hp: 135,
    maxHp: 135,
    attack: 38,
    defense: 14,
    speed: 14,
    position: 2,
    lore: "Its wings trail obsidian embers capable of melting enchanted glacial armor in seconds.",
    ability: "Combustion (Attacks bypass 30% of target defense)",
    icon: "🔥"
  },
  {
    id: 4,
    name: "Abyssal Shade",
    title: "Void Stalker",
    element: "Void",
    elementCode: 2,
    tier: "Rare",
    role: "Assassin",
    hp: 105,
    maxHp: 105,
    attack: 45,
    defense: 8,
    speed: 22,
    position: 4,
    lore: "Phases through dimensional rifts to strike the enemy backline before dissolving back into darkness.",
    ability: "Dimensional Bleed (Inflicts continuous damage over 2 turns)",
    icon: "🌑"
  },
  {
    id: 5,
    name: "Prism Sentinel",
    title: "Aegis of the Dawn",
    element: "Prism",
    elementCode: 3,
    tier: "Epic",
    role: "Support / Striker",
    hp: 125,
    maxHp: 125,
    attack: 34,
    defense: 16,
    speed: 15,
    position: 5,
    lore: "Reflects elemental energy across crystalline shields to harmonize squad output.",
    ability: "Refractive Ward (Grants adjacent allies +5 defense)",
    icon: "💎"
  },
  {
    id: 6,
    name: "Frostfang Sabreclaw",
    title: "Alpha of the Tundra",
    element: "Frost",
    elementCode: 0,
    tier: "Common",
    role: "Scout",
    hp: 110,
    maxHp: 110,
    attack: 37,
    defense: 12,
    speed: 24,
    position: 6,
    lore: "Hunts in the whiteout blizzards, striking with ruthless precision before vanishing.",
    ability: "Pounce (First strike of the match deals 1.3x critical damage)",
    icon: "🐾"
  }
];

export const MOCK_SQUADS: DefenseSquad[] = [
  {
    id: "squad_frost_monarch",
    player: "GB5XMONARCH777777777777777777777777777777777777777777777777",
    playerName: "Archon Valerius",
    rating: 1840,
    wins: 28,
    losses: 4,
    guardians: [
      CHAMPIONS_ROSTER[0],
      CHAMPIONS_ROSTER[1],
      CHAMPIONS_ROSTER[3]
    ],
    registeredAt: Date.now() - 86400000 * 3
  },
  {
    id: "squad_cinder_queen",
    player: "GCINDERQUEEN888888888888888888888888888888888888888888888888",
    playerName: "Ignis Vor",
    rating: 1650,
    wins: 19,
    losses: 8,
    guardians: [
      CHAMPIONS_ROSTER[2],
      CHAMPIONS_ROSTER[4],
      CHAMPIONS_ROSTER[5]
    ],
    registeredAt: Date.now() - 86400000 * 1
  }
];
