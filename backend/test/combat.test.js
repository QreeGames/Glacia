import test from "node:test";
import assert from "node:assert";
import { CombatEngine } from "../src/services/combatEngine.js";

test("CombatEngine - Elemental Advantages calculation", () => {
  // Flame (1) vs Frost (0) => Advantage
  assert.strictEqual(CombatEngine.hasAdvantage(1, 0), true);

  // Frost (0) vs Void (2) => Advantage
  assert.strictEqual(CombatEngine.hasAdvantage(0, 2), true);

  // Void (2) vs Prism (3) => Advantage
  assert.strictEqual(CombatEngine.hasAdvantage(2, 3), true);

  // Prism (3) vs Flame (1) => Advantage
  assert.strictEqual(CombatEngine.hasAdvantage(3, 1), true);

  // Frost (0) vs Flame (1) => Disadvantage
  assert.strictEqual(CombatEngine.hasAdvantage(0, 1), false);
});

test("CombatEngine - Match simulation completes with winner and telemetry logs", () => {
  const attackerSquad = [
    { id: 3, name: "Pyre Drake", element: 1, hp: 120, attack: 35, defense: 10 }
  ];
  const defenderSquad = [
    { id: 1, name: "Glacial Golem", element: 0, hp: 100, attack: 25, defense: 15 }
  ];

  const result = CombatEngine.simulate(
    attackerSquad,
    defenderSquad,
    "GATTACKERDEMO111",
    "GDEFENDERDEMO222"
  );

  assert.ok(result.winner, "Winner should be defined");
  assert.ok(result.turnsElapsed > 0, "Turns should be greater than 0");
  assert.ok(result.logs.length > 0, "Telemetry logs should be recorded");
});
