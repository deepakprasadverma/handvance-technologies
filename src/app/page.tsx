import React from "react";
import { ArrowRight, CheckCircle2, Layers, Shield, Cpu, Code2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/utilities/constants";

export default function Home() {
  const setupFeatures = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-brand" />,
      title: "App Router & TypeScript",
      description: "Scalable directory structure with strict TypeScript configurations and modular route segments.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-navy" />,
      title: "Tailwind CSS & Brand Tokens",
      description: "Customized palette featuring Primary Navy (#101D36) and Electric Cyan (#13CDEB) accents.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-brand" />,
      title: "Modular Architecture",
      description: "Dedicated layers for components, hooks, utilities, types, and service clients.",
    },
    {
      icon: <Shield className="w-5 h-5 text-navy" />,
      title: "Responsive Shell & Layout",
      description: "Production-ready header, navigation drawer, custom 404 handler, and semantic metadata.",
    },
  ];

  return (
    <AppLayout>
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-white to-lightGrey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightGrey border border-lightGrey-border text-xs font-semibold text-navy">
              <span className="w-2 h-2 rounded-full bg-cyan-brand animate-pulse" />
              <span>Phase 1: Project Setup Complete</span>
              <span className="text-slate-400">•</span>
              <span className="text-cyan-dark">Handvance Technologies</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.15]">
              Engineering Scalable Software &{" "}
              <span className="text-cyan-brand underline decoration-cyan-brand/30 decoration-wavy">
                Intelligent Systems
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Welcome to the official digital foundation for <strong className="text-navy">{BRAND.name}</strong>.
              We architect resilient cloud platforms, modern enterprise web systems, and intelligent digital products.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                variant="cyan"
                size="lg"
                href="/services"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Services
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
              >
                Contact Engineering
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 Setup Architecture Grid */}
      <section className="py-20 bg-lightGrey border-t border-lightGrey-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-dark">
              Architecture Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
              Phase 1 Foundation & System Status
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              The project structure has been established following clean architecture principles and enterprise standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-lightGrey-border shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-lightGrey flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-lightGrey-border flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Configured & Ready</span>
                </div>
              </div>
            ))}
          </div>

          {/* Standby Banner for Phase 2 */}
          <div className="mt-12 p-6 rounded-2xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-brand">
                Phase 1 Execution Notice
              </div>
              <h3 className="text-lg font-bold mt-1 text-white">
                Project setup verified with zero compile errors.
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Awaiting user instructions to proceed to Phase 2 (Content & Page Building).
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-light border border-navy-muted text-xs font-mono text-cyan-light">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                STATUS: READY_FOR_PHASE_2
              </span>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
