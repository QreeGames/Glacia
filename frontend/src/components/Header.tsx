import React from "react";
import { Shield, Sparkles, Flame, Orbit } from "lucide-react";

interface HeaderProps {
  activeAddress: string;
  isConnecting: boolean;
  onConnectWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeAddress, isConnecting, onConnectWallet }) => {
  return (
    <header className="border-b border-sky-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Title & Lore Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Orbit className="w-5 h-5 text-sky-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-400 to-indigo-300">
                GLACIA
              </h1>
              <span className="text-[10px] tracking-widest font-mono uppercase bg-sky-950/80 border border-sky-500/30 text-sky-300 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                SOROBAN V22
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-wide uppercase hidden sm:block">
              Asynchronous On-Chain Tactical Arena • Stellar Testnet
            </p>
          </div>
        </div>

        {/* Elemental Matrix & Wallet Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-400">
            <span className="text-sky-400 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Frost</span>
            <span>&gt;</span>
            <span className="text-purple-400 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Void</span>
            <span>&gt;</span>
            <span className="text-amber-400">Prism</span>
            <span>&gt;</span>
            <span className="text-orange-400 flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> Flame</span>
            <span>&gt;</span>
            <span className="text-sky-400">Frost</span>
          </div>

          <button
            onClick={onConnectWallet}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/40 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.15)] active:scale-95"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {activeAddress
              ? `${activeAddress.slice(0, 5)}...${activeAddress.slice(-4)}`
              : "CONNECT STELLAR WALLET"}
          </button>
        </div>
      </div>
    </header>
  );
};
