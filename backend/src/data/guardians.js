/**
 * Master Registry of Glacia Guardians & Elemental Affinities
 * Elements:
 *   0: Frost (Strong vs Void)
 *   1: Flame (Strong vs Frost)
 *   2: Void  (Strong vs Prism)
 *   3: Prism (Strong vs Flame)
 */
export const GUARDIANS = [
  {
    id: 1,
    name: "Glacial Golem",
    title: "The Frozen Bulwark",
    element: 0,
    elementName: "Frost",
    tier: "Common",
    role: "Tank",
    hp: 160,
    maxHp: 160,
    attack: 26,
    defense: 22,
    speed: 10,
    lore: "Carved from the bedrock of the Permafrost Caldera, its icy shell deflects crushing blows.",
    ability: "Absolute Zero (Reduces incoming physical damage by 20%)"
  },
  {
    id: 2,
    name: "Blizzard Sorceress",
    title: "Herald of the Mist",
    element: 0,
    elementName: "Frost",
    tier: "Rare",
    role: "Mage",
    hp: 95,
    maxHp: 95,
    attack: 42,
    defense: 10,
    speed: 18,
    lore: "Channels the freezing winds of the northern steppes into concentrated lances of hail.",
    ability: "Glacial Cascade (Deals +15 bonus damage to burning foes)"
  },
  {
    id: 3,
    name: "Pyre Drake",
    title: "Cinder Sovereign",
    element: 1,
    elementName: "Flame",
    tier: "Epic",
    role: "Bruiser",
    hp: 135,
    maxHp: 135,
    attack: 38,
    defense: 14,
    speed: 14,
    lore: "Its wings trail obsidian embers capable of melting enchanted glacial armor in seconds.",
    ability: "Combustion (Attacks bypass 30% of target defense)"
  },
  {
    id: 4,
    name: "Abyssal Shade",
    title: "Void Stalker",
    element: 2,
    elementName: "Void",
    tier: "Rare",
    role: "Assassin",
    hp: 105,
    maxHp: 105,
    attack: 45,
    defense: 8,
    speed: 22,
    lore: "Phases through dimensional rifts to strike the enemy backline before dissolving back into darkness.",
    ability: "Dimensional Bleed (Inflicts continuous damage over 2 turns)"
  },
  {
    id: 5,
    name: "Prism Sentinel",
    title: "Aegis of the Dawn",
    element: 3,
    elementName: "Prism",
    tier: "Epic",
    role: "Support / Striker",
    hp: 125,
    maxHp: 125,
    attack: 34,
    defense: 16,
    speed: 15,
    lore: "Reflects elemental energy across crystalline shields to harmonize the squad's damage output.",
    ability: "Refractive Ward (Grants adjacent allies +5 defense)"
  },
  {
    id: 6,
    name: "Frostfang Sabreclaw",
    title: "Alpha of the Tundra",
    element: 0,
    elementName: "Frost",
    tier: "Common",
    role: "Scout",
    hp: 110,
    maxHp: 110,
    attack: 37,
    defense: 12,
    speed: 24,
    lore: "Hunts in the whiteout blizzards, striking with ruthless precision before vanishing.",
    ability: "Pounce (First strike of the match deals 1.3x critical damage)"
  }
];

export const INITIAL_DEFENSE_SQUADS = [
  {
    id: "squad_frost_monarch",
    player: "GB5XMONARCH777777777777777777777777777777777777777777777777",
    playerName: "Archon Valerius",
    rating: 1840,
    wins: 28,
    losses: 4,
    guardians: [
      { id: 1, name: "Glacial Golem", element: 0, hp: 160, maxHp: 160, attack: 26, defense: 22, position: 0 },
      { id: 2, name: "Blizzard Sorceress", element: 0, hp: 95, maxHp: 95, attack: 42, defense: 10, position: 1 },
      { id: 4, name: "Abyssal Shade", element: 2, hp: 105, maxHp: 105, attack: 45, defense: 8, position: 4 }
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
      { id: 3, name: "Pyre Drake", element: 1, hp: 135, maxHp: 135, attack: 38, defense: 14, position: 2 },
      { id: 5, name: "Prism Sentinel", element: 3, hp: 125, maxHp: 125, attack: 34, defense: 16, position: 3 },
      { id: 6, name: "Frostfang Sabreclaw", element: 0, hp: 110, maxHp: 110, attack: 37, defense: 12, position: 6 }
    ],
    registeredAt: Date.now() - 86400000 * 1
  }
];
