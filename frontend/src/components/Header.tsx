import React from "react";
import { Cpu, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeAddress: string;
  onConnectWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeAddress, onConnectWallet }) => {
  return (
    <header className="border-b border-[#242424] bg-[#000000] sticky top-0 z-50 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Technical Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[2px] bg-[#76b900] flex items-center justify-center text-black font-extrabold text-sm tracking-tight">
            GL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white uppercase">
                Glacia
              </span>
              <span className="text-[11px] font-mono font-semibold bg-[#1a1a1a] text-[#76b900] border border-[#2a2a2a] px-2 py-0.5 rounded-[2px]">
                SOROBAN PROTOCOL 22
              </span>
            </div>
            <p className="text-[11px] text-[#757575] font-mono tracking-wide hidden sm:block">
              Deterministic Tactical Battle Engine • Stellar Testnet
            </p>
          </div>
        </div>

        {/* Status & Wallet Connect */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#121212] border border-[#242424] px-3 py-1.5 rounded-[2px] text-xs font-mono text-[#a7a7a7]">
            <Cpu className="w-3.5 h-3.5 text-[#76b900]" />
            <span>Execution: On-Chain Relayer</span>
          </div>

          <button
            onClick={onConnectWallet}
            className="flex items-center gap-2 px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer bg-[#76b900] text-black hover:bg-[#88d400] active:bg-[#5a8d00]"
          >
            <ShieldCheck className="w-4 h-4" />
            {activeAddress
              ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
};
