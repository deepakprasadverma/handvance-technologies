import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { BRAND, NAV_LINKS, FOOTER_SERVICES, SOCIAL_LINKS } from "@/utilities/constants";
import { Logo } from "@/components/common/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
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
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Ingestion Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-dark/90 border border-navy-muted/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-brand font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-brand" />
              <span>Engineering Dispatch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay Ahead of Cloud &amp; AI Architecture Shifts
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive our monthly engineering case studies, architecture blueprints, and systems performance reports. No spam, ever.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <NewsletterForm />
          </div>
        </div>

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
              <span>Enterprise-Grade Security • SOC2 &amp; ISO 27001 Posture</span>
            </div>

            {/* Social Media */}
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

          {/* Col 4: Contact Information (3 cols) */}
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
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
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
            <span className="text-cyan-brand font-mono font-medium">Enterprise Cloud Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
