"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { ArchitecturePlayground } from "@/components/sections/ArchitecturePlayground";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleOpenDiscovery = () => {
    const el = document.querySelector("#estimator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070B] text-[#94A3B8] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Quick Command Palette (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDiscovery={handleOpenDiscovery}
      />

      {/* 1. Sticky Dark Navbar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main>
        {/* 2. Hero Section with Interactive Terminal */}
        <Hero />

        {/* 3. Services Bento Grid (4 glassmorphic cards with glowing border hover) */}
        <ServicesBento />

        {/* 3b. Interactive AI Architecture Playground & Simulator (NEW FEATURE) */}
        <ArchitecturePlayground />

        {/* 4. Featured Solutions / Case Studies (Filterable, Problem-Solution, Impact Metrics) */}
        <CaseStudies />

        {/* 5. 4-Step Engineering Process (Connected horizontal timeline) */}
        <EngineeringProcess />

        {/* 5b. Tech Stack Radar & Enterprise Technologies */}
        <TechStackSection />

        {/* 5c. Verified Enterprise Testimonials & Trust Marquee (NEW FEATURE) */}
        <TestimonialsSection />

        {/* 5d. Quantified Enterprise ROI & Velocity Calculator (NEW FEATURE) */}
        <RoiCalculator />

        {/* 6. Interactive Project Estimator & Contact Form */}
        <ProjectEstimator />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
