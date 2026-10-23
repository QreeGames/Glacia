import { useState, useEffect } from "react";
import type { Guardian, DefenseSquad, MatchResult } from "./types";
import { Header } from "./components/Header";
import { GuardianCard } from "./components/GuardianCard";
import { BattleArena } from "./components/BattleArena";
import { fetchGuardians, fetchDefenseSquads, submitChallenge } from "./services/api";
import { Users, Shield, Sparkles, BookOpen } from "lucide-react";

export default function App() {
  const [activeAddress, setActiveAddress] = useState<string>("GCHALLENGER_DEMO_WALLET_7777");
  const [roster, setRoster] = useState<Guardian[]>([]);
  const [defenseSquads, setDefenseSquads] = useState<DefenseSquad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Guardian[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<DefenseSquad | null>(null);
  const [activeTab, setActiveTab] = useState<"arena" | "roster" | "lore">("arena");

  useEffect(() => {
    async function loadData() {
      const g = await fetchGuardians();
      const s = await fetchDefenseSquads();
      setRoster(g);
      setDefenseSquads(s);
      setSelectedSquad([g[0], g[2]]);
      if (s.length > 0) setSelectedTarget(s[0]);
    }
    loadData();
  }, []);

  const toggleSelectGuardian = (guardian: Guardian) => {
    if (selectedSquad.some((g) => g.id === guardian.id)) {
      if (selectedSquad.length > 1) {
        setSelectedSquad(selectedSquad.filter((g) => g.id !== guardian.id));
      }
    } else {
      if (selectedSquad.length < 4) {
        setSelectedSquad([...selectedSquad, guardian]);
      }
    }
  };

  const handleExecuteBattle = async (): Promise<MatchResult> => {
    if (!selectedTarget) throw new Error("No target selected");
    return submitChallenge(activeAddress, selectedTarget.player, selectedSquad);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Header
        activeAddress={activeAddress}
        isConnecting={false}
        onConnectWallet={() => {
          setActiveAddress("GPLAYER_STELLAR_" + Math.random().toString(36).substring(2, 8).toUpperCase());
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
          <button
            onClick={() => setActiveTab("arena")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "arena"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Shield className="w-4 h-4" /> Tactical Arena
          </button>
          <button
            onClick={() => setActiveTab("roster")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "roster"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Users className="w-4 h-4" /> Draft Squad ({selectedSquad.length}/4)
          </button>
          <button
            onClick={() => setActiveTab("lore")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "lore"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Elemental Codex
          </button>
        </div>

        {activeTab === "arena" && selectedTarget && (
          <div className="space-y-6">
            {/* Target Squad Selector Bar */}
            <div className="flex items-center justify-between bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-slate-200">
                    Active Defensive Strongholds
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Select an opponent on-chain defense to challenge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {defenseSquads.map((sq) => (
                  <button
                    key={sq.id}
                    onClick={() => setSelectedTarget(sq)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs cursor-pointer border transition-all ${
                      selectedTarget.id === sq.id
                        ? "bg-sky-950 text-sky-300 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {sq.playerName}
                  </button>
                ))}
              </div>
            </div>

            <BattleArena
              mySquad={selectedSquad}
              targetSquad={selectedTarget}
              onExecuteBattle={handleExecuteBattle}
            />
          </div>
        )}

        {activeTab === "roster" && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="font-cinzel text-xl font-bold text-sky-300">
                Elemental Champion Roster
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Click units to compose your 1 to 4 guardian attack squad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roster.map((guardian) => {
                const isSelected = selectedSquad.some((g) => g.id === guardian.id);
                return (
                  <GuardianCard
                    key={guardian.id}
                    guardian={guardian}
                    isSelected={isSelected}
                    onSelect={() => toggleSelectGuardian(guardian)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "lore" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-2xl font-bold text-sky-300">
              The Soroban Elemental Codex
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              In the frozen realm of Glacia, combat is governed by mathematical and elemental laws
              etched directly into Stellar Soroban smart contracts. No human intervention or server
              tampering can alter the outcome of a battle once committed to the ledger.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30">
                <h4 className="font-cinzel text-base font-bold text-sky-400 mb-1">Frost</h4>
                <p className="text-xs text-slate-400">Strong against Void. Crushes ethereal entities beneath permafrost glaciers.</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                <h4 className="font-cinzel text-base font-bold text-purple-400 mb-1">Void</h4>
                <p className="text-xs text-slate-400">Strong against Prism. Consumes crystal refraction into singularity rifts.</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                <h4 className="font-cinzel text-base font-bold text-amber-400 mb-1">Prism</h4>
                <p className="text-xs text-slate-400">Strong against Flame. Disperses concentrated heat across crystalline shields.</p>
              </div>
              <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/30">
                <h4 className="font-cinzel text-base font-bold text-orange-400 mb-1">Flame</h4>
                <p className="text-xs text-slate-400">Strong against Frost. Liquefies ancient ice golems with concentrated magma.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs font-mono text-slate-500">
        GLACIA • Open-Source Web3 Battler by <a href="https://github.com/QreeGames" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">QreeGames</a> • Powered by Stellar Soroban
      </footer>
    </div>
  );
}
