"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { CaseStudyFilter, CaseStudy } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CaseStudyFilter>("all");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = activeFilter === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((study) => study.category === activeFilter);

  const filterTabs = [
    { label: "All Solutions", value: "all" },
    { label: "Web & SaaS", value: "web" },
    { label: "AI & Agents", value: "ai" },
    { label: "Mobile Systems", value: "mobile" },
  ];

  return (
    <section id="solutions" className="relative py-28 bg-[#07070B] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial from-cyan-600/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="indigo" size="sm" dot>
              PROVEN DEPLOYMENTS & IMPACT
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Featured Solutions &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                System Blueprints
              </span>
            </h2>
            <p className="text-base text-[#94A3B8]">
              Explore how we translate high-stakes engineering challenges into verified, scalable production architectures with measurable business impact.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0E1017] p-1.5 rounded-xl border border-[#1E2230]">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value as CaseStudyFilter)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono-tag transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.value
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2230]/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="group relative rounded-2xl bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] p-6 sm:p-8 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={study.mockupAccent} size="xs">
                      {study.categoryLabel}
                    </Badge>
                    <span className="text-xs text-[#94A3B8] font-mono-tag">
                      {study.clientIndustry}
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono-tag bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/30">
                    {study.architectureType}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-slate-300 italic mb-6">
                  &ldquo;{study.tagline}&rdquo;
                </p>

                {/* Dark UI Mockup / Architectural Window Preview */}
                <div className="relative rounded-xl bg-[#07070B] border border-[#1E2230] p-4 mb-6 font-mono-tag overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E2230]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-[10px] text-slate-500">arch_spec.json</span>
                    </div>
                    <span className="text-[10px] text-cyan-400">STATUS: VERIFIED</span>
                  </div>

                  {/* Architecture Mini Mockup Representation */}
                  <div className="space-y-2 text-xs">
                    <div className="text-[11px] text-[#94A3B8]">
                      <strong className="text-rose-400">CHALLENGE: </strong>
                      {study.problem}
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      <strong className="text-emerald-400">SOLUTION: </strong>
                      {study.solution}
                    </div>
                  </div>
                </div>

                {/* Quantitative Impact Metrics Display */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {study.impactMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2230] text-center"
                    >
                      <div className="text-lg sm:text-xl font-extrabold text-[#F8FAFC] font-mono-tag text-cyan-300">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-semibold text-[#F8FAFC] mt-0.5 truncate">
                        {metric.label}
                      </div>
                      {metric.sublabel && (
                        <div className="text-[10px] text-slate-500 truncate">
                          {metric.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Badges & CTA */}
              <div className="pt-4 border-t border-[#1E2230] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <Badge key={tech} variant="slate" size="xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedStudy(study)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors font-mono-tag cursor-pointer"
                >
                  Architecture Deep-Dive <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      <Modal
        isOpen={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
        title={selectedStudy?.title}
        subtitle={selectedStudy?.clientIndustry}
        maxWidth="lg"
      >
        {selectedStudy && (
          <div className="space-y-6 text-sm text-[#94A3B8]">
            <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] flex items-center justify-between">
              <span className="font-mono-tag text-xs text-cyan-400">
                Core Topology: {selectedStudy.architectureType}
              </span>
              <Badge variant="emerald" size="xs">
                Production Active
              </Badge>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-[#F8FAFC] font-mono-tag font-semibold mb-2">
                The Engineering Bottleneck
              </h5>
              <p className="leading-relaxed bg-[#07070B]/50 p-4 rounded-xl border border-[#1E2230]">
                {selectedStudy.problem}
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-[#F8FAFC] font-mono-tag font-semibold mb-2">
                Handvance Architectural Solution
              </h5>
              <p className="leading-relaxed bg-[#07070B]/50 p-4 rounded-xl border border-[#1E2230]">
                {selectedStudy.solution}
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-[#F8FAFC] font-mono-tag font-semibold mb-2">
                Verified Quantitative Outcomes
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedStudy.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230]">
                    <div className="text-2xl font-bold text-cyan-300 font-mono-tag">{metric.value}</div>
                    <div className="text-xs font-semibold text-[#F8FAFC] mt-1">{metric.label}</div>
                    {metric.sublabel && <div className="text-[11px] text-slate-500 mt-0.5">{metric.sublabel}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-[#F8FAFC] font-mono-tag font-semibold mb-2">
                Engineered Tech Stack
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedStudy.techStack.map((tech) => (
                  <Badge key={tech} variant="cyan" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2230] flex items-center justify-end">
              <a
                href="#estimator"
                onClick={() => setSelectedStudy(null)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs font-mono-tag shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
              >
                Discuss Similar Architecture →
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
