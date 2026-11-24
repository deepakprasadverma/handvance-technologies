import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ProjectCategory, ContentStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
  };
}

// 1. GET Single Project
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
  }
}

// 2. PATCH / PUT Update Project
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.project.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      title,
      slug,
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
      sortOrder,
    } = body;

    const data: Prisma.ProjectUpdateInput = {};

    if (title !== undefined) data.title = title.trim();
    if (slug !== undefined) data.slug = slug.trim();
    if (clientIndustry !== undefined) data.clientIndustry = clientIndustry.trim();
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      data.category = category as ProjectCategory;
    }
    if (tagline !== undefined) data.tagline = tagline.trim();
    if (summary !== undefined) data.summary = summary.trim();
    if (challenge !== undefined) data.challenge = challenge.trim();
    if (solution !== undefined) data.solution = solution.trim();

    if (technologies !== undefined) {
      data.technologies = Array.isArray(technologies)
        ? technologies
        : typeof technologies === "string"
        ? technologies.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    if (keyFeatures !== undefined) {
      data.keyFeatures = Array.isArray(keyFeatures)
        ? keyFeatures
        : typeof keyFeatures === "string"
        ? keyFeatures.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    if (results !== undefined) {
      data.results = Array.isArray(results)
        ? results
        : typeof results === "string"
        ? results.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    if (featured !== undefined) data.featured = Boolean(featured);
    if (liveDemoUrl !== undefined) data.liveDemoUrl = liveDemoUrl?.trim() || null;
    if (githubUrl !== undefined) data.githubUrl = githubUrl?.trim() || null;
    if (coverImageUrl !== undefined) data.coverImageUrl = coverImageUrl?.trim() || null;

    if (status && Object.values(ContentStatus).includes(status as ContentStatus)) {
      data.status = status as ContentStatus;
      if (status === ContentStatus.PUBLISHED && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder, 10) || 0;

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data,
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "PROJECT_UPDATED",
          entityType: "Project",
          entityId: params.id,
          metadata: { title: updatedProject.title, updatedFields: Object.keys(data) },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("PATCH project error:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

// 3. DELETE Project
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.project.findUnique({
      where: { id: params.id },
      select: { id: true, title: true, slug: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id: params.id },
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "PROJECT_DELETED",
          entityType: "Project",
          entityId: params.id,
          metadata: { title: existing.title, slug: existing.slug },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
