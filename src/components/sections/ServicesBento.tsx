"use client";

import React from "react";
import { 
  Globe, 
  Bot, 
  Smartphone, 
  Palette, 
  ArrowUpRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  Activity
} from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import { Badge } from "@/components/ui/Badge";

export const ServicesBento: React.FC = () => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "web-saas":
        return <Globe className="w-6 h-6 text-cyan-400" />;
      case "ai-agents":
        return <Bot className="w-6 h-6 text-blue-400" />;
      case "mobile-apps":
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case "ui-ux":
        return <Palette className="w-6 h-6 text-indigo-400" />;
      default:
        return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#07070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            ENGINEERING CAPABILITIES
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Specialized Architectures for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              High-Growth Systems
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            From autonomous multi-agent swarms to enterprise SaaS platforms processing millions in volume,
            we engineer robust software products tailored to your operational scale.
          </p>
        </div>

        {/* Bento Grid: 4 Glassmorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Custom Web & SaaS Platforms (Span 7 on lg) */}
          <div
            className="lg:col-span-7 group relative rounded-2xl bg-[#0E1017]/85 backdrop-blur-md border border-[#1E2230] p-7 sm:p-8 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top gradient glow on hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-center group-hover:border-cyan-500/40 transition-colors shadow-inner">
                  {getServiceIcon("web-saas")}
                </div>
                <Badge variant="cyan" size="xs">
                  {SERVICES_DATA[0].badge}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-2">
                {SERVICES_DATA[0].title}
              </h3>
              <p className="text-sm text-cyan-400 font-mono-tag mb-3">
                {SERVICES_DATA[0].subtitle}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {SERVICES_DATA[0].description}
              </p>

              {/* Interactive Visual Preview: Architecture Pipeline */}
              <div className="p-4 rounded-xl bg-[#07070B] border border-[#1E2230] mb-6 font-mono-tag text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[#1E2230]">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Activity className="w-3.5 h-3.5" /> High-Concurrency Cluster
                  </span>
                  <span className="text-emerald-400 font-semibold">Live Traffic Flow</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">P99 Latency</div>
                    <div className="text-cyan-300 font-bold mt-0.5">18.4ms</div>
                  </div>
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Data Isolation</div>
                    <div className="text-indigo-300 font-bold mt-0.5">Row-Level RBAC</div>
                  </div>
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Availability</div>
                    <div className="text-emerald-300 font-bold mt-0.5">99.99% SLA</div>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-300">
                {SERVICES_DATA[0].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Tags */}
            <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {SERVICES_DATA[0].technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="slate" size="xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a
                href="#estimator"
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors font-mono-tag"
              >
                Estimate Platform <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: AI Agents & Automation (Span 5 on lg) */}
          <div
            className="lg:col-span-5 group relative rounded-2xl bg-[#0E1017]/85 backdrop-blur-md border border-[#1E2230] p-7 sm:p-8 hover:border-blue-500/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-center group-hover:border-blue-500/40 transition-colors shadow-inner">
                  {getServiceIcon("ai-agents")}
                </div>
                <Badge variant="indigo" size="xs" dot>
                  {SERVICES_DATA[1].badge}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-blue-300 transition-colors mb-2">
                {SERVICES_DATA[1].title}
              </h3>
              <p className="text-sm text-indigo-400 font-mono-tag mb-3">
                {SERVICES_DATA[1].subtitle}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {SERVICES_DATA[1].description}
              </p>

              {/* Visual Node Graph Snippet */}
              <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] mb-6 font-mono-tag text-xs space-y-2">
                <div className="text-slate-400 text-[11px] flex items-center justify-between">
                  <span className="text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Swarm Workflow
                  </span>
                  <span className="text-emerald-400 font-bold">4.8x Efficiency</span>
                </div>
                <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
                  <div className="p-1.5 rounded bg-[#0E1017] border border-[#1E2230] flex items-center justify-between">
                    <span>1. Intent & RAG Vector Parse</span>
                    <span className="text-cyan-400">pgvector</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#0E1017] border border-[#1E2230] flex items-center justify-between">
                    <span>2. Multi-Agent Reasoning Graph</span>
                    <span className="text-indigo-400">LangGraph</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#0E1017] border border-[#1E2230] flex items-center justify-between">
                    <span>3. Deterministic Validation & Action</span>
                    <span className="text-emerald-400">Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-300">
                {SERVICES_DATA[1].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {SERVICES_DATA[1].technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="indigo" size="xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a
                href="#estimator"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors font-mono-tag"
              >
                Explore AI <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Mobile App Development (Span 5 on lg) */}
          <div
            className="lg:col-span-5 group relative rounded-2xl bg-[#0E1017]/85 backdrop-blur-md border border-[#1E2230] p-7 sm:p-8 hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-center group-hover:border-emerald-500/40 transition-colors shadow-inner">
                  {getServiceIcon("mobile-apps")}
                </div>
                <Badge variant="emerald" size="xs">
                  {SERVICES_DATA[2].badge}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-emerald-300 transition-colors mb-2">
                {SERVICES_DATA[2].title}
              </h3>
              <p className="text-sm text-emerald-400 font-mono-tag mb-3">
                {SERVICES_DATA[2].subtitle}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {SERVICES_DATA[2].description}
              </p>

              {/* Mobile Spec Preview */}
              <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] mb-6 font-mono-tag text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[#1E2230]">
                  <span className="text-emerald-300">Device Edge Performance</span>
                  <span className="text-slate-300">&lt;180ms Launch</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Sync Protocol</div>
                    <div className="text-emerald-300 font-bold mt-0.5">CRDT Offline</div>
                  </div>
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Frame Rate</div>
                    <div className="text-cyan-300 font-bold mt-0.5">120 FPS Fluid</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-300">
                {SERVICES_DATA[2].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {SERVICES_DATA[2].technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="emerald" size="xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a
                href="#estimator"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors font-mono-tag"
              >
                Estimate App <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: UI/UX Product Engineering (Span 7 on lg) */}
          <div
            className="lg:col-span-7 group relative rounded-2xl bg-[#0E1017]/85 backdrop-blur-md border border-[#1E2230] p-7 sm:p-8 hover:border-indigo-500/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-center group-hover:border-indigo-500/40 transition-colors shadow-inner">
                  {getServiceIcon("ui-ux")}
                </div>
                <Badge variant="purple" size="xs">
                  {SERVICES_DATA[3].badge}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-indigo-300 transition-colors mb-2">
                {SERVICES_DATA[3].title}
              </h3>
              <p className="text-sm text-indigo-400 font-mono-tag mb-3">
                {SERVICES_DATA[3].subtitle}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {SERVICES_DATA[3].description}
              </p>

              {/* Design System Preview */}
              <div className="p-4 rounded-xl bg-[#07070B] border border-[#1E2230] mb-6 font-mono-tag text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[#1E2230]">
                  <span className="text-indigo-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" /> Tokenized Design Architecture
                  </span>
                  <span className="text-cyan-400 font-bold">+42% Completion</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Accessibility</div>
                    <div className="text-emerald-300 font-bold mt-0.5">WCAG 2.1 AAA</div>
                  </div>
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Tokens Synced</div>
                    <div className="text-cyan-300 font-bold mt-0.5">Figma ↔ Code</div>
                  </div>
                  <div className="p-2 rounded bg-[#0E1017] border border-[#1E2230]">
                    <div className="text-slate-500 text-[10px]">Motion Curve</div>
                    <div className="text-purple-300 font-bold mt-0.5">Hardware 60FPS</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-300">
                {SERVICES_DATA[3].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {SERVICES_DATA[3].technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="purple" size="xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a
                href="#estimator"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono-tag"
              >
                Design System Scope <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
