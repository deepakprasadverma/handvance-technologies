import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Code2 
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TEAM_MEMBERS } from "@/utilities/websiteData";

export const metadata: Metadata = {
  title: "Our Team | Leadership & Engineering Talent",
  description: "Meet the executive leadership, principal architects, and senior software engineers behind Handvance Technologies.",
};

const renderSocialIcon = (network: string) => {
  switch (network.toLowerCase()) {
    case "linkedin":
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function TeamPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Our People</span>
              <span>•</span>
              <span>Engineering Leadership</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              The Minds Powering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Handvance Technologies
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              A distributed collective of veteran systems architects, AI researchers, product designers, and full-stack engineers united by a obsession with technical craftsmanship.
            </p>
          </div>
        </Container>
      </section>

      {/* Team Cards Grid */}
      <section>
        <Container size="xl">
          <SectionHeading
            badge="Leadership & Core Squad"
            title="Principal Architects &"
            highlightText="Engineering Directors"
            description="Our leadership team actively reviews architecture, participates in design critiques, and maintains the highest engineering bar."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {TEAM_MEMBERS.map((member) => (
              <Card
                key={member.id}
                variant="default"
                hover
                className="overflow-hidden flex flex-col justify-between group border-lightGrey-border/90"
              >
                <div>
                  {/* Photo & Badge Container */}
                  <div className="relative h-64 w-full bg-navy overflow-hidden">
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Badge variant="cyan" size="sm">
                        {member.department}
                      </Badge>
                      <div className="flex items-center gap-1.5 bg-navy/80 backdrop-blur-md p-1.5 rounded-lg border border-navy-muted/50">
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-300 hover:text-cyan-brand p-1 transition-colors"
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            {renderSocialIcon("linkedin")}
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-300 hover:text-cyan-brand p-1 transition-colors"
                            aria-label={`${member.name} on GitHub`}
                          >
                            {renderSocialIcon("github")}
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-300 hover:text-cyan-brand p-1 transition-colors"
                            aria-label={`${member.name} on Twitter`}
                          >
                            {renderSocialIcon("twitter")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy group-hover:text-cyan-brand transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        {member.role}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Skill Tags */}
                    <div className="pt-2 border-t border-lightGrey-border">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-lightGrey text-slate-700 border border-lightGrey-border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Engineering Culture Pillars */}
      <section className="py-12 bg-white border-y border-lightGrey-border">
        <Container size="xl">
          <SectionHeading
            badge="Engineering Philosophy"
            title="How Our Engineering Squads"
            highlightText="Operate Daily"
            description="Our culture prioritizes continuous feedback, peer reviews, technical autonomy, and clean software architecture."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy text-cyan-brand flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5 text-cyan-brand" />
              </div>
              <h4 className="text-lg font-bold text-navy">Zero Compromise Code Quality</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every commit is reviewed by at least two senior engineers. Strict linting, type-checking, and automated CI pipelines run on every pull request.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-brand text-navy flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-navy" />
              </div>
              <h4 className="text-lg font-bold text-navy">Security-Centric Thinking</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Security is never an afterthought or a final audit step. We apply least-privilege principles, dependency scanning, and threat modeling from sprint one.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-lightGrey border border-lightGrey-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-cyan-brand" />
              </div>
              <h4 className="text-lg font-bold text-navy">Continuous Upskilling</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every engineer receives dedicated annual conference stipends, internal lunch-and-learn slots, and time to experiment with breakthrough AI technologies.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Careers Banner CTA */}
      <section>
        <Container size="xl">
          <div className="bg-navy rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-navy-muted/60">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="cyan" size="sm" pulse>We Are Hiring</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Interested in Joining Our Engineering Collective?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                We are actively looking for exceptional software engineers, AI researchers, and cloud architects who want to build impactful enterprise software.
              </p>
            </div>

            <Button
              variant="cyan"
              size="lg"
              href="/careers"
              icon={<ArrowRight className="w-5 h-5" />}
              className="flex-shrink-0"
            >
              Explore Open Positions
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
