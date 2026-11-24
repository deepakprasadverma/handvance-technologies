import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ProjectCategory, ContentStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

// 1. GET All Projects (Admin list with filters & pagination)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim();
    const status = searchParams.get("status")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "12", 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {};

    if (category && category !== "ALL" && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      where.category = category as ProjectCategory;
    }

    if (status && status !== "ALL" && Object.values(ContentStatus).includes(status as ContentStatus)) {
      where.status = status as ContentStatus;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { clientIndustry: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
        { technologies: { hasSome: [search] } },
      ];
    }

    let projects: Array<Record<string, unknown>> = [];
    let total = 0;

    try {
      const results = await Promise.all([
        prisma.project.findMany({
          where,
          orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
          skip,
          take: limit,
        }),
        prisma.project.count({ where }),
      ]);
      projects = results[0];
      total = results[1];
    } catch (dbErr) {
      console.error("Admin projects DB query fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error("Admin projects GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

// 2. POST Create New Project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      clientIndustry,
      category,
      tagline,
      summary,
      challenge,
      solution,
      technologies,
      keyFeatures,
      results,
      featured,
      liveDemoUrl,
      githubUrl,
      coverImageUrl,
      status,
    } = body;

    if (!title || !category || !summary) {
      return NextResponse.json(
        { success: false, error: "Title, category, and summary are required fields." },
        { status: 400 }
      );
    }

    // Generate clean slug
    let baseSlug = (body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check slug collision
    const existingSlug = await prisma.project.findUnique({ where: { slug: baseSlug } });
    if (existingSlug) {
      baseSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Parse array fields safely
    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === "string"
      ? technologies.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const featuresArray = Array.isArray(keyFeatures)
      ? keyFeatures
      : typeof keyFeatures === "string"
      ? keyFeatures.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const resultsArray = Array.isArray(results)
      ? results
      : typeof results === "string"
      ? results.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const project = await prisma.project.create({
      data: {
        slug: baseSlug,
        title: title.trim(),
        clientIndustry: clientIndustry?.trim() || "Technology",
        category: category as ProjectCategory,
        tagline: tagline?.trim() || title.trim(),
        summary: summary.trim(),
        challenge: challenge?.trim() || summary.trim(),
        solution: solution?.trim() || summary.trim(),
        technologies: techArray,
        keyFeatures: featuresArray,
        results: resultsArray,
        featured: Boolean(featured),
        liveDemoUrl: liveDemoUrl?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        coverImageUrl: coverImageUrl?.trim() || null,
        status: (status as ContentStatus) || ContentStatus.PUBLISHED,
        publishedAt: status === ContentStatus.PUBLISHED ? new Date() : null,
      },
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "PROJECT_CREATED",
          entityType: "Project",
          entityId: project.id,
          metadata: { title: project.title, slug: project.slug, category: project.category },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Project created successfully.",
      project,
    }, { status: 201 });
  } catch (error) {
    console.error("Admin project POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}
