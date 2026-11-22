"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlowingButton } from "@/components/ui/GlowingButton";

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState(15);
  const [ticketVolume, setTicketVolume] = useState(1200);
  const [cloudSpend, setCloudSpend] = useState(25000);

  // ROI calculations
  // Hours saved: automation eliminates ~3.5 hours per 10 tickets + 18 hours/dev/month on boilerplate/CI
  const engineeringHoursSavedAnnual = Math.round(
    (ticketVolume * 0.35 * 12) + (teamSize * 18 * 12)
  );

  // Cloud savings: ~28% reduction in over-provisioned cluster spend via autoscaling & optimization
  const cloudSavingsAnnual = Math.round(cloudSpend * 12 * 0.28);

  // Total value: assuming $95/hr fully burdened engineer rate
  const laborValueAnnual = engineeringHoursSavedAnnual * 95;
  const totalNetValueAnnual = laborValueAnnual + cloudSavingsAnnual;

  // Payback period in months (assuming Handvance deployment engagement ~$60k)
  const estimatedInvestment = 60000;
  const paybackMonths = Math.max(1.2, Number((estimatedInvestment / (totalNetValueAnnual / 12)).toFixed(1)));

  return (
    <section className="relative py-28 bg-[#07070B] overflow-hidden border-t border-[#1E2230]/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            ECONOMIC PROJECTION
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Enterprise ROI &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Velocity Calculator
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Estimate the quantified business upside and engineering hours reclaimed when automating workflows
            and hardening cloud architectures with Handvance Technologies.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] rounded-2xl p-6 sm:p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2230]">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  Model Your Operational Parameters
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono-tag">Dynamic Projection</span>
            </div>

            {/* Slider 1: Team Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tag">
                <span className="text-slate-300">Internal Engineering Team Size</span>
                <span className="text-cyan-400 font-bold text-sm bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40">
                  {teamSize} Engineers
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-[#1E2230] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-tag">
                <span>5 Engineers (Seed)</span>
                <span>50 Engineers</span>
                <span>100+ Engineers (Scale)</span>
              </div>
            </div>

            {/* Slider 2: Monthly Ticket / Alert Volume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tag">
                <span className="text-slate-300">Monthly Incident & Alert Volume</span>
                <span className="text-indigo-400 font-bold text-sm bg-indigo-950/40 px-2.5 py-0.5 rounded border border-indigo-800/40">
                  {ticketVolume.toLocaleString()} Events/mo
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={10000}
                step={100}
                value={ticketVolume}
                onChange={e => setTicketVolume(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-[#1E2230] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-tag">
                <span>200 Events</span>
                <span>5,000 Events</span>
                <span>10,000+ Events</span>
              </div>
            </div>

            {/* Slider 3: Cloud Infrastructure Spend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tag">
                <span className="text-slate-300">Current Monthly Cloud Infrastructure Spend</span>
                <span className="text-emerald-400 font-bold text-sm bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                  ${cloudSpend.toLocaleString()}/mo
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={2500}
                value={cloudSpend}
                onChange={e => setCloudSpend(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-[#1E2230] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-tag">
                <span>$5,000/mo</span>
                <span>$75,000/mo</span>
                <span>$150,000+/mo</span>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-start gap-2.5 text-xs text-[#94A3B8]">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Calculations based on verified empirical outcomes across Handvance client deployments.
                Assumes a conservative $95/hr fully loaded engineering rate.
              </span>
            </div>
          </div>

          {/* Results Summary Display (5 cols) */}
          <div className="lg:col-span-5 bg-[#0E1017] border border-[#1E2230] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1E2230]">
                <Badge variant="cyan" size="xs" dot>
                  ANNUAL IMPACT
                </Badge>
                <span className="text-xs text-slate-500 font-mono-tag">ROI Projection</span>
              </div>

              {/* Total Economic Value Headline */}
              <div className="mb-6">
                <span className="text-xs text-slate-400 font-mono-tag">
                  Estimated Total Annual Economic Value
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-tag text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 mt-1">
                  ${totalNetValueAnnual.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Reclaimed engineering capacity + cloud infrastructure spend reduction.
                </p>
              </div>

              {/* Key Metrics Breakdown */}
              <div className="space-y-3 font-mono-tag text-xs mb-8">
                <div className="p-3 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Engineering Hours Reclaimed:
                  </span>
                  <span className="text-cyan-300 font-bold">
                    {engineeringHoursSavedAnnual.toLocaleString()} hrs/yr
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Direct Cloud Spend Saved:
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ${cloudSavingsAnnual.toLocaleString()}/yr
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Estimated Payback Period:
                  </span>
                  <span className="text-amber-400 font-bold">
                    ~{paybackMonths} Months
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Direct Action */}
            <div className="pt-4 border-t border-[#1E2230] space-y-3">
              <GlowingButton
                variant="primary"
                size="md"
                href="#estimator"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                Engineer Your Custom Scope
              </GlowingButton>
              <div className="text-center text-[10px] text-slate-500 font-mono-tag">
                Includes 30-day Post-Launch Performance Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
