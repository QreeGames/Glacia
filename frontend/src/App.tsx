import { useState } from "react";
import type { Guardian, DefenseSquad } from "./types";

const ROSTER: Guardian[] = [
  { id: 1, name: "Glacial Golem", element: "frost", hp: 140, maxHp: 140, attack: 28, defense: 18, position: 0, icon: "❄️" },
  { id: 2, name: "Blizzard Mage", element: "frost", hp: 90, maxHp: 90, attack: 35, defense: 8, position: 1, icon: "🧙‍♂️" },
  { id: 3, name: "Inferno Drake", element: "flame", hp: 130, maxHp: 130, attack: 36, defense: 10, position: 2, icon: "🔥" },
  { id: 4, name: "Void Stalker", element: "void", hp: 110, maxHp: 110, attack: 30, defense: 12, position: 4, icon: "🌑" },
  { id: 5, name: "Prism Sentinel", element: "prism", hp: 120, maxHp: 120, attack: 32, defense: 14, position: 5, icon: "💎" },
];

const ENEMY_SQUADS: DefenseSquad[] = [
  {
    player: "GDEFENDER111...",
    playerName: "Frost Monarch",
    wins: 14,
    losses: 3,
    guardians: [
      { id: 10, name: "Glacial Titan", element: "frost", hp: 150, maxHp: 150, attack: 30, defense: 20, position: 0, icon: "❄️" },
      { id: 11, name: "Ice Sorceress", element: "frost", hp: 85, maxHp: 85, attack: 38, defense: 8, position: 1, icon: "🧙‍♀️" },
    ]
  }
];

export default function App() {
  const [mySquad] = useState<Guardian[]>([ROSTER[0], ROSTER[2]]);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isBattling, setIsBattling] = useState(false);

  const handleFight = () => {
    setIsBattling(true);
    setBattleLog([
      "⚔️ Connecting to Stellar Soroban contract...",
      "🛡️ Deployed squad challenged 'Frost Monarch'...",
      "🔥 Inferno Drake attacks Glacial Titan (Elemental Advantage: 1.5x damage!)",
      "❄️ Glacial Titan retaliates!",
      "🎉 Attacker squad victorious! Winner: You (Recorded on-chain)"
    ]);
    setTimeout(() => {
      setIsBattling(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] p-4 sm:p-8 text-black">
      <header className="border-4 border-black bg-[#FFE600] p-4 mb-6 shadow-[6px_6px_0px_#000] flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">GLACIA ❄️⚔️</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-black">On-Chain Tactical Battle Arena on Stellar</p>
        </div>
        <span className="bg-black text-[#FFE600] px-3 py-1 font-black text-xs uppercase border-2 border-black">
          SOROBAN V22
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Squad Selection */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000]">
          <h2 className="text-lg font-black uppercase mb-4 border-b-2 border-black pb-2">Your Battle Squad</h2>
          <div className="space-y-3">
            {mySquad.map((g) => (
              <div key={g.id} className="border-3 border-black p-3 bg-[#E0F7FA] flex justify-between items-center shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <p className="font-black text-sm uppercase">{g.name}</p>
                    <p className="text-[10px] font-bold text-gray-700 uppercase">HP: {g.hp} | ATK: {g.attack} | DEF: {g.defense}</p>
                  </div>
                </div>
                <span className="border-2 border-black px-2 py-0.5 font-black text-[10px] uppercase bg-white">
                  {g.element}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleFight}
            disabled={isBattling}
            className="mt-6 w-full bg-[#00FF66] hover:bg-[#32ff87] text-black border-4 border-black py-4 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            {isBattling ? "BATTLE IN PROGRESS..." : "CHALLENGE FROST MONARCH ▶"}
          </button>
        </div>

        {/* Battle Arena & Logs */}
        <div className="border-4 border-black bg-[#E0F7FA]/40 p-6 shadow-[6px_6px_0px_#000]">
          <h2 className="text-lg font-black uppercase mb-4 border-b-2 border-black pb-2">Target Defender</h2>
          <div className="bg-[#FFE600]/30 border-3 border-black p-3 mb-4 shadow-[3px_3px_0px_#000]">
            <p className="font-black text-sm uppercase">{ENEMY_SQUADS[0].playerName}</p>
            <p className="text-[11px] font-bold text-gray-800">Wins: {ENEMY_SQUADS[0].wins} | Losses: {ENEMY_SQUADS[0].losses}</p>
          </div>

          <h3 className="text-xs font-black uppercase mb-2">Combat Telemetry</h3>
          <div className="border-3 border-black bg-black text-[#00FF66] p-4 font-mono text-xs min-h-[160px] space-y-1.5 shadow-[3px_3px_0px_#000]">
            {battleLog.length === 0 ? (
              <p className="text-gray-500">Ready to simulate Soroban contract battle...</p>
            ) : (
              battleLog.map((log, i) => <p key={i}>{log}</p>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
