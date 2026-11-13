import React from "react";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#07070B] border-t border-[#1E2230] pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-t from-blue-900/10 via-cyan-950/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E2230]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              Handvance Technologies is a modern custom software and autonomous AI engineering agency.
              We partner with global tech leaders and fast-growing innovators to architect resilient,
              high-throughput digital systems.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Badge variant="emerald" size="sm" dot>
                ALL SYSTEMS OPERATIONAL
              </Badge>
              <span className="text-xs text-[#94A3B8] font-mono-tag">99.99% Core SLA</span>
            </div>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E1017] border border-[#1E2230] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E1017] border border-[#1E2230] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E1017] border border-[#1E2230] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column: Capabilities */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider font-mono-tag mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Custom Web & SaaS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Autonomous AI Agents
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  UI/UX Design Systems
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">
                  Cloud Infrastructure & IaC
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-cyan-400 transition-colors">
                  Enterprise Modernization
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Navigation & Resources */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider font-mono-tag mb-4">
              Architecture & Insights
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <a href="#solutions" className="hover:text-cyan-400 transition-colors">
                  Case Studies & Metrics
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-400 transition-colors">
                  4-Step Engineering Protocol
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">
                  Technical Stack Radar
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-400 transition-colors">
                  Project Scope Estimator
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-400 transition-colors">
                  Security & Compliance (SOC2)
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Contact & Direct Inquiries */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider font-mono-tag mb-4">
              Direct Engineering Desk
            </h4>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@handvancetechnologies.com"
                  className="text-cyan-300 hover:text-cyan-200 transition-colors font-mono-tag text-xs break-all"
                >
                  hello@handvancetechnologies.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs">
                  San Francisco, CA & Global Distributed Engineering
                </span>
              </div>
              <div className="pt-2">
                <div className="p-3 rounded-lg bg-[#0E1017] border border-[#1E2230] space-y-1">
                  <div className="text-[11px] font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Mutual NDA Guaranteed
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    All project discovery calls and code reviews operate under strict confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Handvance Technologies Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-mono-tag text-[11px]">
            <a href="#" className="hover:text-[#F8FAFC] transition-colors">
              Privacy Policy
            </a>
            <span className="text-[#1E2230]">|</span>
            <a href="#" className="hover:text-[#F8FAFC] transition-colors">
              Terms of Engagement
            </a>
            <span className="text-[#1E2230]">|</span>
            <a href="#services" className="hover:text-[#F8FAFC] transition-colors">
              System SLA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
