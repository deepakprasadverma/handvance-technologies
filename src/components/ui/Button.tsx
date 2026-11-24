import React from "react";
import Link from "next/link";
import { cn } from "@/utilities/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5 rounded-md",
    md: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-lg",
    lg: "px-7 py-3.5 text-base font-semibold gap-2.5 rounded-lg",
  };

  const variantClasses = {
    primary:
      "bg-navy text-white hover:bg-navy-light shadow-md hover:shadow-lg transition-all duration-200 border border-transparent",
    cyan:
      "bg-cyan-brand text-navy hover:bg-cyan-light shadow-md hover:shadow-cyan transition-all duration-200 border border-transparent font-bold",
    secondary:
      "bg-white text-navy border border-lightGrey-border hover:bg-lightGrey shadow-sm transition-all duration-200",
    outline:
      "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white transition-all duration-200",
    ghost:
      "bg-transparent text-navy hover:bg-lightGrey-subtle transition-all duration-200",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  const mergedClass = cn(
    "inline-flex items-center justify-center font-sans cursor-pointer select-none transition-smooth disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={mergedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={mergedClass} {...props}>
      {content}
    </button>
  );
};
