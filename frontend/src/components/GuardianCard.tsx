import React from "react";
import type { Guardian } from "../types";
import { Shield, Swords, Zap, Heart } from "lucide-react";

interface GuardianCardProps {
  guardian: Guardian;
  isSelected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
}

export const GuardianCard: React.FC<GuardianCardProps> = ({
  guardian,
  isSelected,
  onSelect,
  compact = false
}) => {
  const getThemeClass = () => {
    switch (guardian.element) {
      case "Flame":
        return "flame-card border-orange-500/30 text-orange-200";
      case "Void":
        return "void-card border-purple-500/30 text-purple-200";
      case "Prism":
        return "prism-card border-amber-500/30 text-amber-200";
      default:
        return "frost-card border-sky-500/30 text-sky-200";
    }
  };

  const getElementBadgeColor = () => {
    switch (guardian.element) {
      case "Flame": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Void": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Prism": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-sky-500/20 text-sky-400 border-sky-500/30";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl transition-all duration-300 relative cursor-pointer select-none group overflow-hidden ${getThemeClass()} ${
        isSelected ? "ring-2 ring-sky-400 scale-[1.02] shadow-[0_0_30px_rgba(56,189,248,0.4)]" : "hover:scale-[1.01]"
      } ${compact ? "p-3" : "p-4 sm:p-5"}`}
    >
      {/* Glow highlight */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-2xl group-hover:from-sky-400/20 pointer-events-none transition-all" />

      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-xl shadow-inner">
            {guardian.icon}
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
              {guardian.name}
            </h4>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
              {guardian.role}
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${getElementBadgeColor()}`}>
          {guardian.element}
        </span>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-1.5 my-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2 font-mono text-[11px]">
        <div className="flex flex-col items-center">
          <span className="text-emerald-400 flex items-center gap-0.5 text-[10px]">
            <Heart className="w-3 h-3" /> HP
          </span>
          <span className="font-bold text-slate-200">{guardian.hp}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-rose-400 flex items-center gap-0.5 text-[10px]">
            <Swords className="w-3 h-3" /> ATK
          </span>
          <span className="font-bold text-slate-200">{guardian.attack}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sky-400 flex items-center gap-0.5 text-[10px]">
            <Shield className="w-3 h-3" /> DEF
          </span>
          <span className="font-bold text-slate-200">{guardian.defense}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-amber-400 flex items-center gap-0.5 text-[10px]">
            <Zap className="w-3 h-3" /> SPD
          </span>
          <span className="font-bold text-slate-200">{guardian.speed}</span>
        </div>
      </div>

      {!compact && (
        <div className="mt-2 text-[11px] font-mono text-slate-400 bg-slate-900/40 border border-slate-800/40 rounded-lg p-2 line-clamp-2">
          <span className="text-sky-300 font-semibold">Special:</span> {guardian.ability}
        </div>
      )}
    </div>
  );
};
