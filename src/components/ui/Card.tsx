"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utilities/cn";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  variant?: "default" | "navy" | "lightGrey" | "cyanAccent";
  hoverEffect?: boolean;
  hover?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  hoverEffect = false,
  hover = false,
  className,
  ...props
}) => {
  const isHover = hoverEffect || hover;
  const variantClasses = {
    default:
      "bg-white text-navy border border-lightGrey-border shadow-card",
    navy:
      "bg-navy text-white border border-navy-muted/50 shadow-lg",
    lightGrey:
      "bg-lightGrey text-navy border border-lightGrey-border",
    cyanAccent:
      "bg-white text-navy border border-lightGrey-border shadow-card relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-cyan-brand before:to-navy",
  };

  return (
    <motion.div
      whileHover={isHover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-2xl p-6 sm:p-8 transition-smooth",
        variantClasses[variant],
        isHover && "hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h3 className={cn("text-xl font-bold tracking-tight text-navy", className)} {...props} />;

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={cn("text-sm text-slate-600 leading-relaxed", className)} {...props} />;

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("pt-2", className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex items-center pt-4 border-t border-lightGrey-border mt-4", className)} {...props} />;
