"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowingButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-medium gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3.5 text-base font-semibold gap-2.5",
  };

  const variantClasses = {
    primary:
      "relative bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] border border-cyan-400/30 overflow-hidden",
    secondary:
      "bg-[#0E1017]/90 text-[#F8FAFC] border border-[#1E2230] hover:border-cyan-500/50 hover:bg-[#141724] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    outline:
      "bg-transparent text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    ghost:
      "bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5",
  };

  const content = (
    <>
      {/* Animated shimmer beam for primary variant */}
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      )}
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const combinedClass = `group inline-flex items-center justify-center rounded-lg transition-all duration-300 font-sans cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClass}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
};
