import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PORTFOLIO_PROJECTS } from "@/utilities/websiteData";
import { PortfolioProject } from "@/types";
import prisma from "@/lib/prisma";

export const dynamicParams = true;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  try {
    const dbProject = await prisma.project.findUnique({
      where: { slug },
    });
    if (dbProject) {
      let categoryLabel: PortfolioProject["category"] = "Web & SaaS";
      if (dbProject.category === "MOBILE_APPS") categoryLabel = "Mobile Apps";
      if (dbProject.category === "AI_SYSTEMS") categoryLabel = "AI & Systems";
      if (dbProject.category === "ECOMMERCE") categoryLabel = "E-Commerce";
      if (dbProject.category === "CUSTOM_SOFTWARE") categoryLabel = "Custom Software";

      return {
        id: dbProject.id,
        slug: dbProject.slug,
        title: dbProject.title,
        clientIndustry: dbProject.clientIndustry,
        category: categoryLabel,
        tagline: dbProject.tagline,
        summary: dbProject.summary,
        challenge: dbProject.challenge,
        solution: dbProject.solution,
        keyFeatures: dbProject.keyFeatures,
        results: dbProject.results,
        metrics: (Array.isArray(dbProject.metrics) ? dbProject.metrics : []) as PortfolioProject["metrics"],
        technologies: dbProject.technologies,
        featured: dbProject.featured,
        liveDemoUrl: dbProject.liveDemoUrl || undefined,
        githubUrl: dbProject.githubUrl || undefined,
      };
    }
  } catch (err) {
    console.error("DB getProjectBySlug error:", err);
  }
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Case Study Not Found | Handvance Technologies",
    };
  }
  return {
    title: `${project.title} | Case Study | Handvance Technologies`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Case Study | Handvance Technologies`,
      description: project.summary,
      url: `https://handvance-technologies.vercel.app/portfolio/${project.slug}`,
      images: [
        {
          url:
            project.coverImageUrl ||
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study | Handvance Technologies`,
      description: project.summary,
      images: [
        project.coverImageUrl ||
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-10 pb-16">
        <Container size="xl">
          <div className="space-y-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy transition-colors font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Case Studies</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" size="sm">
                {project.category}
              </Badge>
              <span className="text-xs font-mono text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-600 font-semibold">
                {project.clientIndustry}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl font-mono">
              {project.tagline}
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-lightGrey-border">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-lightGrey-border shadow-xs">
                  <div className="text-2xl font-extrabold text-navy">{m.value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Body */}
      <section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Challenge, Solution, Key Innovations */}
            <div className="lg:col-span-8 space-y-12">
              {/* Executive Summary */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-navy">Executive Summary</h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* The Challenge */}
              <div className="p-6 rounded-2xl bg-white border border-lightGrey-border space-y-4 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <span>The Architectural Challenge</span>
                </div>
                <h3 className="text-xl font-bold text-navy">Problem Statement</h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* The Solution */}
              <div className="p-6 rounded-2xl bg-white border border-lightGrey-border space-y-4 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-cyan-brand bg-cyan-glow px-3 py-1 rounded-full border border-cyan-brand/30">
                  <span>Engineering Solution</span>
                </div>
                <h3 className="text-xl font-bold text-navy">Architectural Strategy</h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Key Features Delivered */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-navy">Key Technical Features &amp; Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-lightGrey border border-lightGrey-border flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-navy">Verified Business &amp; Technical Results</h3>
                <div className="space-y-3">
                  {project.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-lightGrey-border shadow-xs flex items-center gap-3"
                    >
                      <TrendingUp className="w-5 h-5 text-cyan-brand flex-shrink-0" />
                      <span className="text-sm font-semibold text-navy">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Project Metadata Card & CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-navy text-white space-y-6 border border-navy-muted/60 shadow-xl">
                <h3 className="text-lg font-bold text-white border-b border-navy-muted/60 pb-3 font-mono">
                  Case Study Specs
                </h3>

                <div>
                  <div className="text-xs text-slate-400 font-mono">Industry</div>
                  <div className="text-sm font-bold text-white mt-0.5">{project.clientIndustry}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-mono">Engagement Scope</div>
                  <div className="text-sm font-bold text-cyan-brand mt-0.5">{project.category}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-mono mb-2">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-navy-dark text-slate-200 border border-navy-muted/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-navy-muted/60 space-y-3">
                  <Button
                    variant="cyan"
                    size="md"
                    href="/contact?intent=quote"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Start a Similar Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    href="/portfolio"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    iconPosition="left"
                    className="w-full justify-center"
                  >
                    Browse Other Projects
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-lightGrey-border space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-navy font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-cyan-brand" />
                  <span>Enterprise Security &amp; NDA</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specific proprietary intellectual property, internal customer datasets, and backend credentials remain confidential under strict non-disclosure agreements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
