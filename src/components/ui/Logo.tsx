import React from "react";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showWordmark = true,
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Futuristic SVG Icon */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo to-brand-cyan rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        >
          {/* Outer faceted geometric hex outline */}
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            className="stroke-cyan-400"
            strokeWidth="1.75"
            strokeLinejoin="round"
            fill="#0E1017"
            fillOpacity="0.85"
          />

          {/* Inner isometric faceted planes */}
          <polygon
            points="20,2 36,11 20,20 4,11"
            className="fill-blue-500/20 stroke-blue-400/50"
            strokeWidth="1"
          />
          <polygon
            points="20,20 36,11 36,29 20,38"
            className="fill-cyan-500/25 stroke-cyan-400/50"
            strokeWidth="1"
          />
          <polygon
            points="4,11 20,20 20,38 4,29"
            className="fill-indigo-600/30 stroke-indigo-400/50"
            strokeWidth="1"
          />

          {/* Central glowing quantum core symbol: stylized 'H' and 'V' fusion */}
          <path
            d="M14 14 L14 26 M26 14 L26 26 M14 20 L26 20 M20 16 L20 24"
            stroke="url(#hvGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center glowing focal point */}
          <circle cx="20" cy="20" r="2.5" fill="#38BDF8" className="animate-pulse" />

          <defs>
            <linearGradient id="hvGradient" x1="14" y1="14" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col tracking-tight">
          <div className="flex items-center">
            <span className={`font-bold tracking-tight text-[#F8FAFC] font-sans ${textSizes[size]}`}>
              Handvance
            </span>
            <span className={`font-light text-cyan-400 font-sans ml-1.5 ${textSizes[size]}`}>
              Technologies
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1 mb-1 animate-pulse shadow-[0_0_8px_#06B6D4]" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-mono-tag -mt-1 font-medium">
            Software & AI Engineering
          </span>
        </div>
      )}
    </div>
  );
};
