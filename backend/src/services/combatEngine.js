/**
 * Deterministic Off-Chain Combat Simulator (Mirrors contracts/src/lib.rs exactly)
 * Provides instant preview, turn-by-turn action replay telemetry, and Soroban verification.
 */

export class CombatEngine {
  static simulate(attackerSquad, defenderSquad, attackerAddress, defenderAddress) {
    // Clone squads to preserve originals
    const att = attackerSquad.map(g => ({ ...g, currentHp: g.hp }));
    const def = defenderSquad.map(g => ({ ...g, currentHp: g.hp }));

    const logs = [];
    let turn = 0;
    const maxTurns = 25;

    logs.push({
      turn: 0,
      phase: "INIT",
      message: `⚔️ Match engaged: ${attackerAddress.slice(0, 8)}... VS ${defenderAddress.slice(0, 8)}...`
    });

    while (turn < maxTurns) {
      turn += 1;

      // Attacker Phase
      for (const attacker of att) {
        if (attacker.currentHp <= 0) continue;

        const target = def.find(d => d.currentHp > 0);
        if (!target) break;

        const { damage, isAdvantage } = this.calculateDamage(attacker, target);
        target.currentHp = Math.max(0, target.currentHp - damage);

        logs.push({
          turn,
          phase: "ATTACK",
          actor: attacker.name,
          actorElement: attacker.element,
          target: target.name,
          targetElement: target.element,
          damage,
          isAdvantage,
          targetRemainingHp: target.currentHp,
          message: `${attacker.name} strikes ${target.name} for ${damage} DMG${isAdvantage ? " (🔥 ELEMENTAL CRIT!)" : ""}`
        });

        if (target.currentHp === 0) {
          logs.push({
            turn,
            phase: "ELIMINATION",
            actor: target.name,
            message: `☠️ ${target.name} has fallen!`
          });
        }
      }

      if (def.every(d => d.currentHp <= 0)) break;

      // Defender Phase
      for (const defender of def) {
        if (defender.currentHp <= 0) continue;

        const target = att.find(a => a.currentHp > 0);
        if (!target) break;

        const { damage, isAdvantage } = this.calculateDamage(defender, target);
        target.currentHp = Math.max(0, target.currentHp - damage);

        logs.push({
          turn,
          phase: "DEFENSE",
          actor: defender.name,
          actorElement: defender.element,
          target: target.name,
          targetElement: target.element,
          damage,
          isAdvantage,
          targetRemainingHp: target.currentHp,
          message: `${defender.name} counter-attacks ${target.name} for ${damage} DMG${isAdvantage ? " (🔥 ELEMENTAL CRIT!)" : ""}`
        });

        if (target.currentHp === 0) {
          logs.push({
            turn,
            phase: "ELIMINATION",
            actor: target.name,
            message: `☠️ ${target.name} has fallen!`
          });
        }
      }

      if (att.every(a => a.currentHp <= 0)) break;
    }

    const attackerSurvivors = att.filter(a => a.currentHp > 0).length;
    const defenderSurvivors = def.filter(d => d.currentHp > 0).length;
    const isAttackerWinner = attackerSurvivors > 0;
    const winner = isAttackerWinner ? attackerAddress : defenderAddress;

    logs.push({
      turn,
      phase: "VICTORY",
      winner,
      message: `🏆 Victory claimed by ${winner === attackerAddress ? "Challenger" : "Defender"} in ${turn} turns!`
    });

    return {
      winner,
      attacker: attackerAddress,
      defender: defenderAddress,
      turnsElapsed: turn,
      attackerSurvivors,
      defenderSurvivors,
      logs,
      attackerFinalSquad: att,
      defenderFinalSquad: def,
      timestamp: Date.now()
    };
  }

  static calculateDamage(attacker, defender) {
    const base = Math.max(1, Math.floor(attacker.attack - defender.defense / 2));
    const isAdvantage = this.hasAdvantage(attacker.element, defender.element);
    const damage = isAdvantage ? Math.floor((base * 3) / 2) : base;
    return { damage, isAdvantage };
  }

  static hasAdvantage(attElem, defElem) {
    // 0: Frost, 1: Flame, 2: Void, 3: Prism
    if (attElem === 1 && defElem === 0) return true; // Flame > Frost
    if (attElem === 0 && defElem === 2) return true; // Frost > Void
    if (attElem === 2 && defElem === 3) return true; // Void > Prism
    if (attElem === 3 && defElem === 1) return true; // Prism > Flame
    return false;
  }
}
