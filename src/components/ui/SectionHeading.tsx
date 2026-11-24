"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { cn } from "@/utilities/cn";

export interface SectionHeadingProps {
  badge?: string;
  badgeDot?: boolean;
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeDot = true,
  title,
  highlightText,
  description,
  align = "center",
  className,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("max-w-3xl flex flex-col space-y-3.5 mb-12 sm:mb-16", alignmentClasses[align], className)}
    >
      {badge && (
        <Badge variant="cyan" size="sm" dot={badgeDot}>
          {badge}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-[1.15]">
        {title}{" "}
        {highlightText && (
          <span className="text-cyan-brand relative inline-block">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};
