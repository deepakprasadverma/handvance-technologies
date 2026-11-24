import React from "react";
import { cn } from "@/utilities/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "navy" | "neutral" | "success";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  size = "sm",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variantClasses = {
    cyan: "bg-cyan-glow text-navy font-semibold border border-cyan-brand/30",
    navy: "bg-navy text-white font-medium border border-transparent",
    neutral: "bg-lightGrey text-slate-700 font-medium border border-lightGrey-border",
    success: "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full tracking-wide transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
