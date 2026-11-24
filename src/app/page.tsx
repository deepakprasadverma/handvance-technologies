"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Copy, 
  Palette, 
  Layout, 
  ChevronRight 
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const brandColors = [
    {
      name: "Primary Navy",
      hex: "#101D36",
      bgClass: "bg-navy",
      textClass: "text-white",
      description: "Dominant brand canvas, typography anchors, and primary headers.",
    },
    {
      name: "Electric Cyan",
      hex: "#13CDEB",
      bgClass: "bg-cyan-brand",
      textClass: "text-navy",
      description: "Primary accent glow, high-priority CTAs, and active highlights.",
    },
    {
      name: "Pure White",
      hex: "#FFFFFF",
      bgClass: "bg-white",
      textClass: "text-navy",
      description: "Card surfaces, component containers, and clean negative space.",
    },
    {
      name: "Light Grey",
      hex: "#F5F7FA",
      bgClass: "bg-lightGrey",
      textClass: "text-navy",
      description: "Subtle secondary backgrounds, alternating rows, and section dividers.",
    },
  ];

  return (
    <AppLayout>
      {/* 1. Hero Section: Design System Overview */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-white via-lightGrey-subtle/30 to-lightGrey border-b border-lightGrey-border">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Badge variant="cyan" size="md" dot>
              PHASE 2: GLOBAL WEBSITE DESIGN SYSTEM
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.14]">
              Unified Design System for{" "}
              <span className="text-cyan-brand relative inline-block underline decoration-cyan-brand/30 decoration-wavy">
                Handvance Technologies
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              A modern, premium, professional design system built on Next.js App Router, Tailwind CSS,
              and Framer Motion. Engineered for visual consistency, WCAG accessibility, and scalable UI workflows.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                variant="cyan"
                size="lg"
                href="#components"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Components
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/contact?intent=quote"
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Get a Quote
              </Button>
            </div>

            {/* Quick Design Specs */}
            <div className="pt-6 border-t border-lightGrey-border flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-navy font-semibold">
                <Palette className="w-4 h-4 text-cyan-brand" /> Navy #101D36 & Cyan #13CDEB
              </span>
              <span className="flex items-center gap-1.5 text-navy font-semibold">
                <Layout className="w-4 h-4 text-cyan-brand" /> 100% Mobile & Desktop Responsive
              </span>
              <span className="flex items-center gap-1.5 text-navy font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-brand" /> Framer Motion Micro-Interactions
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Color Palette Tokens Section */}
      <section id="colors" className="py-20 bg-white border-b border-lightGrey-border">
        <Container>
          <SectionHeading
            badge="BRAND PALETTE"
            title="Core Color"
            highlightText="Tokens"
            description="Our strict color hierarchy ensures maximum contrast, legibility, and unmistakable brand recognition across all devices."
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <div
                key={color.name}
                className="rounded-2xl border border-lightGrey-border bg-white shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-200"
              >
                <div className={`h-32 w-full ${color.bgClass} flex items-end p-4 border-b border-lightGrey-border/50`}>
                  <button
                    onClick={() => copyToClipboard(color.hex)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-md text-white text-xs font-mono hover:bg-black/40 transition-colors"
                    title="Click to copy Hex code"
                  >
                    {copiedHex === color.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{color.hex}</span>
                  </button>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-navy text-base">{color.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Reusable UI Components Showcase */}
      <section id="components" className="py-20 bg-lightGrey border-b border-lightGrey-border">
        <Container>
          <SectionHeading
            badge="COMPONENT LIBRARY"
            title="Reusable UI"
            highlightText="Primitives"
            description="Pre-built, modular design system primitives styled strictly for Handvance Technologies."
            align="center"
          />

          {/* Component Showcase 1: Buttons */}
          <div className="space-y-12">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>1. Button Component (`Button.tsx`)</CardTitle>
                    <CardDescription>
                      Supports multiple semantic variants, sizes, icon positioning, and Framer Motion micro-interactions.
                    </CardDescription>
                  </div>
                  <Badge variant="cyan" size="sm">Framer Motion Powered</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                    Button Variants
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="cyan" icon={<ArrowRight className="w-4 h-4" />}>
                      Electric Cyan (Primary CTA)
                    </Button>
                    <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      Navy Blue
                    </Button>
                    <Button variant="secondary">
                      Secondary White
                    </Button>
                    <Button variant="outline">
                      Outline
                    </Button>
                    <Button variant="ghost">
                      Ghost Action
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-lightGrey-border">
                  <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                    Button Sizes
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="cyan" size="sm">Small (sm)</Button>
                    <Button variant="cyan" size="md">Medium (md)</Button>
                    <Button variant="cyan" size="lg">Large (lg)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component Showcase 2: Badges */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>2. Badge Component (`Badge.tsx`)</CardTitle>
                <CardDescription>
                  Pill badges for categorization, metadata tags, and live status pulses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="cyan" size="md" dot>Electric Cyan Badge</Badge>
                  <Badge variant="navy" size="md">Navy Badge</Badge>
                  <Badge variant="neutral" size="md">Neutral Grey</Badge>
                  <Badge variant="outline" size="md">Outline Variant</Badge>
                  <Badge variant="success" size="md" dot>Production Ready</Badge>
                  <Badge variant="cyan" size="xs">Micro Badge (xs)</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Component Showcase 3: Cards */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-navy">3. Card Component (`Card.tsx`)</h3>
                <p className="text-sm text-slate-600">Structured layout cards with elevation, header, content, and footer regions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="default" hoverEffect>
                  <CardHeader>
                    <Badge variant="cyan" size="xs" className="w-fit mb-2">Variant: Default</Badge>
                    <CardTitle>White Surface Card</CardTitle>
                    <CardDescription>Standard card with 1px border and soft drop shadow.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">Ideal for general content blocks, features, and portfolio summaries.</p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs font-mono text-slate-500">Soft Elevation</span>
                    <ArrowRight className="w-4 h-4 text-cyan-brand" />
                  </CardFooter>
                </Card>

                <Card variant="cyanAccent" hoverEffect>
                  <CardHeader>
                    <Badge variant="cyan" size="xs" className="w-fit mb-2">Variant: Cyan Accent</Badge>
                    <CardTitle>Top Gradient Card</CardTitle>
                    <CardDescription>Card featuring an Electric Cyan to Navy top border beam.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">Highlights featured service plans, special case studies, or calls to action.</p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs font-mono text-cyan-dark font-semibold">Priority Surface</span>
                    <Sparkles className="w-4 h-4 text-cyan-brand" />
                  </CardFooter>
                </Card>

                <Card variant="navy" hoverEffect>
                  <CardHeader>
                    <Badge variant="navy" size="xs" className="w-fit mb-2 bg-navy-light text-cyan-light border-navy-muted">Variant: Navy</Badge>
                    <CardTitle className="text-white">Primary Navy Card</CardTitle>
                    <CardDescription className="text-slate-300">Deep Navy `#101D36` surface for high-contrast emphasis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300">Used for technical callouts, terminal embeds, and enterprise guarantees.</p>
                  </CardContent>
                  <CardFooter className="justify-between border-navy-muted/60">
                    <span className="text-xs font-mono text-cyan-brand">Dark Inverted</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-brand" />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Responsive Verification & Testing Notice */}
      <section className="py-16 bg-white">
        <Container>
          <div className="rounded-2xl p-8 bg-gradient-to-r from-navy to-navy-light text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <Badge variant="cyan" size="xs">
                PHASE 2 IMPLEMENTATION STATUS
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Global Design System Verified & Ready
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                The Navbar, Footer, Mobile Navigation Drawer, Buttons, Cards, Badges, and Section Headings
                are fully functional and responsive across mobile, tablet, and desktop viewports.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Button
                variant="cyan"
                size="md"
                href="/contact?intent=quote"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Test &quot;Get a Quote&quot;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </AppLayout>
  );
}
