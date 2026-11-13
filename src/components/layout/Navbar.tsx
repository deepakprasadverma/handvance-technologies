"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Calendar, PhoneCall, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Modal } from "@/components/ui/Modal";

interface NavbarProps {
  onOpenDiscovery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiscovery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Process", href: "#process" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Estimator", href: "#estimator" },
  ];

  const handleOpenDiscovery = () => {
    if (onOpenDiscovery) {
      onOpenDiscovery();
    } else {
      setIsDiscoveryOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#07070B]/90 backdrop-blur-md border-b border-[#1E2230] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-[#07070B]/60 backdrop-blur-sm border-b border-[#1E2230]/40 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="group flex items-center">
              <Logo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#0E1017]/80 border border-[#1E2230] px-3 py-1.5 rounded-full shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2230]/60 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <GlowingButton
                variant="primary"
                size="sm"
                onClick={handleOpenDiscovery}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Book a Discovery Call
              </GlowingButton>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-[#0E1017] border border-[#1E2230] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-cyan-500/50 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[69px] left-0 right-0 z-30 bg-[#07070B]/95 backdrop-blur-xl border-b border-[#1E2230] px-4 py-6 md:hidden shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0E1017] border border-transparent hover:border-[#1E2230] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#1E2230]">
                <GlowingButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenDiscovery();
                  }}
                  className="w-full"
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Book a Discovery Call
                </GlowingButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discovery Call Booking Modal */}
      <Modal
        isOpen={isDiscoveryOpen}
        onClose={() => {
          setIsDiscoveryOpen(false);
          setSubmitted(false);
        }}
        title="Schedule an Engineering Discovery Session"
        subtitle="Speak directly with a Senior Technical Architect to map out your software & AI requirements."
        maxWidth="md"
      >
        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-[#F8FAFC]">Discovery Call Requested!</h4>
            <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
              Our engineering leadership will review your requirements and follow up within 4 hours with available calendar slots.
            </p>
            <div className="pt-2">
              <GlowingButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIsDiscoveryOpen(false);
                  setSubmitted(false);
                }}
              >
                Close Window
              </GlowingButton>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 font-mono-tag">
                FULL NAME *
              </label>
              <input
                required
                type="text"
                placeholder="Sarah Chen"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 font-mono-tag">
                WORK EMAIL *
              </label>
              <input
                required
                type="email"
                placeholder="sarah@enterprise.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 font-mono-tag">
                  COMPANY / ORG
                </label>
                <input
                  type="text"
                  placeholder="Acme Robotics"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 font-mono-tag">
                  TARGET TIMELINE
                </label>
                <select
                  aria-label="Target Timeline"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-[#F8FAFC] focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                >
                  <option value="immediate">Immediate (Next 30 Days)</option>
                  <option value="q1">Within 1-3 Months</option>
                  <option value="exploratory">Exploratory / Architectural R&D</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 font-mono-tag">
                SYSTEM REQUIREMENTS / CHALLENGE SUMMARY
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you're looking to build (e.g., Autonomous multi-agent pipeline, distributed SaaS platform rewrite, high-throughput mobile app)..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#090A0F] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 font-mono-tag">
                <PhoneCall className="w-3 h-3 text-cyan-400" /> Direct NDA Protected Call
              </span>
              <GlowingButton variant="primary" size="md" type="submit">
                Confirm & Request Session
              </GlowingButton>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
