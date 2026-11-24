"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  FileText,
  FileCheck
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BRAND, SOCIAL_LINKS } from "@/utilities/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";

function ContactPageInner() {
  const searchParams = useSearchParams();
  const initialIntent = searchParams.get("intent") === "quote" ? "quote" : "contact";
  const initialService = searchParams.get("service") || "";

  const [activeTab, setActiveTab] = useState<"contact" | "quote">(initialIntent);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-lightGrey-border shadow-xs w-full max-w-md mx-auto sm:mx-0">
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "contact"
              ? "bg-navy text-cyan-brand shadow-sm"
              : "text-slate-600 hover:text-navy"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>General Consultation</span>
        </button>

        <button
          onClick={() => setActiveTab("quote")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "quote"
              ? "bg-navy text-cyan-brand shadow-sm"
              : "text-slate-600 hover:text-navy"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Project Quote Request</span>
        </button>
      </div>

      {/* Render Active Form */}
      {activeTab === "contact" ? (
        <ContactForm initialService={initialService} />
      ) : (
        <QuoteRequestForm initialService={initialService} />
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Direct Channel</span>
              <span>•</span>
              <span>Global Engineering Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Connect With Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Systems Architects
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Whether you are planning a greenfield software build, modernizing legacy infrastructure, or requesting a formal proposal, our engineering desk is ready.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form and Direct Contact Cards */}
      <section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-12 text-center bg-white rounded-3xl border border-lightGrey-border">
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-brand border-t-transparent animate-spin mx-auto" />
                    <p className="text-xs text-slate-500 mt-3 font-mono">Loading form...</p>
                  </div>
                }
              >
                <ContactPageInner />
              </Suspense>
            </div>

            {/* Direct Contact & Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Contact Details Card */}
              <div className="bg-navy rounded-3xl p-8 text-white space-y-6 shadow-xl border border-navy-muted/60">
                <h3 className="text-xl font-bold text-white border-b border-navy-muted/60 pb-3 font-mono">
                  Direct Contact Desk
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Mail className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Email Address</div>
                      <a
                        href={`mailto:${BRAND.contactEmail}`}
                        className="text-sm font-bold text-white hover:text-cyan-brand transition-colors"
                      >
                        {BRAND.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Phone className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Direct Phone</div>
                      <a
                        href={`tel:${BRAND.phone}`}
                        className="text-sm font-bold text-white hover:text-cyan-brand transition-colors"
                      >
                        {BRAND.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <MapPin className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Headquarters</div>
                      <div className="text-sm text-slate-200 leading-snug">
                        {BRAND.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Clock className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Operating Hours</div>
                      <div className="text-sm text-slate-200">
                        Monday – Friday • 8:00 AM – 6:00 PM PST
                      </div>
                      <div className="text-[11px] text-cyan-brand mt-0.5">
                        24/7 Priority SLA for Managed Clients
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-navy-muted/60">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Verified Digital Channels
                  </div>
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-navy-dark border border-navy-muted/60 text-xs font-mono text-slate-300 hover:text-cyan-brand hover:border-cyan-brand/50 transition-all"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Guarantee Card */}
              <div className="p-6 rounded-2xl bg-white border border-lightGrey-border space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-navy font-bold text-sm">
                  <FileCheck className="w-4 h-4 text-cyan-brand" />
                  <span>The Handvance Discovery Guarantee</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We guarantee an initial technical review within 24 business hours. If requested, an executive non-disclosure agreement (NDA) will be executed prior to discussing proprietary architecture.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
