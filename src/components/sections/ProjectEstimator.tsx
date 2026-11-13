"use client";

import React, { useState } from "react";
import { 
  Check, 
  Calculator, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  RefreshCw 
} from "lucide-react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Badge } from "@/components/ui/Badge";
import confetti from "canvas-confetti";

interface ServiceOption {
  id: string;
  name: string;
  baseCost: number;
  weeks: number;
  badge: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "saas", name: "Custom Web & SaaS Platform", baseCost: 22000, weeks: 8, badge: "Full-Stack Distributed" },
  { id: "ai", name: "Autonomous AI Agents & Swarms", baseCost: 24000, weeks: 6, badge: "Multi-Agent & RAG" },
  { id: "mobile", name: "Mobile App (iOS & Android)", baseCost: 18000, weeks: 8, badge: "Offline-First & Native" },
  { id: "design", name: "UI/UX Design System & Tokens", baseCost: 9000, weeks: 3, badge: "Figma to Code" },
  { id: "cloud", name: "Cloud Infrastructure & IaC", baseCost: 12000, weeks: 4, badge: "Kubernetes & Multi-Region" },
];

export const ProjectEstimator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(["saas", "ai"]);
  const [tier, setTier] = useState<"mvp" | "growth" | "enterprise">("growth");
  const [budgetRange, setBudgetRange] = useState<string>("50k-100k");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Dynamic estimate calculations
  const tierMultipliers = {
    mvp: 0.85,
    growth: 1.15,
    enterprise: 1.6,
  };

  const calculateEstimate = () => {
    const rawCost = selectedServices.reduce((sum, sId) => {
      const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
      return sum + (s?.baseCost || 0);
    }, 0);

    const adjustedCost = Math.round(rawCost * tierMultipliers[tier]);
    const lowRange = Math.round(adjustedCost * 0.9);
    const highRange = Math.round(adjustedCost * 1.25);

    const maxWeeks = selectedServices.reduce((max, sId) => {
      const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
      return Math.max(max, s?.weeks || 4);
    }, 4);

    const adjustedWeeks = tier === "enterprise" ? maxWeeks + 4 : tier === "growth" ? maxWeeks + 2 : maxWeeks;

    return {
      low: lowRange,
      high: highRange,
      weeks: adjustedWeeks,
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `HADV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#38BDF8", "#06B6D4", "#3B82F6", "#10B981"],
        });
      } catch {
        // Fallback gracefully
      }
    }, 800);
  };

  return (
    <section id="estimator" className="relative py-28 bg-[#07070B] overflow-hidden">
      {/* Background glow and subtle cyber grid */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            TRANSPARENT ENGINEERING SCOPE
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Interactive Project Estimator &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Technical Consultation
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Select your architectural requirements to generate real-time timeline and investment projections,
            then connect directly with our engineering architects.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): The Interactive Estimator & Contact Inputs */}
          <div className="lg:col-span-8 bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {isSubmitted ? (
              /* Instant Confirmation View */
              <div className="py-10 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <Badge variant="emerald" size="sm" dot>
                    INQUIRY TRANSMITTED // ACKNOWLEDGED
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
                    Architectural Brief Received
                  </h3>
                  <p className="text-sm text-[#94A3B8] max-w-lg mx-auto">
                    Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our senior technical leadership has been dispatched to review your requirements.
                  </p>
                </div>

                {/* Confirmation Details Card */}
                <div className="max-w-md mx-auto p-4 rounded-xl bg-[#07070B] border border-[#1E2230] font-mono-tag text-xs text-left space-y-2.5">
                  <div className="flex justify-between pb-2 border-b border-[#1E2230]">
                    <span className="text-slate-500">Inquiry ID:</span>
                    <span className="text-cyan-400 font-bold">{inquiryId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Scale:</span>
                    <span className="text-slate-300 uppercase">{tier} Architecture</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Timeline:</span>
                    <span className="text-slate-300">{estimate.weeks} Sprints ({estimate.weeks * 1} Weeks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investment Range:</span>
                    <span className="text-emerald-400 font-bold">
                      ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#1E2230]">
                    <span className="text-slate-500">SLA Response Time:</span>
                    <span className="text-cyan-400">&lt; 4 Hours (Business Hours)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <GlowingButton
                    variant="primary"
                    size="md"
                    href="mailto:hello@handvancetechnologies.com?subject=Inquiry Follow-up "
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Direct Calendar Sync
                  </GlowingButton>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", company: "", details: "" });
                    }}
                    className="px-4 py-2 text-xs font-mono-tag text-slate-400 hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Start New Estimate
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Select Services */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-mono-tag flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 inline-flex items-center justify-center text-[10px]">
                        1
                      </span>
                      Select Core Architectural Capabilities
                    </label>
                    <span className="text-[11px] text-[#94A3B8] font-mono-tag">
                      {selectedServices.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map((service) => {
                      const isChecked = selectedServices.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${
                            isChecked
                              ? "bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                              : "bg-[#07070B] border-[#1E2230] hover:border-slate-700"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-[#F8FAFC]">
                              {service.name}
                            </div>
                            <div className="text-[10px] text-cyan-400 font-mono-tag">
                              {service.badge}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-cyan-500 text-black shadow-[0_0_8px_#06B6D4]"
                                : "bg-[#0E1017] border border-[#1E2230]"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: System Scale / Tier */}
                <div>
                  <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-mono-tag flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 inline-flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Deployment Scale & Complexity Tier
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "mvp",
                        label: "Prototype / MVP",
                        desc: "Seed-stage velocity, core architecture, rapid product validation.",
                      },
                      {
                        id: "growth",
                        label: "Growth Scale",
                        desc: "Multi-tenant, high concurrency, automated CI/CD, SOC2 posture.",
                      },
                      {
                        id: "enterprise",
                        label: "Enterprise Core",
                        desc: "Multi-region failover, custom SLA, strict air-gapped security.",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setTier(item.id as "mvp" | "growth" | "enterprise")}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                          tier === item.id
                            ? "bg-gradient-to-b from-blue-950/40 to-cyan-950/40 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            : "bg-[#07070B] border-[#1E2230] hover:border-slate-700"
                        }`}
                      >
                        <div className="text-sm font-bold text-[#F8FAFC] mb-1">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#94A3B8] leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: Budget Range Expectation */}
                <div>
                  <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-mono-tag flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 inline-flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Budget Allocation Guidance
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "25k-50k", label: "$25k - $50k" },
                      { id: "50k-100k", label: "$50k - $100k" },
                      { id: "100k-200k", label: "$100k - $200k" },
                      { id: "200k+", label: "$200k+ Custom" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudgetRange(b.id)}
                        className={`py-2 px-3 rounded-lg text-xs font-mono-tag font-semibold transition-all cursor-pointer ${
                          budgetRange === b.id
                            ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                            : "bg-[#07070B] border border-[#1E2230] text-[#94A3B8] hover:text-[#F8FAFC]"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Contact & Project Brief */}
                <div className="pt-4 border-t border-[#1E2230] space-y-4">
                  <label className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-mono-tag flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 inline-flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Engineering Brief & Point of Contact
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1 font-mono-tag">
                        YOUR NAME *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07070B] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1 font-mono-tag">
                        WORK EMAIL *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07070B] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-1 font-mono-tag">
                      ORGANIZATION / PROJECT NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Omni Corp or Stealth Seed"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07070B] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-1 font-mono-tag">
                      HIGH-LEVEL TECHNICAL OBJECTIVES
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Outline any key technical milestones, expected throughput, target integrations, or current bottlenecks..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07070B] border border-[#1E2230] text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono-tag">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Mutual NDA Protected • 4hr Response SLA</span>
                    </div>

                    <GlowingButton
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Processing Architecture Spec..." : "Submit Project Inquiry"}
                    </GlowingButton>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (4 cols): Dynamic Sticky Projection Summary Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="rounded-2xl bg-[#0E1017] border border-[#1E2230] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2230]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] font-mono-tag">
                    Live Scope Calculation
                  </span>
                </div>
                <Badge variant="cyan" size="xs" dot>
                  CALCULATED
                </Badge>
              </div>

              {/* Investment Range Display */}
              <div className="mb-6 space-y-1">
                <span className="text-xs text-[#94A3B8] font-mono-tag">
                  Estimated Investment Band
                </span>
                <div className="text-3xl font-extrabold text-[#F8FAFC] font-mono-tag text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500">
                  Reflects {selectedServices.length} selected modules at {tier.toUpperCase()} enterprise tier.
                </p>
              </div>

              {/* Delivery Timeline Indicator */}
              <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] mb-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tag">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Sprint Timeline
                  </span>
                  <span className="text-cyan-300 font-bold">~{estimate.weeks} Weeks</span>
                </div>
                <div className="w-full bg-[#1E2230] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (estimate.weeks / 16) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono-tag">
                  <span>Kickoff: Immediate</span>
                  <span>Deliverables: Bi-Weekly</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2 mb-6 text-xs text-slate-300">
                <div className="text-[10px] uppercase font-mono-tag tracking-wider text-slate-500 font-semibold mb-1">
                  Guaranteed Deliverables
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full IP & Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Automated CI/CD & Cloud Staging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>30-Day Post-Launch SLA Support</span>
                </div>
              </div>

              {/* Direct Email Link */}
              <div className="pt-4 border-t border-[#1E2230] text-center">
                <p className="text-xs text-[#94A3B8]">
                  Prefer direct technical consultation?
                </p>
                <a
                  href="mailto:hello@handvancetechnologies.com"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono-tag font-semibold block mt-1 transition-colors"
                >
                  hello@handvancetechnologies.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
