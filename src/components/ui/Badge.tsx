import React from "react";
import { cn } from "@/utilities/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "navy" | "neutral" | "outline" | "success";
  size?: "xs" | "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  size = "sm",
  dot = false,
  className,
  ...props
}) => {
  const sizeClasses = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-xs font-semibold",
  };

  const variantClasses = {
    cyan: "bg-cyan-glow text-navy font-semibold border border-cyan-brand/30",
    navy: "bg-navy text-white font-medium border border-transparent",
    neutral: "bg-lightGrey text-slate-700 font-medium border border-lightGrey-border",
    outline: "bg-transparent text-navy font-semibold border border-navy/20",
    success: "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200",
  };

  const dotClasses = {
    cyan: "bg-cyan-brand",
    navy: "bg-cyan-brand",
    neutral: "bg-slate-400",
    outline: "bg-navy",
    success: "bg-emerald-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotClasses[variant])} />
          <span className={cn("relative inline-flex rounded-full h-2 w-2", dotClasses[variant])} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
