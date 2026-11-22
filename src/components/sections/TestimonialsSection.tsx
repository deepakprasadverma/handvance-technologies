"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { Badge } from "@/components/ui/Badge";
import { Quote, ShieldCheck, Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const enterprisePartners = [
    "NexusMesh Cloud",
    "Aetheria FinTech",
    "Vanguard Medical",
    "Strata Robotics",
    "OmniAgent Labs",
    "HyperScale Core",
  ];

  return (
    <section id="testimonials" className="relative py-28 bg-[#07070B] overflow-hidden border-t border-[#1E2230]/50">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="emerald" size="sm" dot>
            VERIFIED OUTCOMES
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Trusted by CTOs &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Founding Engineers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Here is how leading enterprise technical teams scale their velocity, cut infrastructure latency,
            and deploy autonomous AI systems with Handvance.
          </p>
        </div>

        {/* Enterprise Logos Marquee Banner */}
        <div className="mb-16 p-4 rounded-2xl bg-[#0E1017]/60 border border-[#1E2230] backdrop-blur-sm">
          <div className="text-[11px] font-mono-tag text-slate-500 uppercase tracking-widest text-center mb-3">
            Engineered Systems Trusted Across Regulated Sectors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 font-mono-tag text-xs sm:text-sm">
            {enterprisePartners.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
                <span className="font-semibold">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] p-7 sm:p-8 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Industry Badge & Metric */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Badge variant="cyan" size="xs">
                    {item.industry}
                  </Badge>
                  <div className="p-2.5 rounded-xl bg-[#07070B] border border-[#1E2230] text-center">
                    <div className="text-lg font-extrabold text-cyan-300 font-mono-tag">
                      {item.metric.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono-tag">
                      {item.metric.label}
                    </div>
                  </div>
                </div>

                {/* Quote Icon & Body */}
                <Quote className="w-6 h-6 text-cyan-500/40 mb-3" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Tech Info */}
              <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    {item.role} • <span className="text-slate-400 font-medium">{item.company}</span>
                  </div>
                </div>

                <Badge variant="slate" size="xs">
                  {item.highlightTech}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8] font-mono-tag">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict NDA Enforcement</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>100% On-Time Sprint Delivery SLA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Zero Third-Party Code Contamination</span>
          </div>
        </div>
      </div>
    </section>
  );
};
