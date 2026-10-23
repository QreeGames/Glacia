import React, { useState } from "react";
import type { Guardian, DefenseSquad, MatchResult } from "../types";
import { GuardianCard } from "./GuardianCard";
import { Play, RotateCw, CheckCircle2, ShieldAlert } from "lucide-react";

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
    } finally {
      setIsBattling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Board & Formation */}
      <div className="border border-[#242424] bg-[#0d0d0d] rounded-[2px] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Attacking Squad (Player) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Attacking Squad
                </h3>
                <p className="text-xs text-[#757575] font-mono">Challenger Formation</p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#1a1a1a] text-[#76b900] border border-[#2a2a2a] px-2 py-0.5 rounded-[2px]">
                {mySquad.length} Units Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mySquad.map((g) => (
                <GuardianCard key={g.id} guardian={g} compact />
              ))}
            </div>
          </div>

          {/* Defending Squad (Target) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Target Squad: {targetSquad.playerName}
                </h3>
                <p className="text-xs text-[#757575] font-mono">
                  Rating: {targetSquad.rating} | Record: {targetSquad.wins}W - {targetSquad.losses}L
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#1a1a1a] text-[#a7a7a7] border border-[#2a2a2a] px-2 py-0.5 rounded-[2px]">
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

        {/* Action Trigger */}
        <div className="mt-8 pt-6 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#757575]">
            Combat is resolved deterministically by Soroban smart contract rules.
          </div>

          <button
            onClick={handleStartBattle}
            disabled={isBattling || mySquad.length === 0}
            className={`px-8 py-3 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              isBattling
                ? "bg-[#1a1a1a] text-[#757575] border border-[#2a2a2a] cursor-not-allowed"
                : "bg-[#76b900] text-black hover:bg-[#88d400] active:bg-[#5a8d00]"
            }`}
          >
            {isBattling ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-[#76b900]" />
                Simulating Combat...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Execute Match
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured Execution Log */}
      {matchResult && (
        <div className="border border-[#242424] bg-[#0d0d0d] rounded-[2px] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#242424] pb-3">
            <div className="flex items-center gap-2">
              {matchResult.winner === matchResult.attacker ? (
                <CheckCircle2 className="w-5 h-5 text-[#76b900]" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-[#e52020]" />
              )}
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Match Result: {matchResult.winner === matchResult.attacker ? "Victory" : "Defeat"}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#757575]">
              Duration: {matchResult.turnsElapsed} Turns
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs">
            {matchResult.logs.map((log, index) => (
              <div
                key={index}
                className="p-2.5 rounded-[2px] bg-[#141414] border border-[#202020] flex items-center justify-between"
              >
                <span className="text-white">
                  <span className="text-[#757575] mr-2">[Turn {log.turn}]</span>
                  {log.message.replace(/[⚔️🛡️🔥❄️☠️🏆]/g, "")}
                </span>
                <span className="text-[10px] text-[#76b900] font-semibold uppercase">
                  {log.phase}
                </span>
              </div>
            ))}
          </div>

          {matchResult.receipt && (
            <div className="pt-3 border-t border-[#242424] text-xs font-mono text-[#757575] flex items-center justify-between">
              <span>Transaction Receipt: {matchResult.receipt.transactionHash}</span>
              <span className="text-[#76b900] font-bold">{matchResult.receipt.status}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
