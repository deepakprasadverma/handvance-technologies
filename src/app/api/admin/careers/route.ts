import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { Department, EmploymentType, ExperienceLevel, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Valid administrator session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const department = searchParams.get("department")?.trim();
    const active = searchParams.get("active")?.trim();

    const where: Prisma.CareerWhereInput = {};

    if (department && department !== "ALL" && Object.values(Department).includes(department as Department)) {
      where.department = department as Department;
    }

    if (active === "true") {
      where.isActive = true;
    } else if (active === "false") {
      where.isActive = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ];
    }

    let careers: Array<Record<string, unknown>> = [];
    try {
      careers = await prisma.career.findMany({
        where,
        include: {
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.error("GET /api/admin/careers DB query:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: careers,
      count: careers.length,
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/careers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch careers." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Valid administrator session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      slug,
      department = "ENGINEERING",
      location = "Remote / Hyderabad, India",
      type = "FULL_TIME",
      experience = "SENIOR",
      summary = "",
      responsibilities = [],
      requirements = [],
      benefits = [],
      isActive = true,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Job title is required." },
        { status: 400 }
      );
    }

    const jobSlug = slug?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const career = await prisma.career.create({
      data: {
        title: title.trim(),
        slug: `${jobSlug}-${Date.now().toString().slice(-4)}`,
        department: Object.values(Department).includes(department) ? department : "ENGINEERING",
        location: location.trim(),
        type: Object.values(EmploymentType).includes(type) ? type : "FULL_TIME",
        experience: Object.values(ExperienceLevel).includes(experience) ? experience : "SENIOR",
        summary: summary.trim(),
        responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
        requirements: Array.isArray(requirements) ? requirements : [],
        benefits: Array.isArray(benefits) ? benefits : [],
        isActive: Boolean(isActive),
      },
    });

    // Audit log
    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "CAREER_OPENING_CREATED",
        entityType: "Career",
        entityId: career.id,
        metadata: { title: career.title, department: career.department },
      },
    });

    return NextResponse.json({ success: true, data: career }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/admin/careers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create career position." },
      { status: 500 }
    );
  }
}
