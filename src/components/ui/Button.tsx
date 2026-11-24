"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utilities/cn";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "cyan" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
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
    lg: "px-7 py-3.5 text-base font-semibold gap-2.5 rounded-xl",
  };

  const variantClasses = {
    primary:
      "bg-navy text-white hover:bg-navy-light shadow-md hover:shadow-lg border border-transparent",
    cyan:
      "bg-cyan-brand text-navy font-bold hover:bg-cyan-light shadow-md hover:shadow-cyan border border-cyan-brand/30",
    secondary:
      "bg-white text-navy border border-lightGrey-border hover:bg-lightGrey shadow-sm",
    outline:
      "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white",
    ghost:
      "bg-transparent text-navy hover:bg-lightGrey-subtle",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const mergedClass = cn(
    "group inline-flex items-center justify-center font-sans cursor-pointer select-none transition-smooth disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={mergedClass}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={mergedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
};
