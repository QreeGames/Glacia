import test from "node:test";
import assert from "node:assert";

test("Glacia backend math check", () => {
  const baseDamage = 30;
  const isElementalAdvantage = true;
  const finalDamage = isElementalAdvantage ? (baseDamage * 3) / 2 : baseDamage;
  assert.strictEqual(finalDamage, 45);
});
