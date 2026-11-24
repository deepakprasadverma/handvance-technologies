"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, BRAND } from "@/utilities/constants";
import { useScroll } from "@/hooks/useScroll";

export const Navbar: React.FC = () => {
  const { isScrolled } = useScroll(15);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change or escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-lightGrey-border py-3.5"
            : "bg-white border-b border-lightGrey-border/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <Logo />

            {/* Desktop Navigation Links (Home, About, Services, Portfolio, Team, Contact) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? "text-navy bg-lightGrey font-bold"
                        : "text-slate-600 hover:text-navy hover:bg-lightGrey-subtle"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-cyan-brand rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Prominent Desktop "Get a Quote" Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="cyan"
                size="md"
                href="/contact?intent=quote"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md hover:shadow-cyan"
              >
                Get a Quote
              </Button>
            </div>

            {/* Tablet & Mobile Right Action & Hamburger */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Button
                variant="cyan"
                size="sm"
                href="/contact?intent=quote"
                className="hidden sm:inline-flex text-xs"
              >
                Get a Quote
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-navy hover:bg-lightGrey focus:outline-none transition-colors border border-lightGrey-border"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-navy" /> : <Menu className="w-5 h-5 text-navy" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Collapsible Navigation Drawer with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-navy/50 backdrop-blur-sm"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative top-[69px] w-full bg-white border-b border-lightGrey-border shadow-2xl p-6 sm:p-8 space-y-6 max-h-[calc(100vh-75px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-lightGrey-border">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Navigation Menu
                </span>
                <span className="text-xs text-cyan-dark font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-brand" /> {BRAND.shortName}
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-lightGrey text-navy font-bold border-l-4 border-cyan-brand"
                          : "text-slate-700 hover:bg-lightGrey-subtle hover:text-navy"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </nav>

              {/* Prominent Mobile "Get a Quote" Action */}
              <div className="pt-4 border-t border-lightGrey-border space-y-4">
                <Button
                  variant="cyan"
                  size="lg"
                  href="/contact?intent=quote"
                  className="w-full justify-center shadow-md font-bold text-base"
                  onClick={() => setMobileMenuOpen(false)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Get a Quote
                </Button>

                <div className="text-center text-xs text-slate-500 space-y-1">
                  <div>Direct Desk: <span className="text-navy font-semibold">{BRAND.contactEmail}</span></div>
                  <div>Phone: <span className="text-navy font-semibold">{BRAND.phone}</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
