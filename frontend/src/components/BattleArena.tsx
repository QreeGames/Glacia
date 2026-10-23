import React, { useState } from "react";
import type { Guardian, DefenseSquad, MatchResult } from "../types";
import { GuardianCard } from "./GuardianCard";
import { Swords, RotateCcw, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface BattleArenaProps {
  mySquad: Guardian[];
  targetSquad: DefenseSquad;
  onExecuteBattle: () => Promise<MatchResult>;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  mySquad,
  targetSquad,
  onExecuteBattle
}) => {
  const [isBattling, setIsBattling] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const handleStartBattle = async () => {
    setIsBattling(true);
    setMatchResult(null);

    try {
      const result = await onExecuteBattle();
      setMatchResult(result);

      if (result.winner === result.attacker) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#818cf8", "#f43f5e", "#fbbf24"]
        });
      }
    } finally {
      setIsBattling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Arena Board */}
      <div className="rounded-3xl border border-sky-500/20 bg-slate-950/70 p-6 relative overflow-hidden radar-grid shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Attacking Squad (Player) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-sky-300">Challenger Squad</h3>
                <p className="text-[10px] font-mono uppercase text-slate-400">Deployed Attack Formation</p>
              </div>
              <span className="text-xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 px-2.5 py-1 rounded-lg">
                {mySquad.length} Units
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mySquad.map((g) => (
                <GuardianCard key={g.id} guardian={g} compact />
              ))}
            </div>
          </div>

          {/* VS Divider / Action CTA */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-indigo-600 to-sky-500 p-0.5 shadow-[0_0_30px_rgba(244,63,94,0.3)] mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Swords className="w-6 h-6 text-rose-400 animate-pulse" />
              </div>
            </div>

            <button
              onClick={handleStartBattle}
              disabled={isBattling || mySquad.length === 0}
              className={`w-full max-w-xs py-3.5 px-6 rounded-2xl font-cinzel font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2 ${
                isBattling
                  ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white border border-sky-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] active:scale-95"
              }`}
            >
              {isBattling ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-sky-400" />
                  Resolving Soroban Turn...
                </>
              ) : (
                <>
                  <Swords className="w-4 h-4" />
                  ENGAGE SQUAD BATTLE
                </>
              )}
            </button>
            <p className="text-[10px] font-mono text-slate-500 mt-2 uppercase tracking-wide">
              Deterministic Simulation • Gasless Sponsored Relayer
            </p>
          </div>

          {/* Defending Squad (Target) */}
          <div className="space-y-4 lg:col-start-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-purple-300">
                  {targetSquad.playerName}
                </h3>
                <p className="text-[10px] font-mono uppercase text-slate-400">
                  Rating: {targetSquad.rating} • Record: {targetSquad.wins}W / {targetSquad.losses}L
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800 px-2.5 py-1 rounded-lg">
                On-Chain Defense
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {targetSquad.guardians.map((g) => (
                <GuardianCard key={g.id} guardian={g} compact />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Combat Telemetry Console */}
      {matchResult && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 space-y-4 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="font-cinzel text-base font-bold text-slate-100">
                Match Telemetry Record
              </h4>
            </div>
            <span className="text-xs font-mono text-sky-400">
              Elapsed: {matchResult.turnsElapsed} Turns
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-2 font-mono text-xs">
            {matchResult.logs.map((log, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-xl border ${
                  log.phase === "VICTORY"
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                    : log.phase === "ELIMINATION"
                    ? "bg-rose-950/40 border-rose-500/40 text-rose-300"
                    : "bg-slate-900/40 border-slate-800/60 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                  <span>TURN {log.turn} • {log.phase}</span>
                </div>
                <div>{log.message}</div>
              </div>
            ))}
          </div>

          {matchResult.receipt && (
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>On-Chain Receipt: {matchResult.receipt.transactionHash.slice(0, 16)}...</span>
              <span className="text-emerald-400 font-semibold">{matchResult.receipt.status}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
