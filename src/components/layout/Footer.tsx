import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { BRAND, NAV_LINKS, FOOTER_SERVICES, SOCIAL_LINKS } from "@/utilities/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "Twitter":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "GitHub":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case "YouTube":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-navy text-white pt-16 sm:pt-20 pb-12 border-t border-navy-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-navy-muted/30">
          {/* Col 1: Brand & Introduction (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="dark" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {BRAND.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-navy-dark/70 border border-navy-muted/60 p-3 rounded-xl max-w-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-brand flex-shrink-0" />
              <span>Enterprise-Grade Security • SOC2 & ISO 27001 Posture</span>
            </div>

            {/* Social Media Placeholders */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 font-mono">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-navy-dark border border-navy-muted/60 flex items-center justify-center text-slate-300 hover:text-cyan-brand hover:border-cyan-brand/50 hover:shadow-cyan transition-all"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono text-cyan-light">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono text-cyan-light">
              Our Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="hover:text-cyan-brand transition-colors inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information Placeholders (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono text-cyan-light">
              Contact Desk
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Direct Inquiry</span>
                  <a
                    href={`mailto:${BRAND.contactEmail}`}
                    className="text-white hover:text-cyan-brand transition-colors font-medium break-all"
                  >
                    {BRAND.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Toll-Free Phone</span>
                  <span className="text-white font-medium">{BRAND.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Headquarters</span>
                  <span className="text-xs text-slate-300 leading-relaxed block">{BRAND.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Operating Hours</span>
                  <span className="text-xs text-slate-300">Mon - Fri: 8:00 AM - 6:00 PM PST</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {BRAND.legalName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-navy-muted">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <span className="text-navy-muted">•</span>
            <Link href="/security" className="hover:text-white transition-colors">
              Security Protocol
            </Link>
            <span className="text-navy-muted">•</span>
            <span className="text-cyan-brand font-mono font-medium">Phase 2 Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
