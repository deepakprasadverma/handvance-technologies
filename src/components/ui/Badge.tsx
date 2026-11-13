import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "indigo" | "emerald" | "amber" | "slate" | "purple" | "violet";
  size?: "xs" | "sm" | "md";
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "slate",
  size = "sm",
  dot = false,
  className = "",
}) => {
  const sizeClasses = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
  };

  const variantClasses = {
    cyan: "bg-cyan-950/40 text-cyan-300 border-cyan-800/40 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
    indigo: "bg-indigo-950/40 text-indigo-300 border-indigo-800/40 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
    emerald: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    amber: "bg-amber-950/40 text-amber-300 border-amber-800/40 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    purple: "bg-purple-950/40 text-purple-300 border-purple-800/40 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
    violet: "bg-purple-950/40 text-purple-300 border-purple-800/40 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
    slate: "bg-[#0E1017] text-[#94A3B8] border-[#1E2230]",
  };

  const dotColors = {
    cyan: "bg-cyan-400 shadow-[0_0_6px_#06B6D4]",
    indigo: "bg-indigo-400 shadow-[0_0_6px_#6366F1]",
    emerald: "bg-emerald-400 shadow-[0_0_6px_#10B981]",
    amber: "bg-amber-400 shadow-[0_0_6px_#F59E0B]",
    purple: "bg-purple-400 shadow-[0_0_6px_#A855F7]",
    violet: "bg-purple-400 shadow-[0_0_6px_#A855F7]",
    slate: "bg-slate-400 shadow-[0_0_6px_#94A3B8]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tag font-medium rounded-full border transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
