import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PORTFOLIO_PROJECTS } from "@/utilities/websiteData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [
        { featured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    if (dbProjects.length > 0) {
      // Map Prisma model fields to public PortfolioProject interface format
      const formatted = dbProjects.map((p) => {
        let categoryLabel = "Web & SaaS";
        if (p.category === "MOBILE_APPS") categoryLabel = "Mobile Apps";
        if (p.category === "AI_SYSTEMS") categoryLabel = "AI & Systems";
        if (p.category === "ECOMMERCE") categoryLabel = "E-Commerce";
        if (p.category === "CUSTOM_SOFTWARE") categoryLabel = "Custom Software";

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          clientIndustry: p.clientIndustry,
          category: categoryLabel,
          tagline: p.tagline,
          summary: p.summary,
          challenge: p.challenge,
          solution: p.solution,
          keyFeatures: p.keyFeatures,
          results: p.results,
          technologies: p.technologies,
          featured: p.featured,
          liveDemoUrl: p.liveDemoUrl || undefined,
          githubUrl: p.githubUrl || undefined,
          coverImageUrl: p.coverImageUrl || undefined,
        };
      });

      return NextResponse.json({ success: true, projects: formatted, source: "database" });
    }

    // Graceful fallback to initial portfolio case studies if DB has no published records yet
    return NextResponse.json({ success: true, projects: PORTFOLIO_PROJECTS, source: "seed" });
  } catch (error) {
    console.error("Public portfolio API error:", error);
    return NextResponse.json({ success: true, projects: PORTFOLIO_PROJECTS, source: "fallback" });
  }
}
