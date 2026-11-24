"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechIcon } from "@/components/common/TechIcon";
import { SERVICES_DATA } from "@/utilities/websiteData";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Web & Applications",
    "Mobile & Software",
    "Design & Creative",
    "Growth & Marketing",
    "Enterprise & Advisory"
  ];

  const filteredServices = selectedCategory === "All"
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Full-Stack Capabilities</span>
              <span>•</span>
              <span>12 Specialized Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              End-to-End IT Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Custom Software Engineering
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              From responsive corporate web portals and high-concurrency SaaS applications to native mobile apps and bespoke AI automation—we engineer systems that drive measurable commercial advantage.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid with Category Filter */}
      <section>
        <Container size="xl">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? "bg-navy text-cyan-brand border-navy shadow-md font-bold"
                    : "bg-white text-slate-600 border-lightGrey-border hover:bg-lightGrey hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                variant="default"
                hover
                className="flex flex-col justify-between group scroll-mt-28 border-lightGrey-border"
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-glow border border-cyan-brand/30 flex items-center justify-center text-navy group-hover:bg-cyan-brand group-hover:text-navy transition-colors">
                        <TechIcon name={service.iconName} className="w-6 h-6" />
                      </div>
                      <Badge variant="neutral" size="sm">
                        {service.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl group-hover:text-cyan-brand transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed text-slate-600">
                      {service.fullDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Features */}
                    <div className="space-y-2 pt-2 border-t border-lightGrey-border">
                      <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Key Engineering Highlights:
                      </div>
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="pt-3 border-t border-lightGrey-border">
                      <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-lightGrey text-slate-700 border border-lightGrey-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-lightGrey-border flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-mono">
                    Custom Scoping
                  </div>
                  <Button
                    variant="cyan"
                    size="sm"
                    href={`/contact?service=${encodeURIComponent(service.title)}&intent=quote`}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold text-xs"
                  >
                    Get a Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="py-12 bg-white border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Flexible Engagements"
            title="How We Partner With"
            highlightText="Your Organization"
            description="Whether you need a full turnkey project build, dedicated senior team augmentation, or advisory guidance."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-navy text-cyan-brand flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-navy">Dedicated Squad Augmentation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamlessly embed a senior frontend, backend, or AI engineer directly into your ongoing sprint workflows with zero onboarding friction.
              </p>
              <div className="text-xs font-mono font-bold text-cyan-brand pt-2">
                Flexible Monthly Retainer
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-brand text-navy flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-navy">End-to-End Product Build</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turn your product specification into a fully architected, designed, and deployed production application with guaranteed milestone delivery.
              </p>
              <div className="text-xs font-mono font-bold text-cyan-brand pt-2">
                Milestone-Based Fixed Scope
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-navy">Architecture &amp; Advisory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic cloud modernization audits, security compliance gap analyses, and fractional CTO roadmapping to protect technical runway.
              </p>
              <div className="text-xs font-mono font-bold text-cyan-brand pt-2">
                Advisory Sprints &amp; Audits
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section>
        <Container size="xl">
          <div className="bg-navy rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl border border-navy-muted/60 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <Badge variant="cyan" size="sm" pulse>Need a Custom Specification?</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Don&apos;t See the Exact Tech Stack You Require?
              </h2>
              <p className="text-slate-300 text-sm">
                Our senior architects specialize in custom enterprise integrations, proprietary workflows, and emerging technologies. Contact us to discuss your architecture.
              </p>
              <div className="pt-2">
                <Button
                  variant="cyan"
                  size="lg"
                  href="/contact"
                  icon={<PhoneCall className="w-4 h-4" />}
                >
                  Request a Technical Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
