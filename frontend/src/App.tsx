import { useState, useEffect } from "react";
import type { Guardian, DefenseSquad, MatchResult } from "./types";
import { Header } from "./components/Header";
import { GuardianCard } from "./components/GuardianCard";
import { BattleArena } from "./components/BattleArena";
import { fetchGuardians, fetchDefenseSquads, submitChallenge } from "./services/api";
import { Users, Swords, FileText } from "lucide-react";

export default function App() {
  const [activeAddress, setActiveAddress] = useState<string>("GCHALLENGER_STELLAR_TESTNET");
  const [roster, setRoster] = useState<Guardian[]>([]);
  const [defenseSquads, setDefenseSquads] = useState<DefenseSquad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Guardian[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<DefenseSquad | null>(null);
  const [activeTab, setActiveTab] = useState<"arena" | "roster" | "rules">("arena");

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
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-[#76b900] selection:text-black">
      <Header
        activeAddress={activeAddress}
        onConnectWallet={() => {
          setActiveAddress("GPLAYER_" + Math.random().toString(36).substring(2, 10).toUpperCase());
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* NVIDIA Segmented Navigation Control */}
        <div className="flex items-center gap-1 border-b border-[#242424] pb-3">
          <button
            onClick={() => setActiveTab("arena")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "arena"
                ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                : "bg-transparent text-[#a7a7a7] hover:text-white hover:bg-[#121212]"
            }`}
          >
            <Swords className="w-4 h-4" /> Tactical Arena
          </button>
          <button
            onClick={() => setActiveTab("roster")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "roster"
                ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                : "bg-transparent text-[#a7a7a7] hover:text-white hover:bg-[#121212]"
            }`}
          >
            <Users className="w-4 h-4" /> Draft Squads ({selectedSquad.length}/4)
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "rules"
                ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                : "bg-transparent text-[#a7a7a7] hover:text-white hover:bg-[#121212]"
            }`}
          >
            <FileText className="w-4 h-4" /> Elemental Codex
          </button>
        </div>

        {activeTab === "arena" && selectedTarget && (
          <div className="space-y-6">
            {/* Target Squad Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0d0d0d] border border-[#242424] rounded-[2px] p-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Active Defense Formations
                </h3>
                <p className="text-xs text-[#757575] font-mono mt-0.5">
                  Select a registered player squad to challenge
                </p>
              </div>

              <div className="flex items-center gap-2">
                {defenseSquads.map((sq) => (
                  <button
                    key={sq.id}
                    onClick={() => setSelectedTarget(sq)}
                    className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs cursor-pointer border transition-all ${
                      selectedTarget.id === sq.id
                        ? "bg-[#1a1a1a] text-[#76b900] border-[#76b900]"
                        : "bg-[#121212] text-[#a7a7a7] border-[#2a2a2a] hover:border-[#404040]"
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
            <div className="border-b border-[#242424] pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Guardian Roster
              </h3>
              <p className="text-xs font-mono text-[#757575]">
                Select between 1 and 4 units to compose your attacking squad.
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

        {activeTab === "rules" && (
          <div className="border border-[#242424] bg-[#0d0d0d] rounded-[2px] p-6 space-y-6 font-mono text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Soroban Smart Contract Battle Logic
              </h3>
              <p className="text-[#a7a7a7] leading-relaxed">
                Glacia executes combat deterministically. Squad attributes, elemental damage multipliers, and turn order are validated by Soroban contracts on the Stellar network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[2px] bg-[#121212] border border-[#242424]">
                <div className="text-sm font-bold text-[#38bdf8] mb-1">Frost</div>
                <div className="text-[#a7a7a7]">Strong vs Void. Deals 1.5x damage against Void affinity targets.</div>
              </div>
              <div className="p-4 rounded-[2px] bg-[#121212] border border-[#242424]">
                <div className="text-sm font-bold text-[#c084fc] mb-1">Void</div>
                <div className="text-[#a7a7a7]">Strong vs Prism. Deals 1.5x damage against Prism affinity targets.</div>
              </div>
              <div className="p-4 rounded-[2px] bg-[#121212] border border-[#242424]">
                <div className="text-sm font-bold text-[#facc15] mb-1">Prism</div>
                <div className="text-[#a7a7a7]">Strong vs Flame. Deals 1.5x damage against Flame affinity targets.</div>
              </div>
              <div className="p-4 rounded-[2px] bg-[#121212] border border-[#242424]">
                <div className="text-sm font-bold text-[#ef9100] mb-1">Flame</div>
                <div className="text-[#a7a7a7]">Strong vs Frost. Deals 1.5x damage against Frost affinity targets.</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#242424] bg-[#000000] py-4 px-4 text-center text-xs font-mono text-[#757575]">
        Glacia • Built for Stellar Soroban by <a href="https://github.com/QreeGames" target="_blank" rel="noopener noreferrer" className="text-[#76b900] hover:underline">QreeGames</a> • Open-Source MIT
      </footer>
    </div>
  );
}
