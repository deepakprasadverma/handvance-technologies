"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, BRAND } from "@/utilities/constants";
import { useScroll } from "@/hooks/useScroll";

export const Navbar: React.FC = () => {
  const { isScrolled } = useScroll(15);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-navy hover:text-cyan-dark hover:bg-lightGrey rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="cyan"
                size="sm"
                href="/contact"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-navy hover:bg-lightGrey focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm md:hidden pt-20">
          <div className="bg-white border-b border-lightGrey-border p-6 shadow-xl space-y-4">
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-base font-semibold text-navy hover:bg-lightGrey hover:text-cyan-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-lightGrey-border space-y-3">
              <Button
                variant="cyan"
                size="md"
                href="/contact"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get in Touch
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                <Phone className="w-3.5 h-3.5 text-cyan-brand" />
                <span>{BRAND.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
