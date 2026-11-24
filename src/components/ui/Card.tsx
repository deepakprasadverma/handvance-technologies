import React from "react";
import { cn } from "@/utilities/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-lightGrey-border p-6 shadow-card transition-smooth",
        hoverEffect && "hover:shadow-card-hover hover:border-cyan-brand/30 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
