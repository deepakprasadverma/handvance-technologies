"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  HeartHandshake, 
  DollarSign, 
  Laptop, 
  GraduationCap 
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CAREERS_DATA } from "@/utilities/websiteData";
import { JobOpening } from "@/types";
import { CareerApplicationModal } from "@/components/forms/CareerApplicationModal";

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  const departments = [
    "All",
    "Engineering",
    "AI & Machine Learning",
    "Product & Design",
    "DevOps & Cloud"
  ];

  const filteredJobs = selectedDept === "All"
    ? CAREERS_DATA
    : CAREERS_DATA.filter((j) => j.department === selectedDept);

  const perks = [
    {
      title: "Remote-First Flexibility",
      description: "Work from anywhere in the world. We evaluate outcomes, code quality, and asynchronous communication rather than hours at a desk.",
      icon: Laptop
    },
    {
      title: "Competitive Compensation & Equity",
      description: "Industry-leading global salaries, transparent progression ladders, and real equity participation for all full-time teammates.",
      icon: DollarSign
    },
    {
      title: "Continuous Learning Budget",
      description: "$2,500 annual stipend for technical certifications, conferences, books, and courses of your choice.",
      icon: GraduationCap
    },
    {
      title: "Health & Wellness Coverage",
      description: "Comprehensive medical, dental, and vision insurance with dedicated mental health days and wellness allowances.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Careers at Handvance</span>
              <span>•</span>
              <span>Now Hiring</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Build the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Enterprise Software
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Join a team of curious, ambitious systems architects and software engineers. We tackle high-impact distributed systems, autonomous AI agents, and enterprise software challenges with freedom and autonomy.
            </p>
          </div>
        </Container>
      </section>

      {/* Culture & Perks Section */}
      <section>
        <Container size="xl">
          <SectionHeading
            badge="Life at Handvance"
            title="Benefits & Perks Built for"
            highlightText="High Performers"
            description="We foster an environment of autonomy, continuous mastery, and psychological safety."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {perks.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-2xl bg-white border border-lightGrey-border shadow-xs hover:border-cyan-brand/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-glow flex items-center justify-center text-navy mb-4">
                      <IconComp className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="text-base font-bold text-navy mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Open Positions Section */}
      <section className="py-12 bg-white border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Open Roles"
            title="Find Your Next"
            highlightText="Engineering Challenge"
            description="We are actively hiring across engineering, artificial intelligence, and infrastructure."
            align="center"
          />

          {/* Department Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedDept === dept
                    ? "bg-navy text-cyan-brand border-navy shadow-md font-bold"
                    : "bg-lightGrey text-slate-600 border-lightGrey-border hover:bg-white hover:text-navy"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Openings List */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-3xl bg-lightGrey border border-lightGrey-border hover:border-cyan-brand/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group shadow-xs"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="navy" size="sm">
                      {job.department}
                    </Badge>
                    <Badge variant="cyan" size="sm">
                      {job.experience}
                    </Badge>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-brand" />
                      <span>{job.location}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.type}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-navy group-hover:text-cyan-brand transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Highlights:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {job.responsibilities.slice(0, 2).map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" />
                          <span className="truncate">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-lightGrey-border flex lg:flex-col items-center gap-3">
                  <Button
                    variant="cyan"
                    size="md"
                    onClick={() => setSelectedJobForModal(job)}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-md hover:shadow-cyan"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive Career Application Modal */}
      {selectedJobForModal && (
        <CareerApplicationModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}
    </div>
  );
}
