"use client";

import React, { useState } from "react";
import { TECH_CATEGORIES } from "@/data/techStack";
import { Badge } from "@/components/ui/Badge";
import { 
  Globe, 
  Code2, 
  Palette, 
  Sparkles, 
  Smartphone, 
  Box, 
  Bot, 
  Cpu, 
  Database, 
  Zap, 
  Search, 
  BrainCircuit, 
  Terminal, 
  Server, 
  HardDrive, 
  Share2, 
  Layers, 
  Shield, 
  Boxes, 
  FileCode, 
  Cloud, 
  Activity, 
  GitBranch 
} from "lucide-react";

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getTechIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "Globe": return <Globe {...props} />;
      case "Code2": return <Code2 {...props} />;
      case "Palette": return <Palette {...props} />;
      case "Sparkles": return <Sparkles {...props} />;
      case "Smartphone": return <Smartphone {...props} />;
      case "Box": return <Box {...props} />;
      case "Bot": return <Bot {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "Database": return <Database {...props} />;
      case "Zap": return <Zap {...props} />;
      case "Search": return <Search {...props} />;
      case "BrainCircuit": return <BrainCircuit {...props} />;
      case "Terminal": return <Terminal {...props} />;
      case "Server": return <Server {...props} />;
      case "HardDrive": return <HardDrive {...props} />;
      case "Share2": return <Share2 {...props} />;
      case "Layers": return <Layers {...props} />;
      case "Shield": return <Shield {...props} />;
      case "Boxes": return <Boxes {...props} />;
      case "FileCode": return <FileCode {...props} />;
      case "Cloud": return <Cloud {...props} />;
      case "Activity": return <Activity {...props} />;
      case "GitBranch": return <GitBranch {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="tech-stack" className="relative py-28 bg-[#07070B] overflow-hidden border-t border-[#1E2230]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            FOUNDATIONAL TECHNOLOGY
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Our Enterprise{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Technology Stack
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            We intentionally choose tools that offer long-term maintainability, zero-compromise type safety,
            and proven resilience under heavy production load.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {TECH_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 font-mono-tag cursor-pointer ${
                activeCategory === idx
                  ? "bg-[#0E1017] border border-cyan-400/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "bg-[#0E1017]/50 border border-[#1E2230] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-slate-700"
              }`}
            >
              {cat.title.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Selected Category Details & Grid */}
        <div className="rounded-2xl bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1E2230]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan" size="xs">
                  {TECH_CATEGORIES[activeCategory].badge}
                </Badge>
                <span className="text-xs text-slate-500 font-mono-tag">Domain Stack Radar</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F8FAFC]">
                {TECH_CATEGORIES[activeCategory].title}
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md">
              {TECH_CATEGORIES[activeCategory].description}
            </p>
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_CATEGORIES[activeCategory].items.map((item) => (
              <div
                key={item.name}
                className="group p-4 rounded-xl bg-[#07070B] border border-[#1E2230] hover:border-cyan-500/40 hover:bg-[#0B0D14] transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg bg-[#0E1017] border border-[#1E2230] text-slate-300 group-hover:text-cyan-400 transition-colors"
                    style={{ color: item.color }}
                  >
                    {getTechIcon(item.iconName)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#94A3B8] font-mono-tag">
                      {item.level}
                    </div>
                  </div>
                </div>

                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:scale-125 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
