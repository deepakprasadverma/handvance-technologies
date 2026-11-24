import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "navy";
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "navy",
  showWordmark = true,
}) => {
  const isDarkVariant = variant === "dark";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Modern Geometric Tech Mark */}
      <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        >
          {/* Base Navy Hexagon / Diamond */}
          <rect
            x="4"
            y="4"
            width="28"
            height="28"
            rx="8"
            className="fill-navy"
          />

          {/* Electric Cyan Accent Facet */}
          <path
            d="M8 12 L18 6 L28 12 L28 24 L18 30 L8 24 Z"
            stroke="#13CDEB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />

          {/* Stylized 'H' and 'V' Tech Intersection */}
          <path
            d="M13 13 V23 M23 13 V23 M13 18 H23"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Radiant Core Dot */}
          <circle cx="18" cy="18" r="2" fill="#13CDEB" className="animate-pulse" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center text-lg font-bold tracking-tight">
            <span className={isDarkVariant ? "text-white" : "text-navy"}>
              Handvance
            </span>
            <span className="text-cyan-brand ml-1">
              Technologies
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand ml-1 mb-1" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">
            IT Services & Software
          </span>
        </div>
      )}
    </Link>
  );
};
