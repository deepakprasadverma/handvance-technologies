import React from "react";
import type { Metadata } from "next";
import { 
  ArrowRight, 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Users, 
  Award, 
  HeartHandshake, 
  Compass
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BRAND } from "@/utilities/constants";
import { WHY_CHOOSE_US } from "@/utilities/websiteData";

export const metadata: Metadata = {
  title: "About Us | Enterprise Software & IT Engineering",
  description: "Learn about Handvance Technologies, our mission, vision, core values, and our commitment to building mission-critical software systems.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Excellence in Execution",
      description: "We hold ourselves to the highest engineering standards. Every architectural design, schema migration, and frontend interaction is built with craftsmanship and longevity.",
      icon: Award
    },
    {
      title: "Radical Transparency",
      description: "No hidden blockers or vague progress reports. We operate in bi-weekly agile cadences with open communication, live staging deployments, and honest technical guidance.",
      icon: Eye
    },
    {
      title: "Security by Design",
      description: "From day one, our architectures incorporate zero-trust permissions, SOC2 readiness, HIPAA guardrails, and cryptographic safeguards to protect proprietary data.",
      icon: ShieldCheck
    },
    {
      title: "High-Velocity Delivery",
      description: "We eliminate bureaucratic drag and modern technical debt, shipping production-ready software in rapid iterations without compromising stability.",
      icon: Zap
    },
    {
      title: "Client Partnership",
      description: "We don't act as passive contractors. We immerse ourselves as dedicated strategic technology partners invested in your multi-year business outcomes.",
      icon: HeartHandshake
    },
    {
      title: "Continuous Learning",
      description: "The technological landscape evolves rapidly. We continuously research emerging AI frameworks, cloud primitives, and developer tooling to keep your tech stack future-proof.",
      icon: Compass
    }
  ];

  const milestones = [
    { year: "2021", title: "Founding & Core Focus", desc: "Handvance Technologies was founded by senior systems architects to address the engineering gap between slow consultancies and unverified freelancing." },
    { year: "2022", title: "Cloud & Microservices Scale", desc: "Expanded our distributed systems practice, orchestrating high-concurrency cloud architectures for fintech and digital commerce platforms." },
    { year: "2023", title: "Intelligent Systems & AI", desc: "Pioneered production RAG retrieval pipelines, LLM agent orchestration, and HIPAA-compliant healthcare automation tools." },
    { year: "2024+", title: "Enterprise Growth & Global Reach", desc: "Partnering with global organizations across North America and Europe to deliver resilient, scalable software systems." }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>About Us</span>
              <span>•</span>
              <span>Who We Are</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Architecting the Digital Foundations of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Modern Industry
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              {BRAND.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Company Introduction / Story */}
      <section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Our Background"
                title="Bridging High-Level Strategy with"
                highlightText="Pragmatic Engineering"
                description="Why Handvance Technologies was established."
              />

              <p className="text-base text-slate-700 leading-relaxed">
                Handvance Technologies was established with a clear mandate: to eliminate the friction, technical debt, and misaligned incentives that all too often plague enterprise IT projects.
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                Too many organizations are forced to choose between rigid, slow legacy consultancies or fragmented offshore agencies lacking architectural rigor. Handvance provides a third way: senior engineering squads that operate with agility, radical transparency, and deep architectural discipline.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-lightGrey-border shadow-xs">
                  <div className="text-3xl font-extrabold text-navy">100%</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">In-House Senior Engineers</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-lightGrey-border shadow-xs">
                  <div className="text-3xl font-extrabold text-cyan-brand">Zero</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">Unnecessary Technical Debt</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-navy rounded-3xl p-8 text-white space-y-6 shadow-xl border border-navy-muted/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-brand/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-2xl font-bold tracking-tight text-white">Our Journey of Excellence</h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-navy-muted">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-cyan-brand text-navy flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 shadow-cyan">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-brand">{m.year}</span>
                          <span className="text-sm font-bold text-white">{m.title}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-white border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Purpose & Direction"
            title="Our Guiding"
            highlightText="Mission & Vision"
            description="Clear principles driving every engagement, line of code, and architectural decision."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <Card variant="lightGrey" className="p-8 border-lightGrey-border relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-navy text-cyan-brand flex items-center justify-center shadow-md">
                  <Target className="w-7 h-7 text-cyan-brand" />
                </div>
                <Badge variant="navy" size="sm">Our Mission</Badge>
                <h3 className="text-2xl font-bold text-navy">
                  To Empower Businesses with Resilient, High-Impact Software
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Our mission is to democratize enterprise-grade engineering excellence for growing companies. We build clean, resilient, and secure digital infrastructure that allows our clients to scale their operations fearlessly and outperform competitors.
                </p>
              </div>

              <div className="pt-6 border-t border-lightGrey-border/80 mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-cyan-brand" />
                <span>Measurable ROI • Scalable Architecture • Continuous SLA</span>
              </div>
            </Card>

            {/* Vision */}
            <Card variant="lightGrey" className="p-8 border-lightGrey-border relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-brand text-navy flex items-center justify-center shadow-md">
                  <Eye className="w-7 h-7 text-navy" />
                </div>
                <Badge variant="cyan" size="sm">Our Vision</Badge>
                <h3 className="text-2xl font-bold text-navy">
                  To Be the Global Benchmark for Software Engineering Trust
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  We envision a world where organizations can innovate without friction—where intelligent automation, cloud scalability, and human-centric UI come together seamlessly into software systems that stand the test of time.
                </p>
              </div>

              <div className="pt-6 border-t border-lightGrey-border/80 mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-cyan-brand" />
                <span>Global Standards • Zero Technical Debt • Continuous Innovation</span>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section>
        <Container size="xl">
          <SectionHeading
            badge="Engineering Ethos"
            title="Our Core Values &"
            highlightText="Guiding Beliefs"
            description="The foundational principles that guide how we write software, collaborate with clients, and treat our teammates."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {coreValues.map((val) => {
              const IconComp = val.icon;
              return (
                <Card key={val.title} variant="default" hover className="flex flex-col justify-between p-6">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-glow flex items-center justify-center text-navy mb-4">
                      <IconComp className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2">{val.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Handvance Technologies */}
      <section className="py-16 bg-navy text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="cyan" size="sm" pulse>Enterprise Standards</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Handvance Technologies Stands Apart
            </h2>
            <p className="text-slate-300 text-base">
              A commitment to engineering rigor that translates directly into business velocity and system resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.id} className="bg-navy-dark/90 p-6 rounded-2xl border border-navy-muted/60 space-y-3">
                <div className="text-2xl font-extrabold text-cyan-brand font-mono">{item.metric}</div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{item.metricLabel}</div>
                <h3 className="text-base font-bold text-white pt-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-navy-muted/60 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="cyan"
              size="lg"
              href="/team"
              icon={<Users className="w-4 h-4" />}
            >
              Meet Our Leadership &amp; Engineering Team
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/contact"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Conversation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
