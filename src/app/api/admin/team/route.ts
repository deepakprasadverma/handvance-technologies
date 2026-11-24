import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { Department, Prisma } from "@prisma/client";

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

    const where: Prisma.TeamMemberWhereInput = {};

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
        { name: { contains: search, mode: "insensitive" } },
        { role: { contains: search, mode: "insensitive" } },
        { bio: { contains: search, mode: "insensitive" } },
      ];
    }

    let members: Array<Record<string, unknown>> = [];
    try {
      members = await prisma.teamMember.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
    } catch (dbErr) {
      console.error("GET /api/admin/team DB query:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: members,
      count: members.length,
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members." },
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
      name,
      role,
      department = "ENGINEERING",
      bio = "",
      avatarUrl,
      skills = [],
      linkedinUrl,
      githubUrl,
      twitterUrl,
      sortOrder = 0,
      isActive = true,
    } = body;

    if (!name?.trim() || !role?.trim()) {
      return NextResponse.json(
        { success: false, error: "Member name and role designation are required." },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        department: Object.values(Department).includes(department) ? department : "ENGINEERING",
        bio: bio.trim(),
        avatarUrl: avatarUrl?.trim() || null,
        skills: Array.isArray(skills) ? skills : [],
        linkedinUrl: linkedinUrl?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        twitterUrl: twitterUrl?.trim() || null,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
      },
    });

    // Audit log
    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TEAM_MEMBER_CREATED",
        entityType: "TeamMember",
        entityId: member.id,
        metadata: { name: member.name, role: member.role, department: member.department },
      },
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team member." },
      { status: 500 }
    );
  }
}
