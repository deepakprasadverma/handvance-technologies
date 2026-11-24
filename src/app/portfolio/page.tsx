"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ExternalLink
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PORTFOLIO_PROJECTS } from "@/utilities/websiteData";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Web & SaaS",
    "AI & Systems",
    "Mobile Apps",
    "E-Commerce",
    "Custom Software"
  ];

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Engineering Case Studies</span>
              <span>•</span>
              <span>Verified Client Impact</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Featured Case Studies &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Technical Deliverables
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Explore how Handvance Technologies architects resilient software architectures, resolves performance bottlenecks, and builds autonomous AI pipelines across diverse industries.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Projects Grid */}
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                variant="default"
                hover
                className="flex flex-col justify-between overflow-hidden group border-lightGrey-border"
              >
                <div>
                  {/* Visual Header Mockup */}
                  <div className="h-52 bg-gradient-to-br from-navy via-navy-dark to-navy p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-mono text-cyan-brand font-bold border border-white/10">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-300">
                        {project.clientIndustry}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-brand transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-mono">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-lightGrey border border-lightGrey-border">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx}>
                          <div className="text-base font-extrabold text-navy">{m.value}</div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-lightGrey text-slate-700 border border-lightGrey-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0 border-t border-lightGrey-border/60 flex items-center justify-between">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-xs font-bold text-navy hover:text-cyan-brand inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-brand" />
                  </Link>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="p-2 rounded-lg bg-lightGrey hover:bg-cyan-glow text-navy transition-colors"
                    aria-label={`View ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4 text-navy" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Project CTA */}
      <section>
        <Container size="xl">
          <div className="bg-navy rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-navy-muted/60">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="cyan" size="sm" pulse>Have a Similar Challenge?</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Let&apos;s Build an Architecture Tailored to Your Scale
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Our architects can evaluate your existing codebase, outline a clear milestone blueprint, and assemble a dedicated senior sprint team.
              </p>
            </div>

            <Button
              variant="cyan"
              size="lg"
              href="/contact?intent=quote"
              icon={<ArrowRight className="w-5 h-5" />}
              className="flex-shrink-0"
            >
              Start a Project
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
