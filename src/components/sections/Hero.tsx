"use client";

import React from "react";
import { ArrowRight, Sparkles, Code2, ShieldCheck, ChevronRight } from "lucide-react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalCard } from "@/components/ui/TerminalCard";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-[#07070B]">
      {/* Background radial spotlight & cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-radial from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1017] border border-[#1E2230] text-xs font-mono-tag">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[#F8FAFC] font-semibold">Next-Gen Software & AI Studio</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400">Accepting Q1/Q2 Projects</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.12]">
              Engineering Scalable Software &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                Intelligent Systems
              </span>
            </h1>

            {/* Tailored Subheadline for Handvance Technologies */}
            <p className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl leading-relaxed font-normal">
              Handvance Technologies partners with ambitious enterprises and fast-growth tech companies
              to architect resilient cloud platforms, autonomous AI agent pipelines, and high-velocity
              digital products engineered for zero downtime.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GlowingButton
                variant="primary"
                size="lg"
                href="#estimator"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </GlowingButton>

              <GlowingButton
                variant="secondary"
                size="lg"
                href="#services"
                icon={<ChevronRight className="w-4 h-4 text-cyan-400" />}
              >
                View Capabilities
              </GlowingButton>
            </div>

            {/* Trust and Key Capability Badges */}
            <div className="pt-6 border-t border-[#1E2230]/70 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[#94A3B8] font-mono-tag">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Enterprise SOC2 & HIPAA Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Multi-Agent Swarm Architectures</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>100% Strict Type-Safety</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Interactive Terminal Preview Card */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backlight for Terminal */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

            <TerminalCard />

            {/* Floating Metric Callout Pill */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-[#0E1017]/95 border border-[#1E2230] p-3 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 font-bold text-sm">
                ⚡
              </div>
              <div>
                <div className="text-xs font-bold text-[#F8FAFC] font-mono-tag">
                  14ms P99 Latency
                </div>
                <div className="text-[10px] text-[#94A3B8]">
                  Distributed Vector Inference
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
