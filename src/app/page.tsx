import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070B] text-[#94A3B8] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Sticky Dark Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section with Interactive Terminal */}
        <Hero />

        {/* 3. Services Bento Grid (4 glassmorphic cards with glowing border hover) */}
        <ServicesBento />

        {/* 4. Featured Solutions / Case Studies (Filterable, Problem-Solution, Impact Metrics) */}
        <CaseStudies />

        {/* 5. 4-Step Engineering Process (Connected horizontal timeline) */}
        <EngineeringProcess />

        {/* 5b. Tech Stack Radar & Enterprise Technologies */}
        <TechStackSection />

        {/* 6. Interactive Project Estimator & Contact Form */}
        <ProjectEstimator />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
