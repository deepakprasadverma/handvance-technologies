"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Terminal, 
  Globe, 
  Layers, 
  Calendar, 
  Calculator, 
  Mail, 
  ArrowRight, 
  X, 
  Check,
  TrendingUp,
  Cpu
} from "lucide-react";
import { Badge } from "./Badge";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiscovery: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenDiscovery,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const commandItems = [
    {
      id: "services",
      title: "Explore Core Capabilities & Bento Grid",
      category: "Navigation",
      href: "#services",
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      badge: "Services",
    },
    {
      id: "playground",
      title: "Launch Interactive AI Architecture Playground",
      category: "Interactive",
      href: "#playground",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      badge: "Simulator",
    },
    {
      id: "solutions",
      title: "Review Case Studies & Quantitative Metrics",
      category: "Case Studies",
      href: "#solutions",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      badge: "Impact",
    },
    {
      id: "process",
      title: "Inspect 4-Step Engineering Protocol",
      category: "Methodology",
      href: "#process",
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      badge: "Sprints",
    },
    {
      id: "tech-stack",
      title: "View Enterprise Tech Stack Radar",
      category: "Architecture",
      href: "#tech-stack",
      icon: <Globe className="w-4 h-4 text-purple-400" />,
      badge: "Radar",
    },
    {
      id: "testimonials",
      title: "Read CTO & Engineering Lead Testimonials",
      category: "Social Proof",
      href: "#testimonials",
      icon: <TrendingUp className="w-4 h-4 text-cyan-300" />,
      badge: "Trust",
    },
    {
      id: "estimator",
      title: "Calculate Project Scope & Investment Band",
      category: "Tools",
      href: "#estimator",
      icon: <Calculator className="w-4 h-4 text-amber-400" />,
      badge: "Estimator",
    },
    {
      id: "discovery",
      title: "Schedule an Engineering Discovery Session",
      category: "Direct Action",
      action: () => {
        onClose();
        onOpenDiscovery();
      },
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
      badge: "NDA Call",
    },
    {
      id: "copy-email",
      title: "Copy Direct Email (hello@handvancetechnologies.com)",
      category: "Contact",
      action: () => {
        navigator.clipboard.writeText("hello@handvancetechnologies.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
      badge: copiedEmail ? "Copied!" : "Clipboard",
    },
    {
      id: "github",
      title: "Inspect Repository Source Code on GitHub",
      category: "Open Source",
      action: () => {
        window.open("https://github.com/deepakprasadverma/handvance-technologies", "_blank");
      },
      icon: (
        <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      badge: "External",
    },
  ];

  const filteredItems = commandItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: typeof commandItems[0]) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      onClose();
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery("");
          setSelectedIndex(0);
        }
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex, handleSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07070B]/85 backdrop-blur-md"
          />

          {/* Palette Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-[#0E1017] border border-[#1E2230] rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden z-10 font-sans"
          >
            {/* Top Search Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#1E2230] bg-[#090A0F]">
              <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search capabilities, case studies, or command shortcuts..."
                className="w-full bg-transparent text-sm text-[#F8FAFC] placeholder-slate-500 focus:outline-none font-mono-tag"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="ml-2 hidden sm:flex items-center gap-1 text-[10px] font-mono-tag text-slate-500 bg-[#141724] px-2 py-0.5 rounded border border-[#1E2230]">
                <span>ESC</span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No matching capabilities or commands found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#161B26] text-cyan-300 border border-cyan-500/30"
                          : "text-[#94A3B8] hover:bg-[#141724] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-[#07070B] border border-[#1E2230] ${isSelected ? "text-cyan-400" : ""}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm font-medium ${isSelected ? "text-[#F8FAFC]" : "text-slate-300"}`}>
                            {item.title}
                          </div>
                          <div className="text-[10px] font-mono-tag text-slate-500">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="cyan" size="xs">
                          {item.badge}
                        </Badge>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "translate-x-1 text-cyan-400" : "text-slate-600"}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#090A0F] border-t border-[#1E2230] text-[11px] font-mono-tag text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-cyan-400">Handvance Quick Command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
