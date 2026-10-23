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
  const getElementColor = () => {
    switch (guardian.element) {
      case "Flame": return "text-[#ef9100] border-[#df6500]/40 bg-[#df6500]/10";
      case "Void": return "text-[#c084fc] border-[#952fc6]/40 bg-[#952fc6]/10";
      case "Prism": return "text-[#facc15] border-[#facc15]/40 bg-[#facc15]/10";
      default: return "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-150 select-none rounded-[2px] border ${
        isSelected
          ? "border-[#76b900] bg-[#1a1a1a] shadow-[0_0_15px_rgba(118,185,0,0.2)]"
          : "border-[#242424] bg-[#121212] hover:border-[#404040]"
      } ${compact ? "p-3" : "p-4"}`}
    >
      {/* Selected Indicator Square */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#76b900]" />
      )}

      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-bold text-sm text-white tracking-tight">
            {guardian.name}
          </h4>
          <p className="text-[11px] font-mono text-[#757575] uppercase">
            {guardian.role}
          </p>
        </div>

        <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-[2px] border ${getElementColor()}`}>
          {guardian.element}
        </span>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-4 gap-1.5 my-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded-[2px] p-2 font-mono text-xs">
        <div className="flex flex-col items-center">
          <span className="text-[#a7a7a7] flex items-center gap-1 text-[10px]">
            <Heart className="w-3 h-3 text-[#e52020]" /> HP
          </span>
          <span className="font-bold text-white mt-0.5">{guardian.hp}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#a7a7a7] flex items-center gap-1 text-[10px]">
            <Swords className="w-3 h-3 text-[#76b900]" /> ATK
          </span>
          <span className="font-bold text-white mt-0.5">{guardian.attack}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#a7a7a7] flex items-center gap-1 text-[10px]">
            <Shield className="w-3 h-3 text-[#38bdf8]" /> DEF
          </span>
          <span className="font-bold text-white mt-0.5">{guardian.defense}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#a7a7a7] flex items-center gap-1 text-[10px]">
            <Zap className="w-3 h-3 text-[#facc15]" /> SPD
          </span>
          <span className="font-bold text-white mt-0.5">{guardian.speed}</span>
        </div>
      </div>

      {!compact && (
        <div className="mt-2 text-xs text-[#a7a7a7] border-t border-[#1f1f1f] pt-2">
          <span className="text-[#ffffff] font-semibold">Ability:</span> {guardian.ability}
        </div>
      )}
    </div>
  );
};
