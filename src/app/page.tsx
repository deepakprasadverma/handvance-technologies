"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Code2,
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Star,
  ExternalLink
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TechIcon } from "@/components/common/TechIcon";
import { 
  SERVICES_DATA, 
  PORTFOLIO_PROJECTS, 
  WORK_PROCESS, 
  WHY_CHOOSE_US, 
  TESTIMONIALS, 
  TECH_STACK_CATEGORIES 
} from "@/utilities/websiteData";

export default function Home() {
  const featuredServices = SERVICES_DATA.slice(0, 6);
  const [featuredProjects, setFeaturedProjects] = React.useState(
    PORTFOLIO_PROJECTS.filter((p) => p.featured)
  );
  const [displayTestimonials, setDisplayTestimonials] = React.useState(TESTIMONIALS);

  React.useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setDisplayTestimonials(data.data);
        }
      })
      .catch((err) => console.error("Testimonials fetch warning:", err));

    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setFeaturedProjects(data.projects.filter((p: { featured?: boolean }) => p.featured));
        }
      })
      .catch((err) => console.error("Portfolio fetch warning:", err));
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-lightGrey to-lightGrey border-b border-lightGrey-border">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-glow/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-lightGrey-border shadow-xs text-xs font-semibold text-navy">
                <span className="flex h-2 w-2 rounded-full bg-cyan-brand animate-ping" />
                <span className="text-navy font-bold">Handvance Technologies</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">Enterprise IT & Custom Software</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.12]">
                Engineering Scalable Software &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-navy to-cyan-brand">
                  Intelligent Systems
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
                We partner with enterprises and high-growth technology companies to build mission-critical cloud platforms, resilient web applications, mobile ecosystems, and autonomous AI pipelines.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="cyan"
                  size="lg"
                  href="/contact?intent=quote"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-lg hover:shadow-cyan"
                >
                  Get Started
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/services"
                  icon={<Layers className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Explore Services
                </Button>
              </div>

              {/* Trust Indicators / SLA Strip */}
              <div className="pt-6 border-t border-lightGrey-border grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-extrabold text-navy">99.99%</div>
                  <div className="text-xs text-slate-500 font-medium">Uptime Guarantee SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-navy">150+</div>
                  <div className="text-xs text-slate-500 font-medium">Deployments Shipped</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-navy">&lt;24 hrs</div>
                  <div className="text-xs text-slate-500 font-medium">Technical Response</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Architecture Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-navy via-cyan-brand to-navy rounded-2xl opacity-20 blur-xl" />

                <div className="relative bg-navy rounded-2xl p-6 shadow-2xl border border-navy-muted/60 text-white overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-navy-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-slate-400">handvance-core-cluster</span>
                    </div>
                    <Badge variant="cyan" size="sm" pulse>Live 24/7</Badge>
                  </div>

                  {/* Architecture Metrics Grid */}
                  <div className="mt-5 space-y-4">
                    <div className="bg-navy-dark/90 p-4 rounded-xl border border-navy-muted/40 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-cyan-brand">
                          <TerminalIcon className="w-3.5 h-3.5" />
                          <span>STATUS: CLOUD CLUSTER ACTIVE</span>
                        </span>
                        <span className="text-emerald-400 font-bold">HEALTHY</span>
                      </div>
                      <div className="text-slate-400">
                        &gt; node cluster: 12 nodes running across US-East &amp; EU-Central
                      </div>
                      <div className="text-slate-400">
                        &gt; latency: avg 42ms | p99 78ms | zero packet loss
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-navy-dark/70 p-3.5 rounded-xl border border-navy-muted/40">
                        <div className="text-slate-400 text-xs font-mono">Microservices</div>
                        <div className="text-lg font-bold text-white mt-1">24 Active</div>
                        <div className="text-[10px] text-cyan-brand mt-0.5">Automated CI/CD</div>
                      </div>
                      <div className="bg-navy-dark/70 p-3.5 rounded-xl border border-navy-muted/40">
                        <div className="text-slate-400 text-xs font-mono">Security Posture</div>
                        <div className="text-lg font-bold text-white mt-1">SOC2 &amp; HIPAA</div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">End-to-End TLS</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-navy-muted/50 to-navy-dark border border-navy-muted/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-glow flex items-center justify-center text-navy font-bold">
                          <Cpu className="w-5 h-5 text-navy" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">AI Agent Mesh</div>
                          <div className="text-[11px] text-slate-400">Intelligent RAG &amp; Vector Pipelines</div>
                        </div>
                      </div>
                      <Link 
                        href="/services#custom-it-solutions" 
                        className="text-xs text-cyan-brand hover:underline font-mono"
                      >
                        Explore &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. SERVICES OVERVIEW SECTION
          ========================================================================= */}
      <section className="py-8">
        <Container size="xl">
          <SectionHeading
            badge="Enterprise Capabilities"
            title="Comprehensive IT & Software Services"
            highlightText="Built for Scale"
            description="From modern corporate websites and high-throughput web applications to native mobile software and bespoke enterprise AI solutions."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                variant="default"
                hover
                className="flex flex-col justify-between group border-lightGrey-border/90"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-cyan-glow border border-cyan-brand/30 flex items-center justify-center text-navy mb-4 group-hover:bg-cyan-brand group-hover:text-navy transition-colors">
                    <TechIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <Badge variant="neutral" size="sm" className="mb-2">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-xl group-hover:text-cyan-brand transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mt-2">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-1.5 pt-2 border-t border-lightGrey-border text-xs text-slate-600">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-lightGrey-border flex items-center justify-between">
                  <Link
                    href={`/services#${service.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-navy inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-brand" />
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-navy hover:text-cyan-brand text-xs font-bold"
                  >
                    Get a Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="primary"
              size="lg"
              href="/services"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View All 12 Services
            </Button>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE US SECTION
          ========================================================================= */}
      <section className="py-16 bg-navy text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="cyan" size="sm" pulse>
              The Handvance Advantage
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Ambitious Companies Choose{" "}
              <span className="text-cyan-brand">Handvance Technologies</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              We blend engineering rigor, battle-tested architectural frameworks, and transparent agile delivery to eliminate project risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                className="bg-navy-dark/80 rounded-2xl p-6 border border-navy-muted/60 hover:border-cyan-brand/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-muted/60 flex items-center justify-center text-cyan-brand mb-4">
                    <TechIcon name={item.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-muted/50">
                  <div className="text-2xl font-extrabold text-cyan-brand">{item.metric}</div>
                  <div className="text-xs text-slate-400 font-mono">{item.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. FEATURED PROJECTS SECTION
          ========================================================================= */}
      <section className="py-8">
        <Container size="xl">
          <SectionHeading
            badge="Proven Track Record"
            title="Featured Case Studies &"
            highlightText="Flagship Projects"
            description="Explore how our engineering teams have helped organizations solve complex data challenges, scale transactions, and automate clinical operations."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                variant="default"
                hover
                className="flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Mockup Header Surface */}
                  <div className="h-48 bg-gradient-to-br from-navy via-navy to-navy-dark p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-mono text-cyan-brand font-bold border border-white/10">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-300">
                        {project.clientIndustry}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-extrabold text-white group-hover:text-cyan-brand transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-mono">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Project Metrics */}
                    <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-lightGrey border border-lightGrey-border">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx}>
                          <div className="text-base font-extrabold text-navy">{m.value}</div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-lightGrey text-slate-700 border border-lightGrey-border"
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
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-brand" />
                  </Link>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="p-2 rounded-lg bg-lightGrey hover:bg-cyan-glow text-navy transition-colors"
                    aria-label={`Open ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4 text-navy" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              href="/portfolio"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse Complete Portfolio
            </Button>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. TECHNOLOGIES SECTION
          ========================================================================= */}
      <section className="py-12 bg-white border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Modern Stack"
            title="Battle-Tested"
            highlightText="Technology Ecosystem"
            description="We select proven, high-performance open-source runtimes, enterprise cloud infrastructure, and modern AI frameworks."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {TECH_STACK_CATEGORIES.map((cat) => (
              <div
                key={cat.category}
                className="bg-lightGrey rounded-2xl p-6 border border-lightGrey-border space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-lightGrey-border">
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wider font-mono">
                    {cat.category}
                  </h3>
                  <Badge variant="cyan" size="sm">Core</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cat.technologies.map((t) => (
                    <div
                      key={t.name}
                      className="p-3 bg-white rounded-xl border border-lightGrey-border shadow-xs hover:border-cyan-brand/60 transition-all flex items-center gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-glow/60 flex items-center justify-center text-navy flex-shrink-0">
                        <TechIcon name={t.icon} className="w-4 h-4 text-navy" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-navy truncate">{t.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">{t.tag}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. OUR WORK PROCESS
          ========================================================================= */}
      <section className="py-8">
        <Container size="xl">
          <SectionHeading
            badge="Methodology"
            title="Our 4-Step"
            highlightText="Engineering Process"
            description="A predictable, transparent agile cadence ensuring on-time delivery, zero technical debt, and continuous client visibility."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {WORK_PROCESS.map((step) => (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl p-6 border border-lightGrey-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-cyan-brand font-mono">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-lightGrey flex items-center justify-center text-navy">
                      <TechIcon name={step.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-1">{step.title}</h3>
                  <div className="text-xs font-semibold text-cyan-brand mb-3">{step.subtitle}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{step.description}</p>
                </div>

                <div className="pt-4 border-t border-lightGrey-border space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Key Outputs:
                  </div>
                  {step.keyDeliverables.slice(0, 2).map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-cyan-brand flex-shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          7. TESTIMONIALS PREVIEW
          ========================================================================= */}
      <section className="py-12 bg-lightGrey-subtle border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Client Endorsements"
            title="Trusted by Innovative"
            highlightText="Engineering Leaders"
            description="Read what chief technology officers, product leads, and founders say about collaborating with Handvance Technologies."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {displayTestimonials.map((t) => (
              <Card key={t.id} variant="default" className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </CardHeader>

                <CardFooter className="pt-4 border-t border-lightGrey-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-navy">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                    <div className="text-xs text-cyan-brand font-semibold">{t.company}</div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {t.projectScope}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. CONTACT CTA SECTION
          ========================================================================= */}
      <section className="pt-6">
        <Container size="xl">
          <div className="relative rounded-3xl bg-gradient-to-r from-navy via-navy-dark to-navy p-8 sm:p-12 lg:p-16 text-white text-center overflow-hidden shadow-2xl border border-navy-muted/60">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-brand/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <Badge variant="cyan" size="md" pulse>
                Let&apos;s Build Together
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Ready to Accelerate Your{" "}
                <span className="text-cyan-brand">Next Software Milestone?</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Whether you need a complete digital product build from scratch, cloud architecture modernization, or dedicated senior engineering firepower, our team is ready to deliver.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  variant="cyan"
                  size="lg"
                  href="/contact?intent=quote"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-xl hover:shadow-cyan"
                >
                  Schedule a Consultation
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/portfolio"
                  icon={<Code2 className="w-5 h-5" />}
                  iconPosition="left"
                >
                  View Case Studies
                </Button>
              </div>

              <div className="pt-6 text-xs text-slate-400 font-mono">
                Average discovery call turnaround: within 24 business hours • Strict NDA upon request
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
