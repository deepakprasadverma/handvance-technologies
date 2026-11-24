import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { BRAND, NAV_LINKS } from "@/utilities/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-navy-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-muted/30">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {BRAND.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-brand" />
              <span>Modern • Scalable • Enterprise-Ready Architectures</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Focus Areas */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              IT Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <span className="hover:text-cyan-brand transition-colors cursor-pointer">
                  Custom Software Engineering
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-brand transition-colors cursor-pointer">
                  Cloud Architecture & DevOps
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-brand transition-colors cursor-pointer">
                  AI & Intelligent Automation
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-brand transition-colors cursor-pointer">
                  Mobile Application Systems
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-brand transition-colors cursor-pointer">
                  UI/UX Product Engineering
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Desk */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BRAND.contactEmail}`}
                  className="text-cyan-light hover:underline text-xs break-all"
                >
                  {BRAND.contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <span className="text-xs">{BRAND.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <span className="text-xs">{BRAND.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {BRAND.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-navy-muted">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-navy-muted">•</span>
            <span className="text-cyan-brand font-medium">Phase 1 Setup Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
