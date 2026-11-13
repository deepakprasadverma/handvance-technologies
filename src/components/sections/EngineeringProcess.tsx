"use client";

import React, { useState } from "react";
import { Compass, Layers, Cpu, TrendingUp, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { ENGINEERING_PROCESS } from "@/data/process";
import { Badge } from "@/components/ui/Badge";

export const EngineeringProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-blue-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="process" className="relative py-28 bg-[#07070B] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-blue-700/10 via-cyan-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            RIGOROUS METHODOLOGY
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            The 4-Step{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Engineering Protocol
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            We operate with mathematical precision—transforming abstract product objectives into
            verifiably performant, zero-debt production software.
          </p>
        </div>

        {/* Desktop Connected Horizontal Timeline */}
        <div className="hidden lg:block relative mb-16">
          {/* Glowing Connecting Line Background */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-[#1E2230] z-0" />
          {/* Animated Glowing Gradient Fill Line */}
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 transition-all duration-500 z-0 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
            style={{ width: `${(activeStep / (ENGINEERING_PROCESS.length - 1)) * 100}%` }}
          />

          {/* Timeline Nodes */}
          <div className="grid grid-cols-4 relative z-10">
            {ENGINEERING_PROCESS.map((step, idx) => {
              const isPassed = idx <= activeStep;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center cursor-pointer group select-none"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                      isCurrent
                        ? "bg-[#0E1017] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-110"
                        : isPassed
                        ? "bg-[#0E1017] border-cyan-700/60 text-cyan-400"
                        : "bg-[#090A0F] border-[#1E2230] text-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <span
                      className={`font-mono-tag font-bold text-sm ${
                        isCurrent
                          ? "text-cyan-300"
                          : isPassed
                          ? "text-cyan-400"
                          : "text-slate-500"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title Preview under Node */}
                  <div className="text-center mt-4">
                    <span
                      className={`text-xs font-mono-tag tracking-wider uppercase block ${
                        isCurrent ? "text-cyan-400 font-semibold" : "text-[#94A3B8]"
                      }`}
                    >
                      {step.phase.split("//")[1]?.trim()}
                    </span>
                    <span
                      className={`text-sm font-bold block mt-1 transition-colors ${
                        isCurrent ? "text-[#F8FAFC]" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {step.title.split("&")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Step Detail Cards Grid (Responsive 4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERING_PROCESS.map((step, idx) => {
            const isSelected = idx === activeStep;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#0E1017] border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20"
                    : "bg-[#0E1017]/70 border-[#1E2230] hover:border-slate-700 hover:bg-[#0E1017]"
                }`}
              >
                <div>
                  {/* Top Phase Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1E2230]">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#07070B] border border-[#1E2230]">
                        {getStepIcon(step.icon)}
                      </div>
                      <span className="text-xs font-mono-tag font-bold text-cyan-400">
                        {step.number}
                      </span>
                    </div>
                    <Badge variant={isSelected ? "cyan" : "slate"} size="xs">
                      {step.duration}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Concrete Deliverables */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-mono-tag uppercase tracking-wider text-slate-500 font-semibold">
                      Key Deliverables
                    </div>
                    {step.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Cadence Status */}
                <div className="pt-3 border-t border-[#1E2230] flex items-center justify-between text-[11px] font-mono-tag text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Phase Timeline
                  </span>
                  <span className="text-slate-300 font-medium">{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
